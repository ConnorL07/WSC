class ButtonManager {
    constructor() {
        this.buttons = []
    }

    add(button) {
        this.buttons.push(button);
    }

    display() {
        console.log(this.buttons)
        this.buttons.forEach(button => button.display());
    }

    handleClick() {
        this.buttons.forEach(button => button.handleClick());
    }

    clear() {
        this.buttons = [];
    }
      
}