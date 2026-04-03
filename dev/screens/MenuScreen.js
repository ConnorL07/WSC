class MenuScreen extends Screen {
  onEnter() {
    console.log("Menu is now active");
  }

  draw() {
    background(30);
    textAlign(CENTER, CENTER);
    textSize(32);
    fill(255);
    text("Press ENTER to Play", width / 2, height / 2);
  }

  keyPressed() {
    if (keyCode === ENTER) {
      manager.switchTo("game");
      SoundManager.playSfx("testing", 0.1);
    }
  }
}