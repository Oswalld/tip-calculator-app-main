const inputNumberPerson = document.getElementById("people");
const inputBill = document.getElementById("bill");
const inputCustomTip = document.getElementById("custom");
const erreurFacture = document.querySelector(".error-bill");
const erreurPeople = document.querySelector(".error-people");
const erreurTip = document.querySelector(".error-tip");
const price = document.querySelector('.total-result');
const tips = document.querySelector('.tip-result');
const reset = document.querySelector(".reset")
const tipButtons = document.querySelectorAll('.percent-options button');
let selectedTip = 0;

// Variables pour suivre l'état de validation de chaque input
let isBillValid = false;
let isPeopleValid = false;

const validateInput = (value, errorElement, inputElement) => {
    if (value <= 0) {
        errorElement.textContent = "cannot be less than 0";
        inputElement.style.border = "2px solid #E17457";
        return false;
    } else {
        errorElement.textContent = "";
        inputElement.style.border = "2px solid #26C2AE";
        
        setTimeout(() => {
            inputElement.style.border = "none";
        }, 3000);
        
        return true;
    }
}


// Fonction pour vérifier si tous les inputs sont valides
const checkAllInputs = () => {
    if (isBillValid && isPeopleValid) {
        console.log("Tous les inputs sont valides !");

        // Calcul du pourboire
        let pourboire = parseFloat(inputBill.value) * (selectedTip / 100);
        let totalTips = pourboire / parseInt(inputNumberPerson.value);
        tips.textContent = totalTips.toFixed(2); // Afficher avec 2 décimales

        // Calcul du prix total par personne
        let totalPrice = (parseFloat(inputBill.value) + pourboire) / parseInt(inputNumberPerson.value);
        price.textContent = totalPrice.toFixed(2); // Afficher avec 2 décimales

        reset.style.backgroundColor = "#26C2AE"

    }
}

inputBill.addEventListener('input', () => {
    isBillValid = validateInput(parseFloat(inputBill.value), erreurFacture, inputBill);
    checkAllInputs();
});

inputNumberPerson.addEventListener('input', () => {
    isPeopleValid = validateInput(parseInt(inputNumberPerson.value), erreurPeople, inputNumberPerson);
    checkAllInputs();
});

// Gestion des boutons de pourboire
tipButtons.forEach(button => {
    button.addEventListener('click', () => {

        tipButtons.forEach(btn => btn.classList.remove('active'));

        button.classList.add('active');

        inputCustomTip.value = '';
        selectedTip = parseInt(button.textContent.replace('%', ''));
        console.log(selectedTip);
        checkAllInputs(); // Vérifier les inputs après sélection du pourboire
    });
});

// Gestion de l'input pour le pourboire personnalisé
inputCustomTip.addEventListener('input', () => {
    isCustomTipValid = validateInput(parseFloat(inputCustomTip.value), erreurTip, inputCustomTip);
    if (isCustomTipValid) {
        selectedTip = parseFloat(inputCustomTip.value);
        tipButtons.forEach(btn => btn.classList.remove('active'));
    }
    checkAllInputs();
});



reset.addEventListener('click', () => {
    // Réinitialiser les inputs
    inputNumberPerson.value = '';
    inputBill.value = '';
    inputCustomTip.value = '';

    // Réinitialiser les bordures des inputs
    inputNumberPerson.style.border = "none";
    inputBill.style.border = "none";
    inputCustomTip.style.border = "none";

    // Réinitialiser les messages d'erreur
    erreurFacture.textContent = '';
    erreurPeople.textContent = '';
    erreurTip.textContent = '';

    // Réinitialiser les résultats affichés
    price.textContent = '$0.00';
    tips.textContent = '$0.00';

    // Retirer la classe 'active' des boutons de pourboire
    tipButtons.forEach(button => button.classList.remove('active'));

    // Réinitialiser la sélection de pourboire
    selectedTip = 0;

    reset.style.backgroundColor = "#0D686D"
})