# AssemblyAI Voice Search Widget

## Installation
```js
npm install ... --save
```

## Usage
```js
import AssemblyAIVoiceWidget from '...';

const search = instantsearch({
    indexName: '...',
    searchClient: algoliasearch('...', '...'),
});

search.addWidget(
    instantsearch.widgets.hits({ container: '#hits' });
);

search.addWidget(
    new AssemblyAIVoiceWidget({
        container: '#voice-search',
        placeholder: 'Search for movies', // Input Placeholder
        token: '...' // AssemblyAI token
    })
);

search.start();

```