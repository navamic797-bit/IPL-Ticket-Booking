function MatchCard({ teams, date, time, venue, onBook }) {
  return (
    <div className="match-card">
      <div>
        <h3>{teams}</h3>
        <p><strong>Date:</strong> {date}</p>
        <p><strong>Time:</strong> {time}</p>
        <p><strong>Venue:</strong> {venue}</p>
      </div>
      <button className="hero-btn" onClick={() => onBook(teams)}>
        Book Ticket
      </button>
    </div>
  );
}

export default MatchCard;