/*Find row, col of an unassigned cell*/
//If there is none, return true
//For digits from 1 to 9
//a) If there is no conflict for digit at row, col
//assign digit to row, col and recursively try fill in rest of grid
//b) If recursion successful, return true
//c) Else, remove digit and try another
/*If all digits have been tried and nothing worked, return false*/
class Sudoku {
  constructor(grid) {
    this.grid = grid;
  }

  sudoku() {
    var filled = this.isGridFilled();
    var row, col;
    if (filled == true) return true;
    else [row, col] = filled;
    var number;
    for (number = 1; number <= 9; number++) {
      if (this.isSafe(row, col, number)) {
        this.grid[row][col] = number;
        if (this.sudoku()) {
          return true;
        } else {
          this.grid[row][col] = 0;
        }
      }
    }
    return false;
  }

  isGridFilled() {
    var row, col;
    for (row = 0; row < this.grid.length; row++) {
      for (col = 0; col < this.grid[0].length; col++) {
        if (this.grid[row][col] == 0) {
          return [row, col];
        }
      }
    }
    return true;
  }

  isSafe(row, col, number) {
    return (
      this.isSafeRow(row, number) &&
      this.isSafeCol(col, number) &&
      this.isSafeBox(row - (row % 3), col - (col % 3), number)
    );
  }

  isSafeCol(col, number) {
    for (let i = 0; i < this.grid.length; i++) {
      if (this.grid[i][col] == number) {
        return false;
      }
    }
    return true;
  }

  isSafeRow(row, number) {
    for (let i = 0; i < this.grid[0].length; i++) {
      if (this.grid[row][i] == number) {
        return false;
      }
    }
    return true;
  }

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

input = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0],
];
sudoku = new Sudoku(input);
result = sudoku.sudoku();
console.log(sudoku.grid);
