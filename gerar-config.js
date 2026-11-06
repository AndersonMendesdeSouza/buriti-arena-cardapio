const { writeFileSync } = require('node:fs');
const { join } = require('node:path');

const apiUrl = process.env.API_URL?.trim().replace(/\/+$/, '');

if (!apiUrl) {
  throw new Error('Defina API_URL no .env antes de gerar a configuração.');
}

const parsedUrl = new URL(apiUrl);

if (parsedUrl.protocol !== 'http:' && parsedUrl.protocol !== 'https:') {
  throw new Error('API_URL deve ser uma URL HTTP ou HTTPS.');
}

// O frontend recebe apenas a URL pública da API, sem outras variáveis do .env.
const config = `// Arquivo gerado por gerar-config.js. Edite API_URL no .env.\nconst API_URL = ${JSON.stringify(apiUrl)};\n`;

writeFileSync(join(__dirname, 'config.js'), config, 'utf8');
console.log('config.js gerado com sucesso.');
