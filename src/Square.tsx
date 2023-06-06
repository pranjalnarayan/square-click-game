import * as React from 'react';

const Square = ({ color, onSquareClick, sqInd }) => {
  const onClickHandler = React.useCallback(() => {
    onSquareClick(sqInd);
  }, []);
  return (
    <div
      style={{
        backgroundColor: color,
        width: '50px',
        height: '50px',
        marginRight: '2px',
      }}
      onClick={onClickHandler}
    ></div>
  );
};

export default Square;
