class AudioVisualizer {
  constructor(audioManager) {
    this.audioManager = audioManager;
    this.canvas = document.getElementById('audio-visualizer');
    this.ctx = this.canvas.getContext('2d');
    this.analyser = Howler.ctx.createAnalyser();
    this.analyser.fftSize = 256;
    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.audioManager.sounds['ambient'].on('play', () => {
      Howler.ctx.createMediaElementSource(this.audioManager.sounds['ambient']._sounds[0]._node).connect(this.analyser);
      this.analyser.connect(Howler.ctx.destination);
      this.visualize();
    });
  }

  visualize() {
    requestAnimationFrame(this.visualize.bind(this));
    this.analyser.getByteFrequencyData(this.dataArray);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const barWidth = (this.canvas.width / this.bufferLength) * 2.5;
    let barHeight;
    let x = 0;
    for (let i = 0; i < this.bufferLength; i++) {
      barHeight = this.dataArray[i];
      this.ctx.fillStyle = 'rgb(' + (barHeight + 100) + ',50,50)';
      this.ctx.fillRect(x, this.canvas.height - barHeight / 2, barWidth, barHeight / 2);
      x += barWidth + 1;
    }
  }
}

const audioVisualizer = new AudioVisualizer(audioManager);
export default audioVisualizer;
