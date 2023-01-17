let fCar = document.getElementById("formCar");

fCar.addEventListener("submit", function(event) {
  event.preventDefault();
  
  let t = document.getElementById("titulo").value;
  let prof = document.getElementById("profesor").value;
  let p = document.getElementById("precio").value;
  let e = document.getElementById("estudiantes").value;
  let l = document.getElementById("lecciones").value;
  let h = document.getElementById("horas").value;
  let punt = document.getElementById("puntuacion").value;
  let d = document.getElementById("descripcion").value;


  if((t == "") || (prof == "") || (p == "") || (e == "") || (l == "") || (h == "") || (punt == "") || (d == "")) {

      let i = document.getElementById("imgProduct").value;
      if(i == "") {
        alert("Recorda adjuntar una imagen");
        return;
      }

    alert("Completar los campos vacios");
    return;
  } else {
        swal({
            title: '¡Registro Exitoso!',
            icon: 'success',
        });

  }

  fCar.submit();

});