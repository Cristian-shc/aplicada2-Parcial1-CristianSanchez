import express from "express";
import {
    obtenerLibros,
    crearLibro
} from "../controllers/libros.controller.js";
import {
    verificarToken,
    soloAdmin
} from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", verificarToken, obtenerLibros);
router.post("/", verificarToken, soloAdmin, crearLibro);

export default router;