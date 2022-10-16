const controller= {
        index: (req, res) => {
                res.render('index');
        },
        traductor: (req, res) => {
                res.render('./traductor');
        },

        contacto: (req, res) => {
                res.render('./contacto');
        },


}

module.exports = controller;