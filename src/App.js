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
//      medals: "12"

// 2. Из полученных данных с API вывести список всех стран с кол-вом медалей спортсменов, принадлежащих данной стране

// Не запрещается использовать Google для уточнения работы некоторых методов, которые Вы собираетесь использовать.

let App = () => {
  const API = 'https://www.ag-grid.com/example-assets/olympic-winners.json'
  const [arr, setArr] = useState([])
 
  

  useEffect(() => {
    axios.get(API)
      .then(response => { setArr(response.data.slice(9, 19).map((el,index)=>({...el,boolButton:false,id:index}))) });
     
  }
    , [])
 

    let onButtonClick = (id) => {
      const copyArr = [...arr];
     
     copyArr.forEach(e => {
       if(e.id === id){
         e.boolButton = !e.boolButton;
         console.log(e.boolButton);
       }
     })
    
    setArr(copyArr);
    }

  return (
    <div className="App">
      
      {arr.map((u) => (
        <User
          
          onButtonClick={onButtonClick}
          key={u.id}
          id={u.id}
          name={u.athlete}
          age={u.age}
          sport={u.sport}
          country={u.country}
          medals={u.total}
          boolButton={u.boolButton}
        />
      ))}
    </div>
  );

}

let User = ({ name, age, sport, country, medals,onButtonClick, boolButton, id}) => {
  return (
    <div >
      <p>{name} ({id})
        <button onClick={()=>{onButtonClick(id)}}>+</button>
        {boolButton?<span>
          <p>age:{age}</p>
          <p>sport:{sport}</p>
          <p>country:{country}</p>
          <p>medals:{medals}</p>
        </span>:''}
      </p>

    </div>
  )
}


export default App;
