/* global GoL, chai, describe, it */
var expect = chai.expect;

describe("Game of Life", function() {

  it("should retrieve a cell's state within a grid", function() {
    expect(GoL.getCell(1, 1, ['.'])).to.equal('.');
    expect(GoL.getCell(1, 1, ['x'])).to.equal('x');
    expect(GoL.getCell(1, 1, ['x.', '..'])).to.equal('x');
    expect(GoL.getCell(2, 2, ['xx', 'x.'])).to.equal('.');
    expect(GoL.getCell(99, 99, ['xx', 'x.'])).to.equal('.');
  });

  it("should compute cell's neighbors", function() {
    expect(GoL.neighbors(1, 1, ['..', '..'])).to.deep.equal([]);
    expect(GoL.neighbors(1, 1, ['.x', 'xx'])).to.deep.equal([[2, 1],
                                                             [1, 2],
                                                             [2, 2]]);
    expect(GoL.neighbors(1, 1, ['x.', '..'])).to.deep.equal([]);
    expect(GoL.neighbors(1, 1, ['xx', 'xx'])).to.deep.equal([[2, 1],
                                                             [1, 2],
                                                             [2, 2]]);
    expect(GoL.neighbors(2, 2, ['x.', '.x'])).to.deep.equal([[1, 1]]);
    expect(GoL.neighbors(2, 2, ['...', '.x.', '.x.'])).to.deep.equal([[2, 3]]);
    expect(GoL.neighbors(3, 3, ['x..', '...', '..x'])).to.deep.equal([]);
  });

  it("Any live cell with fewer than two live neighbours dies", function() {
    expect(GoL.nextCellState(1, 1, ['x.', '..'])).to.deep.equal('.');
    expect(GoL.nextCellState(1, 1, ['xx', '..'])).to.deep.equal('.');
    expect(GoL.nextCellState(1, 1, ['x.', 'x.'])).to.deep.equal('.');
    expect(GoL.nextCellState(1, 1, ['x.', '.x'])).to.deep.equal('.');

    expect(GoL.nextCellState(2, 2, ['...', '.x.', '...'])).to.deep.equal('.');
    expect(GoL.nextCellState(2, 2, ['...', '.xx', '...'])).to.deep.equal('.');
    expect(GoL.nextCellState(2, 2, ['...', 'xxx', '...'])).to.deep.equal('x');
    expect(GoL.nextCellState(2, 2, ['.x.', '.x.', '.x.'])).to.deep.equal('x');
  });

  it("Any live cell with two or three live neighbours lives on to the next generation", function() {
    expect(GoL.nextCellState(1, 1, ['xx', 'x.'])).to.deep.equal('x');
    expect(GoL.nextCellState(1, 1, ['xx', 'xx'])).to.deep.equal('x');
    expect(GoL.nextCellState(2, 2, ['.x', 'xx'])).to.deep.equal('x');
  });

  it("Any live cell with more than three live neighbours dies", function() {
    expect(GoL.nextCellState(1, 1, ['xxx', 'xxx', 'xxx'])).to.deep.equal('x');
    expect(GoL.nextCellState(2, 2, ['xxx', 'xxx', 'xxx'])).to.deep.equal('.');
    expect(GoL.nextCellState(2, 2, ['.x.', 'xxx', '.x.'])).to.deep.equal('.');
    expect(GoL.nextCellState(2, 2, ['xx.', 'xxx', '.xx'])).to.deep.equal('.');
  });

  it("Any dead cell with exactly three live neighbours becomes a live cell", function() {
    expect(GoL.nextCellState(1, 1, ['.x.', 'xx.', '...'])).to.deep.equal('x');
    expect(GoL.nextCellState(2, 2, ['.x.', 'x.x', '...'])).to.deep.equal('x');
    expect(GoL.nextCellState(3, 3, ['...', '.xx', '.x.'])).to.deep.equal('x');

    expect(GoL.nextCellState(1, 1, ['xx.', '...', '...'])).to.deep.equal('.');
    expect(GoL.nextCellState(1, 1, ['...', 'xx.', '...'])).to.deep.equal('.');
    expect(GoL.nextCellState(1, 1, ['...', '...', 'xx.'])).to.deep.equal('.');
    expect(GoL.nextCellState(2, 2, ['...', 'x.x', '...'])).to.deep.equal('.');
    expect(GoL.nextCellState(3, 3, ['...', '.xx', '...'])).to.deep.equal('.');
  });

  it("should return an empty grid when the grid is empty", function() {
    expect(GoL.grid(['.'])).to.deep.equal(['.']);
    expect(GoL.grid(['..', '..'])).to.deep.equal(['..', '..']);
    expect(GoL.grid(['...', '...', '...'])).to.deep.equal(['...', '...', '...']);
  });

  it("should kill an isolated cell", function() {
    expect(GoL.grid(['..', '.x'])).to.deep.equal(['..', '..']);
    expect(GoL.grid(['x.', '..'])).to.deep.equal(['..', '..']);
  });

  it("should compute grid's next state", function() {
    expect(GoL.grid(['.'])).to.deep.equal(['.']);
    expect(GoL.grid(['x'])).to.deep.equal(['.']);

    expect(GoL.grid(['xx', 'xx'])).to.deep.equal(['xx', 'xx']);

    expect(GoL.grid(['x..',
                     '...',
                     '...'])).to.deep.equal(
                    ['...',
                     '...',
                     '...']);

    expect(GoL.grid(['xx.',
                     'xx.',
                     '...'])).to.deep.equal(
                    ['xx.',
                     'xx.',
                     '...']);

    expect(GoL.grid(['.x.',
                     'x.x',
                     'x..'])).to.deep.equal(
                    ['.x.',
                     'x..',
                     '.x.']);

    expect(GoL.grid(['.x.x.',
                     'x.x.x',
                     'x...x'])).to.deep.equal(
                    ['.xxx.',
                     'x.x.x',
                     '.x.x.']);
  });

});
