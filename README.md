# FinAPI - Gestão Financeira

## :information_source: Sobre o projeto

Uma API simples que manipula os saques e depósitos de uma conta bancária específica.

### Requisitos

- [X] Deve ser possível criar uma conta
- [X] Deve ser possível buscar o extrato bancário do cliente
- [X] Deve ser possível realizar um depósito
- [X] Deve ser possível realizar um saque
- [X] Deve ser possível buscar o extrato bancário do cliente por data
- [X] Deve ser possível atualizar dados da conta do cliente
- [X] Deve ser possível obter dados da conta do cliente
- [X] Deve ser possível deletar uma conta
- [X] Deve ser possível retornar o balance

### Regras de negócio

- [X] Não deve ser possível cadastrar uma conta com CPF já existente
- [X] Não deve ser possível fazer depósitos em uma conta não existente
- [X] Não deve ser possível buscar extrato de uma conta não existente
- [X] Não deve ser possível fazer saques em uma conta não existente
- [X] Não deve ser possível fazer saques com saldo insuficiente
- [X] Não deve ser possível excluir uma conta não existente
- [X] Não deve ser possível obter o balance de uma conta não existente


## :computer: Tecnologias utilizadas

- NodeJS
- Express
- Eslint
- Prettier

## :floppy_disk: Como utilizar este projeto

Para baixar este projeto é necessário que esteja instalado em seu computador o NodeJS e o Yarn.
No terminal:

```bash
$ git clone https://github.com/raulneto90/ignite-finapi

# Acesse o diretório do projeto
$ cd ignite-finapi

# Instalar as dependências
$ yarn

# Executar o projeto em desenvolvimento
$ yarn dev
```
---
Feito com ❤ por Raul Neto. Me siga no [Linkedin](https://www.linkedin.com/in/raul-neto-777bb988/)
