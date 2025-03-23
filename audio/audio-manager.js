class AudioManager {
  constructor() {
    this.sounds = {};
    this.currentlyPlaying = null;
  }

  loadSound(name, url) {
    const sound = new Howl({
      src: [url],
      onload: () => {
        console.log(`${name} loaded successfully.`);
      },
      onloaderror: (id, error) => {
        console.error(`Failed to load ${name}:`, error);
      }
    });
    this.sounds[name] = sound;
  }

  playSound(name) {
    if (this.sounds[name]) {
      this.currentlyPlaying = this.sounds[name].play();
    } else {
      console.error(`Sound ${name} not found.`);
    }
  }

  stopSound(name) {
    if (this.sounds[name]) {
      this.sounds[name].stop();
    } else {
      console.error(`Sound ${name} not found.`);
    }
  }

  fadeOutSound(name, duration = 1000) {
    if (this.sounds[name]) {
      this.sounds[name].fade(1, 0, duration);
    } else {
      console.error(`Sound ${name} not found.`);
    }
  }

  fadeInSound(name, duration = 1000) {
    if (this.sounds[name]) {
      this.sounds[name].fade(0, 1, duration);
    } else {
      console.error(`Sound ${name} not found.`);
    }
  }

  setVolume(name, volume) {
    if (this.sounds[name]) {
      this.sounds[name].volume(volume);
    } else {
      console.error(`Sound ${name} not found.`);
    }
  }

  isPlaying(name) {
    if (this.sounds[name]) {
      return this.sounds[name].playing();
    } else {
      console.error(`Sound ${name} not found.`);
      return false;
    }
  }
}

const audioManager = new AudioManager();
audioManager.loadSound('ambient', '/audio/oracle_ambient.mp3');
audioManager.loadSound('invocation', '/audio/oracle_invocation.mp3');
audioManager.loadSound('glyphActivation', '/audio/glyph_activation.mp3');

export default audioManager;
