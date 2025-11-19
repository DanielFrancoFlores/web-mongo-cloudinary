import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());

// Obtener __dirname en ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Conexión a MongoDB
mongoose
    .connect(process.env.MONGODB_URI, { dbName: "BD-Nube-Lidia" })
    .then(() => console.log("Servidor conectado correctamente con MongoDB Atlas"))
    .catch(err => console.error("Error al conectar MongoDB:", err));

// Modelo de imágenes
const Imagen = mongoose.model(
    "Nube-1",
    new mongoose.Schema({
        nombre: String,
        url: String
    }),
    "Nube-1"
);

// Ruta API obtener imágenes
app.get("/api/images", async (req, res) => {
    try {
        const imagenes = await Imagen.find({});
        res.json(imagenes);
    } catch (error) {
        res.status(500).json({ error: "Error al obtener imágenes" });
    }
});

// Servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));

// Manejar SPA (React, Vue o HTML simple)
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Iniciar servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor iniciado en puerto ${PORT}`));
