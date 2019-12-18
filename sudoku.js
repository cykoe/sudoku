/**
 * Class represents a Sudoku
 */
class Sudoku {
  /**
   * Create a Sudoku
   */
  constructor() {
    this.numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  }

  /**
   * randomize the item on the array
   * @param {Array<number>} array
   */
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  /**
   * solve the sudoku
   * [rrow, rcol] forbids <value>
   * @param {number} rrow
   * @param {number} rcol
   * @param {number} value
   * @return {boolean} - whether the sudoku is solvable
   */
  solve(rrow, rcol, value) {
    const filled = this.isGridFilled();
    let row;
    let col;
    if (filled == true) return true;
    else [row, col] = filled;
    let number;
    for (number of this.numbers) {
      if (row == rrow && col == rcol && number == value) {
        continue;
      }
      if (this.isSafe(row, col, number)) {
        this.grid[row][col] = number;
        if (this.solve(rrow, rcol, value)) {
          return true;
        } else {
          this.grid[row][col] = 0;
        }
      }
    }
    return false;
  }

  /**
   * Create an empty board
   */
  empty() {
    this.grid = new Array(9);
    this.shuffle(this.numbers);
    for (let i = 0; i < 9; i++) {
      this.grid[i] = new Array(9);
      for (let j = 0; j < 9; j++) {
        this.grid[i][j] = 0;
      }
    }
  }

  /**
   * generate a random sudoku board
   * @param {number} emptyBoxNum - number of empty boxes to start
   */
  generate(emptyBoxNum = 50) {
    this.empty();
    this.solve();
    this.cloned = _.cloneDeep(this.grid);
    this.solved = _.cloneDeep(this.grid);
    let count = emptyBoxNum;
    while (count > 0) {
      const ranRow = Math.floor(Math.random() * 9);
      const ranCol = Math.floor(Math.random() * 9);
      this.grid = _.cloneDeep(this.cloned);
      const originalVal = this.grid[ranRow][ranCol];
      this.grid[ranRow][ranCol] = 0;
      if (this.solve(ranRow, ranCol, originalVal)) {
        this.grid[ranRow][ranCol] = originalVal;
        continue;
      }
      this.cloned[ranRow][ranCol] = 0;
      count--;
    }
    this.grid = this.cloned;
  }

  /**
   * check if the sudoku is completed
   * @param {number} row
   * @param {number} col
   * @param {number} value
   */
  check(row, col, value) {
    this.grid[row][col] = value;
    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        if (this.solved[i][j] != this.grid[i][j]) {
          return;
        }
      }
    }
    alert('congrats!');
  }

  /**
   * determine if the grid is full
   * @return {boolean|[number, number]} return a position if not full
   */
  isGridFilled() {
    let row;
    let col;
    for (row = 0; row < this.grid.length; row++) {
      for (col = 0; col < this.grid[0].length; col++) {
        if (this.grid[row][col] == 0) {
          return [row, col];
        }
      }
    }
    return true;
  }

  /**
   * determine if the current number is safe to put at [row,col]
   * @param {number} row
   * @param {number} col
   * @param {number} number
   * @return {boolean} true if safe, false otherwise
   */
  isSafe(row, col, number) {
    return (
      this.isSafeRow(row, number) &&
      this.isSafeCol(col, number) &&
      this.isSafeBox(row - (row % 3), col - (col % 3), number)
    );
  }

  /**
   * helper function
   * @param {number} col
   * @param {number} number
   * @return {boolean}
   */
  isSafeCol(col, number) {
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][col] == number) {
        return false;
      }
    }
    return true;
  }

  /**
   * helper function
   * @param {number} row
   * @param {number} number
   * @return {boolean}
   */
  isSafeRow(row, number) {
    for (let i = 0; i < this.grid[0].length; i++) {
      if (this.grid[row][i] == number) {
        return false;
      }
    }
    return true;
  }

  /**
   * helper function
   * @param {number} row
   * @param {number} col
   * @param {number} number
   * @return {boolean}
   */
  isSafeBox(row, col, number) {
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.grid[row + i][col + j] == number) {
          return false;
        }
      }
    }
    return true;
  }
}
