let sudoku;

const table = document.getElementById('sudoku');
const solveButton = document.getElementById('button');
const resetButton = document.getElementById('reset');

function xor(x, y) {
  return (x && !y) || (!x && y);
}

function createInput(row, col) {
  let x = document.createElement('input');
  x.setAttribute('type', 'text');
  x.setAttribute('data-row', row);
  x.setAttribute('data-col', col);
  x.style.width = '15px';
  x.addEventListener('input', ($event) => {
    const value = parseInt($event.data);
    sudoku.check(row, col, value);
  });
  return x;
}

function generateTable(table, grid) {
  table.innerHTML = '';
  for (let [i, row] of grid.entries()) {
    let r = table.insertRow();
    for (let [j, element] of row.entries()) {
      let cell = r.insertCell();
      let text = document.createElement('div');
      if (element == 0) {
        text.appendChild(createInput(i, j));
      } else {
        text.innerHTML = element;
      }
      if (xor(parseInt(j / 3) == 1, parseInt(i / 3) == 1)) {
        cell.style.background = 'black';
        text.style.color = 'white';
      } else {
        cell.style.background = 'grey';
      }
      cell.style.fontWeight = '900';
      cell.appendChild(text);
    }
  }
}

function onChange() {
  solveButton.addEventListener('click', () => {
    sudoku.solve();
    generateTable(table, sudoku.grid);
  });
  resetButton.addEventListener('click', () => {
    sudoku.generate();
    generateTable(table, sudoku.grid);
  });
}

function onLoad() {
  sudoku = new Sudoku();
  const easy = document.getElementById('easy').checked;
  const medium = document.getElementById('medium').value;
  const hard = document.getElementById('hard').checked;
  sudoku.generate(parseInt(medium));
  generateTable(table, sudoku.grid);
  onChange();
}
