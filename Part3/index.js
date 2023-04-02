const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());
app.use(morgan("tiny"));

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

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => {
    p.id !== id;
  });
  response.status(204).end();
});

const generateId = () => {
  return Math.floor(Math.random() * 10000000);
};

app.post("/api/persons", (request, response) => {
  const person = request.body;
  if (!person.name || !person.number) {
    return response.status(400).json({
      error: "content missing",
    });
  }
  const exists = persons.find((p) => {
    return p.name === person.name;
  });
  if (exists) {
    return response.status(400).json({
      error: "user already exists ",
    });
  }
  person.id = generateId();
  persons = persons.concat(person);
  console.log(JSON.stringify(person));
  response.json(person);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
