export const rotateListings = (list, max = 4) => {
  const weekIndex = Math.floor(Date.now() / (1000 * 60 * 60 * 24 * 7));
  const start = (weekIndex * max) % list.length;
  return list.slice(start, start + max).concat(
    start + max > list.length ? list.slice(0, (start + max) % list.length) : []
  );
}; 