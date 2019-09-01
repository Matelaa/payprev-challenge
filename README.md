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

#### Rotas:
BaseURL: http://localhost:3000

Heroku:  https://sheltered-gorge-46015.herokuapp.com

Postman Collection: https://www.getpostman.com/collections/22d64b5083594854859f

#### User
-  POST 
- [x] /user - Registra um usuario
```
Body
{
	"email": "matela@gmail.com",
	"password": "12341234",
	"cpf": "11122233344",
	"isAdmin": true
}

Response
{
    "isAdmin": true,
    "_id": "5d6b16ae6f80b905ec353fae",
    "email": "matela@gmail.com",
    "cpf": "11122233344",
    "password": "$2b$10$0V/iSIKGstof0hlKFp5P5uJ6ayUlsXY8RN83r7dEQL4DhYsTK47uy",
    "createdAt": "2019-09-01T00:54:06.219Z",
    "updatedAt": "2019-09-01T00:54:06.219Z",
    "__v": 0
}
```

-  GET 
- [x] /users - Retorna todos os usuarios cadastrados
```
Response
[
    {
        "isAdmin": true,
        "_id": "5d6b16ae6f80b905ec353fae",
        "email": "matela@gmail.com",
        "cpf": "11122233344",
        "password": "$2b$10$0V/iSIKGstof0hlKFp5P5uJ6ayUlsXY8RN83r7dEQL4DhYsTK47uy",
        "createdAt": "2019-09-01T00:54:06.219Z",
        "updatedAt": "2019-09-01T00:54:06.219Z",
        "__v": 0
    }
]
```


### Authentication
-  POST 
- [x] /login - Realiza o login
```
Body
{
	"email": "matela@gmail.com",
	"password": "12341234"
}

Response
{
    "user": {
        "_id": "5d6b16ae6f80b905ec353fae",
        "email": "matela@gmail.com"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg"
}
```


### UserGit (Apenas para Admin)
-  GET 
- [x] /userGit/:username - Retorna as informações do Github (username = Nome do usuario no Github)
      
      Ex: /userGit/Matelaa
```
Header
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg

Response
{
    "success": "Matelaa",
    "name": "José Matela Neto",
    "bio": "Computer Science student",
    "location": "Brazil, Fortaleza - Ceará",
    "html_url": "https://github.com/Matelaa"
}
```

-  POST 
- [x] /userGit - Cadastra um usuario do Git
```
Header
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg

Body
{
	"username": "Matelaa"
}

Response
{
    "_id": "5d6b17d56f80b905ec353faf",
    "login": "Matelaa",
    "name": "José Matela Neto",
    "bio": "Computer Science student",
    "location": "Brazil, Fortaleza - Ceará",
    "html_url": "https://github.com/Matelaa",
    "createdAt": "2019-09-01T00:59:01.729Z",
    "updatedAt": "2019-09-01T00:59:01.729Z",
    "__v": 0
}
```


### List
-  POST 
- [x] /list - Cria uma lista
```
Header
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg

Body
{
	"name": "PayprevChallenge",
	"usersGit": [
		{
			"userGit": "5d6b17d56f80b905ec353faf",
			"tag": "Full-stack"
		}]
}

Response
{
    "_id": "5d6b18bb80d4d8138c783810",
    "name": "PayprevChallenge",
    "user": "5d6b16ae6f80b905ec353fae",
    "usersGit": [
        {
            "userGit": "5d6b17d56f80b905ec353faf",
            "tag": "Full-stack"
        }
    ],
    "createdAt": "2019-09-01T01:02:51.131Z",
    "updatedAt": "2019-09-01T01:02:51.131Z",
    "__v": 0
}
```

-  GET 
- [x] /lists - Retorna as listas do usuario
```
Header
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg

Response
[
    {
        "_id": "5d6b18bb80d4d8138c783810",
        "name": "PayprevChallenge",
        "user": "5d6b16ae6f80b905ec353fae",
        "usersGit": [
            {
                "userGit": "5d6b17d56f80b905ec353faf",
                "tag": "Full-stack"
            }
        ],
        "createdAt": "2019-09-01T01:02:51.131Z",
        "updatedAt": "2019-09-01T01:02:51.131Z",
        "__v": 0
    }
]
```

-  PUT 
- [x] /list/:id - Altera o nome de uma lista do usuario (id = id de uma lista do usuario)
      
      Ex: /list/5d6b18bb80d4d8138c783810
```
Header
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg

Body
{
	"name": "PayprevChallenge2Editado"
}

Response
{
    "_id": "5d6b18bb80d4d8138c783810",
    "name": "PayprevChallenge2Editado",
    "user": "5d6b16ae6f80b905ec353fae",
    "usersGit": [
        {
            "userGit": "5d6b17d56f80b905ec353faf",
            "tag": "Full-stack"
        }
    ],
    "createdAt": "2019-09-01T01:02:51.131Z",
    "updatedAt": "2019-09-01T01:09:45.189Z",
    "__v": 0
}
```

-  DELETE 
- [x] /list/:id - Deleta uma lista do usuario (id = id de uma lista do usuario)
      
      Ex: /list/5d6b18bb80d4d8138c783810
```
Header
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg

{
    "success": "This list is deleted succesfully."
}
```


### UserGitList
-  GET 
- [x] /usersGit - Retorna os usuarios cadastrados por um ADMIN
```
Header
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg

Response
[
    {
        "_id": "5d6b17d56f80b905ec353faf",
        "login": "Matelaa",
        "name": "José Matela Neto",
        "bio": "Computer Science student",
        "location": "Brazil, Fortaleza - Ceará",
        "html_url": "https://github.com/Matelaa",
        "createdAt": "2019-09-01T00:59:01.729Z",
        "updatedAt": "2019-09-01T00:59:01.729Z",
        "__v": 0
    },
    {
        "_id": "5d6b1b7480d4d8138c783811",
        "login": "BrenoAquino",
        "name": "Breno Aquino",
        "bio": "iOS Developer",
        "location": "São Paulo, São Paulo",
        "html_url": "https://github.com/BrenoAquino",
        "createdAt": "2019-09-01T01:14:28.245Z",
        "updatedAt": "2019-09-01T01:14:28.245Z",
        "__v": 0
    }
]
```

-  POST 
- [x] /userGit/list - Adiciona um usuario a uma lista do usuario
```
Header
x-access-token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDZiMTZhZTZmODBiOTA1ZWMzNTNmYWUiLCJpYXQiOjE1NjcyOTkyODd9.qEcQ_BlDVYG4coVx-nCAPDe9VdBTTp_kq_4iT9q_Hhg

Body
{
	"login": "BrenoAquino",
	"name": "PayprevChallenge",
	"tag": "Back-end"
}

Response
{
    "_id": "5d6b1b9780d4d8138c783812",
    "name": "PayprevChallenge",
    "user": "5d6b16ae6f80b905ec353fae",
    "usersGit": [
        {
            "userGit": "5d6b17d56f80b905ec353faf",
            "tag": "Full-stack"
        },
        {
            "userGit": "5d6b1b7480d4d8138c783811",
            "tag": "Back-end"
        }
    ],
    "createdAt": "2019-09-01T01:15:03.159Z",
    "updatedAt": "2019-09-01T01:15:17.964Z",
    "__v": 1
}
```

Observação: Acrescente todas as informações que precisaremos para testar sua aplicação, no arquivo README ou no corpo do e-mail, como preferir. Não esqueça de documentar as rotas da sua API.
