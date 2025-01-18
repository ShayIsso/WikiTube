'use strict';
const YOUTUBE_API_KEY = 'AIzaSyALvjNbl1AWLqm_7EpCLN7doLT1FEieKxo'
const YOUTUBE_SEARCH_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YOUTUBE_API_KEY}&q=`
const CACHED_VIDEOS_KEY = 'savedVideos'
const CACHED_WIKI_KEY = 'savedWiki'

function getYtVideos(searchQuery) {
    const cachedVideos = loadFromStorage(CACHED_VIDEOS_KEY) || {}

    if (cachedVideos[searchQuery]) {
        console.log('Returning videos data from cache...')
        return Promise.resolve(cachedVideos[searchQuery])
    }

    console.log('Fetching real data from the API...')
    return axios.get(YOUTUBE_SEARCH_API + searchQuery)
        .then(({ data }) => {
            const formattedVideos = data.items.map(item => ({
                title: item.snippet.title,
                imgUrl: item.snippet.thumbnails.default.url,
                videoId: item.id.videoId
            }))

            cachedVideos[searchQuery] = formattedVideos

            saveToStorage(CACHED_VIDEOS_KEY, cachedVideos)

            return formattedVideos
        })
        .catch(err => {
            console.error('YT API Error:', err)
        })
}

function getWiki(searchQuery) {
    const WIKI_API = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchQuery}&format=json`

    const cachedWikiResults = loadFromStorage(CACHED_WIKI_KEY) || {}

    if (cachedWikiResults[searchQuery]) {
        console.log('Returning wiki data from cache...')
        return Promise.resolve(cachedWikiResults[searchQuery])
    }

    console.log('Fetching real wiki data from the API...')
    return axios.get(WIKI_API)
        .then(({ data }) => {
            const formattedWikiResults = data.query.search.map(res => ({
                title: res.title,
                overview: res.snippet
            }))

            cachedWikiResults[searchQuery] = formattedWikiResults

            saveToStorage(CACHED_WIKI_KEY, cachedWikiResults)
            return formattedWikiResults
        })
        .catch(err => {
            console.error('Wiki API Error:', err)
            return []
        })

}