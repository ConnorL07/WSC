class Screen {
  onEnter() {}   // called once when this screen becomes active
  onExit()  {}   // called once when leaving this screen
  draw()    {}   // called every frame
  keyPressed()  {} // optional input hooks
  mousePressed() {}
}

class ScreenManager {
  constructor() {
    this.screens = {};
    this.current = null;
  }

  register(name, screen) {
    this.screens[name] = screen;
  }

  switchTo(name) {
    if (this.current) this.current.onExit();
    this.current = this.screens[name];
    this.current.onEnter();
  }

  draw() {
    if (this.current) this.current.draw();
  }

  keyPressed() {
    if (this.current) this.current.keyPressed();
  }

  mousePressed() {
    if (this.current) this.current.mousePressed();
  }
}

const manager = new ScreenManager();