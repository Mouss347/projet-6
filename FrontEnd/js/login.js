//récuperation des elements Html

const email = document.getElementById("email");
const password = document.getElementById("password");
const form = document.getElementById("formulaire_login")
const formulaire_p = document.querySelector(".formulaire_p");
const submit = document.getElementById("submit")

const projet = document.querySelector(".projet")
async function btn_projet() {
    projet.addEventListener("click", (e) => {
         window.location.href = "../index.html"
    }
)}
btn_projet()

form.addEventListener("submit", (e) => {
    e.preventDefault(); //ne pas charger la page au clique 
    const user_mail = email.value;
    const user_password = password.value;
    const login = {
        email: user_mail,
        password: user_password
    };
    console.log(user_password, user_mail)
    const user = JSON.stringify(login); 

    //Envoi de la requette
    fetch("http://localhost:5678/api/users/login", {
        method: "POST",   // Je vais envoyer des informations au serveur
        headers: { "Content-Type": "application/json" },  // Je dis que c'est en format JSON
        body: user,  // Je veux stocker le résultat dans la variable 'user'
    })

    // récupération et comparaison de la reponse
    .then((response) => {
       if (response.ok) {
        return response.json();
       
    } else {
        email.style.backgroundColor = "#FFC0CB";
        password.style.backgroundColor = "#FFC0CB";
        formulaire_p.textContent = "Identifiants ou mot de passe incorrect."
       }  
    })

    .then((data) => {
        localStorage.setItem("token", data.token)
        window.location.href = "../index.html"; // si c'est true redirgier vers le index.html page d'acceuil
    }) 
})

