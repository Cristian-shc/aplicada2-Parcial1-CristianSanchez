import jwt from "jsonwebtoken";

export const verificarToken = (req, res, next) => {
try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
    return res.status(401).json({
        error: "Token requerido"
    });
    }

    const token = authHeader.split(" ")[1];

    const usuario = jwt.verify(token, process.env.JWT_SECRET);

    req.usuario = usuario;

    next();
} catch (error) {
    return res.status(401).json({
    error: "Token inválido"
    });
}
};

export const soloAdmin = (req, res, next) => {
if (req.usuario.rol !== "admin") {
    return res.status(403).json({
    error: "Acceso denegado"
    });
}

next();
};