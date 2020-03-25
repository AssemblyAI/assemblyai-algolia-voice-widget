window.onload = () => {
  const search = instantsearch({
    indexName: 'movies',
    searchClient: algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76')
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
      createVoiceSearchHelper: window.assemblyAIHelper(
        'f1d93bad5b7f48979f0d4bf69267f57b'
      )
    }),
    instantsearch.widgets.voiceSearch({
      container: '#voicesearch-alt'
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
