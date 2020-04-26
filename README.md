# AssemblyAI Voice Search Widget

## Getting started
### 1: Include AssemblyAI
```html
<script src="https://cdn.assemblyai.com/scripts/assemblyai-voice-helper.js"></script>
```

### 2. Configure Algolia InstantSearch
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
        '...' // Your AssemblyAI API Key
      )
    }),
    // ... other configurations
]);

search.start();

```

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