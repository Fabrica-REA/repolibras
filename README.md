<br />
<div align="center">
  <a href="https://github.com/Fabrica-REA/repolibras">
    <img src="/public/img/logo.jpeg" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Repositório de Libras</h3>

  <p align="center">
   Repositório de Libras para os professores de Libras na UFPR, onde os usuários podem pesquisar, visualizar e contribuir com vídeos de sinais de Libras.
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
        <li><a href="#v1.0">v1.0</a></li>
        <li><a href="#v2.0">v2.0</a></li>
      </ul>
    </li>
    <li><a href="#contribuir">Contribuir</a></li>
    <li><a href="#contribuidores">Contribuidores</a></li>
    <li><a href="#contato">Contato</a></li>
  </ol>
</details>

## Sobre o Projeto

[![Product Name Screen Shot][home-screenshot]](https://github.com/Fabrica-REA/repolibras/blob/desenvolvimento/docs/home.png)

<!-- [![Product Name Screen Shot][home-screenshot]](https://github.com/Fabrica-REA/repolibras/blob/main/docs/home.png) -->


<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

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

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

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

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

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

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Roadmap

### v1.0 (finalizado)
- [x] Pesquisa de Palavras em Libras pelo Contexto
- [x] Envio de Sinais com Significado e Contexto
- [x] Visualização de Solicitações
- [x] Gerenciamento de Solicitações (Envio ou Exclusão)
- [x] Cadastro e autenticação de usuários
- [x] Avaliação de Solicitações

### v2.0 (finalizado)
- [x] Melhorar responsividade e experiência do usuário (UX)
- [x] Implementar cadastro e login aprimorados com autenticação
- [x] Adicionar níveis de acesso de usuário
- [x] Criar página de gerenciamento de vídeos e administração
- [ ] Desenvolver página de estatísticas com KPIs

<!-- ### v3.0 (planejado) -->

Veja as [issues abertas](https://github.com/Fabrica-REA/repolibras/issues) para uma lista completa de recursos propostos (e problemas conhecidos).

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Contribuir

Contribuições são o que tornam a comunidade de código aberto um lugar incrível para aprender, inspirar e criar. Qualquer contribuição que você fizer será **muito apreciada**.

Se você tiver uma sugestão para melhorar este projeto, faça um fork do repositório e crie um pull request. Você também pode abrir uma issue com a tag "enhancement".
Não se esqueça de dar uma estrela ao projeto! Obrigado novamente!

1. Faça um fork do projeto
2. Crie sua branch de feature (`git checkout -b feature/SuaFeature`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona uma nova feature'`)
4. Faça push para a branch (`git push origin feature/SuaFeature`)
5. Abra um Pull Request

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Contribuidores

Todos os voluntários e contribuidores que ajudaram no desenvolvimento e aperfeiçoamento do projeto.

<a href="https://github.com/Fabrica-REA/repolibras/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=Fabrica-REA/repolibras" />
</a>

Feito com [contrib.rocks](https://contrib.rocks).

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>

## Contato

Seu Nome - [@seu_twitter](https://twitter.com/seu_usuario) - email@exemplo.com

Link do Projeto: [https://github.com/Fabrica-REA/repolibras](https://github.com/Fabrica-REA/repolibras)

<p align="right">(<a href="#readme-top">voltar ao topo</a>)</p>
