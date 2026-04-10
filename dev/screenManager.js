class Screen {
  onEnter() { }   // called once when this screen becomes active
  onExit() { }   // called once when leaving this screen
  draw() { }   // called every frame
  keyPressed() { } // optional input hooks
  mousePressed() { }
}

class ScreenManager {
  constructor() {
    this.screens = {};
    this.current = null;
    this.fadeColor = 255;
    this.fadeAlpha = 0;
    this.fading = false;
    this.nextScreen = null;
    this.fadeSpeed = 8;
  }

  register(name, screen) {
    this.screens[name] = screen;
  }

  switchTo(name, useSmoothTransition) {
  if (useSmoothTransition) {
    this.nextScreen = name;
    this.fading = true;
    this.fadeAlpha = 0;
  } else {
    if (this.current) this.current.onExit();
    this.current = this.screens[name];
    this.current.onEnter();
  }
}

  draw() {
    if (this.current) this.current.draw();

    if (this.fading) {
      this.fadeAlpha += this.fadeSpeed;

      fill(this.fadeColor, this.fadeAlpha);
      noStroke();
      rect(0, 0, width, height);

      if (this.fadeAlpha >= 255) {
        if (this.current) this.current.onExit();
        this.current = this.screens[this.nextScreen];
        this.current.onEnter();
        this.fading = false;
        this.fadeAlpha = 0;
      }
    }
  }

  keyPressed() { if (this.current) this.current.keyPressed(); }

  mousePressed() {
    if (this.fading) return;
    if (this.current) this.current.mousePressed();
  }
}

const manager = new ScreenManager();