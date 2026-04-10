class MenuScreen extends Screen {

  constructor() {
    super();
    this.mainMenuBg = Assets.backgroundImg;
    this.wildSlideLogo = Assets.logoImg;
  }

  onEnter() {
    console.log("Menu is now active");

    this.startBtn = new Button(width * 0.5, height * 0.45, 199, 109, Assets.playBtn);
  }

  draw() {
    imageMode(CENTER);
    image(this.mainMenuBg, width / 2, height / 2, this.mainMenuBg.width * 0.8, this.mainMenuBg.height * 0.8)

    imageMode(CENTER);
    image(this.wildSlideLogo, width / 2, height * 0.2, this.wildSlideLogo.width * 0.7, this.wildSlideLogo.height * 0.7);

    this.startBtn.draw();
  }

  keyPressed() {
    if (keyCode === ENTER) {
      manager.switchTo("game");
      SoundManager.playSfx("testing", 0.1);
    }
  }

  mousePressed() {
    if (this.startBtn.isClicked()) {
      manager.switchTo('game');
    }
  }
}