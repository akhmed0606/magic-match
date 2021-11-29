import { useState, useEffect } from "react";
import SingleCard from "../src/components/SingleCard";
import "./App.css";

const cardImages = [
  { src: "/image/1.png", matched: false },
  { src: "/image/2.png", matched: false },
  { src: "/image/3.png", matched: false },
  { src: "/image/4.png", matched: false },
  { src: "/image/5.png", matched: false },
  { src: "/image/6.png", matched: false },
];

function App() {
  const [card, setCard] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiseOne, setChoiseOne] = useState(null);
  const [choiseTwo, setChoiseTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const cards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));
    
    setChoiseOne(null)
    setChoiseTwo(null)
    setCard(shuffledCards);
    setTurns(0);
  };

  //Handle click
  const handleChoise = (card) => {
    choiseOne ? setChoiseTwo(card) : setChoiseOne(card);
  };

  //Compare two cards
  useEffect(() => {
    if (choiseOne && choiseTwo) {
      setDisabled(true);
      if (choiseOne.src === choiseTwo.src) {
        setCard((prevCard) => {
          return prevCard.map((card) => {
            if (card.src === choiseOne.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000);
      }
    }
  }, [choiseOne, choiseTwo]);

   //Start game automaticly
   useEffect(() => {
       cards()
   },[])
   
  //reset function
  const resetTurn = () => {
    setChoiseOne(null);
    setChoiseTwo(null);
    setTurns((prevTurns) => prevTurns + 1);
    setDisabled(false);
  };
  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={cards}>New Game</button>
      <div className="card-grid">
        {card.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoise={handleChoise}
            flipped={card === choiseOne || card === choiseTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <hr></hr>
      <h4>Turns:<p className='count'>{turns}</p ></h4>
    </div>
  );
}

export default App;
