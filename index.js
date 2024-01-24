async function recupTravaux () {
    const response = await fetch ("http://localhost:5678/api-docs/works");
    const traiteResponse = await response.json();
    console.log(traiteResponse);
}

recupTravaux();


