const Total = (props) => {
  const total = props.items.reduce((a, b) => {
    return a + b.exercises;
  }, 0);
  return (
    <div>
      total:
      {total}
    </div>
  );
};

const Header = (props) => {
  return <h1>{props.title}</h1>;
};
const Content = (props) => {
  return (
    <div>
      {props.items.map((item) => {
        return (
          <div key={item.id}>
            {item.name}: {item.exercises}
          </div>
        );
      })}
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header title={props.course.name} />
      <Content items={props.course.parts} />
      <Total items={props.course.parts} />
    </div>
  );
};

const App = () => {
  const course = {
    id: 1,
    name: "Half Stack application development",
    parts: [
      {
        name: "Fundamentals of React",
        exercises: 10,
        id: 1,
      },
      {
        name: "Using props to pass data",
        exercises: 7,
        id: 2,
      },
      {
        name: "State of a component",
        exercises: 14,
        id: 3,
      },
    ],
  };

  return <Course course={course} />;
};

export default App;
