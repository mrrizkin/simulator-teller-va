export const number = (len: number) => {
  let numbers = "0123456789";
  return Array(len)
    .fill(0)
    .map(() => numbers[Math.floor(Math.random() * numbers.length)])
    .join("");
};
