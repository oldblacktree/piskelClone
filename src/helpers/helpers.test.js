import { rgbaArr, hexToRgbA } from './helpers';

test.each([
  ['rgba(255, 255, 255, 1)', [255, 255, 255, 1]],
  ['rgba(178, 0, 15, 100)', [178, 0, 15, 100]],
])(
  '.add(%s)',
  (a, expected) => {
    expect(rgbaArr(a)).toEqual(expected);
  },
);

test('convert HEX to RGBA', () => {
  expect(hexToRgbA('#FFFFFF')).toEqual('rgba(255,255,255,1)');
});
