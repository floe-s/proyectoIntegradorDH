const productosRoutes = require('./src/routes/productosRoutes')
const mainRoutes = require('./src/routes/mainRoutes')
const usuarioRoutes = require('./src/routes/usuarioRoutes')
const methodOverride = require('method-override');

const express = require('express');
const path = require('path');

const app = express();
// para poder usar put y delete 

const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

app.use(methodOverride('_method'));
//para indicar que vamos a usar POST

app.use(express.urlencoded({extended:false}));
app.use(express.json());

// rutas globales
app.use('/', mainRoutes);

app.use('/usuario', usuarioRoutes);

app.use('/producto', productosRoutes);

// para usar ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './src/views'));

app.listen(process.env.PORT || 3002, function() {
  console.log("Servidor corriendo en el puerto 3002");
});


