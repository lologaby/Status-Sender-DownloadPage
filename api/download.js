// api/download.js

export default async function handler(req, res) {
    // --- CONFIGURACIÓN ---
    // Lee las variables de entorno que configurarás en Vercel.
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const USER = process.env.GITHUB_USER;
    const REPO = process.env.GITHUB_REPO;
    // Opcional: El nombre del archivo a descargar (si tienes varios).
    // Déjalo como null para descargar el primer archivo del release.
    const ASSET_NAME = null; 
    // -------------------

    if (!GITHUB_TOKEN || !USER || !REPO) {
        return res.status(500).json({ error: 'Variables de entorno no configuradas en el servidor.' });
    }

    try {
        // 1. Obtener la información del último "release" desde la API de GitHub.
        const releaseUrl = `https://api.github.com/repos/${USER}/${REPO}/releases/latest`;
        const releaseResponse = await fetch(releaseUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!releaseResponse.ok) {
            console.error('Error al obtener el release:', releaseResponse.statusText);
            return res.status(releaseResponse.status).json({ error: `Error al contactar GitHub: ${releaseResponse.statusText}` });
        }

        const releaseData = await releaseResponse.json();
        
        if (!releaseData.assets || releaseData.assets.length === 0) {
            return res.status(404).json({ error: 'El último release no contiene archivos para descargar.' });
        }

        // 2. Encontrar el archivo (asset) correcto para descargar.
        let asset = releaseData.assets[0]; // Por defecto, el primer archivo.
        if (ASSET_NAME) {
            asset = releaseData.assets.find(a => a.name === ASSET_NAME);
        }

        if (!asset) {
            return res.status(404).json({ error: `No se encontró el archivo con el nombre ${ASSET_NAME} en el release.` });
        }

        // 3. Obtener la URL de descarga real.
        // GitHub requiere una petición específica para obtener una URL temporal y firmada.
        const assetUrl = asset.url;
        const assetResponse = await fetch(assetUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/octet-stream', // ¡Esto es crucial!
            },
            redirect: 'manual' // Evitamos que fetch siga la redirección automáticamente.
        });

        // GitHub responde con un 302 Redirect a una URL temporal de S3.
        // Extraemos esa URL del header 'location'.
        const downloadUrl = assetResponse.headers.get('location');

        if (!downloadUrl) {
             console.error('No se pudo obtener la URL de descarga final desde GitHub.');
             return res.status(500).json({ error: 'Respuesta inesperada de la API de GitHub.' });
        }

        // 4. Redirigir al cliente a la URL de descarga final.
        res.redirect(302, downloadUrl);

    } catch (error) {
        console.error('Error en la función del servidor:', error);
        res.status(500).json({ error: 'Ha ocurrido un error interno en el servidor.' });
    }
}