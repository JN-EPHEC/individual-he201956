import { useEffect, useState } from "react";
import "./App.css";



// Définition d'une interface pour le typage
// Sera couvert plus en profondeur en TH
interface User {
  id: number;
  nom: string;
  prenom: string;
  createdAt: string;
  updatedAt: string;
}
function App() {
  // 1. Définition de l'état
  const [users, setUsers] = useState<User[]>([]);
  // 2. Appel API au montage du composant
  useEffect(() => {
    fetch("http://localhost:3000/api/users")
    .then(res => res.json())
    .then(result => setUsers(result))
    .catch(err => console.error(err));
  }, []);

  // 3. Rendu (JSX)
  return (
    <div>
      <h1>Liste des utilisateurs</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            {user.prenom} {user.nom}
          </li>
          ))}
      </ul>
    </div>
  );
}

export default App;

