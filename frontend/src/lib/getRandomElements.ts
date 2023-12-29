export function getRandomElements<T>(array: T[], numElements: number): T[] {
  // Make a copy of the original array to avoid modifying it
  const copyArray = array.slice();

  // Shuffle the array (Fisher-Yates algorithm)
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }

  // Return the first `numElements` elements
  return copyArray.slice(0, numElements);
}
