import { pool } from "../db.js"

export const getPelicula = async (req, res) => {
    const searchTerm = req.query.q; 
    
    console.log(req.params)
    try {
      let query = "SELECT * FROM peliculas";
  
     
      if (searchTerm) {
        query += ` WHERE titulo LIKE '%${searchTerm}%' OR director LIKE '%${searchTerm}%' OR genero LIKE '%${searchTerm}%'`;
      }
  
      const [rows] = await pool.query(query);
      res.json({ rows });
    } catch (error) {
      console.error("Error fetching movies:", error);
      res.status(500).json({ error: "Error fetching movies" });
    }
  };


export const postPelicula = async (req,res)=>{
    const {titulo, director, genero, duracion_minutos, sinopsis, fecha_estreno, clasificacion_edad, idioma, subtitulos, disponible, link} = req.body
    const [rows] = await pool.query("insert into peliculas(titulo, director, genero, duracion_minutos, sinopsis, fecha_estreno, clasificacion_edad, idioma, subtitulos, disponible, link) values (?,?,?,?,?,?,?,?,?,?,?)",
    [titulo, director, genero, duracion_minutos, sinopsis, fecha_estreno, clasificacion_edad, idioma, subtitulos, disponible, link])
    res.send("pelicula agregada")
}







export const putPelicula = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        titulo,
        director,
        genero,
        duracion_minutos,
        sinopsis,
        fecha_estreno,
        clasificacion_edad,
        idioma,
        subtitulos,
        disponible,
        link
      } = req.body;
  
      // Realizar la actualización en la base de datos
      const query = `
        UPDATE peliculas
        SET titulo=?, director=?, genero=?, duracion_minutos=?, sinopsis=?, fecha_estreno=?, clasificacion_edad=?, idioma=?, subtitulos=?, disponible=?, link=?
        WHERE id=?
      `;
      const queryParams = [
        titulo,
        director,
        genero,
        duracion_minutos,
        sinopsis,
        fecha_estreno,
        clasificacion_edad,
        idioma,
        subtitulos,
        disponible,
        link,
        id
      ];
  
      await pool.query(query, queryParams);
  
      res.send("Película actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la película:", error);
      res.status(500).send("Error al actualizar la película");
    }
  };



export const deletePelicula = async (req, res) => {
    try {
        await pool.query("DELETE FROM peliculas WHERE id=?", [req.params.id]);
        res.sendStatus(200); // Envía el código de estado 200 para indicar éxito
    } catch (error) {
        console.error("Error al eliminar la película:", error);
        res.status(500).send("Error al eliminar la película"); // Envía un código de estado 500 en caso de error
    }
}

export const patchPelicula = async (req, res) => {
    try {
      const id = req.params.id;
      const {
        titulo,
        director,
        genero,
        duracion_minutos,
        sinopsis,
        fecha_estreno,
        clasificacion_edad,
        idioma,
        subtitulos,
        disponible,
        link
      } = req.body;
  
      const query = `
        UPDATE peliculas
        SET
          titulo = ?,
          director = ?,
          genero = ?,
          duracion_minutos = ?,
          sinopsis = ?,
          fecha_estreno = ?,
          clasificacion_edad = ?,
          idioma = ?,
          subtitulos = ?,
          disponible = ?,
          link = ?
        WHERE id = ?
      `;
  
      const queryParams = [
        titulo,
        director,
        genero,
        duracion_minutos,
        sinopsis,
        fecha_estreno,
        clasificacion_edad,
        idioma,
        subtitulos,
        disponible,
        link,
        id
      ];
  
      await pool.query(query, queryParams);
  
      res.send("Película actualizada exitosamente");
    } catch (error) {
      console.error("Error al actualizar la película:", error);
      console.log("Error SQL:", error.sql); // Agrega esta línea
      res.status(500).send("Error al actualizar la película");
    }
  };