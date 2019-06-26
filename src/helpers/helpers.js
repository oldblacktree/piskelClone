// Take hexRgba function from 'https://stackoverflow.com/questions/21646738/convert-hex-to-rgba'
// const hexToRgbA = function (hex) {
//   let c;
//   if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
//     c = hex.substring(1).split('');
//     if (c.length == 3) {
//       c = [c[0], c[0], c[1], c[1], c[2], c[2]];
//     }
//     c = `0x${c.join('')}`;
//     return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},1)`;
//   }
//   throw new Error('Bad Hex');
// };

// const rgbaArr = function (rgbaStr) {
//   // "rgba(255, 255, 255, 1)" => [255, 255, 255, 1]
//   return rgbaStr.match(/([0-9]+\.?[0-9]*)/g).map(item => +item);
// };

const hexToRgbA = (hex) => {
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length === 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = `0x${c.join('')}`;
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',')},1)`;
  }
  throw new Error('Bad Hex');
};

const rgbaArr = (rgbaStr) => {
  // "rgba(255, 255, 255, 1)" => [255, 255, 255, 1]
  rgbaStr.match(/([0-9]+\.?[0-9]*)/g).map(item => +item);
};

const createNewImageData = (width, height) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  canvas.setAttribute('width', width);
  canvas.setAttribute('height', height);
  ctx.beginPath();
  ctx.fillStyle = 'rgba(231, 231, 231, 1)';
  ctx.fillRect(0, 0, width, height);

  return ctx.getImageData(0, 0, width, height);
};

const getId = (() => {
  let id = 0;
  return () => id++;
})();

export {
  hexToRgbA, rgbaArr, createNewImageData, getId,
};
