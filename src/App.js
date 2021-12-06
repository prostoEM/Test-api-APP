import React, { useState, useEffect } from 'react';


import axios from 'axios';

//  дан JSON: "https://www.ag-grid.com/example-assets/olympic-winners.json"
// 1. Вывести с 10 по 20 элементы массива, используя следующую структуру:

// + John Smith
// при нажатии на "+"
// - John Smith
//      age: "33"
//      sport: "swimming"
//      country: "Germany"
//      totals: "12"

// 2. Из полученных данных с API вывести список всех стран с кол-вом медалей спортсменов, принадлежащих данной стране

// Не запрещается использовать Google для уточнения работы некоторых методов, которые Вы собираетесь использовать.

let App = () => {


  const API = 'https://www.ag-grid.com/example-assets/olympic-winners.json'
  const [arr, setArr] = useState([])


  useEffect(() => {
    axios.get(API)
      .then(response => {
        setArr(response.data)
      })
  }
    , [])

  const sortListOfCountry = arr.reduce((acc, element) => {
    let indexElement = acc.map((accEl) => accEl.country).indexOf(element.country);
    indexElement !== -1 ?
      (acc[indexElement].total += element.total) :
      acc.push({ country: element.country, total: element.total });
    return acc;
  }, []);





  return (
    <div className="App">

      {arr.slice(9, 19).map((u) => (
        <User
          key={u.athlete + u.age + u.sport + u.total}
          name={u.athlete}
          age={u.age}
          sport={u.sport}
          country={u.country}
          totals={u.total}
        />
      ))}

      {sortListOfCountry.map(e => (
        <City
          key={e.country + e.total}
          country={e.country}
          total={e.total}
        />
      ))}

    </div>
  );

}

let User = ({ name, age, sport, country, totals }) => {
  const [isOpen, setIsOpen] = useState(false)
  const onButtonClick = () => {
    setIsOpen(!isOpen);
  }
  return (
    <div >
      <p>
        <button onClick={onButtonClick}>{isOpen ? '-' : '+'}</button>
        {name}
        {isOpen ? <span>
          <p>age:{age}</p>
          <p>sport:{sport}</p>
          <p>country:{country}</p>
          <p>medals:{totals}</p>
        </span> : ''}
      </p>

    </div>
  )
}


let City = ({ country, total }) => {
  return (
    <div>
      <p>{country}:  {total}</p>
    </div>
  )
}


export default App;



