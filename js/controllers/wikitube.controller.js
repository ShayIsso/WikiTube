'use strict';
let currSearchQuery = 'KendrickLamar'


function onInit() {
    onLoadVideosData()
}

function onLoadVideosData() {
    Promise.all([getYtVideos(currSearchQuery), getWiki(currSearchQuery)])
        .then(([videos, wikiInfo]) => {
            renderVideoList(videos)
            renderFeaturedVideo(videos)
            renderWikiInfo(wikiInfo)
        })
        .catch(err => console.log('err:', err))
}

function renderVideoList(videos) {
    const strHTMLs = videos.map(video => `
        <li class="video-li flex align-center">
        <img class="video-img" src="${video.imgUrl}" alt="${video.title}">
            <span class="video-title">${video.title}</span>
        </li>
    `)
    document.querySelector('.video-list').innerHTML = strHTMLs.join('')
}

function renderFeaturedVideo(videos) {
    const frontVideo = videos[0]
    const strHTMLs = `
                <iframe width="420" height="315" src="https://www.youtube.com/embed/${frontVideo.videoId}?controls=1"></iframe>
    `
    document.querySelector('.video-player').innerHTML = strHTMLs
}

function renderWikiInfo(info) {
    if (!info.length) {
        console.error('Wiki info is empty or undefined.')
        document.querySelector('.wiki-results').innerHTML = '<p>No wiki information available.</p>'
        return
    }

    const mainInfos = [info[0], info[3]]
    const strHTMLs = mainInfos.map(mainInfo =>
        `<h3>${mainInfo.title}</h3>
         <p class=video-overview>${mainInfo.overview}</p>`
    )
    document.querySelector('.wiki-results').innerHTML = strHTMLs.join('')
}

function onSearchVideo(ev) {
    ev.preventDefault()
    const elInput = document.querySelector('.search-input')
    currSearchQuery = elInput.value
    onLoadVideosData()
}