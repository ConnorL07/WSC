class ScreenManager {
  constructor() {
    this.screens = new Map();
    this.currentKey = null;
    this.currentScreen = null;
  }

  register(key, screen) {
    if (key.length === 0) {
        console.log('nuh uh uh, that is a bad key');
    }

    screen.manager = this;
    this.screens.set(key, screen);
    return this;
  }

  remove(key) {
    const screen = this.screens.get(key);
    if (!screen) {
      return false;
    }

    if (this.currentKey === key) {
      screen.onExit?.();
      this.currentKey = null;
      this.currentScreen = null;
    }

    this.screens.delete(key);
    return true;
  }

  setScreen(key, data) {
    const next = this.screens.get(key);
    if (!next) {
      throw new Error(`Screen "${key}" is not registered.`);
    }

    this.currentScreen?.onExit?.();

    this.currentKey = key;
    this.currentScreen = next;

    this.currentScreen.onEnter?.(data);
  }

  update(dt) {
    this.currentScreen?.update?.(dt);
  }

  render() {
    this.currentScreen?.render?.();
  }

  resize(w, h) {
    this.currentScreen?.resize?.(w, h);
  }

  mousePressed() {
    this.currentScreen?.mousePressed?.();
  }

  keyPressed() {
    this.currentScreen?.keyPressed?.();
  }
}
