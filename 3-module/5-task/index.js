function getMinMax(str) {
  const splitNumbers = str.split(" ");
  const filteredNumbers = splitNumbers
    .map((item) => Number(item))
    .filter((num) => !isNaN(num));

  let result = {};
  result.min = Math.min(...filteredNumbers);
  result.max = Math.max(...filteredNumbers);

  return result;
}
