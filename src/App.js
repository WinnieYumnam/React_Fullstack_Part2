import Course from './components/Course';

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  let reduceResult = courses.reduce((sum, exercise)=> sum + exercise.parts.exercises,0)
  console.log("Reduce result", reduceResult);

  let mapResult = courses.map((course)=> {
    let courseParts = course.parts.map((part)=>{
      return  part.name+ "." + part.exercises
    })
    return courseParts
  })
  console.log("Map result", mapResult);

  return (
    <>
    <h1>Web Development Curriculum</h1>
    {courses.map(course =>
        <Course key = {course.id} title = {course.name} 
        part={course.parts}
        />
      )}
        
    </> 
  ) 
}

export default App