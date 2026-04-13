class SlidePuzzle {
  constructor(gridSize, img, tileSize = 150) {
    this.gridSize = gridSize;
    this.img = img;
    this.tileSize = tileSize;

    this.tiles = [];
    this.blank = { x: gridSize - 1, y: gridSize - 1 };

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
          correctY: y
        });
      }
    }
  }

  shuffle(times) {
    for (let i = 0; i < times; i++) {
      const moves = this.getValidMoves();
      const move = random(moves);
      this.moveTile(move.x, move.y);
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

  moveTile(x, y) {
    const tile = this.tiles.find(t => t.x === x && t.y === y);
    if (!tile) return;

    const oldBlank = { ...this.blank };
    this.blank.x = tile.x;
    this.blank.y = tile.y;

    tile.x = oldBlank.x;
    tile.y = oldBlank.y;
  }

  handleInput(key) {
    let target = null;

    if (key === "w") target = { x: this.blank.x, y: this.blank.y + 1 };
    if (key === "s") target = { x: this.blank.x, y: this.blank.y - 1 };
    if (key === "a") target = { x: this.blank.x + 1, y: this.blank.y };
    if (key === "d") target = { x: this.blank.x - 1, y: this.blank.y };

    if (!target) return;

    this.moveTile(target.x, target.y);

    if (this.isSolved()) {
      console.log("Puzzle solved!");
      SoundManager.playSfx("testing", 0.7);
    }
  }

  isSolved() {
    return this.tiles.every(t => t.x === t.correctX && t.y === t.correctY);
  }

  draw() {
    imageMode(CORNER);

    this.tiles.forEach(tile => {
      const sx = tile.correctX * this.tileSize;
      const sy = tile.correctY * this.tileSize;
      const dx = tile.x * this.tileSize;
      const dy = tile.y * this.tileSize;

      image(
        this.img,
        dx, dy, this.tileSize, this.tileSize,
        sx, sy, this.tileSize, this.tileSize
      );
    });

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
