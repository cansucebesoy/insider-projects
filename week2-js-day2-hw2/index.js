function collatzSeq(limit) {
  let maxLength = 0;
  let longestStartingNumber = 0;

  for (let i = 1; i < limit; i++) {
    let n = i;
    let count = 0;
    while (n !== 1) {
      n = n % 2 === 0 ? n / 2 : 3 * n + 1;
      count++;
    }
    if (count > maxLength) {
      maxLength = count;
      longestStartingNumber = i;
    }
  }
  return longestStartingNumber;
}
console.log(collatzSeq(1000000));
