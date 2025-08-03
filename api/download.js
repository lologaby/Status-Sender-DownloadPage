// api/download.js

export default async function handler(req, res) {
    // --- CONFIGURACIÓN ---
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const USER = process.env.GITHUB_USER;
    const REPO = process.env.GITHUB_REPO;
    const ASSET_NAME = null; 

    // --- PASO DE DEPURACIÓN ---
    // Vamos a registrar en los logs de Vercel qué está recibiendo la función.
    console.log("--- INICIANDO FUNCIÓN DE DESCARGA (MODO DEPURACIÓN) ---");
    console.log(`Usuario de GitHub (USER): ${USER}`);
    console.log(`Repositorio de GitHub (REPO): ${REPO}`);
    console.log(`¿Se recibió un token (GITHUB_TOKEN)? ${!!GITHUB_TOKEN}`); // Debería ser true
    if (GITHUB_TOKEN) {
        console.log(`Longitud del token recibido: ${GITHUB_TOKEN.length}`); // Para confirmar que no está vacío
    } else {
        console.error("¡ALERTA! El GITHUB_TOKEN es undefined o null.");
    }
    // --------------------------------------------------------------------

    if (!GITHUB_TOKEN || !USER || !REPO) {
        return res.status(500).json({ error: 'Una o más variables de entorno no fueron recibidas por la función.' });
    }

    try {
        const releaseUrl = `https://api.github.com/repos/${USER}/${REPO}/releases/latest`;
        console.log(`Intentando acceder a la URL de la API: ${releaseUrl}`);

        const releaseResponse = await fetch(releaseUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        // Si la respuesta no es OK, también lo registramos
        if (!releaseResponse.ok) {
            console.error(`Respuesta de GitHub: ${releaseResponse.status} - ${releaseResponse.statusText}`);
            const errorBody = await releaseResponse.json();
            console.error('Cuerpo del error de GitHub:', errorBody);
            return res.status(releaseResponse.status).json({ error: `Error al contactar GitHub: ${releaseResponse.statusText}` });
        }

        const releaseData = await releaseResponse.json();
        
        if (!releaseData.assets || releaseData.assets.length === 0) {
            return res.status(404).json({ error: 'El último release no contiene archivos para descargar.' });
        }

        let asset = releaseData.assets[0];
        if (ASSET_NAME) {
            asset = releaseData.assets.find(a => a.name === ASSET_NAME);
        }

        if (!asset) {
            return res.status(404).json({ error: `No se encontró el archivo con el nombre ${ASSET_NAME} en el release.` });
        }

        const assetUrl = asset.url;
        const assetResponse = await fetch(assetUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/octet-stream',
            },
            redirect: 'manual' 
        });

        const downloadUrl = assetResponse.headers.get('location');

        if (!downloadUrl) {
             console.error('No se pudo obtener la URL de descarga final desde GitHub.');
             return res.status(500).json({ error: 'Respuesta inesperada de la API de GitHub.' });
        }

        res.redirect(302, downloadUrl);

    } catch (error) {
        console.error('Error catastrófico en la función del servidor:', error);
        res.status(500).json({ error: 'Ha ocurrido un error interno en el servidor.' });
    }
}
