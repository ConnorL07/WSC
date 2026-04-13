class GameScreen extends Screen {
  constructor(levelId = 1) {
    super();
    this.levelId = levelId;
  }

  onEnter() {
    SoundManager.playMusic("bgmusic", 0.5);

    const level = Levels.find(l => l.id === this.levelId);

    this.puzzle = new SlidePuzzle(
      level.grid,
      Assets.levelImages[level.id],
      150
    );
  }

  draw() {
    imageMode(CORNER);
    image(Assets.backgroundImg, 0, 0, width, height);

    push();
    translate(
      width / 2 - (this.puzzle.gridSize * this.puzzle.tileSize) / 2,
      height / 2 - (this.puzzle.gridSize * this.puzzle.tileSize) / 2
    );
    this.puzzle.draw();
    pop();
  }

  keyPressed() {
    this.puzzle.handleInput(key);
  }
}
