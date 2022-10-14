const productosRoutes = require('./src/routes/productosRoutes')
const mainRoutes = require('./src/routes/mainRoutes')
const usuarioRoutes = require('./src/routes/usuarioRoutes')
const methodOverride = require('method-override');
/* const usuarioRoutes = require('./src/routes/usuarioRoutes')
const productoRoutes = require('./src/routes/productoRoutes') */

const express = require('express');
const path = require('path');

const app = express();
// para poder usar put y delete 

app.use(methodOverride('_method'));
//para indicar que vamos a usar POST

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// rutas globales
app.use('/', mainRoutes);

app.use('/usuario', usuarioRoutes);

app.use('/producto', productosRoutes);

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));


// para usar ejs

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));



app.listen(process.env.PORT || 3002, function() {
  console.log("Servidor corriendo en el puerto 3002");
});

//Ejemplo que mostro Jero
/* app.use('*', function(req, res) {
  res.send("ruta erronea ");
}); */

/* app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
}); */

//RUTAS
/* app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/index.html'));
});

app.get('/cursos', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/cursos.html'));
});

app.get('/descargables', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/descargables.html'));
});

app.get('/traductor', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/traductor.html'));
});

app.get('/suscripciones', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/suscripciones.html'));
});

app.get('/contacto', (req, res) => {
  res.sendFile(path.resolve(__dirname, './views/contacto.html'));
});

app.get('/registro', (req, res)=>{
  res.sendFile(path.resolve(__dirname, './views/registro.html'));
});

app.get('/login', (req, res)=>{
  res.sendFile(path.resolve(__dirname, './views/login.html'));
});

app.get('/carrito-compras', (req, res)=>{
  res.sendFile(path.resolve(__dirname, './views/carrito-compras.html'));
}); */
