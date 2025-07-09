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

  const kutsut = courses.map(x =>
    <Course key={x.id}>
      {x.parts}
    </Course>
  )
  console.log('kutsut', kutsut)

/*
const kutsuFunktio = () => {
  for(let i = 0; i<courses.length; i++) {
    return kutsut
  }
}
  */


  return (
    <div>
      <Course course={courses} />
    </div>
  )
}


const Course = (props) => {
  console.log('coursen propsit', props)



    const otsikot = props.course.map(x =>
    <h1 key={x.id}>
      {x.name}
    </h1>
  )


  console.log(otsikot)

   const sisalto = props.course.map(x =>
    <Course key={x.id}>
      {x.parts}
    </Course>
  )


  console.log(sisalto)


  return (
    <div>
      <h1>Web development curriculum</h1>
      {
        props.course.map(x =>
          <div key={x.id}>
            <Header course={x.name}/> <Content parts={x.parts} /> <Total parts={x.parts} />
          </div>
        )
      }
    </div>
  )
}


const Header = (props) => {
  console.log('headerin propsit', props)
  return (
    <div>
      <h2>{props.course}</h2>
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

/*let sum = 0
for(let i = 0; i<props.parts.length; i++) {
  sum += props.parts[i].exercises
}
  */


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce
/*const sum = props.parts.reduce((
  accumulator, current) => {
    console.log('accumulator', accumulator)
    console.log('current', current.exercises)
    return accumulator.exercises + current.exercises
  }
) 
  */

const sum = props.parts.reduce(
  (accumulator, current) => accumulator + 
  current.exercises,
  0
)




  return (
    <div><h2>total of {sum} exercises</h2></div>
  )
}


export default App