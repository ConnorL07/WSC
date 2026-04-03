let screenManager;

function preload() {
  SoundManager.loadSfx("testing", "../assets/ahh.wav");
  SoundManager.loadMusic("bgmusic", "./devassets/testingbg.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("monospace");

  manager.register("menu", new MenuScreen());
  manager.register("game", new GameScreen());

  manager.switchTo("menu");
}

function draw() {
  manager.draw();
}

function keyPressed() {
  manager.keyPressed();
}

function mousePressed() {
  manager.mousePressed();
}
