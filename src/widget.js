  
import AssemblyAI from './assemblyai';
import './scss/widget.scss';

class VoiceWidget {
    constructor(options) {
        Object.assign(this, options);

        if(!options.token){
            throw Error('AssemblyAI Token is a required option.')
        }

        this.assembly = new AssemblyAI(options.token);
    }

    init(initOptions) {
        const search = val => {
            initOptions.helper
                .setQuery(val)
                .search();
        }

        const container = document.querySelector(this.container);

        container.innerHTML = `
            <div id="assemblyai" class="assemblyai">
                <input
                    autocomplete="off"
                    autocapitalize="off"
                    type="text"
                    placeholder="${this.placeholder || 'Say something or type something..'}">
                <div class="assemblyai-loader">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 135 140" fill="#fff">
                        <rect y="26.651" width="15" height="86.698" rx="6">
                            <animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                        </rect>
                        <rect x="30" y="39.151" width="15" height="61.698" rx="6">
                            <animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                        </rect>
                        <rect x="60" width="15" height="73.02" rx="6" y="33.49">
                            <animate attributeName="height" begin="0s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="y" begin="0s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                        </rect>
                        <rect x="90" y="39.151" width="15" height="61.698" rx="6">
                            <animate attributeName="height" begin="0.25s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="y" begin="0.25s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                        </rect>
                        <rect x="120" y="26.651" width="15" height="86.698" rx="6">
                            <animate attributeName="height" begin="0.5s" dur="1s" values="120;110;100;90;80;70;60;50;40;140;120" calcMode="linear" repeatCount="indefinite"/>
                            <animate attributeName="y" begin="0.5s" dur="1s" values="10;15;20;25;30;35;40;45;50;0;10" calcMode="linear" repeatCount="indefinite"/>
                        </rect>
                    </svg>
                </div>
                <button id="assemblyai-record" class="assemblyai-prepend">
                    <i class="fas fa-microphone"></i>
                </button>
                <button id="assemblyai-cancel" class="assemblyai-prepend">
                    <i class="fas fa-check"></i>
                </button>
            </div>`;

        let wrapper = document.querySelector('#assemblyai'),
            record = document.querySelector('#assemblyai-record'),
            cancel = document.querySelector('#assemblyai-cancel'),
            input = document.querySelector('#assemblyai input');

        record.addEventListener('click', () => this.assembly.start());
        cancel.addEventListener('click', () => this.assembly.stop());
        input.addEventListener('keyup', () => search(input.value));

        this.assembly.on('start', () => wrapper.classList.add('recording'));
        this.assembly.on('stop', () => wrapper.classList.remove('recording'));
        this.assembly.on('error', (e) => wrapper.classList.add('disabled'));
        this.assembly.on('complete', ({text}) => {
            if(text){
                input.value = text;
                search(text);
            }else{
                wrapper.classList.add('shake');

                setTimeout(() => {
                    wrapper.classList.remove('shake');
                }, 700);
            }
        });

    }
}

export default VoiceWidget;