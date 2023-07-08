import Course from './components/Course';

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 3
      }
    ]
  }

  let result = course.parts.reduce((sum, exercise)=> sum + exercise.exercises,0)
  console.log("Map result", result);

  return (
    <>
    <h1>{course.name}</h1>
    <ul>
      {course.parts.map(part =>
          <Course key = {part.id} name={part.name} exercise = {part.exercises}/>
        )}
    </ul>   
    <h3>Total of {result}</h3> 
    </> 
  ) 
}

export default App