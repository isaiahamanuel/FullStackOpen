const express = require("express");
const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/info", (request, response) => {
  response.send(`<div><h1>Phonebook has ${persons.length} people</h1>
  <div>${Date()}</div>
  </div>`);
});
app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.filter((p) => p.id === id);
  response.json(person);
});

app.delete("api/person/:id", (request, response) => {
  const id = Number(request.params.id);
  person = persons.filter((p) => {
    p.id !== id;
  });

  const generateId = () => {
    return Math.floor(Math.random() * 10000000);
  };
});

app.post("api/person", (request, response) => {
  const person = request.body;
  person.id = generateId;
  persons.concat(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
