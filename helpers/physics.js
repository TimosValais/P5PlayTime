export function velocityPerFrame(startingVelocity, accelaration) {
  return startingVelocity + accelaration;
}

export function isHexColorLight(color) {
  let hex = color.replace("#", "");
  let c_r = parseInt(hex.substr(0, 2), 16);
  let c_g = parseInt(hex.substr(2, 2), 16);
  let c_b = parseInt(hex.substr(4, 2), 16);
  let brightness = (c_r * 299 + c_g * 587 + c_b * 114) / 1000;
  return brightness > 155;
}

export function isRGBLight(color) {
  let brightness =
    (color.red * 299 + color.green * 587 + color.blue * 114) / 1000;
  return brightness > 155;
}
