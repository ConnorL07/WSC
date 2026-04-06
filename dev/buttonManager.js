class ButtonManager {
    constructor() {
        this.buttons = []
    }

    add(button) {
        this.buttons.push(button);
    }

    display() {
        this.buttons.forEach(button => button.display());
    }

    handleClick() {
        this.buttons.forEach(button => button.handleClick());
    }

    clear() {
        this.buttons = [];
    }
      
}
//constructor(img, x, y, w, h, onClick) { ... }