// generateFileContent.test.js
const { generateFileContent } = require('../scripts/generarCrud');
const fs = require('fs');

jest.mock('fs');

test('replaces placeholders with values', () => {
  const templateContent = "Hola {{modelo}}";
  fs.readFileSync.mockReturnValue(templateContent);

  const result = generateFileContent('fakePath', { modelo: 'Mundo' });
  expect(result).toBe("Hola Mundo");
});
