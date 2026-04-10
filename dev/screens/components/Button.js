class Button {
  constructor(x, y, w, h, img) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.img = img;
  }

  draw() {
    imageMode(CENTER);
    image(this.img, this.x, this.y, this.w, this.h);
  }

  isClicked() {
    return (
      mouseX > this.x && mouseX < this.x + this.w &&
      mouseY > this.y && mouseY < this.y + this.h
    );
  }
}