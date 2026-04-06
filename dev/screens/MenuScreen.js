class MenuScreen extends Screen {
  constructor() {
    super();
    this.wildSlideLogo = loadImage("devassets/wild_slide.png");
    this.playButton = loadImage("devassets/playbtn.png");
    this.settingsButton = loadImage("devassets/settingsbtn.png");
    this.exitButton = loadImage("devassets/exitbtn.png");

  }

  onEnter() {
    console.log("Menu is now active");
  }

  draw() {
    background(103, 127, 81);

    imageMode(CENTER);
    image(this.wildSlideLogo, width / 2, height * 0.2, this.wildSlideLogo.width * 0.7, this.wildSlideLogo.height * 0.7);

    image(this.playButton, width / 2, height * 0.45, 199, 109);
    image(this.settingsButton, width / 2, height * 0.6, 199, 109);
    image(this.exitButton, width / 2 + 3, height * 0.75, 199, 109);

  }

  keyPressed() {
    if (keyCode === ENTER) {
      manager.switchTo("game");
      SoundManager.playSfx("testing", 0.1);
    }
  }
}