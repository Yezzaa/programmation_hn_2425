// Ce bouton envoie une alerte Bonjour suivie de la valeur saisie par l'utilisateur (son prénom)
function appel() {
	// Cette ligne permet de récupérer la valeur saisie par l'utilisateur avec l'id "prenom"
            let prenom = document.getElementById("prenom").value; 
			// Affiche une alerte en indiquant le message "Bonjour" suivie du prénom de l'utilisateur ainsi qu'un message de bienvenue
            alert("Bonjour " + prenom + " ! Bienvenue sur mon site !"); 
        }

		
// BOUTON Afficher/Masquer le CV --------------------------------------
// Nous avons repris le modèle proposé par M. BRIGLIA en complétant les x manquants et en s'aidant de cette ressource : https://www.w3schools.com/css/css_display_visibility.asp
function showHide_aboutme() {
    let div = document.getElementById("aboutme"); // On récupère l'élément avec l'id "aboutme". Il s'agit de la partie du CV que l'on veut afficher ou cacher. 
    let bouton = document.getElementById("button_aboutme"); // on récupère aussi le contenu pour changer le texte du bouton

// Cela vérifie si la div est bien cachée
    if (div.style.display === "none" || div.style.display === "") { // "none" signifie que la div est masquée et "" signifie que elle est visible par défaut
        div.style.display = "block"; // Si la div était cachée alors l'affiche
        bouton.innerHTML = "Cacher le CV"; // On change le texte du bouton
		
// Sinon si la div est visible 
    } else { 
        div.style.display = "none"; // On cache la div
        bouton.innerHTML = "Plus d'infos sur moi"; // On change le texte du bouton
    }
}


//BOUTON Afficher/Masquer l'aide ----------------------------------
// Nous avons repris le modèle proposé par M. BRIGLIA en complétant les x manquants et en s'aidant de cette ressource : https://www.w3schools.com/css/css_display_visibility.asp
 function Aide() {
	// Cette ligne récupère l'élément avec l'id "aide"
    let aide = document.getElementById("aide");
	// Cette ligne récupère le bouton avec l'id "btnAide"
    let bouton = document.getElementById("btnAide");
// Le bloc if permet d'indiquer que si l'aide est cachée alors on le rend visible et on change le texte du bouton en "Masquer l'aide"
    if (aide.style.display === "none") {
        aide.style.display = "block";
        bouton.innerHTML = "Masquer l'aide";
// Sinon si l'aide est affichée alors ça cache l'élément aide et on change le texte du bouton en "Afficher l'aide"
    } else {
        aide.style.display = "none";
        bouton.innerHTML = "Afficher l'aide";
    }
}


/*------------------------------------------------------------------------------------------------------------------*/
//							OUTIL D'ANALYSE des données dans un fichier									//
/*------------------------------------------------------------------------------------------------------------------*/

// Cela permet de charger le texte (nous avons repris le modèle proposé par M. BRIGLIA sans modification)
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
// Nous avons repris le modèle proposé par M. BRIGLIA en apportant certaines modifications tels que le nom des id
function segmentation() {
// La boucle if..else permet d'indiquer que si aucun fichier n'est chargé alors cela affiche un message qu'il faut charger un fichier
    if (document.getElementById('fileDisplayArea').innerHTML == "") {
        document.getElementById('page-analysis').innerHTML = "Il faut d'abord charger un fichier .txt !";
// Sinon si aucun délimiteur n'est renseigné cela affiche un message d'erreur  
    } else {
        if (document.getElementById("delimID").value === "") {
            document.getElementById("page-analysis").innerHTML = '<span class="errorlog">Aucun délimiteur donné !</span>';
// Cette ligne permet d'effacer le contenu affiché précédemment dans la zone d'analyse
        } else {
            document.getElementById('page-analysis').innerHTML = "";
// Cette ligne permet de récupérer le texte original du fichier
            let text = document.getElementById("fileDisplayArea").innerText;
// Cette ligne récupère les délimiteurs saisi
            let delim = document.getElementById("delimID").value;
// Cette ligne permet d'afficher les résultats dans la zone dédiée
            let display = document.getElementById("page-analysis");

            // Ce bloc permet de créer une expression régulière pour les délimiteurs
            let regex_delim = new RegExp(
                "[" +
                delim
                    .replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&") +
                "\\s]+"
            );

// Ce bloc permet de découper le texte en morceaux selon les délimiteurs
            let tokens = text.split(regex_delim);
            tokens = tokens.filter(vide => vide.trim() != ""); // Permet de supprimer les espaces

// Ce bloc le texte par lignes et supprime les lignes vides
            let lines = text.split(/\n+/);
            lines = lines.filter(line => line.trim() != "");

            // Cette ligne permet de stocker les tokens
            global_var_tokens = tokens;
// Cette ligne permet de stocker les lignes
            global_var_lines = lines;

// Cette ligne permet d'afficher les tokens séparés par des espaces
            display.innerHTML = tokens.join(" ");
        }
    }
}



//Bouton Dictionnaire ----------------------------------------------
// Ce bouton renvoie un tableau qui contient les tokens d'un texte et leur fréquence d'apparition.
function dictionnaire() {
    const zoneTexte = document.getElementById("fileDisplayArea");
    const texte = zoneTexte.innerText.trim();

    // Cela permet de vérifier qu'un texte a bien été chargé
    if (texte === "") {
        document.getElementById("page-analysis").innerHTML = "Il faut d'abord charger le fichier sous format txt.";
        return; // l'instruction return arrête immédiatement l'exécution de la fonction - https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Statements/return
    }

    // Ici, on effectue la tokénisation du texte
    const mots = texte
        .toLowerCase()
        .split(/\s+/)
        .map(mot => mot.trim())
.filter(mot => mot.length > 0);

    // ici on calcule les fréquences pour chaque token
    const tableauFrequences = {};

    mots.forEach(mot => {
        tableauFrequences[mot] = (tableauFrequences[mot] || 0) + 1;
    });


    // création d'un tableau qui contient dans la colonne de gauche les tokens et dans la colonne de droite leur fréquence d'apparitions dans le texte
    let tableau = '<table border="1" style="border-collapse: collapse; width: 100%;">';
    tableau += '<thead><tr><th>Mot</th><th>Fréquence</th></tr></thead><tbody>';

    mots.forEach(mot => {
        tableau += `<tr><td>${mot}</td><td>${tableauFrequences[mot]}</td></tr>`;
    });

    tableau += '</tbody></table>';

    // ici on affiche le tableau créé précedemment au niveau de l'id page-analysis
    document.getElementById("page-analysis").innerHTML = tableau;
}


// Le bouton GREP permet de rechercher un mot ou une expression régulière dans un texte et met en gras les occurrences trouvées ----------------------------------------
function GREP() {
    // On récupère le contenu du texte dans le fichier qu'on a chargé
    let poleRegex = document.getElementById("fileDisplayArea");
    let texte = poleRegex.innerText.trim();

    // Ici, on déclare une variable poleInput qui contient la valeur saisie par l'utilisateur au niveau du pôle
    let poleInput = document.getElementById("poleID").value.trim();

    // Cela permet de vérifier si le champ de saisie est vide. Si il est vide alors on affiche un message pour indiquer à l'utilisateur qu'il faut saisir un mot dans le pôle.
    if (poleInput === "") {
        document.getElementById("page-analysis").innerHTML = "Il faut d'abord entrer un pôle de recherche !";
        return;
    }

 // Les instructions try et catch ont été trouvé sur le lien suivant : https://www.w3schools.com/java/java_try_catch.asp
    // Ce bloc empêche le site de planter si l'utilisateur entre une expression régulière invalide. Il essaye (try) de créer la RegExp, et en cas d'erreur, il attrape (catch) l'erreur et informe l'utilisateur.
let regex; // On déclare la variable nommée "regex"
    // Ce bloc (try) permet de créer une expression régulière avec ce que l'utilisateur à saisi dans la variable poleInput
try {  
        regex = new RegExp(poleInput, 'gi'); // g et i sont des options : g permet de chercher toutes les occurrences dans le texte et i permet d'ignorer la casse
    // Si l'utilisateur se trompe sur la syntaxe de l'expression régulière l'instruction catch attrape l'erreur pour éviter un plantage et on affiche un message d'erreur dans la page HTML avec l'id page-analysis.
} catch (e) {
        document.getElementById("page-analysis").innerHTML = "L'expression régulière est invalide.";
        return;
    }

    // Les mots saisie dans le pôle sont mis en gras
    let motGras = texte.replace(regex, match => `<strong>${match}</strong>`);

    // Cette partie permet de comparer le texte original au texte modifié (mots mis en gras)
    if (texte !== motGras) {
// Si le texte à été modifié on l'affiche dans la page HTML avec l'id page-analysis
        document.getElementById("page-analysis").innerHTML = motGras;
    } else {
// Sinon on affiche un message qui permet d'indiquer qu'aucun résultat à été trouvé
        document.getElementById("page-analysis").innerHTML = "Aucun résultat ne correspond à votre recherche.";
    }
}

// BOUTON CONCORDANCIER ----------------------------------------------
function Concordancier() {
  // Permet de récupérer le texte à analyser qui est affiché dans la page HTML avec l'id fileDisplayArea
  const concordance = document.getElementById("fileDisplayArea").innerText;
  // Permet de récupérer le mot saisi dans le pôle avec l'id poleID tout en supprimant les espaces au début et à la fin
  const pole = document.getElementById("poleID").value.trim();
 
  // Cette ligne permet de Récupérer la valeur entrée par l'utilisateur dans le champ longueur avec l'ID IgID, la convertit (fonction parseInt) en un entier (en base 10) et la stocke dans la variable contextLength
  let contextLength = parseInt(document.getElementById("lgID").value, 10);

  // Ce bloc permet de prendre 10 comme valeur par défaut si la valeur saisi par l'utilisateur n'est pas un nombre ou si la valeur est inférieure ou égale à 0
  if (isNaN(contextLength) || contextLength <= 0) {
    contextLength = 10;
  }

  // Nous avons choisi de mettre une alerte si l'utilisateur n'a rien tapé dans le champ longueur
  if (!pole) { // Le point d'exclamation sert à dire non, il inverse la valeur logique
    alert("Vous devez saisir un mot dans le champ pôle.");
    return;
  }

  // Tokenisation du texte en utilisant les espaces
  const tokens = concordance.split(/\s+/);
  // Permet de créer un tableau avec trois colonnes : la première colonne affiche le contexte à gauche du mot pivot, la deuxième colonne affiche le mot pivot et la troisième colonne affiche le contexte à droite du mot pivot
  let resultatConcord = "<table border='1'><tr><th>Contexte gauche</th><th>Mot</th><th>Contexte droit</th></tr>";

  // La boucle for permet de parcourir tout les mots du texte un par un
  for (let i = 0; i < tokens.length; i++) {
    if (tokens[i].toLowerCase() === pole.toLowerCase()) {
      // Récupère les mots précédant le mot pivot
      const contexteGauche = tokens.slice(Math.max(0, i - contextLength), i).join(" ");
      // Récupère les mots suivants le mot pivot
      const contexteDroit = tokens.slice(i + 1, i + 1 + contextLength).join(" ");
     
      // Cette ligne permet d'ajouter une ligne dans le tableau avec le contexte de gauche, le mot pivot (en gras) et le contexte de droite
      resultatConcord += `<tr><td>${contexteGauche}</td><td><strong>${tokens[i]}</strong></td><td>${contexteDroit}</td></tr>`;
    }
  }

  // Ce bloc permet d'indiquer que si aucun mot ne correspond à la recherche alors le tableau affiche uniquement les en-têtes avec un message précisant qu'il n'y a pas de résultat.
  if (resultatConcord === "<table border='1'><tr><th>Contexte gauche</th><th>Mot</th><th>Contexte droit</th></tr>") {
    resultatConcord += "<tr><td colspan='3'>Aucun résultat trouvé pour le mot recherché.</td></tr>";
  }
 
  resultatConcord += "</table>"; // Permet de fermer le tableau avec la balise fermante </table>
  document.getElementById("page-analysis").innerHTML = resultatConcord;  // Affichage du tableau avec l'id page-analysis
}


//BOUTON SURPRISE
// Nous avons choisi de créer une fonction qui renvoie les mots à l'envers !
function motsinverses() {
// Permet de récupérer le contenu du texte avec l'id fileDisplayArea et le met en minuscules
    const texte = document.getElementById("fileDisplayArea").innerText.toLowerCase();
// Permet de vérifier si un texte à bien été chargé, dans le cas contraire un message s'affiche indiquant qu'il n'y a pas de texte à analyser
    if (!texte.trim()) {
        document.getElementById("page-analysis").innerHTML = "Aucun texte à analyser !";
        return;
    }
// Rassemble tous les mots du texte dans un tableau
    const mots = texte.match(/\b\w+\b/g) || [];
// Permet de supprimer les doublons
    const motsuniques = [...new Set(mots)];

    // Création du tableau avec une colonne qui contient les mots originaux du texte et une autre colonne qui contient les mots inversés
    let tableau = "<table border='1' style='border-collapse: collapse;'><tr><th>Mot original</th><th>Mot à l'envers</th></tr>";
// Ce bloc permet de découper les mots en lettres pour les inverser afin d'obtenir les mots à l'envers et on ajoute une ligne au tableau contenant une colonne avec le mot original du texte et une autre colonne contenant le mot inversé
    motsuniques.forEach(mot => {
        const inverse = mot.split('').reverse().join('');  // Nous nous sommes aidés du lien suivant pour la fonction reverse : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse
        tableau += `<tr><td>${mot}</td><td>${inverse}</td></tr>`;
    });

    tableau += "</table>"; // Permet de fermer le tableau avec la balise fermante </table>

    document.getElementById("page-analysis").innerHTML = tableau; // Affichage du tableau avec l'id page-analysis
}


// Le bouton nombrePhrases permet de compter le nombre de phrases dans un fichier txt -------------------------------------------
function nombrePhrases() {
// Permet de récupérer le contenu du texte avec l'id fileDisplayArea
    const contenuTexte = document.getElementById("fileDisplayArea").innerText;

    // // Permet de vérifier si un texte à bien été chargé, dans le cas contraire un message s'affiche indiquant qu'il n'y a pas de fichier texte chargé
    if (!contenuTexte) {
        // Afficher une alerte si aucun fichier n'est chargé
        alert("Il faut d'abord charger le fichier sous format txt.");
        return;
    }

    // Cette ligne permet de couper le texte en phrases à chaque ponctuation qui est suivie d'un espace, supprime les espaces inutiles d'un mot et ignore les phrases vides
    const phrases = contenuTexte.split(/[.!?]\s+/).map(mot => mot.trim()).filter(mot => mot.length > 0);

    // Cette ligne permet d'afficher le nombre total de phrases d'un texte avec l'id page-analysis
    document.getElementById("page-analysis").innerHTML = "Le texte contient " + phrases.length + " phrases.";
}

// BOUTON Mots les plus longs -----------------------------------------
function MotsLesPlusLongs() {
	// Permet de récupérer le contenu du texte avec l'id fileDisplayArea
    const texteCharge = document.getElementById("fileDisplayArea").innerText;

    // Vérification si un fichier a bien été chargé
    if (!texteCharge || texteCharge.trim() === "") { //ici on vérifie que la variable texteCharge est vide ou qu'elle ne contient que des espaces.
        alert("Il faut d'abord charger le fichier sous format txt.");
        return; // Sortir de la fonction si aucun fichier n'est chargé
    }
	
// Cette ligne permet de couper le texte en phrases à chaque ponctuation qui est suivie d'un espace, supprime les espaces inutiles d'un mot et ignore les phrases vides
    const resultat = texteCharge.split(/\s+/).map(mot => mot.trim()).filter(mot => mot.length > 0);

    // Cette ligne trie les mots par longueur c'est-à-dire du plus long au plus court. 
    resultat.sort((mot1, mot2) => mot2.length - mot1.length);

    // Ici on crée un tableau avec deux colonnes : les mots et leur longueur
    let tableau = '<table border="1" style="border-collapse: collapse; width: 100%;">';
	tableau +='<table><tr><th>Mot</th><th>Longueur</th></tr>';
    resultat.forEach(mot => {
        tableau += `<tr><td>${mot}</td><td>${mot.length}</td></tr>`;
    });
    tableau += '</table>';

    // Enfin, on affiche le tableau avec l'id page-analysis
    document.getElementById("page-analysis").innerHTML = tableau;
}
 
// Pie Chart (mots les plus fréquents, moins les stopwords) --------------------------------------------------
function pieChart() {
    var fileArea = document.getElementById('fileDisplayArea'); // on stocke dans la variable fileArea le texte chargé
    var stopwordInput = document.getElementById('stopwordID'); // on stocke les stopwords saisit par l'utilisateur dans le champ prévu à cet effet. 
    var logger = document.getElementById('logger3'); // cela correspond à la zone d'affichage pour les messages d'erreur. 

//Vérifie si l'élément fileArea existe et donc si un fichier a bien été chargé
    if (!fileArea || fileArea.innerText.trim() === "") {
        logger.innerHTML = "Aucun texte à analyser !";
        return;
    }

    logger.innerHTML = ""; // Cela permet de réinitialiser les messages

// On récupère le texte stocké dans fileArea et on le convertit en minuscules (toLowerCase) pour éviter les doublons. 
    var texte = fileArea.innerText.toLowerCase();
    var stopwords = stopwordInput.value.split(",").map(w => w.trim()); // Cela transforme la chaîne saisie dans le champ stopwordID dans un tableau, séparée par des virgules et où les espaces sont retirés. 

// Ce bloc découpe (split) le texte en tokens, puis supprime la ponctuation, ignore les mots trop courts et retire les stopwords définis préalablemement par l'utilisateur
    var tokens = texte.split(/\s+/)
        .map(mot => mot.replace(/[.,;!?()«»"'’\-]/g, '').trim())
        .filter(mot => mot.length > 1 && !stopwords.includes(mot));

//Ce bloc compte le nombre d'occurences de chaque token (pour cette partie nous nous sommes aidées du code fourni par M.BRIGLIA
    var count = {};
    tokens.forEach(token => {
        count[token] = (count[token] || 0) + 1;
    });
	
// Ce bloc prépare les données pour l'affichage du graphique (camembert)
    var chartData = Object.entries(count) //on transforme l'objet 'count' en un tableau [mot,fréquence]
        .sort((a, b) => b[1] - a[1]) //on trie les mots par fréquence décroissante
        .slice(0, 30) //on ne garde que les 30 mots les plus fréquents
        .map(([label, y]) => ({ label, y })); // reformate en objet pour que cela soit lu par CanvasJS

// Si aucun mot saisi par l'utilisateur dans le champ stopwords n'a été trouvé, on affiche un message d'erreur et on arrête la fonction. 
    if (chartData.length === 0) {
        logger.innerHTML = "Aucun résultat ne correspond à votre recherche.";
        return;
    }
 // Création du graphique CanvasJS
    var chart = new CanvasJS.Chart("chartContainer", { // cela crée un graphique (chart) avec la bibliothèque CanvasJS, dans l'élément ChartContainer. 
        animationEnabled: true,
        backgroundColor: "transparent",
        title: {
            text: "Mots les plus fréquents"
        },
        data: [{
            type: "pie",
            showInLegend: true,
            legendText: "{label}",
            indexLabelFontSize: 14,
            indexLabel: "{label} - {y}",
            dataPoints: chartData
        }]
    });

    chart.render();
}




