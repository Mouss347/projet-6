// Si connexion de l'utilisateur
// récupération des éléments html
const loged = window.sessionStorage.loged === true // sa pointe vers la valeur true
const logout = document.querySelector("header nav .login_logout");
const container_modal = document.querySelector(".container_modal");
const croix = document.querySelector(".croix");
const modifier_btn = document.querySelector(".modifier_btn");
const edition_mode = document.querySelector(".edition_mode");
const affichage_modal = document.querySelector(".affichage_modal");
const btn_ajout_img = document.querySelector(".btn_ajouter_img")
const container_modal_ajout = document.querySelector(".container_modal_ajout")
const filter = document.getElementById("filters")
const logo_modifier = document.querySelector(".logo_modifier")
const categorie = document.getElementById("categorie")
const close = document.querySelector(".close")
const arrow_back = document.querySelector(".arrow_back")
const img_modal_ajout = document.getElementById("img_modal_ajout")
const btn_ajouter_photo = document.getElementById("btn_ajouter_photo")
const btn_valider_ajout_img = document.querySelector(".valider_ajout_img")


// fonction pour la connexion
const inscription = () => {
    if (localStorage.getItem("token")) {
        modifier_btn.textContent = "modifier" ; // la balise vide admin on y ajoute un texte admin
        logout.textContent = "logout"; // modifier login en logout
        filter.style.display ="none" ;     // j'enleve les filtres
        edition_mode.style.display = "flex" ; // la barre noir du dessus qui apprait
        logout.addEventListener ("click", ()=> {     // au click du logout on enleve le token du localstorage
            localStorage.removeItem("token")
        })
    } 
}
inscription();


//gerer les modales 
modifier_btn.addEventListener("click", () => {
    container_modal.style.display = "flex"
});

croix.addEventListener("click", () => {
    container_modal.style.display = "none"
});


// MODAL AJOUT TRAVAUX POUR SUPRESSION
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

// SUPPRESSION DE L'IMAGE DANS LA MODAL 
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
                return response.json()
            })
            .then((data) => {
                console.log("ok", data)
                display_works_modal()
                delete_works()
            })
        })
    })
}






// A SUPPRIMER
container_modal_ajout.style.display = "flex"
// A SUPPRIMER

// pour injecter une image
btn_ajout_img.addEventListener("click", (e) => {
    container_modal_ajout.style.display = "flex"
});

btn_ajouter_photo.addEventListener("change", event => {
    if (event.target.files.length > 0) {
        img_modal_ajout.src = URL.createObjectURL(event.target.files[0]);
        img_modal_ajout.style.display = "flex";
    }
    // Réinitialiser le fichier d'entrée une fois terminé
    // event.target.value = null;
  });




async function get_categorys() {
    const response = await fetch("http://localhost:5678/api/categories");
    const data = await response.json();

    data.forEach((category) => {
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        categorie.appendChild (option)
    }); 
}

get_categorys();














function close_modal () {
    close.addEventListener("click", () => {
        container_modal_ajout.style = display ="none"
    })

    close.addEventListener("click", () => {
        container_modal.style = display ="none"
    })
}
close_modal()


function back_modal () {
    arrow_back.addEventListener("click", () => {
        container_modal_ajout.style = display ="none"
    })
}
back_modal()








































//code a reprendre

// async function sendImageData() {
//     const titreInput = document.querySelector("input[name='titre_form']").value;
//     const categorieSelect = document.querySelector("#categorie").value;
//     const imageSrc = img_modal_ajout.src;
  
//     // Vérifier si toutes les conditions sont remplies
//     if (titreInput && categorieSelect && imageSrc !== "#") {
//       const formData = new FormData();
//       formData.append("title", titreInput);
//       formData.append("category", categorieSelect);
//       formData.append("image", imageSrc);
  
//       const init = {
//         method: "POST",
//         body: formData,
//         headers: {
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       };
  
//       try {
//         const response = await fetch("http://localhost:5678/api/works/", init);
//         if (response.ok) {
//           console.log("Données envoyées avec succès !");
//           // Réinitialiser les champs et masquer la modal après l'envoi réussi
//           document.querySelector("input[name='titre_form']").value = "";
//           document.querySelector("#categorie").value = "";
//           img_modal_ajout.src = "#";
//         //   container_modal_ajout.style.display = "none";
//         } else {
//           console.error("Échec de l'envoi des données à l'API.");
//         }
//       } catch (error) {
//         console.error("Erreur lors de l'envoi des données à l'API:", error);
//       }
//     } else {
//       console.log("Veuillez remplir tous les champs avant d'envoyer les données.");
//     }
//   }
//   sendImageData()



  
// // Fonction pour vérifier si toutes les conditions sont remplies
// function checkConditions() {
//     const titreInput = document.querySelector("input[name='titre_form']").value;
//     const categorieSelect = document.querySelector("#categorie").value;
  
//     // Vérifier si les trois conditions sont remplies
//     if (titreInput && categorieSelect && img_modal_ajout.src !== "#") {
//       btn_valider_ajout_img.style.backgroundColor = "#1D6154"; // Changement de couleur du bouton à vert
//       // Ajouter un écouteur d'événement au bouton "Valider" pour envoyer les données à l'API
//       btn_valider_ajout_img.addEventListener("click", sendImageData);
//     } else {
//       btn_valider_ajout_img.style.backgroundColor = ""; // Remettre la couleur par défaut
//       // Retirer l'écouteur d'événement du bouton "Valider"
//       btn_valider_ajout_img.removeEventListener("click", sendImageData);
//     }
//   }
  
//   // Écouter les événements de changement pour les éléments pertinents
//   document.querySelector("input[name='titre_form']").addEventListener("input", checkConditions);
//   document.querySelector("#categorie").addEventListener("change", checkConditions);
//   document.querySelector("#btn_ajouter_photo").addEventListener("change", checkConditions);






















// const loged = window.sessionStorage.loged === true; // sa pointe vers la valeur true
// const logout = document.querySelector("header nav .login_logout");
// const container_modal = document.querySelector(".container_modal");
// const croix = document.querySelector(".croix");
// const modifier_btn = document.querySelector(".modifier_btn");
// const edition_mode = document.querySelector(".edition_mode");
// const affichage_modal = document.querySelector(".affichage_modal");
// const btn_ajout_img = document.querySelector(".btn_ajouter_img");
// const container_modal_ajout = document.querySelector(".container_modal_ajout");
// const filter = document.getElementById("filters");
// const logo_modifier = document.querySelector(".logo_modifier");
// const categorie = document.getElementById("categorie");
// const close = document.querySelector(".close");
// const arrow_back = document.querySelector(".arrow_back");
// const img_modal_ajout = document.getElementById("img_modal_ajout");
// const btn_ajouter_photo = document.getElementById("btn_ajouter_photo");
// const btn_valider_ajout_img = document.querySelector(".valider_ajout_img");

// const inscription = () => {
//   if (localStorage.getItem("token")) {
//     modifier_btn.textContent = "modifier"; // la balise vide admin on y ajoute un texte admin
//     logout.textContent = "logout"; // modifier login en logout
//     filter.style.display = "none";
//     edition_mode.style.display = "flex";
//     logo_modifier.style.display = "flex";
//     logout.addEventListener("click", () => {
//       localStorage.removeItem("token");
//     });
//   }
// };
// inscription();

// modifier_btn.addEventListener("click", () => {
//   container_modal.style.display = "flex";
// });

// croix.addEventListener("click", () => {
//   container_modal.style.display = "none";
// });

// // MODAL AJOUT TRAVAUX POUR SUPRESSION
// async function display_works_modal() {
//   affichage_modal.innerHTML = "";
//   const display_works = await get_works(); // recuperation des works depuis le scipt.js
//   display_works.forEach((work) => {
//     const figure = document.createElement("figure");
//     const img = document.createElement("img");
//     const span = document.createElement("span");
//     const trash = document.createElement("svg");
//     trash.classList.add("svg_trash");
//     trash.innerHTML =
//       '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><!--!Font Awesome Free 6.5.1 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="#ffffff" d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0H284.2c12.1 0 23.2 6.8 28.6 17.7L320 32h96c17.7 0 32 14.3 32 32s-14.3 32-32 32H32C14.3 96 0 81.7 0 64S14.3 32 32 32h96l7.2-14.3zM32 128H416V448c0 35.3-28.7 64-64 64H96c-35.3 0-64-28.7-64-64V128zm96 64c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16V432c0 8.8 7.2 16 16 16s16-7.2 16-16V208c0-8.8-7.2-16-16-16z"/></svg>';
//     trash.id = work.id;
//     img.src = work.imageUrl;
//     span.appendChild(trash); // span prend svg comme enfant
//     figure.appendChild(span); // figure prend comme enfant le span
//     figure.appendChild(img); // figure prend comme enfant image
//     affichage_modal.appendChild(figure);
//   });
//   delete_works(); //j'appelle la function d'en bas ici car la node liste s'éxecute avant et aucun resultat trouver
// }
// display_works_modal();

// // SUPPRESSION DE L'IMAGE DANS LA MODAL
// function delete_works() {
//   const trash_all = document.querySelectorAll(".svg_trash");
//   trash_all.forEach((trash) => {
//     trash.addEventListener("click", (e) => {
//       const id = trash.id;
//       const init = {
//         method: "DELETE",
//         headers: {
//           "Access-Control-Allow-Origin": "*",
//           Authorization: "Bearer " + localStorage.getItem("token"),
//         },
//       };
//       fetch("http://localhost:5678/api/works/" + id, init)
//         .then((response) => {
//           if (!response.ok) {
//             console.log("faux");
//           }
//           return response.json();
//         })
//         .then((data) => {
//           console.log("ok", data);
//           display_works_modal();
//           delete_works();
//         });
//     });
//   });
// }

// // pour injecter une image
// btn_ajout_img.addEventListener("click", (e) => {
//   container_modal_ajout.style.display = "flex";
// });

// btn_ajouter_photo.addEventListener("change", (event) => {
//   if (event.target.files.length > 0) {
//     img_modal_ajout.src = URL.createObjectURL(event.target.files[0]);
//     img_modal_ajout.style.display = "flex";
//   }
//   // Réinitialiser le fichier d'entrée une fois terminé
//   event.target.value = null;
// });

// async function get_categorys() {
//   const response = await fetch("http://localhost:5678/api/categories");
//   const data = await response.json();

//   data.forEach((category) => {
//     const option = document.createElement("option");
//     option.value = category.id;
//     option.textContent = category.name;
//     categorie.appendChild(option);
//   });
// }

// get_categorys();

// function close_modal() {
//   close.addEventListener("click", () => {
//     container_modal_ajout.style.display = "none";
//   });

//   close.addEventListener("click", () => {
//     container_modal.style.display = "none";
//   });
// }
// close_modal();

// function back_modal() {
//   arrow_back.addEventListener("click", () => {
//     container_modal_ajout.style.display = "none";
//   });
// }
// back_modal();

// // Fonction pour vérifier si toutes les conditions sont remplies
// function checkConditions() {
//   const titreInput = document.querySelector("input[name='titre_form']").value;
//   const categorieSelect = document.querySelector("#categorie").value;

//   // Vérifier si les trois conditions sont remplies
//   if (titreInput && categorieSelect && img_modal_ajout.src !== "#") {
//     btn_valider_ajout_img.style.backgroundColor = "green"; // Changement de couleur du bouton à vert
//   } else {
//     btn_valider_ajout_img.style.backgroundColor = ""; // Remettre la couleur par défaut
//   }
// }

// // Écouter les événements de changement pour les éléments pertinents
// document.querySelector("input[name='titre_form']").addEventListener("input", checkConditions);
// document.querySelector("#categorie").addEventListener("change", checkConditions);
// document.querySelector("#btn_ajouter_photo").addEventListener("change", checkConditions);
























