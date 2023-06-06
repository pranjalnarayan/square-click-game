import * as React from 'react';
import Square from './Square';

const Row = ({ row, rowInd, onSquareClick }) => {
  const onClickHandler = React.useCallback((sqInd) => {
    onSquareClick(rowInd, sqInd);
  }, []);

  return (
    <div style={{ display: 'flex', marginBottom: '2px' }}>
      {row.map((color, sqInd) => {
        return (
          <Square
            key={sqInd}
            color={color}
            onSquareClick={onClickHandler}
            sqInd={sqInd}
          />
        );
      })}
    </div>
  );
};

export default Row;
