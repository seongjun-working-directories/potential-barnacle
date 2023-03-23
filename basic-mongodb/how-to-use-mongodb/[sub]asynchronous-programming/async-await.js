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

const totalSum = async (a, b) => {
  try {
    let sum1 = await addSum(a, b);
    let sum2 = await addSum(sum1, 15);
    console.log({ sum1, sum2 });
  }
  catch (err) {
    if (err) console.log({ err });
  }
};

totalSum(10, 10);