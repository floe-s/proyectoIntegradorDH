const express = require('express');
const app = express();

const productosRoutes = require('./src/routes/productosRoutes')
const mainRoutes = require('./src/routes/mainRoutes')
const usuarioRoutes = require('./src/routes/usuarioRoutes')
const session = require('express-session');
const methodOverride = require('method-override');
const cookieParser = require('cookie-parser');

const path = require('path');
const publicPath = path.resolve(__dirname, './public');
app.use(express.static(publicPath));

//para indicar que vamos a usar POST
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//para usar session
app.use(session({secret: 'mi secreto moidi',saveUninitialized: false, resave: false}));
// para poder usar put y delete 
app.use(methodOverride('_method'));
// para usar cookies
app.use(cookieParser());

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

app.use((req, res, next) => {
  res.status(404).render('not-found') 
});
