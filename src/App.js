import React, { useState, useEffect } from "react";

import "./styles.css";
import api from './services/api';

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('repositories').then( response => {
      setRepositories(response.data);
    })
  }, []);

  async function handleAddRepository() {
    const repository = {
      title: 'gabrieldeoa',
      url: 'https://github.com/gabrieldeoa/gabrieldeoa',
      techs: ['Nodejs', 'React JS','React Native']
    }

    const { data } = await api.post('repositories', repository);
    setRepositories([...repositories, data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);
    const newRepositories = repositories.filter(repository => repository.id !== id)
    setRepositories([...newRepositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repository) => {
            return (
              <li key={repository.id}>
                { repository.title }
                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
                </button>
              </li>
            )
          })
        }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
