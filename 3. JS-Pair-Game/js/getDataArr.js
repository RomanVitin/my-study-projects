export default function getDataArr(amount) {
  const dataArr = [];
  let j;
  let temp;
  for (let i = 1; i <= amount / 2; ++i) {
    dataArr.push([i]);
    dataArr.push([i]);
  }
  for (let i = dataArr.length - 1; i > 0; --i) {
    j = Math.floor(Math.random() * (i + 1));
    temp = dataArr[j];
    dataArr[j] = dataArr[i];
    dataArr[i] = temp;
  }
  return dataArr;
}
