class SlidePuzzle {
  constructor(gridSize, img, tileSize = 150, onSolved = null) {
    this.gridSize = gridSize;
    this.img = img;
    this.tileSize = tileSize;
    this.onSolved = onSolved;

    // Slice sizes based on original image
    this.sliceW = this.img.width / this.gridSize;
    this.sliceH = this.img.height / this.gridSize;

    this.tiles = [];
    this.blank = { x: gridSize - 1, y: gridSize - 1 };

    // Animation system
    this.animations = [];

    this.createTiles();
    this.shuffle(200);
  }

  createTiles() {
    this.tiles = [];

    for (let y = 0; y < this.gridSize; y++) {
      for (let x = 0; x < this.gridSize; x++) {
        if (x === this.gridSize - 1 && y === this.gridSize - 1) continue;

        this.tiles.push({
          x,
          y,
          correctX: x,
          correctY: y,
          drawX: x * this.tileSize,
          drawY: y * this.tileSize
        });
      }
    }
  }

  shuffle(times) {
    for (let i = 0; i < times; i++) {
      const moves = this.getValidMoves();
      const move = random(moves);
      this.swapTile(move.x, move.y, false);
    }
  }

  getValidMoves() {
    const moves = [];
    const { x, y } = this.blank;

    if (x > 0) moves.push({ x: x - 1, y });
    if (x < this.gridSize - 1) moves.push({ x: x + 1, y });
    if (y > 0) moves.push({ x, y: y - 1 });
    if (y < this.gridSize - 1) moves.push({ x, y: y + 1 });

    return moves;
  }

  swapTile(x, y, animate = true) {
    const tile = this.tiles.find(t => t.x === x && t.y === y);
    if (!tile) return;

    const oldBlank = { ...this.blank };

    // Update blank position
    this.blank.x = tile.x;
    this.blank.y = tile.y;

    // Animate tile movement
    if (animate) {
      this.animations.push({
        tile: tile,
        startX: tile.x * this.tileSize,
        startY: tile.y * this.tileSize,
        endX: oldBlank.x * this.tileSize,
        endY: oldBlank.y * this.tileSize,
        progress: 0
      });
    }

    // Update tile grid position
    tile.x = oldBlank.x;
    tile.y = oldBlank.y;
  }

  handleInput(key) {
    let target = null;

    if (key === "w") target = { x: this.blank.x, y: this.blank.y - 1 };
    if (key === "s") target = { x: this.blank.x, y: this.blank.y + 1 };
    if (key === "a") target = { x: this.blank.x - 1, y: this.blank.y };
    if (key === "d") target = { x: this.blank.x + 1, y: this.blank.y };

    if (!target) return;

    this.swapTile(target.x, target.y);

    if (this.isSolved()) {
      console.log("Puzzle solved!");
      SoundManager.playSfx("testing", 0.7);

      if (this.onSolved) this.onSolved();
    }
  }

  isSolved() {
    return this.tiles.every(t => t.x === t.correctX && t.y === t.correctY);
  }

  updateAnimations() {
    const speed = 0.15;

    this.animations = this.animations.filter(anim => {
      anim.progress += speed;

      if (anim.progress >= 1) {
        anim.tile.drawX = anim.endX;
        anim.tile.drawY = anim.endY;
        return false;
      }

      anim.tile.drawX = lerp(anim.startX, anim.endX, anim.progress);
      anim.tile.drawY = lerp(anim.startY, anim.endY, anim.progress);
      return true;
    });
  }

  draw() {
    this.updateAnimations();

    imageMode(CORNER);

    this.tiles.forEach(tile => {
      const sx = tile.correctX * this.sliceW;
      const sy = tile.correctY * this.sliceH;

      image(
        this.img,
        tile.drawX, tile.drawY, this.tileSize, this.tileSize,
        sx, sy, this.sliceW, this.sliceH
      );
    });

    // Draw blank tile
    fill(50);
    noStroke();
    rect(
      this.blank.x * this.tileSize,
      this.blank.y * this.tileSize,
      this.tileSize,
      this.tileSize
    );
  }
}
