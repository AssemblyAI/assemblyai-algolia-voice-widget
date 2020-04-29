window.onload = () => {
  const search = instantsearch({
    indexName: 'movies',
    searchClient: algoliasearch('latency', 'algolia-api-token')
  });

  search.addWidgets([
    instantsearch.widgets.configure({
      hitsPerPage: 12
    }),
    instantsearch.widgets.hits({
      container: '#hits',
      templates: {
        empty: 'No results',
        item: `<span>{{{title}}} ({{{year}}})</span>`
      }
    }),
    instantsearch.widgets.searchBox({
      container: '#searchbox'
    }),
    instantsearch.widgets.voiceSearch({
      container: '#voicesearch',
      // TODO: this requires https://github.com/algolia/instantsearch.js/pull/4363
      createVoiceSearchHelper: window.assemblyAIHelper(
        'assemblyai-api-token'
      ),
      cssClasses: {
        root: ['AssemblyAIHelper'] // Add AssemblyAI stylings or use your own
      },
      templates: {
        status: ({errorCode}) => Boolean(errorCode) ? `<div>${errorCode}</div>` : ''
      }
    }),
    instantsearch.widgets.pagination({
      container: '#pagination'
    }),
    instantsearch.widgets.stats({
      container: '#stats'
    })
  ]);

  search.start();
};
