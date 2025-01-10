import React, { useState } from "react";

function App() {
  const [items, setItems] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Liste hinzufügen</h1>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Neues Item"
        style={{ padding: "8px", fontSize: "16px" }}
      />
      <button
        onClick={handleAddItem}
        style={{
          marginLeft: "10px",
          padding: "8px 16px",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        Hinzufügen
      </button>
      <ul>
        {items.map((item, index) => (
          <li key={index} style={{ margin: "8px 0" }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
