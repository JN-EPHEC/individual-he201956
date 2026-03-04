const userList = document.getElementById("studentList");
const form = document.getElementById("studentForm");
const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", () => {
    loadUsers(); //recharge la liste à chaque frappe avec le terme de recherche
});
//fonction pour récupérer les utilisateurs et remplir la liste
async function loadUsers() {

    const searchTerm = document.getElementById("searchInput")?.value.trim() || "";
    const url = searchTerm ? `/api/users?search=${encodeURIComponent(searchTerm)}` : "/api/users";

    try {
        const response = await fetch(url); //C'est le GET /api/users ou /api/users?search=...
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");

        const users = await response.json();

         //on vide d'abord la liste
        userList.innerHTML = "";


        users.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-group-item d-flex justify-content-between align-items-center list-group-item-action fade-in";
            
            //Texte utilisateurs
            const span = document.createElement("span");
            span.textContent = `${user.nom} ${user.prenom}`;

            // Conteneur pour les boutons
            const btnGroup = document.createElement("div");
            btnGroup.classList.add("d-flex", "gap-2");

            //bouton delete
            const deleteBtn = document.createElement("button");
            deleteBtn.textContent = "X";
            deleteBtn.classList.add("btn", "btn-danger", "btn-sm");

            deleteBtn.addEventListener("click", async () => {
                try {
                    const response = await fetch(`/api/users/${user.id}`, {
                        method: "DELETE"
                    });

                    if (!response.ok) throw new Error("Erreur suppression");

                    //raffraichir la liste après suppression
                    loadUsers();

                } catch(error) {
                    console.error(error);
                    alert("Impossible de supprimer l'utilisateur");
                }
            });

            //Bouton modifier
            const editBtn = document.createElement("button");
            editBtn.innerHTML = '<i class="bi bi-pencil"></i>';
            editBtn.classList.add("btn", "btn-warning", "btn-sm");
            //Gestion bouton modifier
            editBtn.addEventListener("click", () => {
                document.getElementById("nom").value = user.nom;
                document.getElementById("prenom").value = user.prenom;

                //on sauvegarde l'id pour le PUT
                form.dataset.editId = user.id;
                form.querySelector("button").textContent = "Enregistrer";
            })
            
            // Ajouter les boutons dans le groupe
            btnGroup.appendChild(editBtn);
            btnGroup.appendChild(deleteBtn);


            li.appendChild(span);
            li.appendChild(btnGroup);

            userList.appendChild(li);
        });
    } catch (error) {
    console.log(error);
    alert("Impossible de charger les utilisateurs");
    }
}


//Appel initial au chargement de la page
loadUsers();


//Gestion du formulaire pour ajouter un nouvel utilisateur
form.addEventListener("submit", async (e) => {
    e.preventDefault(); //permet de bloquer le formulaire html et de ne pas envoyer les données ni de recharger la page. On gère l'envoie grâce à fetch()

    const nom = document.getElementById("nom").value.trim();
    const prenom = document.getElementById("prenom").value.trim();

    if (!nom || !prenom) return alert("Veuillez remplir tous les champs");

    const editId = form.dataset.editId; //permet de récupérer l'id si on est en modification

    try {
        if (editId) {
            // PUT /api/users/:id
            const response = await fetch(`/api/users/${editId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ nom: `${nom}`, prenom: `${prenom}`})
            });

            if (!response.ok) throw new Error("Erreur lors de l'ajout de l'utilisateur");

            delete form.dataset.editId; // on reset l'id après modification
            form.querySelector("button").textContent = "Ajouter";
        } else {
            //Post /api/users
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({nom: `${nom}`, prenom: `${prenom}`})
            });
            if (!response.ok) throw new Error("Erreur lors de l'ajout");
        }

            //reset du formulaire
            form.reset();
            //rafraichir la liste sans recharger la page
            loadUsers();


    } catch(error) {
        console.error(error);
        alert("Impossible d'ajouter l'utilisateurs");
    }
});
