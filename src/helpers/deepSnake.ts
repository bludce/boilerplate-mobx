import snakeCase from 'lodash.snakecase';

const deepSnake = <T = Record<string | number, any> | any[]>(entry: T) => {
  let copy: T;

  if (Array.isArray(entry)) {
    // @ts-ignore
    copy = [...entry];
  } else if (entry === null) {
    // @ts-ignore
    copy = null;
  } else {
    copy = { ...entry };
  }

  for (const key in copy) {
    const newKey = snakeCase(key);
    const temp = copy[key];

    delete copy[key];
    (copy as Record<string | number, any>)[newKey] = temp;

    if (typeof (copy as Record<string | number, any>)[newKey] === 'object') {
      (copy as Record<string | number, any>)[newKey] = deepSnake(
        (copy as Record<string | number, any>)[newKey]
      );
    }
  }

  return copy;
};

export default deepSnake;
