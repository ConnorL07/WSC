class MenuScreen extends Screen {

  constructor() {
    super();
    this.mainMenuBg = Assets.backgroundImg;
    this.wildSlideLogo = Assets.logoImg;
  }

  onEnter() {
    this.startBtn = new Button(width * 0.5, height * 0.45, 199, 109, Assets.playBtn);
    this.settingsBtn = new Button(width * 0.5, height * 0.6, 199, 109, Assets.settingsBtn);
    this.exitBtn = new Button(width * 0.5, height * 0.75, 201, 109, Assets.exitBtn);
  }

  draw() {
    imageMode(CENTER);
    image(this.mainMenuBg, width / 2, height / 2, width, height);

    image(this.wildSlideLogo, width / 2, height * 0.2,
          this.wildSlideLogo.width * 0.7,
          this.wildSlideLogo.height * 0.7);

    this.startBtn.draw();
    this.settingsBtn.draw();
    this.exitBtn.draw();
  }

  mousePressed() {
    if (this.startBtn.isHovered()) {
      manager.switchTo("game1", true);
      SoundManager.playSfx("testing", 0.5);
    }
  }
}
