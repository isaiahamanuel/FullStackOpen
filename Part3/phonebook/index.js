const express = require("express");
const app = express();
app.use(express.json());

let people = [
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

app.get("/api/persons", (request, response) => {
  response.json(people);
});

app.get("/info", (request, response) => {
  response.send(
    `<div> <div>Phonebook has info for ${people.length} people</div>
    <div>${new Date()}</div></div>`
  );
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = people.find((person) => person.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/", (request, response) => {
  const id = Number(request.params.id);
  const people = people.filter((person) => {
    person.id != id;
  });
  response.status(204).end();
});

app.post("/api/persons/", (request, response) => {
  max =
    people.length > 0
      ? Math.max(
          ...people.map((person) => {
            return person.id;
          })
        )
      : 0;

  foundName = people.find((person) => {
    return person.name === request.body.name;
  });
  if (foundName) {
    return response.status(400).json({
      error: "name already exists",
    });
  }
  names = request.body.name;
  number = request.body.number;
  if (!names || !number) {
    return response.status(400).json({
      error: "missing content",
    });
  }
  const person = {
    id: max + 1,
    name: names,
    number: number,
  };
  people.push(person);
  response.json(person);
});

const PORT = 3001;
app.listen(PORT);
