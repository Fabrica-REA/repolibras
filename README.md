<br />
<div align="center" id="readme-top">
  <a href="https://github.com/Fabrica-REA/repolibras">
    <img src="/public/img/logo.jpeg" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center">Repositório de Libras</h3>
  <p align="center">
    Plataforma colaborativa para pesquisa, visualização e contribuição de vídeos de sinais em Libras, desenvolvida para promover inclusão, ensino e divulgação na UFPR e comunidade.
  </p>
</div>
<br>
<details>
  <summary>Sumário</summary>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
      <ul>
        <li><a href="#construído-com">Construído com</a></li>
      </ul>
    </li>
    <li>
      <ul>
        <li>
          <a href="#pré-requisitos">Pré-Requisitos</a>
          <ul>
            <li><a href="#windows">Windows</a></li>
            <li><a href="#linux">Linux</a></li>
            <li><a href="#macos">macOS</a></li>
          </ul>
        </li>
        <li><a href="#instalação">Instalação</a></li>
      </ul>
    </li>
    <li><a href="#roadmap">Roadmap</a>
      <ul>
        <li><a href="#v10">v1.0</a></li>
        <li><a href="#v20">v2.0</a></li>
      </ul>
    </li>
    <li><a href="#contribuir">Contribuir</a></li>
    <li><a href="#contribuidores">Contribuidores</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o Projeto

O Repositório de Libras é uma plataforma colaborativa desenvolvida para apoiar professores, alunos e pesquisadores da Universidade Federal do Paraná (UFPR) e comunidade em geral no ensino, aprendizagem e divulgação da Língua Brasileira de Sinais (Libras) e também da língua Terena. O sistema permite que usuários pesquisem palavras, visualizem vídeos de sinais, contribuam com novos conteúdos e participem do processo de validação dos materiais.

A plataforma foi criada para suprir a necessidade de um ambiente centralizado, seguro e acessível para o compartilhamento de sinais em Libras, promovendo inclusão, diversidade linguística e democratização do conhecimento. O sistema oferece funcionalidades como pesquisa contextualizada, envio de vídeos ou links, gerenciamento de solicitações, avaliação colaborativa, dashboard de estatísticas e níveis de acesso diferenciados para usuários e administradores.

> **⭐ Dê uma estrela no repositório para receber notificações de grandes atualizações e ajudar a promover o projeto!**

### Missão

Promover o acesso, a colaboração e a disseminação da Língua Brasileira de Sinais e da língua Terena, fortalecendo a inclusão e a diversidade linguística por meio de uma plataforma digital aberta, segura e de fácil utilização.

### Visão

Ser referência nacional em repositórios digitais de Libras e línguas indígenas, contribuindo para a formação de uma sociedade mais inclusiva, acessível e conectada, onde o conhecimento sobre línguas de sinais seja amplamente compartilhado, validado e aprimorado por toda a comunidade.

<img src="/docs/home.png" alt="Página Home - Screen Shot" width="auto" height="auto">

## Construído com

![TechStack](https://skillicons.dev/icons?i=html,css,js,react,nodejs,npm,express,mysql,git,github)

- **HTML/CSS:** Para construção da estrutura e design responsivo da plataforma.
- **JavaScript (JS):** Linguagem de programação utilizada tanto no frontend quanto no backend.
- **React:** Biblioteca JavaScript para construção de interfaces de usuário.
- **NodeJS:** Linguagem utilizada para rodar JavaScript no servidor e para aplicações backend.
- **NPM:** Gerenciador de pacotes padrão para ambientes NodeJS e JavaScript.
- **Express:** Framework backend para construção da API e gerenciamento de dados.
- **MySql:** Banco de dados utilizado para armazenar os dados do usuário e os vídeos dos sinais de Libras.
- **Git/GitHub:** Para controle de versão e colaboração no desenvolvimento do projeto.

## Pré-Requisitos

### Windows

1. Instale o [Node.js](https://nodejs.org/) (inclui o npm).
2. Instale o [Git](https://git-scm.com/download/win).
3. Verifique se node, npm e git foram instalados corretamente:
   ```sh
   npm -v && node -v && git -v
   ```

### Linux

1. Instale o Node.js e npm ([guia oficial](https://github.com/nodesource/distributions/blob/master/README.md)):

   ```sh
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

2. Instale o Git:
   ```sh
   sudo apt-get install git
   ```
3. Verifique se node, npm e git foram instalados corretamente:
   ```sh
   npm -v && node -v && git -v
   ```

### macOS

1. Instale o [Homebrew](https://brew.sh/) se ainda não tiver:
   ```sh
   /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
   ```
2. Instale o Node.js e Git:
   ```sh
   brew install node git
   ```
3. Verifique se node, npm e git foram instalados corretamente:
   ```sh
   npm -v && node -v && git -v
   ```


### Instalação

Passo a passo para instalar o repositório de Libras localmente

1. Clone o repositório
   ```sh
   git clone https://github.com/Fabrica-REA/repolibras.git
   ```
2. Instale os pacotes NPM e rode a aplicação
   ```sh
   npm install && npm run dev
   ```

## Roadmap
Abaixo estão os principais marcos e funcionalidades implementadas no Repositório de Libras:

### v1.0 
- [x] Pesquisa de Palavras em Libras pelo Contexto
- [x] Envio de Sinais com Significado e Contexto
- [x] Visualização de Solicitações
- [x] Gerenciamento de Solicitações (Envio ou Exclusão)
- [x] Cadastro e autenticação de usuários
- [x] Avaliação de Solicitações

### v2.0 
- [x] Melhorar responsividade e experiência do usuário (UX)
- [x] Implementar cadastro e login aprimorados com autenticação
- [x] Adicionar níveis de acesso de usuário
- [x] Criar página de perfil, gerenciamento de vídeos e administração
- [x] Desenvolver página de estatísticas com KPIs
- [x] Adicionar linguagem Terena

Veja as [issues abertas](https://github.com/Fabrica-REA/repolibras/issues) para uma lista completa de recursos propostos (e problemas conhecidos).

## Contribuir
Se você tiver uma sugestão para melhorar este projeto, faça um fork do repositório e crie um pull request. Você também pode abrir uma issue com a tag "enhancement".
Não se esqueça de dar uma estrela ao projeto para ser notificado de grandes mudanças e ajudar a promover o repositório! Obrigado novamente!

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/SuaFeature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona uma nova feature'`)
4. Faça push para a branch (`git push origin feature/SuaFeature`)
5. Abra um Pull Request


## Contribuidores 

Todos os voluntários e contribuidores que ajudaram no desenvolvimento e aperfeiçoamento do projeto. Muito Obrigado a todos. ❤️

<a href="https://github.com/Fabrica-REA/repolibras/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Fabrica-REA/repolibras" />
</a>

## Contato

Celso Yoshikazu Ishida [linkdin](https://www.linkedin.com/in/celsoishida/) - [email](celsoishida@gmail.com)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>