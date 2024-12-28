export const swapArrayElements = <T>(
  arr: T[],
  index1: number,
  index2: number
): T[] => {
  const temp = arr[index1];
  arr[index1] = arr[index2];
  arr[index2] = temp;
  return arr;
};
