

const controlador = {
  
  cursos: (req, res) => {
    res.render('./products/cursos')
  },

  descargables: (req, res) => {
    res.render('./descargables')
  },

  suscripciones: (req, res) => {
    res.render('./suscripciones')
  },

  carrito: (req, res) => {
    res.render('./carrito-compras')
  },

  cargar: (req, res) => {
    res.render('./products/cargar')
  },

  editar: (req, res) => {
    res.render('./products/editar')
  }

}

module.exports = controlador;

//Ejemplo que mostro Jero
/* const controlador = {
  index: (req, res) => {
    res.sendFile(path.resolve(__dirname, './views/index.html'));
  },

  product: (req, res) => {
    res.send("Producto223");
  }
} */