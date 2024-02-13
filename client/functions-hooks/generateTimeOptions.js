export const generateTimeOptions = () => {
  const options = [];
  for(let i = 0; i < 24; i++) {
    for(let j = 0; j < 60; j += 30) {
      const hours = i < 10 ? `0${i}` : i;
      const minutes = j < 10 ? `0${j}` : j;
      options.push(`${hours}:${minutes}`);
    }
  }
  return options;
};