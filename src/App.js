import React, { useState, useEffect, useMemo } from 'react';

import axios from 'axios';

const API = 'https://www.ag-grid.com/example-assets/olympic-winners.json'

const App = () => {
  const [athleteList, setAthleteList] = useState([])

  useEffect(() => {
    axios.get(API)
      .then(response => {
        setAthleteList(response.data || [])
      })
  }, [])

  const countrysObj = useMemo(() => {
    return athleteList.reduce((acc, element) => {
      const prevValue = acc[element.country] || { total: 0, country: element.country }

      return {
        ...acc,
        [element.country]: {
          ...prevValue,
          total: prevValue.total + element.total
        }
      }
    }, {})
  }, [athleteList])
  

  return (
    <div className="App">
      {athleteList.slice(9, 19).map((athlete) => (
        <User
          key={athlete.athlete + athlete.age + athlete.sport + athlete.total}
          {...athlete}
        />
      ))}

      {Object.values(countrysObj).map(country => (
        <City
          key={country.country}
          {...country}
        />
      ))}
    </div>
  );
}

const User = ({ athlete, age, sport, country, total }) => {
  const [isOpen, setIsOpen] = useState(false)

  const onButtonClick = () => {
    setIsOpen(!isOpen);
  }

  return (
    <div >
      <p>
        <button onClick={onButtonClick}>{isOpen ? '-' : '+'}</button>
        {athlete}
        {
          isOpen ? <span>
            <p>age:{age}</p>
            <p>sport:{sport}</p>
            <p>country:{country}</p>
            <p>medals:{total}</p>
          </span> : null
        }
      </p>

    </div>
  )
}

const City = ({ country, total }) => {
  return (
    <div>
      <p>{country}: {total}</p>
    </div>
  )
}

export default App;