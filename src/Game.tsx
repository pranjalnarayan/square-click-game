import * as React from 'react';
import Row from './Row';

const DEFAULT_COLOR = 'red';
const SELECTED_COLOR = 'green';
const DELAY = 500;

const Game = () => {
  const [rows, setRows] = React.useState([
    [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR],
    [DEFAULT_COLOR],
    [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR],
  ]);
  const countRef = React.useRef([]);

  const checkAllCompleted = () => {
    const totalSuares = rows.reduce((val, row) => {
      return val + row.length;
    }, 0);

    if (totalSuares === countRef.current.length) {
      countRef.current.forEach((square, ind) => {
        setTimeout(() => {
          const { rowInd, sqInd } = square;
          const newRows = [...rows];
          newRows[rowInd][sqInd] = DEFAULT_COLOR;
          setRows(newRows);
        }, DELAY * (ind + 1));
      });
    }
  };

  const onSquareClick = React.useCallback((rowInd, sqInd) => {
    const newRows = [...rows];
    newRows[rowInd][sqInd] = SELECTED_COLOR;
    setRows(newRows);
    countRef.current.push({
      rowInd,
      sqInd,
    });
    checkAllCompleted();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {rows.map((squares, rowInd) => (
        <Row row={squares} rowInd={rowInd} onSquareClick={onSquareClick} />
      ))}
    </div>
  );
};

export default Game;
