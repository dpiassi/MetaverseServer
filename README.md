# 
# BTG + LEPoli: Metaverse and Open Finance

Resumidamente, a nossa proposta agrega valor ao BTG como uma ponte entre o público leigo e desinteressado sobre finanças e o Open Finance, e então as incentivando, por meio da gamificação dos serviços bancários, a adotarem novos hábitos financeiros e fornecendo uma educação financeira interativa e amigável.

![Logo](https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Btg-logo-blue.svg/1200px-Btg-logo-blue.svg.png)
### ------------------------------------------------------------------------------------
![Logo](https://lepoliusp.com.br/img/logo.png)


## Referência

 - [AWS Lambda](https://docs.aws.amazon.com/lambda/index.html)
 - [AWS API Gateway](https://docs.aws.amazon.com/apigateway/index.html)
 - [AWS RDS](https://docs.aws.amazon.com/rds/index.html)


## Documentação da API

#### Retorna todo o patrimônio do usuário de uma certa organização

```http
  GET /api/account-balance/${accountId}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accountId` | `string` | **Obrigatório**. CPF do Usuário |

#### Adiciona uma certa quantia de moedas ao usuário

```http
  UPDATE /api/coins/${accountId}${coins}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `accountId`      | `string` | **Obrigatório**. CPF do Usuário |
| `coins`      | `int` | **Obrigatório**. Quantia de moedas |

#### Remove uma certa quantia de moedas do usuário 

```http
  UPDATE /api/coins/${accountId}${coins}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accountId` | `string` | **Obrigatório**. CPF do Usuário |
| `coins`      | `int` | **Obrigatório**. Quantia de moedas |

#### Adiciona umm quantia de experiência a um usuário

```http
  UPDATE /api/experience/${accountId}${xp}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `accountId`      | `string` | **Obrigatório**. CPF do Usuário |
| `xp`      | `int` | **Obrigatório**. Quantidade de experiência |

#### Retorna um objeto com a pontuação da saúde financeira e a somatória de todo o patrimônio dele

```http
  GET /api/health-status/${accountId}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accountId` | `string` | **Obrigatório**. CPF do Usuário |

#### Retorna uma lista de objetos das organizações que o usuario consentiu

```http
  GET /api/user-information/${accountId}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `accountId`      | `string` | **Obrigatório**. CPF do Usuário |

#### Retorna uma lista de UserBuildings

```http
  GET /api/userbuildings/${accountId}${color}${land}
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `accountId` | `string` | **Obrigatório**. CPF do Usuário |
| `color`      | `int` | **Obrigatório**. Cor da construção |
| `land`      | `int` | **Obrigatório**. Local da construção |

#### Cria um UserBuilding no banco

```http
  POST /api/userbuildings/${accountId}${color}${land}
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `accountId`      | `string` | **Obrigatório**. CPF do Usuário |
| `color`      | `int` | **Obrigatório**. Cor da construção |
| `land`      | `int` | **Obrigatório**. Local da construção |



## Autores

- [@luisfelipeluis49](https://www.github.com/luisfelipeluis49)
- [@marciojunior77](https://www.github.com/marciojunior77)
- [@GuilhermePC09](https://www.github.com/GuilhermePC09)
- [@dpiassi](https://www.github.com/dpiassi)

