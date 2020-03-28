function stringToRgba(colorString) {
  return colorString
    .split(" ")
    .join("")
    .replace("rgb(", "")
    .replace("rgba(", "")
    .replace(")", "")
    .split(",");
}

function rgba(colorString, alpha) {
  const colorArray = stringToRgba(colorString);
  return `rgba(${colorArray[0]}, ${colorArray[1]}, ${colorArray[2]}, ${alpha})`;
}

export default rgba;
