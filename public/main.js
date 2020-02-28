const VoiceWidget = window.AssemblyAIVoiceWidget;

window.onload = () => {
    const search = instantsearch({
        indexName: 'MOVIE',
        searchClient: algoliasearch('0508K6IM94', '390b7bccd0c4d78520d52f7c93e0889b'),
        routing: true
    });

    search.addWidget(
        instantsearch.widgets.configure({
            hitsPerPage: 12
        })
    );

    search.addWidget(
        instantsearch.widgets.hits({
            container: '#hits',
            templates: {
            empty: 'No results',
            item: `<span>{{{title}}} ({{{year}}})</span>`
            }
        })
    );

    search.addWidget(
        new VoiceWidget({
            container: '#voice-search',
            placeholder: 'Search for movies', // Input Placeholder
            token: 'f1d93bad5b7f48979f0d4bf69267f57b' // AssemblyAI token
        })
    );

    search.addWidget(
        instantsearch.widgets.pagination({
            container: '#pagination'
        })
    );

    search.addWidget(
        instantsearch.widgets.stats({
            container: '#stats'
        })
    );

    search.start();
}