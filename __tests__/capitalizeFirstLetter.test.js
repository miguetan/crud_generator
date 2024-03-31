// capitalizeFirstLetter.test.js
const { capitalizeFirstLetter } = require('../scripts/generarCrud');

test('capitalizes the first letter of a string', () => {
  expect(capitalizeFirstLetter('modelo')).toBe('Modelo');
});
