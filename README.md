<h1 align="center"> Nuvem Web </h1>
<p align="center"> <strong> Backend </strong> do sistema web nuvem </p>

<p align="center">
  <a href="#-descrição"> Descrição </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-rotas"> Rotas </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-execução-do-backend"> Instalação e execução do backend </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação-e-execução-do-banco-de-dados"> Instalação e execução do banco de dados </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-tecnologias"> Tecnologias </a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#memo-licença"> Licença </a>
</p>
 
## ✍ Descrição

 O projeto web nuvem foi proposto como avaliação e tem no seu escopo o desenvolvimento de uma API que atenda todas as demandas solicitadas. Esse projeto contém 
 todas as rotas necessárias da aplicação, realizando a autenticação do usuário e também executando todas as operações no banco de dados. O Postgres foi o banco
 selecionado para o projeto. 

## 🚀 Rotas

**Login** 👣 /login register <br>
**Cadastro** 👣 /register <br>
**Dashboard** 👣 /dashboard <br>
**Verificação** 👣 /verification <br>
**Recuperar senha** 👣 /update/pass <br>
**Envio de chave para recuperar senha** 👣 /send/key/pass <br>
**Envio de chave para o cadastro** 👣 /send/key

 ## 💻 Instalação e execução do backend
 
<strong> Passo 1 > </strong> <i> Você deve ter instalado no seu computador o <strong> Git </strong>. <a href="https://git-scm.com/"> Clique aqui </a></i><br>
<strong> Passo 2 > </strong> <i> Outra ferramenta necessária que vamos utilizar é o <strong> Node.Js </strong>. <a href="https://nodejs.org/en/"> Clique aqui </a></i><br>
<strong> Passo 3 > </strong> <i> Após a instalação das ferramentas você deve abrir o terminal do seu computador. </i><br>
<strong> Passo 4 > </strong> <i> Altere o diretório de trabalho atual para o local em que deseja salvar. (exemplo: cd desktop).</i><br>
<strong> Passo 5 > </strong> <i> Faça um clone desse repositório rodando: `git clone https://github.com/GabrielCarreiro/recrutamento-back-end`</i><br>
<strong> Passo 6 > </strong> <i> Depois de clonar o repositório entre na pasta rodando pelo terminal: `cd recrutamento-back-end`; </i><br>
<strong> Passo 7 > </strong> <i> Digite `npm i` para instalar as dependências do projeto e aguarde. </i><br>
<strong> Passo 8 > </strong> <i> Digite `npm run dev` para iniciar o servidor de desenvolvimento e aguardo a execução.</i><br>
<strong> Passo 9 > </strong> <i> Acesse em seu navegador a pagina http://localhost:3333/ após a inicialização do servidor .</i><br>
<strong> Atenção ⚠ </strong>  Este projeto contém variáveis de ambiente e todas devem ser configuradas conforme a imagem abaixo <br>
<img src="https://i.imgur.com/gc8HfIh.png" width="450"> 

 ## 💻 Instalação e execução do banco de dados
 <strong> Passo 1 > </strong> <i> Você deve ter instalado no seu computador o <strong> Postregrs </strong>. <a href="https://www.postgresql.org/"> Clique aqui </a></i><br>
 <strong> Passo 2 > </strong> <i> Caso precise de ajuda siga este tutorial  <a href="https://www.youtube.com/watch?reload=9&v=FoqXi0wpX4c"> Clique aqui </a></i><br>
 <strong> Passo 3 > </strong> <i> Configure o banco de dados com o usuário *postregrs* e senha *123* ou altere o código para seu usuário e senha </i><br>
 <strong> Passo 4 /strong> <i> Navegue até o diretório do backend, abra um terminal, e excute o seguinte código *yarn sequelize db:create* </i><br>
 <strong> Passo 5 /strong> <i> Agora você deve executar o seguinte código *yarn sequelize db:migrate* </i><br>
 <strong> Passo 6 /strong> <i> Pronto, abra o pgAdmin com seu usuário e senha configurados </i><br>
 
## 👨🏻‍💻 Tecnologias

**Bcrypt** 👉🏻  Biblioteca para criptografar as senhas. <br>
**Dotenv** 👉🏻 Módulo de dependência para carrega asvariáveis de ambiente.<br>
**PG** 👉🏻 Biblioteca para auxiliar a manipulação de comandos do banco de dados.<br>
**Node Fetch** 👉🏻 Biblioteca para realizar requisições HTTP.<br>
**Nodemailer** 👉🏻 Ferramenta para o envio de email.<br>
**Express Validator** 👉🏻 Biblioteca para realizar as validações dos dados.<br>
**Json Web Token 2** 👉🏻 Essa biblioteca realiza a criação do JWT.<br>

## 📋 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE.md) para saber mais detalhes.

---
Feito por Gabriel Carreiro
