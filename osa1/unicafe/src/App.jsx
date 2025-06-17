import { useState } from 'react'




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

      <h2>statistics</h2>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {total}</p>
      <p>average {(good - bad)/total}</p>
      <p>positive {(good/total)*100} %</p>
    </div>
  )
}

export default App