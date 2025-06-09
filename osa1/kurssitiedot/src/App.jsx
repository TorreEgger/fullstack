const App = () => {
  const course = 'Half Stack application development'
  const part1 = {
    name: 'Fundamentals of React',
    exercises: 10
  }
  const part2 = {
    name: 'Using props to pass data',
    exercises: 7
  }
  const part3 = {
    name: 'State of a component',
    exercises: 14
  }


  return (
    <div>
      <Header course={course} />
      <Content name1={part1.name} exercises1={part1.exercises} />
      <Content name2={part2.name} exercises2={part2.exercises} />
      <Content name3={part3.name} exercises3={part3.exercises} />
      <Total part1={part1.exercises} part2={part2.exercises} part3={part3.exercises}/>
    </div>
  )
}


const Header = (props) => {
  console.log(props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Content = (props) => {
  return (
    <div>
      <Part name1={props.name1} exercises1={props.exercises1} />
      <Part name2={props.name2} exercises2={props.exercises2} />
      <Part name3={props.name3} exercises3={props.exercises3} />
    </div>
  )
}


const Part = (props) => {
  return (
    <div>
      <p>{props.name1} {props.exercises1}</p>
      <p>{props.name2} {props.exercises2}</p>
      <p>{props.name3} {props.exercises3}</p>
    </div>
  )
}


const Total = (props) => { 
  return (
    <p>Number of exercises {props.part1 + props.part2 + props.part3}</p>
  )
}







export default App