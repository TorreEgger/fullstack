import { useState } from 'react'


const StatisticLine = (props) => {
  if (props.text != 'positive') { // inspiroitu ehdollisesta renderöinnistä
  return (
    <div>
      <p>
        {props.text} {props.value}
      </p>
    </div>
  )
  }

  return (
    <div>
      <p>
        {props.text} {props.value} %
      </p>
    </div>
  )
}



// samanlainen kuin materiaalissa
const Button = ({ onClick, text}) => <button onClick={onClick}>{text}</button>


const Statistics = (props) => {
  if (props.total === 0) { // ehdollinen renderöinti kuten materiaalissa
  return (
    <div>
      <p>no feedback given</p>
    </div>
  )
  }

  return (
    <div>
      <h2>statistics</h2>
      <StatisticLine text="good" value={props.good} />
      <StatisticLine text="neutral" value={props.neutral} />
      <StatisticLine text="bad" value={props.bad} />
      <StatisticLine text="all" value={props.total} />
      <StatisticLine text="average" value={(props.good - props.bad)/props.total} />
      <StatisticLine text="positive" value={(props.good/props.total)*100} />
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

      <Button onClick={handleGoodClick} text='good' />
      <Button onClick={handleNeutralClick} text='neutral' />
      <Button onClick={handleBadClick} text='bad' />

      <Statistics good={good} neutral={neutral} bad={bad} total={total} />

    </div>
  )
}


export default App