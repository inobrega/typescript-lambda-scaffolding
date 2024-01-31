#!/bin/bash

# Parar o script em caso de erro
set -e

# Remover a pasta dist se ela existir
echo "Limpando a pasta dist anterior..."
[ -d dist ] && rm -rf dist
[ -d app.zip ] && rm app.zip

# 1. Rodar npm install
echo "Instalando dependências..."
npm install

# 2. Rodar npm run build
echo "Construindo o projeto..."
npm run build

# 3. Instalar apenas as dependências de produção
echo "Instalando dependências de produção..."
npm install --omit=dev

# 4. Copiar node_modules, package.json e outros arquivos necessários para a pasta dist
echo "Copiando arquivos necessários para a pasta dist..."
cp -R node_modules ./dist
cp package*.json ./dist

# 5. Zipar todo o conteúdo da pasta dist para "app.zip"
echo "Criando arquivo zip..."
cd dist
zip -r ../app.zip .

echo "Build e empacotamento concluídos!"
