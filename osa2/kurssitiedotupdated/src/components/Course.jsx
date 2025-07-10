const Course = ({ course }) => {
  console.log('coursen propsit', course)

    const otsikot = course.map(x =>
    <h1 key={x.id}>
      {x.name}
    </h1>
  )


  console.log(otsikot)

   const sisalto = course.map(x =>
    <Course key={x.id}>
      {x.parts}
    </Course>
  )


  console.log(sisalto)


  return (
    <div>
      <Header header={'Web development curriculum'} />
      {
        course.map(x =>
          <div key={x.id}>
            <Header course={x.name}/> <Content parts={x.parts} /> <Total parts={x.parts} />
          </div>
        )
      }
    </div>
  )
}


const Header = ({ header, course }) => {
  console.log('pääotsikko', header)
  console.log('headerin propsi', course)
  return (
    <div>
      <h1>{header}</h1>
      <h2>{course}</h2>
    </div>
  )
}


const Content = ({ parts }) => {
  console.log('contentin propsit', parts)
  return (
   <div>
    <Part parts={parts} />
   </div>
  )
}


const Part = ({ parts }) => {
  console.log('partin propsit', parts)
  const sisalto = parts.map(x =>
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


const Total = ({ parts }) => { 

//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce


const sum = parts.reduce(
  (accumulator, current) => accumulator + 
  current.exercises,
  0
)

  return (
    <div><h2>total of {sum} exercises</h2></div>
  )
}

export default Course