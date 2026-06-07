function camelize(str) {
  const parts = str.split("-");
  const firstWord = parts[0];
  const camelCase =
    firstWord +
    parts
      .slice(1)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join("");
  return camelCase;
}
