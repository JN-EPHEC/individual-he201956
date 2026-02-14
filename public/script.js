const userList = document.getElementById("studentList");
const form = document.getElementById("studentForm");

//fonction pour récupérer les utilisateurs et remplir la liste
async function loadUsers() {
    //on vide d'abord la liste
    userList.innerHTML = "";

    try {
        const response = await fetch("/api/users"); //C'est le GET /api/users
        if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");

        const users = await response.json();


        users.forEach(user => {
            const li = document.createElement("li");
            li.className = "list-group-item";
            li.textContent = `${user.nom} ${user.prenom}`;
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

    try {
        const response = await fetch("/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nom: `${nom}`, prenom: `${prenom}`})
        });

        if (!response.ok) throw new Error("Erreur lors de l'ajout de l'utilisateur");

        //rafraichir la liste sans recharger la page
        loadUsers();

        //reset du formulaire
        form.reset();
    } catch(error) {
        console.error(error);
        alert("Impossible d'ajouter l'utilisateurs");
    }
});
