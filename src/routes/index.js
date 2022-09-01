import { Router } from "express";

//my
const { runMain } = require('module');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'rscsichfurorjt',
  host: 'ec2-35-168-122-84.compute-1.amazonaws.com',
  database: 'ddc5nmjn0unhqo',
  password: 'baf5c85d46d5bbbbe602b7ce3438793bb1a59370ab10edc29a4bf9567a63c846',
  port: 5432,
  ssl: {
    rejectUnauthorized: false,
  }
})
pool.connect();


const router = Router();

router.get("/", (req, res) => {
  res.render("index", { title: "First Web Node" });
});

router.post("/registro", (req, res) => {
  let datos = req.body;
  let nombre = "" + req.body.nombre;
  //
  console.log('me llego algoooo!!!');
  console.log(req.body);
  console.log(nombre);
  //
  const setRegistro = async () => {
    try {
      await pool.connect();
      const Registro_bd = 'insert into registro(nombre,apellido,correo,fecha,contraseña,formulario,formulario2) VALUES($1,$2,$3,$4,$5,$6,$7)';
      const balores = [req.body.nombre1, req.body.apellido1, req.body.gmail, req.body.fechanaci1, req.body.password1, 'a', 'c'];
      const reg = await pool.query(Registro_bd, balores);
      console.log('si inserto la tabla');
      res.send("usuario registrado con exito");
      await pool.end();
    } catch (e) {
      res.send("El correo ya existe");
      console.log('El correo ya existe');
      await pool.end();
    }
  };
  setRegistro();
});

router.get("/contact", (req, res) => {
  const getRegistro = async () => {
    try {
      await pool.connect();
      const reg = await pool.query('select * from registro');//(await) es para decir que es asincrona y que se ejecute mientras algo mas se ejecute
      //(query) es para traer o llamar las cosas de la base de datos
      res.send(reg.rows);
      //await pool.end();//sierra la base de datos
      return reg;
    } catch (e) {
      console.log(e);
    }
  };
  getRegistro();
});

export default router;
