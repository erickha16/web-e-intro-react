import { TweetList } from "../components/TweetList";

export const Profile = ({ user, tweets }) => {
  const userTweets = tweets.filter(tweet => tweet.userId === user.id);

  return (
    <div className="profile-container">
      <h1>Perfil de @{user.username}</h1>
      <div className="profile-info">
        <p>Miembro desde: {new Date(user.joinedDate).toLocaleDateString()}</p>
        <p>Tweets: {userTweets.length}</p>
        <p>Likes totales: {userTweets.reduce((sum, tweet) => sum + tweet.likes, 0)}</p>
      </div>

      <h2>Mis Tweets</h2>
      {userTweets.length > 0 ? (
        <TweetList tweets={userTweets} />
      ) : (
        <p>No has publicado ningún tweet todavía</p>
      )}
    </div>
  );
};