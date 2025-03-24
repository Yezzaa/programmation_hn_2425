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
			
		
function exercice4() {
    let texte = document.getElementById("texteExercice4").value; // récupère le texte saisi 
    let tokens = texte.split(" "); // découpe le texte en mots
    let table = document.createElement("table"); // création d'un tableau
    tokens.forEach(mot => { // ajout de mot sous forme de lignes
        let row = document.createElement("tr"); // crée une ligne 
        row.innerHTML = mot; // ajoute le mot à la ligne
        table.appendChild(row); // insertion de la ligne dans le tableau
    });
    document.getElementById("exercice4Resultat").appendChild(table); // ajoute le tableau à l'élément HTML avec l'id exercice4Resultat
}


window.onload = function() {
    let fileInput = document.getElementById('fileInput');
    let fileDisplayArea = document.getElementById('fileDisplayArea');

    // On "écoute" si le fichier donné a été modifié.
    // Si on a donné un nouveau fichier, on essaie de le lire.
    fileInput.addEventListener('change', function(e) {
        // Dans le HTML (ligne 22), fileInput est un élément de tag "input" avec un attribut type="file".
        // On peut récupérer les fichiers données avec le champs ".files" au niveau du javascript.
        // On peut potentiellement donner plusieurs fichiers,
        // mais ici on n'en lit qu'un seul, le premier, donc indice 0.
        let file = fileInput.files[0];
        // on utilise cette expression régulière pour vérifier qu'on a bien un fichier texte.
        let textType = new RegExp("text.*");

        if (file.type.match(textType)) { // on vérifie qu'on a bien un fichier texte
            // lecture du fichier. D'abord, on crée un objet qui sait lire un fichier.
            var reader = new FileReader();

            // on dit au lecteur de fichier de placer le résultat de la lecture
            // dans la zone d'affichage du texte.
            reader.onload = function(e) {
                fileDisplayArea.innerText = reader.result;
            }

            // on lit concrètement le fichier.
            // Cette lecture lancera automatiquement la fonction "onload" juste au-dessus.
            reader.readAsText(file);    

            document.getElementById("logger").innerHTML = '<span class="infolog">Fichier chargé avec succès</span>';
        } else { // pas un fichier texte : message d'erreur.
            fileDisplayArea.innerText = "";
            document.getElementById("logger").innerHTML = '<span class="errorlog">Type de fichier non supporté !</span>';
        }
	
    });
}

//Bouton segmentation
function segmentation() {
   
    const analyse = document.getElementById("fileDisplayArea").innerText;

   
    const result = analyse.split(/\s+/).map(item => item.trim()).filter(item => item.length > 0);

   
    let resultvirgule = result.map(item => `${item},`).join('<br>');

   
    document.getElementById("page-analysis").innerHTML = resultvirgule;
}