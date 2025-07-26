const Persons = (props) => {
  return (
    <div>
       {props.show.map(x =>
      <p key={x.id}>
        {x.name} {x.number} <button onClick={() => props.remove(x.id)}>delete</button>
      </p>
      )}
    </div>

  )
}

export default Persons