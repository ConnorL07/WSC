class ColorScreen {
  constructor({ title, color, textColor = 255, links = [] }) {
    this.title = title;
    this.color = color;
    this.textColor = textColor;
    this.links = links;
    this.buttons = [];
    this.buttonWidth = 180;
    this.buttonHeight = 36;
    this.buttonGap = 14;
  }

  onEnter() {
    this.createButtons();
    this.layoutButtons();
  }

  onExit() {
    this.destroyButtons();
  }

  resize() {
    this.layoutButtons();
  }

  render() {
    background(this.color[0], this.color[1], this.color[2]);

    fill(this.textColor);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(42);
    text(this.title, width / 2, height * 0.32);
  }

  createButtons() {
    this.buttons = this.links.map((link) => {
      const button = createButton(link.label);
      button.size(this.buttonWidth, this.buttonHeight);
      button.mousePressed(() => {
        this.manager.setScreen(link.target);
      });
      return button;
    });
  }

  layoutButtons() {
    if (!this.buttons.length) {
      return;
    }

    const totalHeight = this.buttons.length * this.buttonHeight + (this.buttons.length - 1) * this.buttonGap;
    const left = Math.round((width - this.buttonWidth) / 2);
    const top = Math.round(height * 0.52 - totalHeight / 2);

    for (let i = 0; i < this.buttons.length; i += 1) {
      const y = top + i * (this.buttonHeight + this.buttonGap);
      this.buttons[i].position(left, y);
    }
  }

  destroyButtons() {
    for (const button of this.buttons) {
      button.remove();
    }
    this.buttons = [];
  }
}

function createDemoScreens(manager) {
  manager.register(
    "home",
    new ColorScreen({
      title: "Home Screen",
      color: [35, 78, 112],
      links: [
        { label: "Go To Red", target: "red" },
        { label: "Go To Green", target: "green" },
        { label: "Go To Gold", target: "gold" }
      ]
    })
  );

  manager.register(
    "red",
    new ColorScreen({
      title: "Red Screen",
      color: [175, 48, 52],
      links: [
        { label: "Go To Home", target: "home" },
        { label: "Go To Green", target: "green" },
        { label: "Go To Gold", target: "gold" }
      ]
    })
  );

  manager.register(
    "green",
    new ColorScreen({
      title: "Green Screen",
      color: [46, 125, 50],
      links: [
        { label: "Go To Home", target: "home" },
        { label: "Go To Red", target: "red" },
        { label: "Go To Gold", target: "gold" }
      ]
    })
  );

  manager.register(
    "gold",
    new ColorScreen({
      title: "Gold Screen",
      color: [245, 176, 65],
      textColor: 24,
      links: [
        { label: "Go To Home", target: "home" },
        { label: "Go To Red", target: "red" },
        { label: "Go To Green", target: "green" }
      ]
    })
  );
}
