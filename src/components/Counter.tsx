import { useState } from 'react';

import classes from './Counter.module.scss';

export const Counter = () => {
  const [value, setValue] = useState(0);

  const increment = () => {
    setValue((prev) => prev + 1);
  };

  return (
    <div className={classes.btn}>
      <button onClick={increment}>{value}</button>
    </div>
  );
};
