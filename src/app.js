require('dotenv/config');
const { v4: uuid } = require('uuid');
const express = require('express');

const app = express();
app.use(express.json());

const customers = [];

app.post('/accounts', (request, response) => {
  const { cpf, name } = request.body;

  const customerExists = customers.some(customer => customer.cpf === cpf);

  if (customerExists) {
    return response.status(400).json({ error: 'Customer already exists' });
  }

  customers.push({ id: uuid(), cpf, name, statement: [] });

  return response.status(201).send();
});

app.get('/accounts/statement', (request, response) => {
  const { cpf } = request.headers;

  const customer = customers.find(findCustomer => findCustomer.cpf === cpf);

  if (!customer) {
    return response.status(400).json({ error: 'Account not found' });
  }

  return response.json(customer.statement);
});

app.listen(process.env.APP_PORT, () => {
  console.log(`Server started on port ${process.env.APP_PORT}`);
});
