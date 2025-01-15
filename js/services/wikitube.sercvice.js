'use strict';
const YT_KEY = 'AIzaSyALvjNbl1AWLqm_7EpCLN7doLT1FEieKxo'
const WIKI_API_KEY = `https://en.wikipedia.org/w/api.php?&origin=*&action=query&list=search&srsearch=beatles&format=json`
// const YOUTUBE_TOP_FIVE = `https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=${YT_KEY}&q=${value}`
const TEST_KEY = 'https://www.googleapis.com/youtube/v3/search?part=snippet&videoEmbeddable=true&type=video&key=AIzaSyALvjNbl1AWLqm_7EpCLN7doLT1FEieKxo&q=kendrickLamar'

let useMockData = false

function getVideos() {
    if (useMockData) {
        console.log('Mock mode enabled. Returning fake data...')
        return Promise.resolve(getMockData())
    } else {
        console.log('Fetching real data from the API...')
        return axios.get(TEST_KEY)
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
                "kind": "youtube#searchResult",
                "etag": "aU7jtZLqkgZoeqz8ak-8nvHaCg4",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "H58vbez_m4E"
                },
                "snippet": {
                    "publishedAt": "2024-07-04T23:00:09Z",
                    "channelId": "UCoYfzC2zMlc9M-Odgaf6OSg",
                    "title": "Kendrick Lamar - Not Like Us",
                    "description": "Kendrick Lamar “Not Like Us” Directed by Dave Free & Kendrick Lamar Production Company: pgLang / project3 Executive ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/H58vbez_m4E/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/H58vbez_m4E/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/H58vbez_m4E/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "KendrickLamarVEVO",
                    "liveBroadcastContent": "none",
                    "publishTime": "2024-07-04T23:00:09Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "Zh6Yz0Ed-6qBHEM3eKwWTLCTkFE",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "fuV4yQWdn_4"
                },
                "snippet": {
                    "publishedAt": "2024-11-25T18:07:36Z",
                    "channelId": "UC3lBXcrKFnFAFkfVk5WuKcQ",
                    "title": "squabble up",
                    "description": "Kendrick Lamar “GNX” is available now: https://my-gnx.com/ Directed by Calmatic Production Company: pgLang / project3 ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/fuV4yQWdn_4/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/fuV4yQWdn_4/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/fuV4yQWdn_4/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Kendrick Lamar",
                    "liveBroadcastContent": "none",
                    "publishTime": "2024-11-25T18:07:36Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "uArJaPf0Q-JssZzTfnKVinJedUk",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "U8F5G5wR1mk"
                },
                "snippet": {
                    "publishedAt": "2024-11-22T17:08:31Z",
                    "channelId": "UC3lBXcrKFnFAFkfVk5WuKcQ",
                    "title": "Kendrick Lamar - tv off (Official Audio)",
                    "description": "Kendrick Lamar “GNX” is available now: https://my-gnx.com/ https://www.myGNX.com https://www.instagram.com/kendricklamar ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/U8F5G5wR1mk/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/U8F5G5wR1mk/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/U8F5G5wR1mk/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Kendrick Lamar",
                    "liveBroadcastContent": "none",
                    "publishTime": "2024-11-22T17:08:31Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "A1X2qqcmlya6s9i2MYkhT7_m7lA",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "YwUQ_5iV9pY"
                },
                "snippet": {
                    "publishedAt": "2024-11-22T17:08:31Z",
                    "channelId": "UC3lBXcrKFnFAFkfVk5WuKcQ",
                    "title": "Kendrick Lamar - wacced out murals (Official Audio)",
                    "description": "Kendrick Lamar “GNX” is available now: https://my-gnx.com/ https://www.myGNX.com https://www.instagram.com/kendricklamar ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/YwUQ_5iV9pY/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/YwUQ_5iV9pY/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/YwUQ_5iV9pY/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "Kendrick Lamar",
                    "liveBroadcastContent": "none",
                    "publishTime": "2024-11-22T17:08:31Z"
                }
            },
            {
                "kind": "youtube#searchResult",
                "etag": "2vHROapouWRVcHMuAWh0eIOAchw",
                "id": {
                    "kind": "youtube#video",
                    "videoId": "tvTRZJ-4EyI"
                },
                "snippet": {
                    "publishedAt": "2017-03-30T23:00:06Z",
                    "channelId": "UCoYfzC2zMlc9M-Odgaf6OSg",
                    "title": "Kendrick Lamar - HUMBLE.",
                    "description": "Kendrick Lamar DAMN. Available now http://smarturl.it/DAMN Prod: Anthony \"Top Dawg\" Tiffith, Dave Free Nathan K. Scherrer, ...",
                    "thumbnails": {
                        "default": {
                            "url": "https://i.ytimg.com/vi/tvTRZJ-4EyI/default.jpg",
                            "width": 120,
                            "height": 90
                        },
                        "medium": {
                            "url": "https://i.ytimg.com/vi/tvTRZJ-4EyI/mqdefault.jpg",
                            "width": 320,
                            "height": 180
                        },
                        "high": {
                            "url": "https://i.ytimg.com/vi/tvTRZJ-4EyI/hqdefault.jpg",
                            "width": 480,
                            "height": 360
                        }
                    },
                    "channelTitle": "KendrickLamarVEVO",
                    "liveBroadcastContent": "none",
                    "publishTime": "2017-03-30T23:00:06Z"
                }
            }
    ]
}