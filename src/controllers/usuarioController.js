const fs = require('fs');
const path = require('path');

const usuarioPath = path.join(__dirname, '../data/usuarioData.json');
let usuarios = JSON.parse(fs.readFileSync(usuarioPath, 'utf-8'));

const controller = {

    registro: (req,res) => {
        res.render('./users/registro',{email: false});
    },

    // para crear registro
    registrar:(req, res)=>{
        //console.log(req.body)

        let idNuevo = 1;

        for(let s of usuarios){
            if(idNuevo == s.id){
                idNuevo = s.id
            }
        }

        idNuevo++;

        console.log(req.file)
        let imgName = req.file.filename;

        let usuarioNuevo ={
            id:idNuevo,
            nombre: req.body.nombre,
            apellido: req.body.apellido,
            telefono: req.body.telefono,
            email: req.body.email,
            contrasena: req.body.contrasena,
            img: imgName
        }

        usuarios.push(usuarioNuevo);

        fs.writeFileSync(usuarioPath,JSON.stringify(usuarios,null," "));
  
        res.redirect('/');
    },

    login:(req,res) => {
        res.render('./users/login',{ error:false});
    },


    perfil:(req,res) => {
        res.render('users/perfil',{us: usuarios});
    },
    
    editar:(req,res) => {
    
    let idus = req.params.id;
    let objUsuario;

    for(let o of usuarios) {
      if(idus == o.id) {
        objUsuario = o;
        break;
      }
    }
    console.log(objUsuario, req.params)
        res.render('./users/editar-usuario',{us: objUsuario});
    },

    update: (req,res) => {
        let idus = req.params.id;

    for(let o of usuarios) {
      if(idus == o.id) {
        o.titulo = req.body.titulo;
        o.estudiantes = req.body.estudiantes;
        o.profesor = req.body.profesor;
        o.precio = req.body.precio;
        o.nivel = req.body.nivel;
        o.lecciones = req.body.lecciones;
        o.horas = req.body.horas;
        o.puntuacion = req.body.puntuacion;
        o.img = nombreImg;
        o.imgNivel = icon;
        o.des = req.body.descripcion;
        o.idinput = nombreImg;
        break;
      }
    }
    fs.writeFileSync(usuarioPath,JSON.stringify(usuarios,null," ")); // Se guarda los datos al JSON 
  
    res.redirect('/usuario/perfil');
    }
}


module.exports = controller;