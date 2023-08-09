// peliculas.router.js
import { Router } from "express";
import { getPelicula, postPelicula, deletePelicula, putPelicula,patchPelicula } from "../controllers/peliculas.controllers.js"

const router = Router();

router.get("/peliculas", getPelicula);
router.post("/peliculas", postPelicula);
router.put("/peliculas/:id", putPelicula);
router.delete("/peliculas/:id", deletePelicula);
router.patch("/peliculas/:id",patchPelicula)

export default router;