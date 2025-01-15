'use strict';

onLoadVideosData()
function onLoadVideosData() {
    console.log('load videos');
    getVideos()
        .then(res => {
            console.log(res)
            renderVideos(res)
            renderFrontVideo(res)
        })
        .catch(err => console.log('err:', err))
}

function renderVideos(videos) {
    const strHTMLs = videos.map(video => `
        <li class="video-li flex align-center">
        <img class="video-img" src="${video.imgUrl}" alt="${video.title}">
            <span class="video-title">${video.title}</span>
        </li>
    `)
    document.querySelector('.video-list').innerHTML = strHTMLs.join('')
}

function renderFrontVideo(videos) {
    const frontVideo = videos[0]
    const strHTMLs = `
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${frontVideo.videoId}?controls=1"></iframe>
    `
    document.querySelector('.video-player').innerHTML = strHTMLs
}