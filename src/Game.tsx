import * as React from 'react';
import Row from './Row';

const DEFAULT_COLOR = 'red';
const SELECTED_COLOR = 'green';

const Game = () => {
  const [rows, setRows] = React.useState([
    [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR],
    [DEFAULT_COLOR],
    [DEFAULT_COLOR, DEFAULT_COLOR, DEFAULT_COLOR],
  ]);

  const onSquareClick = React.useCallback((rowInd, sqInd) => {
    const newRows = [...rows];
    newRows[rowInd][sqInd] = SELECTED_COLOR;
    setRows(newRows);
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
