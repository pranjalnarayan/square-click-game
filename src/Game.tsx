import * as React from 'react';
import Row from './Row';

const DEFAULT_COLOR = 'red';
const SELECTED_COLOR = 'green';
const DELAY = 500;

const getInitialState = (rows = []) => {
  const formedState = [];

  rows.forEach((cellCount) => {
    const cells = [];
    for (let i = 0; i < cellCount; i++) {
      cells.push(DEFAULT_COLOR);
    }
    if (cells.length) {
      formedState.push(cells);
    }
  });
  return formedState;
};

const Game = () => {
  const [rows, setRows] = React.useState(getInitialState([3, 1, 3]));
  const countRef = React.useRef([]);
  const undoProgressRef = React.useRef(false);

  const checkAllCompleted = () => {
    const totalSuares = rows.reduce((val, row) => {
      return val + row.length;
    }, 0);

    if (totalSuares === countRef.current.length) {
      undoProgressRef.current = true;
      countRef.current.forEach((square, ind) => {
        setTimeout(() => {
          const { rowInd, sqInd } = square;
          const newRows = [...rows];
          newRows[rowInd][sqInd] = DEFAULT_COLOR;
          setRows(newRows);

          if (ind === totalSuares - 1) {
            countRef.current = [];
            undoProgressRef.current = false;
          }
        }, DELAY * (ind + 1));
      });
    }
  };

  const pushStep = (rowInd, sqInd) => {
    countRef.current.push({
      rowInd,
      sqInd,
    });
    checkAllCompleted();
  };

  const removeStep = (rowInd, sqInd) => {
    if (countRef.current && countRef.current.length) {
      countRef.current = countRef.current.filter((square) => {
        return !(square.rowInd === rowInd && square.sqInd === sqInd);
      });
    }
  };

  const onSquareClick = React.useCallback((rowInd, sqInd) => {
    if (undoProgressRef.current) {
      return;
    }
    const newRows = [...rows];
    const isSlected = newRows[rowInd][sqInd] === SELECTED_COLOR;
    newRows[rowInd][sqInd] = isSlected ? DEFAULT_COLOR : SELECTED_COLOR;
    setRows(newRows);
    if (!isSlected) {
      pushStep(rowInd, sqInd);
    } else {
      removeStep(rowInd, sqInd);
    }
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map((squares, rowInd) => (
        <Row
          key={rowInd}
          row={squares}
          rowInd={rowInd}
          onSquareClick={onSquareClick}
        />
      ))}
    </div>
  );
};

export default Game;
