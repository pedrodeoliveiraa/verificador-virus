document.addEventListener('DOMContentLoaded', function() {
    const btnCheckVirus = document.getElementById('btnCheckVirus');
    const locationDiv = document.getElementById('location');
    const photoDiv = document.getElementById('photo');

    btnCheckVirus.addEventListener('click', async function() {
        // Obter localização do usuário
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                locationDiv.innerHTML = `<p>Localização: Latitude ${latitude}, Longitude ${longitude}</p>`;
            }, error => {
                console.error(error.message);
                locationDiv.innerHTML = `<p>Não foi possível obter a localização.</p>`;
            });
        } else {
            locationDiv.innerHTML = `<p>Geolocalização não suportada pelo navegador.</p>`;
        }

        // Capturar foto através da câmera
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            try {
                const stream = await navigator.mediaDevices.getUserMedia({ video: true });
                const video = document.createElement('video');
                video.srcObject = stream;
                video.setAttribute('autoplay', '');
                video.setAttribute('playsinline', '');
                video.style.maxWidth = '100%';
                photoDiv.innerHTML = '';
                photoDiv.appendChild(video);
            } catch (error) {
                console.error('Erro ao acessar a câmera: ', error);
                photoDiv.innerHTML = `<p>Não foi possível acessar a câmera.</p>`;
            }
        } else {
            photoDiv.innerHTML = `<p>A câmera não é suportada pelo navegador.</p>`;
        }
    });
});
