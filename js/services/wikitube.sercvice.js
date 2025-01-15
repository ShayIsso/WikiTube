'use strict';
const YT_KEY = 'AIzaSyALvjNbl1AWLqm_7EpCLN7doLT1FEieKxo'
const WIKI_API_KEY = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=beatles&format=json`
// const YOUTUBE_TOP_FIVE = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`
const TEST_KEY = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=`

let useMockData = false

function getVideos(searchVideo) {
    if (useMockData) {
        console.log('Mock mode enabled. Returning fake data...')
        return Promise.resolve(getMockData())
    } else {
        console.log('Fetching real data from the API...')
        return axios.get(TEST_KEY+searchVideo)
            .then(({data}) => data.items.map(item => {
                return {
                    title: item.snippet.title,
                    imgUrl: item.snippet.thumbnails.default.url,
                    videoId: item.id.videoId
                }
            }
            ))
            .catch(err => {
                console.error('API Error:', err)
            })
    }
}

//* ------------------- Fake Data -------------------

function getMockData() {
    return [
        {
            "title": "Kendrick Lamar - Not Like Us",
            "imgUrl": "https://i.ytimg.com/vi/H58vbez_m4E/default.jpg",
            "videoId": "H58vbez_m4E"
        },
        {
            "title": "squabble up",
            "imgUrl": "https://i.ytimg.com/vi/fuV4yQWdn_4/default.jpg",
            "videoId": "fuV4yQWdn_4"
        },
        {
            "title": "Kendrick Lamar - tv off (Official Audio)",
            "imgUrl": "https://i.ytimg.com/vi/U8F5G5wR1mk/default.jpg",
            "videoId": "U8F5G5wR1mk"
        },
        {
            "title": "Kendrick Lamar - wacced out murals (Official Audio)",
            "imgUrl": "https://i.ytimg.com/vi/YwUQ_5iV9pY/default.jpg",
            "videoId": "YwUQ_5iV9pY"
        },
        {
            "title": "Kendrick Lamar - HUMBLE.",
            "imgUrl": "https://i.ytimg.com/vi/tvTRZJ-4EyI/default.jpg",
            "videoId": "tvTRZJ-4EyI"
        }
    ]
}