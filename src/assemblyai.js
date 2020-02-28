import 'babel-polyfill';
import VAD from './lib/vad';
import axios from 'axios';
import Recorder from 'recorder-js';
import resampler from 'audio-resampler';
import createBuffer from 'audio-buffer-from';
import { detect } from 'detect-browser';

const API_ENDPOINT = 'https://api.assemblyai.com/v2/stream';

class AssemblyAI{
    constructor(token){
        this.token = token;
        this.PCM_DATA_SAMPLE_RATE = detect().name === 'safari' ? 44100 : 8000;

        console.log(`Running on browser: ${detect().name}`);

        // Default callbacks
        this.callbacks = {
            start: () => {},
            stop: () => {},
            complete: () => {},
            error: () => {}
        }
    }

    /**
     * Function that starts the recording
     */
    async start(){
        const constraints = {
            audio: {
                echoCancellation: false,
                noiseSuppression: false,
                autoGainControl: false,
            }
        };

        // Init recorder on start to prevent autoplay issue (user has to interact with the page first.)
        if(!this.recorder){
            await new Promise((resolve) => {
                const audioContext =  new (window.AudioContext || window.webkitAudioContext)();
    
                this.recorder = new Recorder(audioContext);
                navigator.mediaDevices.getUserMedia(constraints)
                        .then(stream => {
                            this.recorder.init(stream)

                            this.source = audioContext.createMediaStreamSource(stream);

                            const options = {
                                source: this.source,
                                voice_stop: () => {
                                    if(this.isRecording){
                                        this.stop();
                                    }
                                }
                            };
                
                            new VAD(options);

                            resolve();
                        })
                        .catch(err => this.callbacks.error());
            })
        }

        this.recorder.start().then(() => {
            this.isRecording = true;
            this.callbacks.start();
        })
    }

    /**
     * Function that stops the recording
     */
    stop(){
        this.isRecording = false;
        this.callbacks.stop();
        this.recorder.stop().then(({buffer}) => {
            resampler(createBuffer(buffer[0]), this.PCM_DATA_SAMPLE_RATE, ({getAudioBuffer}) => {
                const wav = this._createWaveFileData(getAudioBuffer());

                this._transcribe(btoa(this._uint8ToString(wav)))
            })
        });
    }

    /**
     * Function that registers event listeners.
     * @param {string} event Event name. Valid options: start, stop, complete, error.
     * @param {function} callback Function that will be called when event is fired.
     */
    on(event, callback){
        switch(event){
            case 'start': {
                this.callbacks.start = callback;
                break;
            }
            case 'stop': {
                this.callbacks.stop = callback;
                break;
            }
            case 'complete': {
                this.callbacks.complete = callback;
                break;
            }
            case 'error': {
                this.callbacks.error = callback;
                break;
            }
            default: {
                console.error(`Event ${event} does not exist.`);
            }
        }
    }

    /**
     * Function that gets a trascript from AssemblyAI API.
     * @param {base64} audio_data Audio recording.
     */
    async _transcribe(audio_data){
        try{
            const {data} = await axios({
                method: 'POST',
                url: API_ENDPOINT,
                data: {audio_data},
                headers: {
                    'authorization': this.token,
                    'Content-Type': 'application/json; charset=utf-8'
                },
                responseType: 'json',
            });
    
            this.callbacks.complete(data);
        }catch(e){
            this.callbacks.complete();
        }
    }

    _uint8ToString(buf) {
        return Array.prototype.map.call(buf, i => String.fromCharCode(i)).join('');
    }

    _createWaveFileData(audioBuffer) {
        const frameLength = audioBuffer.length;
        const numberOfChannels = audioBuffer.numberOfChannels;
        const sampleRate = audioBuffer.sampleRate;
        const bitsPerSample = 16;
        const byteRate = sampleRate * numberOfChannels * bitsPerSample/8;
        const blockAlign = numberOfChannels * bitsPerSample/8;
        const wavDataByteLength = frameLength * numberOfChannels * 2; // 16-bit audio
        const headerByteLength = 44;
        const totalLength = headerByteLength + wavDataByteLength;
    
        const waveFileData = new Uint8Array(totalLength);
    
        const subChunk1Size = 16; // for linear PCM
        const subChunk2Size = wavDataByteLength;
        const chunkSize = 4 + (8 + subChunk1Size) + (8 + subChunk2Size);
    
        this._writeString("RIFF", waveFileData, 0);
        this._writeInt32(chunkSize, waveFileData, 4);
        this._writeString("WAVE", waveFileData, 8);
        this._writeString("fmt ", waveFileData, 12);
    
        this._writeInt32(subChunk1Size, waveFileData, 16);      // SubChunk1Size (4)
        this._writeInt16(1, waveFileData, 20);                  // AudioFormat (2)
        this._writeInt16(numberOfChannels, waveFileData, 22);   // NumChannels (2)
        this._writeInt32(sampleRate, waveFileData, 24);         // SampleRate (4)
        this._writeInt32(byteRate, waveFileData, 28);           // ByteRate (4)
        this._writeInt16(blockAlign, waveFileData, 32);         // BlockAlign (2)
        this._writeInt32(bitsPerSample, waveFileData, 34);      // BitsPerSample (4)
    
        this._writeString("data", waveFileData, 36);
        this._writeInt32(subChunk2Size, waveFileData, 40);      // SubChunk2Size (4)
    
        // Write actual audio data starting at offset 44.
        this._writeAudioBuffer(audioBuffer, waveFileData, 44);
    
        return waveFileData;
    }

    _writeString(s, a, offset) {
        for (let i = 0; i < s.length; ++i) {
          a[offset + i] = s.charCodeAt(i);
        }
    }
    
    _writeInt16(n, a, offset) {
        n = Math.floor(n);
    
        a[offset + 0] = n & 255;
        a[offset + 1] = (n >> 8) & 255;
    }
    
    _writeInt32(n, a, offset) {
        n = Math.floor(n);
    
        a[offset + 0] = n & 255;
        a[offset + 1] = (n >> 8) & 255;
        a[offset + 2] = (n >> 16) & 255;
        a[offset + 3] = (n >> 24) & 255;
    }

    _writeAudioBuffer(audioBuffer, a, offset) {
        let n = audioBuffer.length;
        let channels = audioBuffer.numberOfChannels;
    
        for (let i = 0; i < n; ++i) {
          for (let k = 0; k < channels; ++k) {
            let buffer = audioBuffer.getChannelData(k);
            let sample = buffer[i] * 32768.0;
    
            // Clip samples to the limitations of 16-bit.
            // If we don't do this then we'll get nasty wrap-around distortion.
            if (sample < -32768)
                sample = -32768;
            if (sample > 32767)
                sample = 32767;
    
            this._writeInt16(sample, a, offset);
            offset += 2;
          }
        }
    }
}

export default AssemblyAI;