let fReg = document.getElementById("formReg");

fReg.addEventListener("submit", function(event) {
  event.preventDefault();
  
  let n = document.getElementById("nombre").value;
  let a = document.getElementById("apellido").value;
  let t = document.getElementById("telefono").value;
  let e = document.getElementById("email").value;
  let c = document.getElementById("contrasena").value;


  if(n == "" || a == "" || t == "" || e == "" || c == "") {

    alert("Completar los campos vacios");
    return;
  } else {
        swal({
            title: '¡Registro Exitoso!',
            text: 'Su Email es: ' + e,
            icon: 'success',
            showConfirmButton: true,
            button: 'Iniciar Sesión',
        });

  }

  fReg.submit();

});

//Validacion para carga de imagen de perfil
fReg.addEventListener("submit", function(event) {
  event.preventDefault();

  let i = document.getElementById("file").value;
  if(i == "") {
    alert("Recorda adjuntar tu imagen de perfil");
    return;
  }

  fReg.submit();

});





