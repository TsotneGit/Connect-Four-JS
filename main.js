let cells = document.querySelectorAll(".cell");
let reset_button = document.getElementById("reset");
let temp = [[], [], [], [], [], [], []];
let turn = "r";
let overflows = [6, 6, 6, 6, 6, 6, 6];
let winner = "";
let move = 0;

let board = [
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
  [".", ".", ".", ".", ".", ".", "."],
];

for (let i = 0; i < cells.length; i++) {
  temp[i % 7].push(cells[i]);
}

cells = temp;

for (let i = 0; i < cells.length; i++) {
  for (let j = 0; j < cells[i].length; j++) {
    cells[i][j].addEventListener("click", function () {
      let col = i;
      if (overflows[col] == 0) {
        Swal.fire({
          icon: "error",
          title: "This column is full!",
        });
      } else {
        overflows[col]--;
        let marker = document.createElement("div");
        marker.className = `marker-${turn}`;
        cells[col][overflows[col]].appendChild(marker);
        make_move(col);
      }
    });
  }
}

function change_styles() {
  if (turn == "r") {
    cells.forEach((col) => {
      col.forEach((cell) => {
        cell.addEventListener("mouseover", function () {
          cell.style.backgroundColor = "red";
        });

        cell.addEventListener("mouseleave", function () {
          cell.style.backgroundColor = "white";
        });
      });
    });
  } else {
    cells.forEach((col) => {
      col.forEach((cell) => {
        cell.addEventListener("mouseover", function () {
          cell.style.backgroundColor = "yellow";
        });

        cell.addEventListener("mouseleave", function () {
          cell.style.backgroundColor = "white";
        });
      });
    });
  }
}

change_styles();

function reset() {
  winner = "";
  board = [
    [".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", "."],
  ];
  move = 0;
  turn = "r";
  overflows = [6, 6, 6, 6, 6, 6, 6];
  cells.forEach((col) => {
    col.forEach((cell) => {
      cell.innerHTML = "";
    });
  });
}

function make_move(col) {
  if (move == 42) {
    Swal.fire({
      icon: "info",
      title: "It's a draw!",
    });
    reset();
    return;
  }
  if (turn == "r") {
    turn = "y";
  } else {
    turn = "r";
  }
  change_styles();
  console.log(col);
  if (turn == "r") {
    board[overflows[col]][col] = "y";
  } else {
    board[overflows[col]][col] = "r";
  }
  if (check_winner()) {
    if (winner == "y") {
      Swal.fire({
        icon: "success",
        title: "Red Won!",
      });
    } else {
      Swal.fire({
        icon: "success",
        title: "Yellow Won!",
      });
    }
    reset();
  }
  move++;
}

function check_winner() {
  for (let row = 0; row < 6; row++) {
    let counter = 0;
    let last = "";
    let first_row = 0;
    let first_col = 0;
    for (let col = 0; col < 7; col++) {
      if (board[row][col] != ".") {
        if (last != "") {
          if (last == board[row][col]) {
            counter++;
          } else {
            counter = 1;
            last = board[row][col];
            first_row = row;
            first_col = col;
          }
        } else {
          last = board[row][col];
          counter++;
          first_row = row;
          first_col = col;
        }
      } else {
        counter = 0;
        last = "";
        first_row = row;
        first_col = col;
      }
      if (counter == 4) {
        winner = turn;
        return [row, col, first_row, first_col];
      }
    }
  }

  for (let col = 0; col < 7; col++) {
    let counter = 0;
    let last = "";
    let first_row = 0;
    let first_col = 0;
    for (let row = 0; row < 6; row++) {
      if (board[row][col] != ".") {
        if (last != "") {
          if (last == board[row][col]) {
            counter++;
          } else {
            counter = 1;
            last = board[row][col];
            first_row = row;
            first_col = col;
          }
        } else {
          last = board[row][col];
          counter++;
          first_row = row;
          first_col = col;
        }
      } else {
        counter = 0;
        last = "";
        first_row = row;
        first_col = col;
      }
      if (counter == 4) {
        winner = turn;
        return [row, col, first_row, first_col];
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 4; col++) {
      if (
        board[row][col] == board[row + 1][col + 1] &&
        board[row + 1][col + 1] == board[row + 2][col + 2] &&
        board[row + 1][col + 1] == board[row + 3][col + 3] &&
        board[row][col] != "."
      ) {
        console.log("NO");

        winner = turn;
        return [row + 3, col + 3, row, col];
      }
    }
  }

  for (let row = 0; row < 3; row++) {
    for (let col = 3; col < 7; col++) {
      if (
        board[row][col] == board[row + 1][col - 1] &&
        board[row + 1][col - 1] == board[row + 2][col - 2] &&
        board[row + 1][col - 1] == board[row + 3][col - 3] &&
        board[row][col] != "."
      ) {
        console.log("YES");
        winner = turn;
        return [row + 3, col - 3, row, col];
      }
    }
  }
}

reset_button.addEventListener("click", () => {
  reset();
});
