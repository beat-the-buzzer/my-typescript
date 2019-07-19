{
  const valueList = [123, 'abc'];
  const getRandomValue = () => {
    const number = Math.random() * 10; // 取一个0到10范围内的随机值
    if (number < 5) {
      return valueList[0];
    } else {
      return valueList[1];
    }
  }
  const item = getRandomValue();
  if (item.length != null) {
    console.log(item.length);
  } else {
    console.log(item.toFixed());
  }
}