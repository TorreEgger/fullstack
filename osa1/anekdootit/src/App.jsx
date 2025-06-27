import { useState } from 'react'


const MostVotes = (props) => {
  
  if (props.largest === 0) {
    return (
      <div>
        <p>Needs votes to be shown</p>
      </div>
    )
  }

  return (
    <div>
      <p>{props.anecdotes[props.index]}</p>
      <p>has {props.largest} votes</p>
    </div>
  )


}
    

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]

   
  const [selected, setSelected] = useState(0)

  const [vote, setVote] = useState(new Uint8Array(8)) // https://stackoverflow.com/questions/20222501/how-to-create-a-zero-filled-javascript-array-of-arbitrary-length/22209781
  let copy = { ...vote }

  const [largest, setLargest] = useState(0)
  const [index, setIndex] = useState(0)

  const largestCopy = largest


  // tutkitaan mikä on isoin
  for (let i = 0; i<8; i++) {
    if (copy[i] > largestCopy) {
      setLargest(copy[i])
      setIndex(i)
    }
  }


//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
//täältä katsottu miten satunnaislukuja generoidaan


  const handleShuffle = () => {
    let valinta = 0
    valinta = Math.floor(Math.random() * 8) 
    setSelected(valinta)
  }


  const handleVotes = () => {
    copy[selected] += 1
    setVote(copy)
   // console.log(copy)
   console.log(copy)
  }


  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {vote[selected]} votes</p>
      <button onClick={handleVotes}>vote</button>
      <button onClick={handleShuffle}>next anecdote</button>
      <h2>Anecdote with most votes</h2>
      <MostVotes largest={largest} index={index} anecdotes={anecdotes} />
    </div>
  )
}


export default App