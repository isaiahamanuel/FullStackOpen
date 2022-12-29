import { useState } from "react";

const Filter = (props) => {
  return (
    <div>
      filter: <input value={props.val} onChange={props.change} />
    </div>
  );
};
const PersonForm = (props) => {
  return (
    <form onSubmit={props.submit}>
      <div>
        name: <input value={props.nameVal} onChange={props.nameChange} />
        <div>
          number: <input value={props.numVal} onChange={props.numChange} />
        </div>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = (props) => {
  console.log(props.peopleToShow);

  return props.peopleToShow.map((person) => {
    return (
      <div key={person.name}>
        {" "}
        {person.name} {person.number}
      </div>
    );
  });
};

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "4223456784" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const addNewPerson = (event) => {
    event.preventDefault();
    if (newName === "" || newNumber === "") {
      return;
    }
    const nameExist = persons.find((person) => {
      return person.name === newName;
    });
    const numberExist = persons.find((person) => {
      return person.number === newNumber;
    });
    if (nameExist !== undefined) {
      alert(`${newName} is already added to phonebook`);
      return;
    }
    if (numberExist !== undefined) {
      alert(`${newNumber} is already added to phonebook`);
      return;
    }
    const person = {
      name: newName,
      number: newNumber,
    };
    setPersons(persons.concat(person));
    setNewName("");
    setNewNumber("");
  };
  const addNewName = (event) => {
    setNewName(event.target.value);
  };
  const addNewNumber = (event) => {
    setNewNumber(event.target.value);
  };
  const peopleToShow =
    newFilter === ""
      ? persons
      : persons.filter(
          (person) =>
            person.name.toLowerCase().includes(newFilter.toLowerCase()) === true
        );
  const addNewFilter = (event) => {
    setNewFilter(event.target.value);
  };
  return (
    <div>
      <div>
        <Filter val={newFilter} change={addNewFilter} />
      </div>
      <h2>Phonebook</h2>
      <PersonForm
        nameVal={newName}
        nameChange={addNewName}
        numVal={newNumber}
        numChange={addNewNumber}
        submit={addNewPerson}
      />

      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} />
    </div>
  );
};

export default App;
