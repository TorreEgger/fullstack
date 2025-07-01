const App = () => {
  const course = {
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
        name: 'How to use map',
        exercises: 4,
        id: 4
      },
      {
        name: "How to use Reduce",
        exercises: 6,
        id: 5
      }
    ]
  }


  return (
    <div>
      <Course course={course} />
    </div>
  )
}

const Course = (props) => {
  console.log('coursen propsit', props)
  return (
    <div>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </div>
  )
}


const Header = (props) => {
  console.log('headerin propsit', props)
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}


const Content = (props) => {
  console.log('contentin propsit', props)
  return (
   <div>
    <Part parts={props.parts} />
   </div>
  )
}


const Part = (props) => {
  console.log('partin propsit', props)
  const sisalto = props.parts.map(x =>
      <p key={x.id}>
        {x.name} {x.exercises}
      </p>
  )


  return (
   <div>
    {sisalto}
   </div>
  )
}


const Total = (props) => { 
console.log('totalin propsit', props.parts[0].exercises)
let sum = 0
for(let i = 0; i<props.parts.length; i++) {
  sum += props.parts[i].exercises
}
  return (
    <div><h2>total of {sum} exercises</h2></div>
  )
}


export default App