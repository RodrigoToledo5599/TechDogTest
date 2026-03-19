# Estágio 1: Construção (Build)
FROM node:22-alpine AS build

# Define o diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências primeiro (aproveita o cache do Docker)
COPY package*.json ./

# Instala as dependências
RUN npm install

# Copia o restante dos arquivos do projeto
COPY . .

# Executa o build de produção
RUN npm run build -- --configuration production

# Estágio 2: Execução (Runtime)
FROM nginx:stable-alpine

# Remove a página padrão do Nginx
RUN rm -rf /usr/share/nginx/html/*

# Copia os arquivos compilados do estágio de build para o diretório do Nginx
# Nota: Substitua 'nome-do-seu-projeto' pelo nome definido no seu angular.json
COPY --from=build /app/dist/TechDogTest/browser /usr/share/nginx/html

# Copia um arquivo de configuração customizado para lidar com rotas do Angular (opcional, mas recomendado)
# COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expõe a porta 80
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]