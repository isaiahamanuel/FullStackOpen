const Persons = (props) => {
  return props.peopleToShow.map((person) => {
    return (
      <div key={person.id}>
        {" "}
        {person.name} {person.number}
        <button
          onClick={() => {
            props.click(person.id, person.name);
          }}
        >
          Delete
        </button>
      </div>
    );
  });
};

export default Persons;
