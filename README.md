# Desenvolve MT - Plataforma de Pessoas Desaparecidas

## 📋 Sobre o Projeto

O ABITUS é uma plataforma web desenvolvida para auxiliar no registro e localização de pessoas desaparecidas no estado de Mato Grosso. A aplicação permite que usuários cadastrem informações sobre desaparecimentos, busquem por pessoas desaparecidas e compartilhem informações relevantes.

### 🚀 Tecnologias Utilizadas

- **Frontend**: Next.js 15 com React 19
- **Estilização**: Tailwind CSS
- **Mapas**: Google Maps API
- **Formulários**: React Hook Form com validação Zod
- **Ícones**: Heroicons e Lucide React
- **Build**: Turbopack
- **Containerização**: Docker

## 🛠️ Como Executar Localmente

### Pré-requisitos

- Node.js 18 ou superior
- npm ou yarn
- Conta no Google Cloud Platform com a API do Google Maps ativada

### Configuração do Ambiente

1. Clone o repositório:
   ```bash
   git clone [URL_DO_REPOSITÓRIO]
   cd desenvolve-mt
   ```

2. Instale as dependências:
   ```bash
   npm install
   # ou
   yarn install
   ```

3. Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:
   ```env
   NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=sua_chave_da_api_google_maps
   ```

4. Execute o servidor de desenvolvimento:
   ```bash
   npm run dev
   # ou
   yarn dev
   ```

5. Acesse a aplicação em [http://localhost:3000](http://localhost:3000)

## 🐳 Executando com Docker

### Usando Docker Compose (Recomendado)

1. Certifique-se de ter o Docker e Docker Compose instalados

2. Crie o arquivo `.env` na raiz do projeto (se ainda não existir) com as variáveis necessárias

3. Execute o comando:
   ```bash
   docker-compose up --build
   ```

4. A aplicação estará disponível em [http://localhost:3000](http://localhost:3000)

### Usando apenas Docker

1. Construa a imagem:
   ```bash
   docker build -t desenvolve-mt .
   ```

2. Execute o container:
   ```bash
   docker run -p 3000:3000 --env-file .env desenvolve-mt
   ```

## 🏗️ Estrutura do Projeto

```
desenvolve-mt/
├── public/             # Arquivos estáticos
├── src/
│   ├── app/            # Rotas da aplicação (Next.js 13+ App Router)
│   ├── components/     # Componentes React reutilizáveis
│   ├── data/           # Dados mockados (se aplicável)
│   └── lib/            # Utilitários e configurações
├── .eslintrc.js        # Configuração do ESLint
├── next.config.js      # Configuração do Next.js
├── package.json        # Dependências e scripts
└── tsconfig.json       # Configuração do TypeScript
```

## 📝 Licença

Este projeto está sob a licença [MIT](LICENSE).

## 🤝 Como Contribuir

1. Faça um Fork do projeto
2. Crie uma Branch para sua Feature (`git checkout -b feature/AmazingFeature`)
3. Adicione suas mudanças (`git add .`)
4. Comite suas alterações (`git commit -m 'Adiciona uma nova feature'`)
5. Faça o Push da Branch (`git push origin feature/AmazingFeature`)
6. Abra um Pull Request

## 📞 Contato

Para mais informações, entre em contato com a equipe de desenvolvimento.

---

Desenvolvido com ❤️ para ajudar a comunidade de Mato Grosso
