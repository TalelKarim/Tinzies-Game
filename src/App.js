import React  from "react";
import './style.css'
import Die from "./Components/Die";
import {nanoid} from "nanoid"
import Confetti from 'react-confetti';

export default function App(){
 const [dice,setDice]= React.useState(allNewDice);
 const [tenzies, setTenzies] = React.useState(false);

React.useEffect( () => {
    const allHeld = dice.every(die => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every(die => die.value === firstValue)
    if(allHeld && allSameValue){
      setTenzies(true);
    }

} , [dice]) 

function holdDice(id){
   setDice( oldDice => oldDice.map(die => {
   return die.id === id ? {...die, isHeld: !die.isHeld } : die
   })
   )


}

function generateNewDie(){
  return  {
    value: Math.ceil(Math.random()*6),
    isHeld: false,
    id: nanoid()
  }
}

function rollDice(){
   if(!tenzies){
      setDice( oldDice => oldDice.map(die => {
        return die.isHeld ? 
        die : generateNewDie()

    }))
  }
    else{
      setTenzies(false)
      setDice( allNewDice()); 
       }

   
    


}

function allNewDice(){
  const newDice = []
  for(let i=0; i<10 ; i++){
    newDice.push(generateNewDie());
  }
  return newDice;
}

const diceElements = dice.map(element => {
  return <Die
    key ={element.id}
    value={element.value}
    isHeld = {element.isHeld}
    holdDice={() => holdDice(element.id)}
    />
})


  return <main> 

           <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it 
            at its current value between rolls.</p>

          <div className="dice-container">
             {diceElements}
          </div>
          <button className="roll-dice"
           onClick={() => rollDice()}
          >
            {tenzies ? "New Game" : "Roll"}
          </button>
          {tenzies && <Confetti />}
     </main> 
}
