import prisma from "../db.js";

export const obtenerLibros = async (req, res) => {
try {
    const libros = await prisma.libro.findMany();

    res.json(libros);
} catch (error) {
    console.log("ERROR LIBROS:", error);

    res.status(500).json({
    error: "Error al obtener los libros"
    });
}
};

export const crearLibro = async (req, res) => {
try {
    const { titulo, autor } = req.body;

    if (!titulo || !autor) {
    return res.status(400).json({
        error: "Faltan datos obligatorios"
    });
    }

    const libro = await prisma.libro.create({
    data: {
        titulo,
        autor
    }
    });

    res.status(201).json(libro);
} catch (error) {
    console.log("ERROR CREAR LIBRO:", error);

    res.status(500).json({
    error: "Error al crear el libro"
    });
}
};