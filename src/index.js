import "dotenv/config";
import "dotenv/config";
import express from "express";
import authRoutes from "./routes/auth.routes.js";
import librosRoutes from "./routes/libros.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
    mensaje: "API de biblioteca funcionando"
    });
});

app.use("/auth", authRoutes);
app.use("/libros", librosRoutes);

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en el puerto ${PORT}`);
});