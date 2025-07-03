import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Home } from "./pages/Home";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { NotFound } from "./pages/NotFound";
import "./styles/styles.css";

export const App = () => {
  const [user, setUser] = useState(null);
  const [tweets, setTweets] = useState([]);

  // Cargar usuario y tweets de localStorage al iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem("twitter-user");
    const storedTweets = localStorage.getItem("twitter-tweets");
    
    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedTweets) setTweets(JSON.parse(storedTweets));
  }, []);

  // Guardar tweets en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("twitter-tweets", JSON.stringify(tweets));
  }, [tweets]);

  const login = (username) => {
    const userData = { 
      username,
      id: Date.now(),
      joinedDate: new Date().toISOString()
    };
    setUser(userData);
    localStorage.setItem("twitter-user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("twitter-user");
  };

  const addTweet = (text) => {
    const newTweet = {
      id: Date.now(),
      text,
      likes: 0,
      userId: user.id,
      username: user.username,
      date: new Date().toISOString()
    };
    setTweets([newTweet, ...tweets]);
  };

  const likeTweet = (id) => {
    setTweets(tweets.map(tweet => 
      tweet.id === id ? {...tweet, likes: tweet.likes + 1} : tweet
    ));
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login onLogin={login} />} />
        <Route 
          path="/" 
          element={
            <Home 
              user={user} 
              tweets={tweets} 
              onAddTweet={addTweet} 
              onLike={likeTweet} 
              onLogout={logout} 
            />
          } 
        />
        <Route
          path="/profile"
          element={user ? <Profile user={user} tweets={tweets} /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};