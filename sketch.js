let screenManager;

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont("monospace");

  screenManager = new ScreenManager();
  createDemoScreens(screenManager);
  screenManager.setScreen("home");
}

function draw() {
  screenManager.update(deltaTime / 1000);
  screenManager.render();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  screenManager.resize(width, height);
}

function mousePressed() {
  screenManager.mousePressed();
}

function keyPressed() {
  screenManager.keyPressed();
}
