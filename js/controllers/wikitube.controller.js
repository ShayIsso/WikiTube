'use strict';
let gSearchStr = 'KendrickLamar'


function onInit() {
    onLoadVideosData()
}

function onLoadVideosData() {
    console.log('load videos');
    getVideos(gSearchStr)
        .then(res => {
            console.log(res)
            renderVideos(res)
            renderFrontVideo(res)
        })
        .catch(err => console.log('err:', err))

    getWiki(gSearchStr)
        .then(renderWikiInfo)
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

function renderWikiInfo(info) {
    console.log(info);
    
    const mainInfos = [info[0], info[1]]
    const strHTMLs = mainInfos.map(mainInfo =>
        `<h3>${mainInfo.title}</h3>
         <p class=video-overview>${mainInfo.overview}</p>`
    )
    document.querySelector('.wiki-results').innerHTML = strHTMLs.join('')
}

function onSearchVideo(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('.search-input')
    gSearchStr = elInput.value
    console.log(gSearchStr)
    onLoadVideosData()
}