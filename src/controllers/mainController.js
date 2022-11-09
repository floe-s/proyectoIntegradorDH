const controller = {
        index: (req, res) => {
                let usu=false
                if(req.session.profile){
                       usu =true;
                }
                res.render('index',{usu:usu});
                        
                
                
        },
        traductor: (req, res) => {
                let usu=false
                if(req.session.profile){
                       usu =true;
                }
                res.render('./traductor',{usu:usu});
        },

        contacto: (req, res) => {
                let usu=false
                if(req.session.profile){
                       usu =true;
                }
                res.render('./contacto',{usu:usu});
        },


}

module.exports = controller;