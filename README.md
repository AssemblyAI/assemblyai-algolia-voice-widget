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
<script src="https://cdn.assemblyai.com/scripts/assemblyai-voice-helper.js"></script>
```

### 2. Configure Algolia InstantSearch

> The below Voice Search Widget requires you have an AssemblyAI Token, which you can get [here]()

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
        '...' // Your AssemblyAI API Token
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
1. Pricing is billed at **$0.0005 per second of audio transcribed**. 

# Feedback and Support

For questions about AssemblyAI, please email support@assemblyai.com. For questions about Algolia, please visit Algolia's support center [here](https://www.algolia.com/support/).

# Dev

## Build

```js
git clone https://github.com/MaksymBlank/assemblyai-voice-widget
cd assemblyai-voice-widget
npm install
npm run build
```

## Development
```js
git clone https://github.com/MaksymBlank/assemblyai-voice-widget
cd assemblyai-voice-widget
npm install
npm run dev // Server is running with webpack-dev-server (http://localhost:3000)
```
