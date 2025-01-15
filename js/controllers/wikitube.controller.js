'use strict';
onLoadVideosData()
function onLoadVideosData() {
    console.log('load videos');
    getVideos()
        .then(res => {
            console.log(res)
            renderVideos(res)
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