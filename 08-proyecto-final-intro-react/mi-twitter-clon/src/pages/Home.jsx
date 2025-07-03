import { TweetForm } from "../components/TweetForm";
import { TweetList } from "../components/TweetList";

export const Home = ({ user, tweets, onAddTweet, onLike, onLogout }) => {
  return (
    <div className="home-container">
      <header className="app-header">
        <h1>Twitter Clone</h1>
        {user && (
          <div className="user-controls">
            <span>Hola, @{user.username}</span>
            <button onClick={onLogout} className="logout-button">
              Cerrar sesión
            </button>
          </div>
        )}
      </header>

      {user ? (
        <>
          <TweetForm onAddTweet={onAddTweet} />
          <TweetList tweets={tweets} onLike={onLike} />
        </>
      ) : (
        <div className="login-prompt">
          <p>Por favor inicia sesión para ver y publicar tweets</p>
        </div>
      )}
    </div>
  );
};