'use strict';
const YT_KEY = 'AIzaSyALvjNbl1AWLqm_7EpCLN7doLT1FEieKxo'
const YT_API = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=`
const YT_STORAGE_KEY = 'savedVideos'
const WIKI_STORAGE_KEY = 'savedWiki'

let useMockData = false

function getVideos(searchVideo) {
    const savedVideos = loadFromStorage(YT_STORAGE_KEY) || {}

    if (savedVideos[searchVideo]) {
        console.log('Returning videos data from cache...')
        return Promise.resolve(savedVideos[searchVideo])
    }

    console.log('Fetching real data from the API...')
    return axios.get(YT_API + searchVideo)
        .then(({ data }) => {
            const videoRes = data.items.map(item => ({
                title: item.snippet.title,
                imgUrl: item.snippet.thumbnails.default.url,
                videoId: item.id.videoId
            }))

            savedVideos[searchVideo] = videoRes

            saveToStorage(YT_STORAGE_KEY, savedVideos)

            return videoRes
        })
        .catch(err => {
            console.error('YT API Error:', err)
        })
}

function getWiki(searchVideo) {
    const WIKI_API = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=${searchVideo}&format=json`

    const savedWiki = loadFromStorage(WIKI_STORAGE_KEY) || {}

    if (savedWiki[searchVideo]) {
        console.log('Returning wiki data from cache...')
        return Promise.resolve(savedWiki[searchVideo])
    }

    console.log('Fetching real wiki data from the API...')
    return axios.get(WIKI_API)
        .then(({ data }) => {
            const wikiRes = data.query.search.map(res => ({
                title: res.title,
                overview: res.snippet
            }))

            savedWiki[searchVideo] = wikiRes

            saveToStorage(WIKI_STORAGE_KEY, savedWiki)
            return wikiRes
        })
        .catch(err => {
            console.error('Wiki API Error:', err)
        })

}

//* ------------------- Fake Data -------------------

function getYtMockData() {
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

function getWikiMockData() {
    return [
        {
            "title": "Kendrick Lamar",
            "overview": "<span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> Duckworth (born June 17, 1987) is an American rapper. Regarded as one of the most influential hip-hop artists of his generation, and one"
        },
        {
            "title": "Drake–Kendrick Lamar feud",
            "overview": "American rapper <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> have been involved in a rap feud since at least March 22, 2024—the release date of the song &quot;Like That&quot; by <span class=\"searchmatch\">Lamar</span>, Future, and"
        },
        {
            "title": "I (Kendrick Lamar song)",
            "overview": "American rapper <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> featuring Ronald Isley of The Isley Brothers. It was released on September 23, 2014 as the lead single from <span class=\"searchmatch\">Lamar's</span> third studio"
        },
        {
            "title": "Kendrick Lamar albums discography",
            "overview": "American rapper <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> has released six studio albums, one compilation album, one extended play (EP), one soundtrack album, and five mixtapes."
        },
        {
            "title": "Euphoria (Kendrick Lamar song)",
            "overview": "&quot;Euphoria&quot; is a diss track written and recorded by American rapper <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span>, in response to Canadian rapper Drake's single &quot;Push Ups&quot; and his independently"
        },
        {
            "title": "GNX (album)",
            "overview": "GNX is the sixth studio album by American rapper <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span>. It was surprise-released on November 22, 2024, through PGLang and Interscope Records."
        },
        {
            "title": "Kendrick Lamar discography",
            "overview": "<span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> discography may refer to: <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> albums discography <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> singles discography List of songs recorded by <span class=\"searchmatch\">Kendrick</span> Lamar"
        },
        {
            "title": "Kendrick Lamar singles discography",
            "overview": "The American rapper <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> has released 73 singles and five promotional singles. Thirty of those singles were as a lead artist, while forty-three"
        },
        {
            "title": "Damn (Kendrick Lamar album)",
            "overview": "American rapper <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span>, released on April 14, 2017, through Top Dawg Entertainment, Aftermath Entertainment and Interscope Records. <span class=\"searchmatch\">Lamar</span> assembled"
        },
        {
            "title": "Alright (Kendrick Lamar song)",
            "overview": "&quot;Alright&quot; is a song by American rapper <span class=\"searchmatch\">Kendrick</span> <span class=\"searchmatch\">Lamar</span> featured on the artist's third studio album, To Pimp a Butterfly (2015). The song expresses ideas"
        }
    ]
}