import { useState, useEffect } from "react";
import axios from "axios";

const Countries = (props) => {
  if (props.filter.length === 0) {
    return <div>No countries found</div>;
  }
  if (props.filter.length === 250) {
    return <div>Enter Country</div>;
  }
  if (props.filter.length >= 11) {
    return <div>Too many results, please filter search</div>;
  }
  if (props.list.length === 1) {
    return (
      <div>
        {console.log(props.list)}
        <h1>{props.list[0].name}</h1>
        <div>capital:{props.list[0].capital}</div>
        <div>area:{props.list[0].area}</div>
        <h1>languages</h1>
        <ul>
          {Object.entries(props.list[0].languages).map(([key, value]) => {
            return <li key={key}>{value}</li>;
          })}
        </ul>
        <div>
          <img src={props.list[0].flag.png} alt="flag" />
        </div>
      </div>
    );
  }
  return (
    <div>
      {props.list.map((country) => {
        return <div key={country.name}> {country.name} </div>;
      })}
    </div>
  );
};
function App() {
  const [newInput, setInput] = useState("");
  const [newData, setData] = useState([]);
  const addNewInput = (event) => {
    setInput(event.target.value);
  };

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      let arr = [];
      response.data.forEach((element) => {
        const country = {
          name: element.name.common,
          capital: element.capital,
          area: element.area,
          languages: element.languages,
          flag: element.flags,
        };
        arr.push(country);
      });
      setData(arr);
    });
  }, []);
  const filteredCountries = newData.filter((data) => {
    return data.name.toLowerCase().includes(newInput.toLowerCase()) === true;
  });
  console.log(filteredCountries);
  let countriesToShow = filteredCountries.length <= 10 ? filteredCountries : [];

  return (
    <div>
      <div>
        find countries <input value={newInput} onChange={addNewInput} />
      </div>
      <Countries list={countriesToShow} filter={filteredCountries} />
    </div>
  );
}

export default App;
