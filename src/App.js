import React, { useState, useEffect } from "react";

import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositories(response.data);
    });
  }, []);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      id: "123",
      url: "https://github.com/josepholiveira",
      title: "Desafio ReactJS",
      techs: ["React", "Node.js"],
    });

    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const arr = repositories.slice();
    const index = arr.findIndex(rep => rep.id === id);
    arr.splice(index, 1);
    setRepositories(arr);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map(rep => {
            return (
              <li key={rep.id}>
                {rep.title}

                <button onClick={() => handleRemoveRepository(rep.id)}>
                  Remover
                </button>
              </li>
            )
          }    
        ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
