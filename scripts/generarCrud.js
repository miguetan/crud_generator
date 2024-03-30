const fs = require('fs');
const path = require('path');

// Funciones auxiliares
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function generateFileContent(templatePath, replacements) {
  let content = fs.readFileSync(templatePath, 'utf8');
  Object.keys(replacements).forEach(key => {
    const regex = new RegExp(`{{${key}}}`, 'g');
    content = content.replace(regex, replacements[key]);
  });
  return content;
}

// Función principal para generar archivos CRUD
function main(modelName) {
  const modelNameCapitalized = capitalizeFirstLetter(modelName);
  const basePath = path.join(__dirname, '..'); // Ajusta según la estructura de tu proyecto

  // Generar Componente CRUD
  let templatePath = path.join(__dirname, 'templates/crudTemplate.vue');
  let outputPath = path.join(basePath, `src/components/${modelNameCapitalized}Crud.vue`);
  generateAndWriteFile(templatePath, outputPath, modelNameCapitalized);

  // Generar Servicio
  templatePath = path.join(__dirname, 'templates/serviceTemplate.ts');
  outputPath = path.join(basePath, `src/services/${modelNameCapitalized}Service.ts`);
  generateAndWriteFile(templatePath, outputPath, modelNameCapitalized);

  // Generar Interfaz
  templatePath = path.join(__dirname, 'templates/interfaceTemplate.ts');
  outputPath = path.join(basePath, `src/interfaces/${modelNameCapitalized}.ts`);
  generateAndWriteFile(templatePath, outputPath, modelNameCapitalized);

  console.log('Generación CRUD completada.');
}

// Función para generar y escribir el archivo si aún no existe
function generateAndWriteFile(templatePath, outputPath, modelNameCapitalized) {
  if (fs.existsSync(outputPath)) {
    console.log(`El archivo ${outputPath} ya existe. No se realiza ninguna acción.`);
    return;
  }

  const content = generateFileContent(templatePath, {
    Modelo: modelNameCapitalized,
    modelo: modelNameCapitalized.toLowerCase()
  });

  fs.writeFileSync(outputPath, content);
  console.log(`Archivo generado: ${outputPath}`);
}

// Exportar la función main para que pueda ser usada desde fuera
module.exports = { main };
