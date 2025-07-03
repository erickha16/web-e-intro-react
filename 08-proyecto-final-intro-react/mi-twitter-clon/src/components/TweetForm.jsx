import { useState } from "react";

export const TweetForm = ({ onAddTweet }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) {
      setError("El tweet no puede estar vacío");
      return;
    }
    if (text.length > 280) {
      setError("El tweet no puede tener más de 280 caracteres");
      return;
    }
    onAddTweet(text);
    setText("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit} className="tweet-form">
      <textarea
        placeholder="¿Qué está pasando?"
        value={text}
        onChange={(e) => {
          setText(e.target.value);
          setError("");
        }}
        maxLength={280}
        className="tweet-input"
      />
      <div className="tweet-form-footer">
        {error && <p className="error-message">{error}</p>}
        <span className="char-count">{text.length}/280</span>
        <button type="submit" className="tweet-button">
          Tweet
        </button>
      </div>
    </form>
  );
};