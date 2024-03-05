// Si connexion de l'utilisateur
//********************* RECUPERATION DES ELEMENTS HTML *********************/
const loged = window.sessionStorage.loged === true // sa pointe vers la valeur true
const logout = document.querySelector("header nav .login_logout");

const close_modal_galerie = document.getElementById("#close_modal_galerie")
const container_modal = document.querySelector(".container_modal");
const modal_galerie = document.querySelector(".modal");

const logo_modifier = document.querySelector(".logo_modifier")
const modifier_btn = document.querySelector(".modifier_btn");
const edition_mode = document.querySelector(".edition_mode");
const affichage_modal = document.querySelector(".affichage_modal");
const btn_ajout_img = document.querySelector(".btn_ajouter_img")
const filter = document.getElementById("filters")

const close_modal_ajout = document.getElementById("#close_modal_ajout")
const container_modal_ajout = document.querySelector(".container_modal_ajout")
const arrow_back = document.querySelector(".arrow_back")
const modal_ajout = document.querySelector(".modal_ajout")
const box_ajout_image = document.querySelector(".ajout_image")


//*********************L'AFFICHAGE DE L'IMAGE CHARGEE*********************/ 
const preview_img = document.getElementById("img_modal_ajout") 
const input_file = document.querySelector(".ajout_image input") 
const label_file = document.querySelector(".ajout_image label") 
const icon_file = document.querySelector(".ajouter_photo") 
const p_file = document.querySelector(".p_ajout_photo_modal") 
const btn_valider_ajout_img = document.querySelector(".valider_ajout_img")


//********************* FONCTION POUR LA CONNEXION *********************/
const inscription = () => {
    if (localStorage.getItem("token")) {
        modifier_btn.textContent = "modifier" ; // la balise vide admin on y ajoute un texte admin
        logo_modifier.style.display = "flex"; // apparution du logo modifier qui etait en none
        logout.textContent = "logout"; // modifier login en logout
        filter.style.display ="none" ;     // j'enleve les filtres
        edition_mode.style.display = "flex" ; // la barre noir du dessus qui apprait
        logout.addEventListener ("click", ()=> {     // au click du logout on enleve le token du localstorage
            localStorage.removeItem("token")
        })
    } 
}
inscription();


//********************* GERER LES MODALES *********************/
// au clique de modifier, le bg gris et modal 1 apparaissent
modifier_btn.addEventListener("click", () => {
    container_modal.style.display = "flex"
    modal_galerie.style.display = "flex"
});

// au clique de la croix les deux disparaissent
close_modal_galerie.addEventListener("click", () => {
    container_modal.style.display = "none"
    modal_galerie.style.display = "none"
});

// au clique du gris enlever le gris et la modal
container_modal.addEventListener("click", () => {
    container_modal.style.display = "none"
    modal_galerie.style.display = "none"
})

// au clique de ajouter photo ferme la 1 ouvre modal 2 
btn_ajout_img.addEventListener("click", () => { 
  container_modal_ajout.style.display = "flex"
  modal_ajout.style.display = "flex"
  modal_galerie.style.display = "none"
  container_modal.style.display = "none"
});

// au clique du gris enlever le gris et la modal
container_modal_ajout.addEventListener("click", () => {
    container_modal_ajout.style.display = "none"
    modal_ajout.style.display = "none"
})

// au clique de retour enleve la modal 2 et met la 1 et le gris
arrow_back.addEventListener("click", () => {
    container_modal_ajout.style.display = "none"
    modal_ajout.style.display= "none"
    modal_galerie.style.display = "flex"
    container_modal.style.display = "flex"
})

//au clique de la croix de la modal 2 les deux disparaissent
close_modal_ajout.addEventListener("click", () => {
    container_modal_ajout.style.display = "none"
    modal_ajout.style.display= "none"
    modal_galerie.style.display = "none"
    container_modal.style.display = "none"
    // ici supprimer image et remettre a 0
});





//********************* MODAL AJOUT TRAVAUX POUR SUPRESSION *********************/ 
async function display_works_modal() {
    affichage_modal.innerHTML =""
    const display_works = await get_works() // recuperation des works depuis le scipt.js
    display_works.forEach(work => {
        const figure = document.createElement("figure")
        const img = document.createElement("img")
        const span = document.createElement("span")
        const trash = document.createElement("svg")
        trash.classList.add("svg_trash")
        trash.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>'
        trash.id = work.id
        img.src = work.imageUrl
        span.appendChild(trash) // span prend svg comme enfant
        figure.appendChild(span) // figure prend comme enfant le span
        figure.appendChild(img) // figure prend comme enfant image
        affichage_modal.appendChild(figure)
    })
     delete_works() //j'appelle la function d'en bas ici car la node liste s'éxecute avant et aucun resultat trouver
}
display_works_modal()

//********************* SUPPRESSION DE L'IMAGE DANS LA MODAL *********************/ 
function delete_works() {
    const trash_all = document.querySelectorAll(".svg_trash")
    trash_all.forEach(trash => {
        trash.addEventListener("click", (e)=> {
            const id = trash.id
            const init ={
                method: "DELETE",
                headers: {"Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + localStorage.getItem("token")}
            }
            fetch("http://localhost:5678/api/works/" + id,init)
            .then ((response) => {
                if (!response.ok) {
                    console.log("faux")
                }
            })
            .then((data) => {
                console.log("ok", data)
                display_works_modal()
                delete_works()
                affichage_works()
                initialize()
            })
        })
    })
}





//********************* MISE EN PLACE DE L'AFFICHAGE DE L'IMAGE CHARGEE *********************/ 

input_file.addEventListener("change", () => { //récupère le premier fichier sélectionné par l'utilisateur dans l'élément d'entrée de fichier (input_file)
  const file = input_file.files[0] // Ce fichier est ensuite stocké dans la variable file pour être utilisé plus tard

  if (file) {
    const reader = new FileReader();  //syntaxe prévisualisation de l'image qui sera telecharger
    reader.onload = function (e) {
      preview_img.src = e.target.result  // mettre dans la nouvel image dans preview_img 
      preview_img.style.display = "flex"
      label_file.style.display = "none"
      input_file.style.display = "none"
      icon_file.style.display = "none"
      p_file.style.display = "none"
      box_ajout_image.style.flexDirection = "row";
    }
    reader.readAsDataURL(file)  //prévisualisation de l'image charger
  }
}) 


//********************* METHODE POST POUR AJOUT D'UN WORK *********************/
const form = document.querySelector(".formulaire_ajout_img")
const title_form = document.querySelector(".formulaire_ajout_img input")
const categorie = document.getElementById("categorie")

// partie catégorie de la modal d'ajout image
async function get_categorys() {
  const response = await fetch("http://localhost:5678/api/categories");
  const categorys = await response.json();

  categorys.forEach((category) => {
      const option = document.createElement("option")
      option.value = category.id
      option.textContent = category.name
      categorie.appendChild(option)
  }); 
}
get_categorys();

btn_valider_ajout_img.addEventListener("click", async () => {
  const formData = new FormData(); // Création d'un objet FormData à partir du formulaire
  formData.append("image", document.querySelector('input[type = "file"]').files[0])
  formData.append("title", document.querySelector(".titre_form").value)
  formData.append("category", document.getElementById("categorie").value)
  console.log(formData)
  try {
      const response = await fetch("http://localhost:5678/api/works", {
          method: "POST",
          body: formData,
          headers: {
              "Authorization": "Bearer " + localStorage.getItem("token"),
          },
      });

      if (!response.ok) {
          throw new Error("Erreur lors de l'ajout de l'image. Statut: " + response.status);
      }

      const data = await response.json();

      console.log("Image ajoutée avec succès. ID du travail ajouté:");

      // Actualisation des modales et des travaux affichés
      display_works_modal();
    
      affichage_works()
     } catch (error) {
        console.error("Erreur lors de l'ajout de l'image :", error);
    }
    initialize()
});

//********************* VERIFICATION SI TOUT LES ELEMENTS SONT REMPLIS POUR LE POST *********************/ 
async function checkConditions() {
    const categorieSelect = document.querySelector("#categorie").value;
    const titreInput = document.querySelector(".titre_form").value;

    // Vérifier si les trois conditions sont remplies
    if (titreInput !== "" && categorieSelect !== "" && input_file.value !== "") {
        btn_valider_ajout_img.style.backgroundColor = "#1D6154"; 
        btn_valider_ajout_img.disabled = false;
    } 
}

checkConditions();


// Écouter les événements de changement dans les champs titre et catégorie ainsi que la sélection de l'image
document.querySelector(".titre_form").addEventListener("input", checkConditions);
document.querySelector("#categorie").addEventListener("change", checkConditions);

