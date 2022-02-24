# Projeto TypeScript Products API CRUD! 🛠️

Nesse projeto, o objetivo era desenvolver um **CRUD** (_Create, Read, Update_ e _Delete_) de itens medievais, no formato de uma _API_ em estilo REST, utilizando _Typescript_ e criar alguns _endpoints_ que irão ler e escrever em um banco de dados através do **MySQL**.

### Desafio:
 - Declarar variáveis e funções com tipagens _Typescript_;
 - Construir uma _API Node Express_ utilizando o _Typescript_;
 - Integração de _API_ com banco de dados _MySQL_, respeitando ainda as tipagens.



Essa API, possui alguns endpoints (seguindo os princípios do REST) que estão conectados ao banco de dados, sempre pensando no modelo de negócio. Nessa API o usuário irá fazer o login e caso não tenha cadastro ainda, cadastrar-se através do _Endpoint_ "POST /users". Caso as autentificações estejam corretas e ele exista no banco de dados, um token de autentificação será cedido ao usuário e esterá permitido cadastrar um novo produto ou pedido, bem como listá-los.

 
---

### INSTRUÇÕES PARA USO:

1. Clone o repositório através da chave SSH
  * `git clone git@github.com:Warywise/typescript-crud-products-api.git`
  * Acesse o diretório do repositório que você acabou de clonar:
    * `cd typescript-crud-products-api`

2. Instale as dependências
  * `npm install`
 
3. Crie, na raíz do projeto, um arquivo `.env` contendo as seguintes variáveis:

```
  MYSQL_HOST=localhost
  MYSQL_USER=myuser
  MYSQL_PASSWORD=mypassword
  
```
4. Conexão com o banco de dados local

A conexão do banco local é feita através do arquivo "./src/models/connection.ts":

```typescript
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';

dotenv.config();

const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
});

export default connection;
```
**:warning: É essencial configurar essas 3 variáveis de ambiente para testar o projeto localmente: :warning:**

```
  host: process.env.MYSQL_HOST
  user: process.env.MYSQL_USER
  password: process.env.MYSQL_PASSWORD
```
## Tabelas

O banco terá três tabelas: pessoas usuárias, pedidos e produtos.

```sql
DROP SCHEMA IF EXISTS Trybesmith;
CREATE SCHEMA Trybesmith;

CREATE TABLE Trybesmith.Users (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  username TEXT NOT NULL,
  classe TEXT NOT NULL,
  level INTEGER NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE Trybesmith.Orders (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  userId INTEGER,
  FOREIGN KEY (userId) REFERENCES Trybesmith.Users (id)
);

CREATE TABLE Trybesmith.Products (
  id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  amount TEXT NOT NULL,
  orderId INTEGER,
  FOREIGN KEY (orderId) REFERENCES Trybesmith.Orders (id)
);
```

---


5. Inicie o projeto
  * `npm start `
  * `npm run dev` caso queria rodar o projeto através do nodemon
  
6. Acesse as rotas através de softwares como Postman e Insomnia através do endereço:
  * `http://localhost:3000`

7. Rotas/Endpoints disponíveis:
  * `POST` /login
  * `POST` /users
  * `POST` /products
  * `GET` /products
  * `POST` /orders
  * `GET` /orders
  * `GET` /orders/:id
--- 
