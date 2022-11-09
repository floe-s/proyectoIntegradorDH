const controller = {
        index: (req, res) => {
                let usu=false;
                let admi = false;
                if(req.session.profile){
                       usu =true;
                       if(req.session.profile.tipoUsuario == "admin"){
                        admi=true
                      }
                }
                res.render('index',{usu:usu, admi: admi});
                        
                
                
        },
        traductor: (req, res) => {
                let usu=false;
                let admi = false;
                if(req.session.profile){
                       usu =true;
                       if(req.session.profile.tipoUsuario == "admin"){
                        admi=true
                      }
                }
                res.render('./traductor',{usu:usu,admi:admi});
        },

        contacto: (req, res) => {
                let usu=false;
                let admi = false;
                if(req.session.profile){
                       usu =true;
                       if(req.session.profile.tipoUsuario == "admin"){
                        admi=true
                      }
                }
                res.render('./contacto',{usu:usu,admi:admi});
        },


}

module.exports = controller;