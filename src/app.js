require('dotenv/config');
const { v4: uuid } = require('uuid');
const express = require('express');

const app = express();
app.use(express.json());

const customers = [];

function verifyIfExistsAccountCPF(request, response, next) {
  const { cpf } = request.headers;

  const customer = customers.find(findCustomer => findCustomer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: 'Customer not found' });
  }

  request.customer = customer;

  return next();
}

function getBalance(statement) {
  const balance = statement.reduce((accumulator, operation) => {
    if (operation.type === 'credit') {
      return accumulator + operation.amount;
    }
    if (operation.type === 'debit') {
      return accumulator - operation.amount;
    }

    return accumulator;
  }, 0);

  return balance;
}

app.post('/accounts', (request, response) => {
  const { cpf, name } = request.body;

  const customerExists = customers.some(customer => customer.cpf === cpf);

  if (customerExists) {
    return response.status(400).json({ error: 'Customer already exists' });
  }

  customers.push({ id: uuid(), cpf, name, statement: [] });

  return response.status(201).send();
});

app.use(verifyIfExistsAccountCPF);

app.get('/accounts/statement', (request, response) => {
  const { customer } = request;

  return response.json(customer.statement);
});

app.post('/accounts/deposit', (request, response) => {
  const { customer } = request;
  const { description, amount } = request.body;

  const statmentOperation = {
    description,
    amount,
    created_at: new Date(),
    type: 'credit',
  };

  customer.statement.push(statmentOperation);

  return response.status(201).send();
});

app.post('/accounts/withdraw', (request, response) => {
  const { amount } = request.body;
  const { customer } = request;

  const balance = getBalance(customer.statement);

  if (balance < amount) {
    return response.status(400).json({ error: 'Insuficient funds!' });
  }

  const statmentOperation = {
    amount,
    created_at: new Date(),
    type: 'debit',
  };

  customer.statement.push(statmentOperation);

  return response.status(201).send();
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
