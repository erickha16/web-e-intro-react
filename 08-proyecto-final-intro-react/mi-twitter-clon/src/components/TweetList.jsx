import { Tweet } from "./Tweet";

export const TweetList = ({ tweets, onLike }) => {
  return (
    <div className="tweet-list">
      {tweets.length > 0 ? (
        tweets.map(tweet => (
          <Tweet key={tweet.id} tweet={tweet} onLike={onLike} />
        ))
      ) : (
        <p className="no-tweets">No hay tweets para mostrar</p>
      )}
    </div>
  );
};