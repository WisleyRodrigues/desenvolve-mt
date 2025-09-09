# Stage de build
FROM node:18-alpine AS builder
WORKDIR /app

# Copia dependências e instala
COPY package*.json ./
RUN npm ci

# Copia código e gera build
COPY . .
RUN npm run build

# Stage de produção
FROM node:18-alpine AS production
WORKDIR /app

# Copia dependências e arquivos compilados
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

# Expondo porta padrão
EXPOSE 3000

# Comando para iniciar a aplicação Next.js em produção
CMD ["npm", "start"]
