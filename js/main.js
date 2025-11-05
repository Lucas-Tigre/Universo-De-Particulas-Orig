
import { config } from './config.js';

function initMainPage() {
    if (config.show_background) {
        // Define um background padrão para a página principal
        const defaultGalaxy = config.galaxy_backgrounds.default;
        if (defaultGalaxy) {
            document.body.style.backgroundImage = "url('assets/images/MapaFN.png')";
            document.body.style.backgroundSize = 'cover';
            document.body.style.backgroundPosition = 'center';
        }
    }
}

// Garante que o DOM está carregado antes de executar o script
document.addEventListener('DOMContentLoaded', initMainPage);
