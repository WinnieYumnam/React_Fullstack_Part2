const Course = (props) => {
    return (
        <>
            <h2>{props.title}</h2>
            {props.part.map(part => 
            <p key = {part.id}>
            {part.name} {part.exercises}</p>  
            )}
            <h3> Total of {props.part.reduce((sum, exercise)=> sum + exercise.exercises,0)}</h3>         
        </>      
    )
  }
  
  export default Course