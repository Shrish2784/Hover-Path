class Cell {
  constructor(i, j, w) {
    this.i = i;
    this.j = j;
    this.w = w;
    this.x = j * w;
    this.y = i * w;
    this.walls = [true, true, true, true];
    this.traversed = false;
  }

  display() {
    strokeWeight(5);
    stroke(0, 80, 80);
    if (this.walls[0] == true) line(this.x + 2         , this.y + 2         , this.x + 2 + this.w, this.y + 2);
    if (this.walls[1] == true) line(this.x + 2 + this.w, this.y + 2         , this.x + 2 + this.w, this.y + 2 + this.w);
    if (this.walls[2] == true) line(this.x + 2 + this.w, this.y + 2 + this.w, this.x + 2         , this.y + 2 + this.w);
    if (this.walls[3] == true) line(this.x + 2         , this.y + 2 + this.w, this.x + 2         , this.y + 2);
  }

  show() {
    fill(100, 100, 100);
    rect(this.x, this.y, w, w);
  }

  removeWalls(cell1, cell2) {
    if (cell2.i > cell1.i) {
      cell2.walls[0] = false;
      cell1.walls[2] = false;
    } else if (cell2.i < cell1.i) {
      cell2.walls[2] = false;
      cell1.walls[0] = false;
    } else if (cell2.j > cell1.j) {
      cell2.walls[3] = false;
      cell1.walls[1] = false;
    } else if (cell2.j < cell1.j) {
      cell2.walls[1] = false;
      cell1.walls[3] = false;
    }
  }

  removeStartWalls() {
    this.walls[0] = false;
    this.walls[3] = false;
  }

  removeEndWalls() {
    this.walls[1] = false;
    this.walls[2] = false;
  }
}
