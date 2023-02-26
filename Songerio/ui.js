let musicIndex = 2

window.addEventListener("load", () => {
  loadMusic(musicIndex)
})
//////////////////* Load UI ////////////////*/

function loadMusic(indexNumb) {
  musicName.innerText = allMusic[indexNumb - 1].name
  musicArtist.innerText = allMusic[indexNumb - 1].artist
  musicImg.src = `img/${allMusic[indexNumb - 1].img}.jpg`
  mainAudio.src = `songs/${allMusic[indexNumb - 1].src}.mp3`
}

//////////////////* Event Listeners Buttons ////////////////*/

playPauseBtn.addEventListener("click", () => {
  const isMusicPaused = wrapper.classList.contains("paused")
  isMusicPaused ? pauseMusic() : playMusic()
})

nextBtn.addEventListener("click", () => {
  nextMusic()
})

prevBtn.addEventListener("click", () => {
  prevMusic()
})

//////////////////* Progress bar UI ////////////////*/

mainAudio.addEventListener("timeupdate", (e) => {
  const currentTime = e.target.currentTime
  const duration = e.target.duration
  let progressWidth = (currentTime / duration) * 100
  progressBar.style.width = `${progressWidth}%`

  let musicCurrentTime = wrapper.querySelector(".current-time")
  musicDuration = wrapper.querySelector(".max-duration")

  mainAudio.addEventListener("loadeddata", () => {
    /////////////////* Song duration UI *///////////////////////////////////
    let audioDuration = mainAudio.duration
    let totalMin = Math.floor(audioDuration / 60)
    let totalSec = Math.floor(audioDuration % 60)
    if (totalSec < 10) {
      totalSec = `0${totalSec}`
    }
    musicDuration.innerText = `${totalMin}:${totalSec}`
  })
  /////////////////* Current time of the song  UI *///////////////////////////////////
  let currentMin = Math.floor(currentTime / 60)
  let currentSec = Math.floor(currentTime % 60)
  if (currentSec < 10) {
    currentSec = `0${currentSec}`
  }
  musicCurrentTime.innerText = `${currentMin}:${currentSec}`
})

/////////////////* Clicking on progress bar UI *///////////////////////////////////
progressArea.addEventListener("click", (e) => {
  let progressWidthval = progressArea.clientWidth
  let clickedOffSetX = e.offsetX
  let songDuration = mainAudio.duration

  mainAudio.currentTime = (clickedOffSetX / progressWidthval) * songDuration

  let progressWidth = (mainAudio.currentTime / songDuration) * 100
  progressBar.style.width = `${progressWidth}%`
})

/////////////////* Changing options of next song playing on click *///////////////////////////////////
repeatBtn.addEventListener("click", () => {
  let getText = repeatBtn.innerText
  switch (getText) {
    case "repeat":
      repeatBtn.innerText = "repeat_one"
      break
    case "repeat_one":
      repeatBtn.innerText = "shuffle"
      break
    case "shuffle":
      repeatBtn.innerText = "repeat"
      break
  }
})
/////////////////* What to do when song is finished *///////////////////////////////////
mainAudio.addEventListener("ended", () => {
  let getText = repeatBtn.innerText

  switch (getText) {
    case "repeat":
      nextMusic()
      break
    case "repeat_one":
      mainAudio.currentTime = 0
      playMusic()
      break
    case "shuffle":
      let randIndex = Math.floor(Math.random() * allMusic.length + 1)
      do {
        randIndex = Math.floor(Math.random() * allMusic.length + 1)
      } while (musicIndex === randIndex)
      musicIndex = randIndex
      loadMusic(musicIndex)
      playMusic()
      break
  }
})
