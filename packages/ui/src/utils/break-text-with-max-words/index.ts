export const breakTextWithMaxWords = (text: string, maxWords: number) => {
  const words = (text || "").trim().split(" ").filter(Boolean);
  let word = words.slice(0, maxWords).join(" ");
  if (maxWords < words.length) {
    return word + "...";
  }
  return word;
};
