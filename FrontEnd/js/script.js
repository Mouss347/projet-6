// récupération des element du DOM
const gallery = document.getElementById("gallery");
const buttons = document.getElementById ("portfolio");
const filters =document.getElementById("filters");

//fonction pour les works 
async function recupTravaux() {
    const response = await fetch("http://localhost:5678/api/works");
    const data = await response.json();

    data.forEach(item => {   //fonction flecher pour parcourir data 

        const container = document.createElement("div"); // creation d'une div
        const imgElement = document.createElement("img"); // creation de l'element img
        imgElement.src = item.imageUrl;  // ajout de l'image
        container.appendChild(imgElement); // Ajout de l'élément img au conteneur

        const titleElement = document.createElement("p");// Créaton d'un élément p pour le titre
        titleElement.textContent = item.title; //ajout du titre

        
        container.appendChild(titleElement);// Ajout de l'élément <p> au conteneur
        gallery.appendChild(container);// Ajout du conteneur à la galerie

    });
}
recupTravaux();



//fonction pour la recupération des bouttons 
async function recupButton () {
    const categories = await fetch ("http://localhost:5678/api/categories");
    const lesBtns = await categories.json();
        console.log(lesBtns) // liste des btn


    lesBtns.forEach(Parcour_categories => { //fonction flecher pour parcourir les catégories
        const btnhtml = document.createElement("button");
        btnhtml.textContent = Parcour_categories.name; // on met le texte dans chaque btn en majuscule
        btnhtml.setAttribute("categorieId", Parcour_categories.id)  // on met un id pour l'appeller
        filters.appendChild(btnhtml)
         console.log(btnhtml)// on a les 3 btn dans le html

    })
}

recupButton()


//fonction qui parcour la liste et qui trie les categories

async function recupTravaux_Filtre() {
    const resultat = await fetch("http://localhost:5678/api/works");
    const recupTravaux_Filtre_json = await resultat.json();
    console.log(recupTravaux_Filtre_json)

    const stockage_btn = document.querySelectorAll("#portfolio button");
    console.log(stockage_btn);
    stockage_btn.forEach((button ) => {
        button.addEventListener("click", (e) => {
            console.log(button.getAttribute("categorieid")); 
            
        });

    });
}
recupTravaux_Filtre()

