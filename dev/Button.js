class Button {
    constructor(img, xWidth, yHeight, xSize, ySize, onClick) {
        this.img = img
        this.xWidth = xWidth;
        this.yHeight = yHeight;
        this.xSize = xSize;
        this.ySize = ySize;
        this.onClick = onClick;
    }
    display() {
        imageMode(CENTER);
        image(this.img, this.xWidth, this.yHeight, this.xSize, this.ySize);
      }
    
      isHovered() {
        return (
          mouseX > this.xWidth - this.xSize / 2 &&
          mouseX < this.xWidth + this.xSize / 2 &&
          mouseY > this.yHeight - this.ySize / 2 &&
          mouseY < this.yHeight + this.ySize / 2
        );
      }
    
      handleClick() {
        if (this.isHovered()) {
          this.onClick();
        }
      }
  }