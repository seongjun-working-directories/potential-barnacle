const addSum = (a, b) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (typeof a !== 'number' || typeof b !== 'number') {
        rej('a, b must be numbers');
      }
      res(a + b);
    }, 1000);
  });
};

addSum(10, 20)
  .then((sum) => console.log({ sum }))
  .catch((err) => console.log({ err }));

// promise chain
addSum(10, 10)
  .then((sum1) => addSum(sum1, 15))
  .then((sum2) => console.log({ sum2 }))
  .catch((err) => console.log({ err }));