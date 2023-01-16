let fEdit = document.getElementById("formEdit");

fEdit.addEventListener("submit", function(event) {
  event.preventDefault();
  
  let t = document.getElementById("tituloE").value;
  let prof = document.getElementById("profesorE").value;
  let p = document.getElementById("precioE").value;
  let e = document.getElementById("estudiantesE").value;
  let l = document.getElementById("leccionesE").value;
  let h = document.getElementById("horasE").value;
  let punt = document.getElementById("puntuacionE").value;
  let d = document.getElementById("descripcionE").value;


  if(t == "" || prof == "" || p == "" || e == "" || l == "" || h == "" || punt == "" || d == "") {
      let i = document.getElementById("imgE").value;
      if(i == "") {
        alert("Recorda adjuntar una imagen");
        return;
      }

    alert("Completar los campos vacios");
    return;

  } else {
        swal({
            title: '¡Edición Exitosa!',
            icon: 'success',
        });

  }

  fEdit.submit();

});
