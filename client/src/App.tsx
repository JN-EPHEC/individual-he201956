import { useEffect, useState } from "react";
import "./App.css";

interface User {
  id: number;
  nom: string;
  prenom: string;
  createdAt: string;
  updatedAt: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [search, setSearch] = useState("");
  const [editId, setEditId] = useState<number | null>(null);

  // Charger les utilisateurs
  const loadUsers = async () => {
    const url = search
      ? `http://localhost:3000/api/users?search=${encodeURIComponent(search)}`
      : "http://localhost:3000/api/users";

    const res = await fetch(url);
    const data = await res.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, [search]);

  // Ajouter ou modifier
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!nom || !prenom) return alert("Veuillez remplir tous les champs");

    if (editId) {
      await fetch(`http://localhost:3000/api/users/${editId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom }),
      });

      setEditId(null);
    } else {
      await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom }),
      });
    }

    setNom("");
    setPrenom("");
    loadUsers();
  };

  // Supprimer
  const deleteUser = async (id: number) => {
    await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
    });

    loadUsers();
  };

  // Modifier
  const editUser = (user: User) => {
    setNom(user.nom);
    setPrenom(user.prenom);
    setEditId(user.id);
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Liste des étudiants</h1>

      <form className="row g-2 align-items-center" onSubmit={handleSubmit}>
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Nom"
            className="form-control"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            placeholder="Prenom"
            className="form-control"
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
          />
        </div>

        <div className="col-md-4 d-grid">
          <button className="btn btn-primary">
            {editId ? "Enregistrer" : "Ajouter"}
          </button>
        </div>
      </form>

      <div className="row mb-3 mt-3">
        <div className="col-md-12">
          <input
            type="text"
            placeholder="Rechercher un étudiant..."
            className="form-control"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <ul className="list-group mb-4">
        {users.map((user) => (
          <li
            key={user.id}
            className="list-group-item d-flex justify-content-between align-items-center fade-in"
          >
            <span>
              {user.nom} {user.prenom}
            </span>

            <div className="d-flex gap-2">
              <button
                className="btn btn-warning btn-sm"
                onClick={() => editUser(user)}
              >
                ✏️
              </button>

              <button
                className="btn btn-danger btn-sm"
                onClick={() => deleteUser(user.id)}
              >
                X
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

