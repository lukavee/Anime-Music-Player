//////////////////* Functions ////////////////*/

function playMusic() {
  console.log("playMusic called")
  wrapper.classList.add("paused")
  playPauseBtn.querySelector("i").innerText = "pause"
  mainAudio.play()
}

function pauseMusic() {
  console.log("pauseMusic called")
  wrapper.classList.remove("paused")
  playPauseBtn.querySelector("i").innerText = "play_arrow"
  mainAudio.pause()
}

function nextMusic() {
  musicIndex++
  musicIndex > allMusic.length ? (musicIndex = 1) : (musicIndex = musicIndex)
  loadMusic(musicIndex)
  playMusic()
}

function prevMusic() {
  musicIndex--
  if (musicIndex === 0) {
    musicIndex = allMusic.length
  }
  loadMusic(musicIndex)
  playMusic()
}
