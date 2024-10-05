const checkNan = (r, g, b) => {
  if (isNaN(r) || isNaN(g) || isNaN(b)) {
    return null;
  }
  return { r, g, b };
};

export const hexToRgb = (color) => {
  if (typeof color !== "string") {
    return null;
  }
  if (!color.length) {
    return null;
  }
  if (!color.startsWith("#") && color.length === 3) {
    const r = parseInt(color[0], 16);
    const g = parseInt(color[1], 16);
    const b = parseInt(color[2], 16);
    return checkNan(r, g, b);
  } else if (!color.startsWith("#") && color.length === 6) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return checkNan(r, g, b);
  } else if (color.startsWith("#") && color.length === 4) {
    const r = parseInt(color[1], 16);
    const g = parseInt(color[2], 16);
    const b = parseInt(color[3], 16);
    return checkNan(r, g, b);
  } else if (color.startsWith("#") && color.length === 7) {
    const r = parseInt(color.slice(1, 3), 16);
    const g = parseInt(color.slice(3, 5), 16);
    const b = parseInt(color.slice(5, 7), 16);
    return checkNan(r, g, b);
  } else {
    return null;
  }
};

function luminance(r, g, b) {
  const RED = 0.2126;
  const GREEN = 0.7152;
  const BLUE = 0.0722;

  const GAMMA = 2.4;
  var a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, GAMMA);
  });
  return a[0] * RED + a[1] * GREEN + a[2] * BLUE;
}

export const contrast = (rgb1, rgb2) => {
  var lum1 = luminance(rgb1.r, rgb1.g, rgb1.b);
  var lum2 = luminance(rgb2.r, rgb2.g, rgb2.b);
  var brightest = Math.max(lum1, lum2);
  var darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

export const maxContrast = (background, rgb1, rgb2) => {
  const contrast1 = contrast(rgb1, background);
  const contrast2 = contrast(rgb2, background);
  if (contrast1 > contrast2) {
    return 1;
  }
  return 0;
};
