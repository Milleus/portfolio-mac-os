export const convertRemToPixels = (rem: number): number => {
  const fontSize = getComputedStyle(document.documentElement).fontSize;

  return rem * parseFloat(fontSize);
};
