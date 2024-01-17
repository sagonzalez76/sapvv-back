import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import fs from 'fs';


export async function downloadFile(req, res) {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = dirname(__filename);

    const fileId = req.params.url;
    // console.log(fileId);
    const filePath = path.resolve(__dirname, '..', '..', 'uploads', fileId);

    // Verifica si el archivo existe
    if (fs.existsSync(filePath)) {
        // Configura las cabeceras de respuesta para indicar que es una descarga de archivo
        res.setHeader('Content-Disposition', `attachment; filename=${fileId}`);
        res.setHeader('Content-Type', 'application/octet-stream');

        // Lee y envía el contenido del archivo
        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } else {
        // Maneja el caso donde el archivo no existe
        res.status(404).send('File not found');
    }
}