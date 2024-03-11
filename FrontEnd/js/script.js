// Récupération des éléments
const gallery = document.getElementById("gallery");
const portfolio = document.getElementById("portfolio");
const filters = document.getElementById("filters");
const btn_all = document.getElementById("btn_all");

//*****************************************//

// Fonction pour récupérer les works
async function get_works() {
    const response = await fetch("http://localhost:5678/api/works");
    return await response.json();
}

// Afficher les works dans le DOM
async function affichage_works(works) {
    gallery.textContent = ""; //effacer tout le texte de la galerie
console.log(works)
    await works.forEach((work) => {
        const figure = document.createElement("figure");
        const img = document.createElement("img");
        const figcaption = document.createElement("figcaption");
        img.src = work.imageUrl;
        figcaption.textContent = work.title;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });
}

// Récupérer le tableau des catégories
async function get_categorys() {
    const response = await fetch ("http://localhost:5678/api/categories");
    return response.json();
}

async function display_categorys_buttons() {  //fonction pour pour crée des bouttons pour les categories, ajout d'ecouteur d'evenement pour filtrer les element selectionner en fonction de leur catégroies et si selectionner alors on change l'etat du btn
    const categorys = await get_categorys();

    categorys.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        filters.appendChild(btn);

        btn.addEventListener("click", async () => {
            
            const allButtons = document.querySelectorAll("#filters button") // on récupere tout les bouttons des filters et on les met dans cette variable pour leur applique cette fonction
            allButtons.forEach(button => {
                button.style.backgroundColor = "" // Retirer la couleur verte de tous les boutons
                button.style.color =""
            })
            
            await filter_category(btn.id)
            btn.style.backgroundColor = "#1D6154"
            btn.style.color = "#FFFEF8"
        });
    });
}

display_categorys_buttons();



// Filtrer au click sur le bouton par catégories
async function filter_category(categoryId) {
    const filter_works = await get_works();
    gallery.innerHTML = ""; // Vider la galerie avant d'afficher les nouveaux éléments

    if (categoryId !== "0") {
        const return_filter_works = filter_works.filter((work) => {
            return work.categoryId == categoryId;
        });

        await affichage_works(return_filter_works);
    } else {
        // Si le bouton a un id de 0, affiche tous les travaux
        await affichage_works();
    }
}

async function initialize() {  //fonction pour récuperer les oeuvres, les afficher dans l'interface utilisateur, configuration du btn tous 
    const allWorks = await get_works();
    await affichage_works(allWorks);

    // Ajouter un gestionnaire d'événements au bouton "Tous"
    btn_all.addEventListener("click", () => {
        gallery.innerHTML = "";
        affichage_works(allWorks);
        
        // Appliquer le style au bouton "Tous"
        const allButtons_filters = document.querySelectorAll("#filters button");
        allButtons_filters.forEach(button => {
            button.style.backgroundColor = ""; // Réinitialiser le style de tous les boutons
            button.style.color = ""; // Réinitialiser la couleur du texte de tous les boutons
        });
        btn_all.style.backgroundColor = "#1D6154"; // Appliquer le style au bouton "Tous"
        btn_all.style.color = "#FFFEF8"; // Changer la couleur du texte pour le bouton "Tous"
    });
}
initialize();