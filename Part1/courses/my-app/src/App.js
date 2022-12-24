const Header = (prop) => {
   
  return (
    <div>
      <h1>{prop.course} exercises</h1>
    </div>
  )
}

const Content = (prop) => {

  return (
    <div>
      <Part part={prop.part[0]}/>
      <Part part={prop.part[1]}/>
      <Part part={prop.part[2]}/>
    </div>
  )
}
const Part = (prop) => {
 
  return (
    
    <div>
      
      <p>{prop.part.name}: {prop.part.exercises} exercises </p>
    </div>
  )
}

const Total = (prop) => {
  return (
    <div>
      <p>{prop.part[0].exercises + prop.part[1].exercises + prop.part[2].exercises} total courses</p>
    </div>
  )
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content part={course.parts}/>
      <Total part={course.parts} />
    </div>
  )
}

export default App