const maVideo = document.getElementById('video');

// Fonction principale pour démarrer la caméra
async function demarrerCameraArriere() {
    try {
        // 1. On demande d'abord la liste de tous les appareils (caméras, micros)
        const appareils = await navigator.mediaDevices.enumerateDevices();
        
        // 2. On filtre pour ne garder que les caméras vidéo
        const cameras = appareils.filter(appareil => appareil.kind === 'videoinput');
        
        // 3. On cherche une caméra qui contient le mot "back" ou "arrière" dans son nom
        let cameraArriere = cameras.find(cam => 
            cam.label.toLowerCase().includes('back') || 
            cam.label.toLowerCase().includes('arrière') ||
            cam.label.toLowerCase().includes('environment')
        );

        // Si on ne trouve pas par le nom, on prend la dernière de la liste (souvent la caméra arrière sur smartphone)
        if (!cameraArriere && cameras.length > 0) {
            cameraArriere = cameras[cameras.length - 1];
        }

        // 4. Configuration finale
        let configuration = { audio: false };
        
        if (cameraArriere) {
            // Si on a trouvé l'identifiant unique de la caméra arrière, on l'utilise
            configuration.video = { deviceId: { exact: cameraArriere.deviceId } };
        } else {
            // Plan de secours classique si les noms de caméras sont masqués
            configuration.video = { facingMode: "environment" };
        }

        // 5. Lancement du flux vidéo
        const flux = await navigator.mediaDevices.getUserMedia(configuration);
        maVideo.srcObject = flux;

    } catch (erreur) {
        alert("Impossible d'accéder à la caméra : " + erreur.name + " - " + erreur.message);
    }
}

// On lance la fonction au chargement de la page
demarrerCameraArriere();
