class MenuScreen extends Screen {

  constructor() {
    super();
    this.mainMenuBg = loadImage("devassets/background.png")
    this.wildSlideLogo = loadImage("devassets/wild_slide.png");
    this.buttons = new ButtonManager();

  }

  onEnter() {
    console.log("Menu is now active");

    this.buttons.clear(); // optional, if switching screens

    this.buttons.add(new Button(playButton, width / 2, height * 0.45, 199, 109, () => manager.switchTo("game")))
  }

  draw() {
    imageMode(CENTER);
    image(this.mainMenuBg, width / 2, height / 2, this.mainMenuBg.width * 0.8, this.mainMenuBg.height * 0.8)

    imageMode(CENTER);
    image(this.wildSlideLogo, width / 2, height * 0.2, this.wildSlideLogo.width * 0.7, this.wildSlideLogo.height * 0.7);

    this.buttons.display();

  }

  keyPressed() {
    if (keyCode === ENTER) {
      manager.switchTo("game");
      SoundManager.playSfx("testing", 0.1);
    }
  }

  mousePressed() {
    this.buttons.handleClick();
  }
}