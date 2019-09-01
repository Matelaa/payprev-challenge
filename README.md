# Desafio Payprev Back-End

### Sobre o desafio
Você deve criar uma API para gerenciar users do Github.
Tecnologias: Node.js + framework, caso julgue necessário (Express ou Adonis) + banco de dados (MongoDB ou Firestore/Firebase ou  PostgreSQL ou MySQL).
Outras bibliotecas, arquiteturas e etc, ficam à sua escolha.
P.S: O desenvolvimento do front-end não é obrigatório, pois usaremos o Insomnia para testar sua aplicação.

#### Requisitos
- [x] Usuário se cadastra fornecendo e-mail, senha e cpf;
- [x] No cadastro, ele define se é um usuário COMUM ou ADMIN;
- [x] O usuário faz login fornecendo e-mail e senha;
- [x] Todos os dados, tanto de cadastro como de login, precisam ser validados; 

##### Quando falo validação, entenda:
Cadastro: Senha com 6 dígitos ou mais + e-mail válido + CPF com números somente (11 dígitos);
Login: Senha com 6 dígitos ou mais + e-mail válido;


#### O USUÁRIO ADMIN, vai:

- [x] Pesquisar por users no github, utilizando a api pública do mesmo(https://api.github.com/users/);
- [x] Adicionar no banco de dados os users(github) que desejar, para que eles fiquem disponíveis para todos os USUÁRIOS COMUNS;
- [x] Salvar no banco de dados apenas as informações: login, nome, bio, localidade e html_url.

#### O USUÁRIO COMUM, vai:

- [x] Visualizar uma listagem com todos os users(github) disponibilizados pelo admin;
- [x] Criar, editar e excluir listas para organizar os users(github);
- [x] Cada lista precisa ter um nome, que será escolhido pelo USUÁRIO COMUM;
- [x] Adicionar os users(github) disponíveis nas suas listas;
- [x] Um user(github) pode estar disponível em mais de uma pasta;
- [x] Adicionar tags aos users(github) que estão dentro das listas;

##### Exemplos de tags: 

Full-stack, Back-end, Front-end;

Qualquer funcionalidade além das que citamos anteriormente é muito bem-vinda.

#### O que vamos analisar?
Qualidade do código, modularidade, legibilidade e criatividade;
Comentários;
Testes;
Prazo;
Autonomia.

#### Entrega:
- [x] Faça o deploy da sua API no Heroku (ou plataforma semelhante);
- [x] Suba seu código em um repositório, no seu Github;
- [x] Envie o link da aplicação + link do repositório para gabriel.rodrigues@payprev.com.br com o título “Teste back-end”.

#### Rotas:
BaseURL: https://localhost3000

- ** POST **
- [x] /user - Registra um usuario
```
Body
{
	"email": "payprev@gmail.com",
	"password": "12341234",
	"cpf": "11122233344",
	"isAdmin": true
}
Response
{
    "isAdmin": true,
    "_id": "5d6ae9c7beddfa23644139f3",
    "email": "payprev@gmail.com",
    "cpf": "11122233344",
    "password": "$2b$10$2UOS3tlwB7aWJK6le064/.EaCdWtCI7ypRZvRrCMoUbhVy6Hjg5yO",
    "createdAt": "2019-08-31T21:42:31.848Z",
    "updatedAt": "2019-08-31T21:42:31.848Z",
    "__v": 0
}
```

- ** GET **
- [x] /users - Retorna todos os usuarios cadastrados



Observação: Acrescente todas as informações que precisaremos para testar sua aplicação, no arquivo README ou no corpo do e-mail, como preferir. Não esqueça de documentar as rotas da sua API.
