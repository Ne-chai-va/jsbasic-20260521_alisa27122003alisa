function checkSpam(str) {
  const strLowercase = str.toLowerCase();
  return strLowercase.includes("1xbet") || strLowercase.includes("xxx")
    ? true
    : false;
}
