// api/get-version.js

export default async function handler(req, res) {
    // Lee las mismas variables de entorno que ya tienes configuradas
    const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
    const USER = process.env.GITHUB_USER;
    const REPO = process.env.GITHUB_REPO;

    if (!GITHUB_TOKEN || !USER || !REPO) {
        return res.status(500).json({ error: 'Error de configuración del servidor.' });
    }

    try {
        const releaseUrl = `https://api.github.com/repos/${USER}/${REPO}/releases/latest`;
        
        const releaseResponse = await fetch(releaseUrl, {
            headers: {
                'Authorization': `token ${GITHUB_TOKEN}`,
                'Accept': 'application/vnd.github.v3+json',
            },
        });

        if (!releaseResponse.ok) {
            return res.status(releaseResponse.status).json({ error: `Error al contactar GitHub: ${releaseResponse.statusText}` });
        }

        const releaseData = await releaseResponse.json();

        // El número de versión usualmente está en 'tag_name'
        const version = releaseData.tag_name;
        // Las notas del release están en 'body' (formato Markdown)
        const notes = releaseData.body;

        if (!version) {
             return res.status(404).json({ error: 'No se encontró la etiqueta de versión en el último release.' });
        }

        // Enviamos la versión y las notas como respuesta en formato JSON
        res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate'); // Cache por 1 hora
        return res.status(200).json({ 
            version: version, 
            notes: notes || "No se encontraron notas para esta versión." 
        });

    } catch (error) {
        console.error('Error en la función get-version:', error);
        return res.status(500).json({ error: 'Ha ocurrido un error interno en el servidor.' });
    }
}
