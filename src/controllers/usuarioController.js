
const controller= {
    registro: (req,res) => {
    res.render('./registro')
},
    login:(req,res) => {
    res.render('./login')
}
}


module.exports = controller;