function appel() {
            let prenom = document.getElementById("prenom").value; 
            alert("Bonjour " + prenom); 
        }
		
function Aide() {
            let aideElement = document.getElementById("aide");
            let bouton = document.getElementById("boutonaide");

            if (aideElement.innerHTML === "") { 
                aideElement.innerHTML = "Veuillez entrer votre prénom dans l'espace prévu à cet effet, puis cliquez sur le bouton Bonjour.";
                bouton.innerHTML = "Cacher l'aide";
            } else {
                aideElement.innerHTML = "";
                bouton.innerHTML = "Afficher l'aide";
            }
        }