const express = require('express');
const path = require('path');

const app = express();

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
});

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/cursos.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/cursos.html'));
});

app.get('/descargables.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/descargables.html'));
});

app.get('/traductor.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/traductor.html'));
});

app.get('/suscripciones.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/suscripciones.html'));
});

app.get('/contacto.html', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/contacto.html'));
});

app.get('/login.html', (req, res)=>{
  res.sendFile(path.resolve(__dirname, './views/login.html'));
});
console.log(traductor)