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
    works.forEach((work) => {
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

async function display_categorys_buttons() {
    const categorys = await get_categorys();

    categorys.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        filters.appendChild(btn);

        btn.addEventListener("click", async () => {
            
            const allButtons = document.querySelectorAll("button")
            allButtons.forEach(button => {
                button.style.backgroundColor = "" // Retirer la couleur verte de tous les boutons
                button.style.color =""
            })
            
            await filter_category(btn.id)
            btn.style.backgroundColor = "#1D6154"
            btn.style.color = "#FFFEF8"
        });
    });

    // Ajout d'un écouteur d'événements pour le bouton supplémentaire
    const autreBouton = document.getElementById("btn_all");
    autreBouton.addEventListener("click", () => {
        // Retirer la couleur verte de tous les boutons
        const allButtons = document.querySelectorAll('button');
        allButtons.forEach(button => {
            button.style.backgroundColor = '';
        });

        // Ajoutez ici la logique que vous souhaitez exécuter lorsque le bouton supplémentaire est cliqué
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

async function initialize() {
    const allWorks = await get_works();
    await affichage_works(allWorks);
}
initialize();

//afficher tous les projets au clique du btn all
async function btn_tous() {
    btn_all.addEventListener("click", () => {
    gallery.innerHTML = ""
    initialize() ;
    });
}
btn_tous()

