import "../components/SingleCard.css";

function SingleCard({ card, handleChoise,flipped,disabled }) {
  const handleClick = () => {
      if (!disabled) {
        handleChoise(card)
      }
       
  };
  return (
    <div className="card">
      <div className={flipped ? 'flipped': ''}>
        <img className="front" src={card.src} alt="card-front" />
        <img
          className="back"
          src="/image/cover1.jpg"
          alt="card-back"
          onClick={handleClick}
        />
      </div>
    </div>
  );
}

export default SingleCard;
