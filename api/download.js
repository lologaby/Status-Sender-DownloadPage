// api/download.js

export default async function handler(req, res) {
    // --- CONFIGURACIÓN ---
    // Lee las variables de entorno que configuraste en Vercel.
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const USER = process.env.GITHUB_USER;
    const REPO = process.env.GITHUB_REPO;
    // -------------------

    if (!GITHUB_TOKEN || !USER || !REPO) {
        console.error("Una o más variables de entorno no están configuradas en el servidor.");
        return res.status(500).json({ error: 'Error de configuración del servidor.' });
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
            console.error(`Error al obtener el release: ${releaseResponse.status} - ${releaseResponse.statusText}`);
            return res.status(releaseResponse.status).json({ error: `Error al contactar GitHub: ${releaseResponse.statusText}` });
        }

        const releaseData = await releaseResponse.json();
        
        if (!releaseData.assets || releaseData.assets.length === 0) {
            console.error("El último release no contiene archivos.");
            return res.status(404).json({ error: 'El último release no contiene archivos para descargar.' });
        }

        // 2. Encontrar el archivo (asset) que termina en .exe
        const asset = releaseData.assets.find(a => a.name.endsWith('.exe'));

        // Si no se encuentra ningún archivo .exe, devolvemos un error.
        if (!asset) {
            console.error("No se encontró ningún archivo .exe en el último release.");
            return res.status(404).json({ error: 'No se encontró un archivo .exe para descargar en el último release.' });
        }

        // 3. Obtener la URL de descarga real del .exe
        const assetUrl = asset.url;
        const assetResponse = await fetch(assetUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/octet-stream', // Crucial para obtener la URL de descarga
            },
            redirect: 'manual' // Evitamos que fetch siga la redirección automáticamente.
        });

        // GitHub responde con un 302 Redirect a una URL temporal.
        const downloadUrl = assetResponse.headers.get('location');

        if (!downloadUrl) {
             console.error('No se pudo obtener la URL de descarga final desde GitHub.');
             return res.status(500).json({ error: 'Respuesta inesperada de la API de GitHub.' });
        }

        // 4. Redirigir al cliente a la URL de descarga final para que comience a bajar el .exe
        res.redirect(302, downloadUrl);

    } catch (error) {
        console.error('Error en la función del servidor:', error);
        res.status(500).json({ error: 'Ha ocurrido un error interno en el servidor.' });
    }
}
