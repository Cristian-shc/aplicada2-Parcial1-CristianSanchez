import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../db.js";

export const registrar = async (req, res) => {
try {
    const { nombre, email, password, rol } = req.body;

    if (!nombre || !email || !password) {
    return res.status(400).json({
        error: "Faltan datos obligatorios"
    });
    }

    console.log("Intentando registrar:", email);
    console.log("Antes de consultar la base de datos");

    const prueba = await prisma.usuario.findMany();

    console.log("Después de consultar la base de datos");
    console.log("Usuarios actuales:", prueba.length);

    const existe = await prisma.usuario.findUnique({
    where: { email }
    });

    if (existe) {
    return res.status(400).json({
        error: "El email ya está registrado"
    });
    }

    const passwordEncriptada = await bcrypt.hash(password, 10);

    const nuevoUsuario = await prisma.usuario.create({
    data: {
        nombre,
        email,
        password: passwordEncriptada,
        rol: rol || "usuario"
    }
    });

    res.status(201).json({
    id: nuevoUsuario.id,
    nombre: nuevoUsuario.nombre,
    email: nuevoUsuario.email,
    rol: nuevoUsuario.rol
    });
} catch (error) {
    console.log("ERROR:", error);

    res.status(500).json({
    error: "Error al registrar usuario"
    });
}
};

export const login = async (req, res) => {
try {
    const { email, password } = req.body;

    const usuario = await prisma.usuario.findUnique({
    where: { email }
    });

    if (!usuario) {
    return res.status(401).json({
        error: "Credenciales inválidas"
    });
    }

    const coincide = await bcrypt.compare(password, usuario.password);

    if (!coincide) {
    return res.status(401).json({
        error: "Credenciales inválidas"
    });
    }

    const token = jwt.sign(
    {
        id: usuario.id,
        rol: usuario.rol
    },
    process.env.JWT_SECRET,
    {
        expiresIn: "2h"
    }
    );

    res.json({
    mensaje: "Login exitoso",
    token
    });
} catch (error) {
    console.log("ERROR LOGIN:", error);

    res.status(500).json({
    error: "Error al iniciar sesión"
    });
}
};