let btnEditar = document.getElementById("btn-editCard");
let marco = document.querySelector('.v');
let btnCancelar = document.getElementById("cancelarEdit");
let form = document.querySelector(".editar-perfil");

btnEditar.addEventListener("click", function() {
    marco.style.background = "rgba(0, 0, 0, 0.3)";
    
})


btnCancelar.addEventListener("click", function() {
    marco.style.background = "rgba(255, 255, 255,0.5)";
    marco.style.backdropFilter = "blur(10px)";
})

