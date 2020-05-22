# AssemblyAI Voice Search Widget

Using this widget, you can effortlessly add voice search to your website and/or app. 

- [Getting Started](#getting-started)
- [Supported Platforms/Browsers](#supported-platforms-browsers)
- [Supported Languages](#supported-languages)
- [Getting an AssemblyAI API Token](#getting-an-assemblyai-api-token)
- [Feedback/Support](#feedback-and-support)

# Getting Started

### 1: Include AssemblyAI

```html
<script src="https://cdn.jsdelivr.net/gh/assemblyai/assemblyai-algolia-voice-widget/public/assemblyai-voice-helper.js"></script>
```

### 2. Configure Algolia InstantSearch

> The below Voice Search Widget requires you have an AssemblyAI Token, which you can get [here](#getting-an-assemblyai-api-token)

```js
const search = instantsearch({
    indexName: '...',
    searchClient: algoliasearch('...', '...'),
});

search.addWidgets([
    instantsearch.widgets.hits({
      container: '#hits',
    }),
    instantsearch.widgets.searchBox({
      container: '#searchbox'
    }),
    instantsearch.widgets.voiceSearch({
      container: '#voicesearch',
      createVoiceSearchHelper: window.assemblyAIHelper(
        'xxxxxxxxxxxxxxx', // Your AssemblyAI API Token
        {
          word_boost: ['AssemblyAI', 'Google', 'Facebook'], // AssemblyAI word_boost parameter. See: https://docs.assemblyai.com/all-guides/synchronous-transcription-for-short-audio-files#boost
          format_text: true // AssemblyAI format_text parameter. See: https://docs.assemblyai.com/all-guides/synchronous-transcription-for-short-audio-files#format
        }
      ),
      cssClasses: {
        root: ['AssemblyAIHelper'] // Add AssemblyAI stylings or use your own
      },
      templates: {
        status: ({errorCode}) => Boolean(errorCode) ? `<div>${errorCode}</div>` : '' // AssemblyAI error handling
      }
    }),
    // ... other configurations
]);

search.start();

```

# Supported Platforms Browsers


| Browser  | Supported |
| ------------- | ------------- |
| Dekstop Safari  | Yes  |
| Desktop Chrome  | Yes  |
| Desktop Firefox | Yes |
| iOS Safari | Yes |
| iOS Chrome | No |
| iOS Firefox | No |
| Android Chrome | Yes |
| Android Firefox | Yes |

# Supported Languages

At this time, only **English** (all accents) is supported.

# Getting an AssemblyAI API Token

AssemblyAI is a [Speech-to-Text API](https://www.assemblyai.com/) that can convert voice into text. You must have an AssemblyAI API Token to use this voice search widget. 

1. Register for an AssemblyAI API token [here](https://app.assemblyai.com/login/)
1. Add a credit card to your AssemblyAI account [here](https://app.assemblyai.com/dashboard/account/)
1. Pricing is billed at **$0.008 per request to AssemblyAI**. 

# Feedback and Support

For questions about AssemblyAI, please email support@assemblyai.com. For questions about Algolia, please visit Algolia's support center [here](https://www.algolia.com/support/).

# Dev

## Build

```js
https://github.com/AssemblyAI/assemblyai-algolia-voice-widget
cd assemblyai-voice-widget
npm install
npm run build
```

## Development
```js
https://github.com/AssemblyAI/assemblyai-algolia-voice-widget
cd assemblyai-voice-widget
npm install
npm run dev // Server is running with webpack-dev-server (http://localhost:3000)
```
