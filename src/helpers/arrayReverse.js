export default function (arrayParam) {
  const newArray = [...arrayParam];
  return newArray.sort((a, b) => b.id - a.id);
}
