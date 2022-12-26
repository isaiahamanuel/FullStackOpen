import { useState } from "react";
const StatisticsLine = (props) => {
  return (
    <tr>
      <th> {props.text}</th>
      <td>
        {props.rating}
        {props.word}
      </td>
    </tr>
  );
};
const Statistics = (props) => {
  return (
    <>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <StatisticsLine text="good" rating={props.ratings.good} />
          <StatisticsLine text="neutral" rating={props.ratings.neutral} />
          <StatisticsLine text="bad" rating={props.ratings.bad} />
          <StatisticsLine text="total" rating={props.ratings.total} />
          <StatisticsLine
            text="average"
            rating={
              (props.ratings.good - props.ratings.bad) / props.ratings.total
            }
          />
          <StatisticsLine
            text="percent positive"
            rating={(props.ratings.good / props.ratings.total) * 100}
            word="%"
          />
        </tbody>
      </table>
    </>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const total = good + bad + neutral;

  const updateGood = () => {
    setGood(good + 1);
  };
  const updateNeutral = () => {
    setNeutral(neutral + 1);
  };
  const updateBad = () => {
    setBad(bad + 1);
  };
  const ratings = { good, neutral, bad, total };
  if (!good && !neutral && !bad) {
    return (
      <div>
        <h1>give feedback</h1>
        <button onClick={updateGood}>good</button>
        <button onClick={updateNeutral}>neutral</button>
        <button onClick={updateBad}>bad</button>
        <h1>Waiting for data</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={updateGood}>good</button>
      <button onClick={updateNeutral}>neutral</button>
      <button onClick={updateBad}>bad</button>
      <Statistics ratings={ratings} />
    </div>
  );
};

export default App;
