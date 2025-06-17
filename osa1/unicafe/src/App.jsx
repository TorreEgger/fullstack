import { useState } from 'react'


const Statistics = (props) => {
  return (
    <div>
      <h2>statistics</h2>
      <p>good {props.good}</p>
      <p>neutral {props.neutral}</p>
      <p>bad {props.bad}</p>
      <p>all {props.total}</p>
      <p>average {(props.good - props.bad)/props.total}</p>
      <p>positive {(props.good/props.total)*100} %</p>
    </div>
  )
}




const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  // total samalla tavalla kuin materiaalissa, siistimpi näin
  // kuin renderöinnin yhteydessä laskeminen
  const [total, setTotal] = useState(0)
  




  const handleGoodClick = () => {
    const uusiMaara = good + 1
    setGood(good + 1)
    setTotal(uusiMaara + neutral + bad)
  }

  const handleNeutralClick = () => {
    const uusiMaara = neutral + 1
    setNeutral(neutral + 1)
    setTotal(uusiMaara + good + bad)
  }

  const handleBadClick = () => {
    const uusiMaara = bad + 1
    setBad(bad + 1)
    setTotal(uusiMaara + good + neutral)
  }




  return (
    <div>
      <h1>give feedback</h1>

      <button onClick={handleGoodClick}>good</button>
      <button onClick={handleNeutralClick}>neutral</button>
      <button onClick={handleBadClick}>bad</button>

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />

    </div>
  )
}

export default App