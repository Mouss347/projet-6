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
    const response = await fetch("http://localhost:5678/api/categories");
    return await response.json();
}

// Afficher les Boutons par catégories
async function display_categorys_buttons() {
    const categorys = await get_categorys();

    categorys.forEach((category) => {
        const btn = document.createElement("button");
        btn.textContent = category.name;
        btn.id = category.id;
        filters.appendChild(btn);

        // Ajout d'un écouteur d'événements pour chaque bouton
        btn.addEventListener("click", async () => {
            await filter_category(btn.id);
        });
    });
}
display_categorys_buttons();
//*****************************************//


// Filtrer au clic sur le bouton par catégories
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

// Si connexion de l'utilisateur

const loged = window.sessionStorage.loged // sa pointe vers la valeur true
const logout = document.querySelector("header nav .login_logout");
const container_modal = document.querySelector(".container_modal");
const croix = document.querySelector(".croix");
const modifier_btn = document.querySelector(".modifier_btn");
const edition_mode = document.querySelector(".edition_mode");


const inscription = () => {
    if (localStorage.getItem("token")) {
        modifier_btn.textContent = "modifier"; // la balise vide admin on y ajoute un texte admin
        logout.textContent = "logout"; // modifier login en logout
        edition_mode.style.display = "flex"
        logout.addEventListener ("click", ()=> {
            window.sessionStorage.loged = false;
        })
    }
}
inscription()


//affichage de la modal au clique sur le admin

modifier_btn.addEventListener("click", () => {
    container_modal.style.display = "flex"
});

croix.addEventListener("click", () => {
    container_modal.style.display = "none"
});

container_modal.addEventListener("click", () => {
    container_modal.style.display = "none"
});