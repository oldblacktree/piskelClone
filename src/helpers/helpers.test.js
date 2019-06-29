import { rgbaArr, hexToRgbA } from './helpers';

test('convert RGBstring to RGBarray', () => {
  expect(rgbaArr('rgba(255, 255, 255, 1)')).toEqual([255, 255, 255, 1]);
  expect(rgbaArr('rgba(178, 0, 15, 100)')).toEqual([178, 0, 15, 100]);
});

test('convert HEX to RGBA', () => {
  expect(hexToRgbA('#FFFFFF')).toEqual('rgba(255,255,255,1)');
});
