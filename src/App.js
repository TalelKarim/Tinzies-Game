import React  from "react";
import './style.css'
import Die from "./Components/Die";
import {nanoid} from "nanoid"

export default function App(){
 const [dice,setDice]= React.useState(allNewDice);

function holdDice(id){
   setDice( oldDice => oldDice.map(die => {
   return die.id === id ? {...die, isHeld: !die.isHeld } : die
   })
   )


}


function allNewDice(){
  const newDice = []
  for(let i=0; i<10 ; i++){
    newDice.push({
       value :Math.ceil(Math.random()*6),
      isHeld: false,
      id: nanoid()
    });
  }
  return newDice;
}

const diceElements = dice.map(element => {
  return <Die
    key ={element.id}
    value={element.value}
    isHeld = {element.isHeld}
    holdDice  = {() => {holdDice(element.id)}}
    />
})


  return <main> 

          <div className="dice-container">
             {diceElements}
          </div>
          <button className="roll-dice"
           onClick={() => setDice(allNewDice)}
          >
            Roll 
          </button>
     </main> 
}
