// 1. On sélectionne la balise <video> du fichier HTML
const maVideo = document.getElementById('video');

// 2. On demande au téléphone d'activer la caméra ARRIÈRE ("environment")
const configuration = {
    video: { facingMode: "environment" },
    audio: false // On n'a pas besoin du micro ici
};

// 3. On active la caméra et on l'injecte dans le HTML
navigator.mediaDevices.getUserMedia(configuration)
    .then(function(flux) {
        // Si ça marche, on met la vidéo dans notre balise
        maVideo.srcObject = flux;
    })
    .catch(function(erreur) {
        // Si ça bug (par exemple sur un PC sans caméra arrière), on affiche l'erreur
        alert("Erreur d'accès à la caméra : " + erreur);
    });