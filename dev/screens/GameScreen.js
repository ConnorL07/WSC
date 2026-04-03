class GameScreen extends Screen {
  onEnter() {
    SoundManager.playMusic("bgmusic", 0.5);
    this.score = 0;
  }

  draw() {
    background(0);
    fill(255);
    text("Score: " + this.score, 20, 30);
  }
}