(function(exports) {
  "use strict";
  var GoL = exports.GoL = {};

  function grid(g) {
    return g.map(function(row, y) {
      return row.split('').map(function(col, x) {
        return nextCellState(x + 1, y + 1, g);
      }).join('');
    });
  }
  GoL.grid = grid;

  function around(x, y) {
    return [
      [x-1, y-1], [x, y-1], [x+1, y-1],
      [x-1, y],             [x+1, y],
      [x-1, y+1], [x, y+1], [x+1, y+1]
    ];
  }
  GoL.around = around;

  function getCell(x, y, grid) {
    try {
      return grid[y - 1][x - 1] || '.';
    } catch (e) {
      return '.';
    }
  }
  GoL.getCell = getCell;

  function neighbors(x, y, grid) {
    var cell = getCell(x, y, grid);
    if (!cell) return [];
    return around(x, y).filter(function(coord) {
      try {
        return grid[coord[1] - 1][coord[0] - 1] === 'x';
      } catch (e) {
        return false;
      }
    });
  }
  GoL.neighbors = neighbors;

  function nextCellState(x, y, grid) {
    var state = getCell(x, y, grid),
        nbNeighbors = neighbors(x, y, grid).length;
    return [
      state === 'x' && [2, 3].indexOf(nbNeighbors) !== -1,
      state === '.' && nbNeighbors === 3
    ].some(function(x) {
      return x === true
    }) ? 'x' : '.';
  }
  GoL.nextCellState = nextCellState;

})(this);
