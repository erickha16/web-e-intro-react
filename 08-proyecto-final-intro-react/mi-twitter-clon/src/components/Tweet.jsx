export const Tweet = ({ tweet, onLike }) => {
  return (
    <div className="tweet-card">
      <div className="tweet-header">
        <span className="tweet-username">@{tweet.username}</span>
        <span className="tweet-date">
          {new Date(tweet.date).toLocaleString()}
        </span>
      </div>
      <p className="tweet-text">{tweet.text}</p>
      <div className="tweet-footer">
        <button 
          onClick={() => onLike(tweet.id)} 
          className="like-button"
        >
          {tweet.likes} ❤️
        </button>
      </div>
    </div>
  );
};