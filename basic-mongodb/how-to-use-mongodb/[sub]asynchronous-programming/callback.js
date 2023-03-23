const addSum = (a, b, callback) => {
  setTimeout(() => {
    if (typeof a !== 'number' || typeof b !== 'number') {
      return callback('a, b must be numbers');
    }
    callback(undefined, a + b);
  }, 1000);
};

let callback = (err, sum) => {
  if (err) return console.log({ err });
  console.log({ sum });
};

// [TEST]
addSum(10, 'something', callback);

// [TEST]
addSum(10, 20, callback);

// callback hell
addSum(10, 10, (err1, sum1) => {
  if (err1) return console.log({ err1 });
  console.log({ sum1 });
  addSum(sum1, 15, (err2, sum2) => {
    if (err2) return console.log({ err2 });
    console.log({ sum2 });
  });
});