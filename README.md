# Star Hotel

Um site moderno para o Star Hotel, localizado em Limoeiro-PE, desenvolvido com React e Tailwind CSS.

## 🚀 Funcionalidades

- Design responsivo e moderno
- Sistema de reservas integrado com Back4App
- Widget de clima em tempo real
- Painel administrativo para gerenciamento de reservas
- Páginas informativas sobre o hotel e seus serviços

## 🛠️ Tecnologias Utilizadas

- React
- Tailwind CSS
- Back4App (Backend as a Service)
- OpenWeather API
- React Router
- Vite
- ESLint
- Prettier

## 📋 Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

## 🔧 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/star-hotel.git
cd star-hotel
```

2. Instale as dependências:
```bash
npm install
# ou
yarn install
```

3. Configure as variáveis de ambiente:
- Crie um arquivo `.env` na raiz do projeto
- Adicione suas chaves de API:

VITE_BACK4APP_APP_ID=sua_app_id
VITE_BACK4APP_JS_KEY=sua_js_key
VITE_WEATHER_API_KEY=sua_chave_api


4. Inicie o servidor de desenvolvimento:
```bash
npm run dev
# ou
yarn dev
```

## 📦 Estrutura do Projeto

star-hotel/
├── public/
│ └── images/
├── src/
│ ├── components/
│ │ ├── Header.jsx
│ │ ├── Footer.jsx
│ │ └── WeatherWidget.jsx
│ ├── pages/
│ │ ├── HomePage.jsx
│ │ ├── ReservasPage.jsx
│ │ ├── AdminPage.jsx
│ │ └── ConfirmacaoPage.jsx
│ ├── config/
│ │ ├── parseConfig.js
│ │ └── weatherConfig.js
│ ├── App.jsx
│ ├── index.jsx
│ └── index.css
├── .eslintrc.cjs
├── .prettierrc
├── .gitignore
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.js



## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ✨ Contribuição

Contribuições são sempre bem-vindas! Por favor, leia as [diretrizes de contribuição](CONTRIBUTING.md) antes de enviar um pull request.

## 📞 Contato

Para mais informações, entre em contato através do e-mail: contato@starhotel.com.br