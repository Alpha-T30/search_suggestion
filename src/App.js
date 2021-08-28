import { useState, useEffect } from "react";
import axios from "axios";
import "./App.scss";

function App() {
  const [users, setUser] = useState([]);
  const [text, setText] = useState("");
  const [suggestion, setSuggestion] = useState([]);

 
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("https://reqres.in/api/users");
      setUser(res.data.data);
    };
    fetchUser();
  }, []);

  const onChangeHandler = (text) => {
    let matches = [];
    if (text.length > 0) {
      matches = users.filter((user) => {
        const regex = new RegExp(`${text}`, "gi");
        return user.email.match(regex);
      });
    }

    setSuggestion(matches);
    setText(text);
  };
  const handleClick = (e) => {
    setText(e);
    setSuggestion([]);
  };

  document.addEventListener("click", function (e) {
    !document.getElementById("form").contains(e.target) && setSuggestion([]);
  });
  return (
    <div className="App">
      <form id="form">
        <div className="searchh">
          <input
            value={text}
            onChange={(e) => onChangeHandler(e.target.value)}
            type="text"
            name="search"
            id="search"
            autoComplete="off"
          />
          <button>Search</button>
        </div>
        {suggestion.map((s, i) => {
          return (
            <div
              onClick={() => handleClick(s.email)}
              className="suggestion"
              key={i}
            >
              {s.email}
            </div>
          );
        })}
      </form>

      <div className="content">
        {suggestion.map((u, i) => {
          return (
            <div key={i} className="card">
              <img src={u.avatar} alt="" />
              <span>
                Name: {u.first_name} {u.last_name}
              </span>
              <h4>Email: {u.email}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
