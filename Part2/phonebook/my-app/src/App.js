import { useState, useEffect } from "react";
import axios from "axios";
import Persons from "./Components/Persons";
import PersonForm from "./Components/PersonForm";
import Filter from "./Components/Filter";
import Success from "./Components/Success";
import Error from "./Components/Error";
import axiosCalls from "./services/axiosCalls";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [newFilter, setNewFilter] = useState("");
  const [newSuccess, setNewSuccess] = useState(null);
  const [newError, setNewError] = useState(null);
  const deleteUser = (id, name) => {
    console.log(id);
    if (window.confirm(`Delete ${name}?`) === false) {
      return;
    }

    axiosCalls
      .deleteBackend(id)
      .then(() => {
        const newPeople = persons.filter((person) => {
          return person.id !== id;
        });
        setNewError(`${name} was succesfully deleted`);
        setPersons(newPeople);
      })
      .catch(() => {
        setNewError(`${name} has already been deleted, please reload`);
      });
    setTimeout(() => {
      setNewError(null);
    }, 3000);
  };
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
    axiosCalls.createBackend(person).then((data) => {
      setPersons(persons.concat(data));
      setNewName("");
      setNewNumber("");
      setNewSuccess(`${data.name} was succesfully added`);
      setTimeout(() => {
        setNewSuccess(null);
      }, 3000);
    });
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
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      let clone = persons;

      response.data.forEach((r) => {
        const person = {
          name: r.name,
          number: r.number,
          id: r.id,
        };
        clone = clone.concat(person);
      });

      setPersons(clone);
    });
    // eslint-disable-next-line
  }, []);
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
      <Success val={newSuccess} />
      <Error val={newError} />

      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} click={deleteUser} />
    </div>
  );
};

export default App;
