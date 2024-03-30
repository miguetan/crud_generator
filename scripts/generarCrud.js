const fs = require('fs');
const path = require('path');

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

// Asume que el argumento se pasa en formato camelCase o similar
const modelName = process.argv[2]; // El nombre del modelo pasado como argumento
const modelNameCapitalized = capitalizeFirstLetter(modelName); // Capitaliza el nombre del modelo para usos donde se necesite


//PRIMERO CREAMOS EL CRUD COMPONENT
let templatePath = './templates/crudTemplate.vue'; // Asegúrate de que la ruta al template sea correcta
let outputPath = `./src/components/${modelNameCapitalized}Crud.vue`; // Ajusta la ruta de salida según sea necesario


if (fs.existsSync(outputPath)) {
    console.log(`El archivo ${outputPath} ya existe. No se realiza ninguna acción.`);
    return;
  }

let content = generateFileContent(templatePath, {
  Modelo: modelNameCapitalized, // Este es el objeto de reemplazos
  modelo: modelNameCapitalized.toLowerCase() // Este es el objeto de reemplazos
});

fs.writeFileSync(outputPath, content);
console.log(`Componente Vue CRUD generado para el modelo ${modelName}: ${outputPath}`);




//SEGUNDO CREAMOS LOS SERVICIOS
templatePath = './templates/serviceTemplate.ts'; // Asegúrate de que la ruta al template sea correcta
outputPath = `./src/services/${modelNameCapitalized}Service.ts`; // Ajusta la ruta de salida según sea necesario


if (fs.existsSync(outputPath)) {
    console.log(`El archivo ${outputPath} ya existe. No se realiza ninguna acción.`);
    return;
  }

content = generateFileContent(templatePath, {
  Modelo: modelNameCapitalized, // Este es el objeto de reemplazos
  modelo: modelNameCapitalized.toLowerCase() // Este es el objeto de reemplazos
});

fs.writeFileSync(outputPath, content);
console.log(`Service generado para el modelo ${modelName}: ${outputPath}`);




//TERCERO CREAMOS LA INTERFAZ
templatePath = './templates/interfaceTemplate.ts'; // Asegúrate de que la ruta al template sea correcta
outputPath = `./src/interfaces/${modelNameCapitalized}.ts`; // Ajusta la ruta de salida según sea necesario


if (fs.existsSync(outputPath)) {
    console.log(`La interface ${outputPath} ya existe. No se realiza ninguna acción.`);
    return;
  }

content = generateFileContent(templatePath, {
  Modelo: modelNameCapitalized, // Este es el objeto de reemplazos
  modelo: modelNameCapitalized.toLowerCase() // Este es el objeto de reemplazos
});

fs.writeFileSync(outputPath, content);
console.log(`Interface generada para el modelo ${modelName}: ${outputPath}`);