let fReg = document.getElementById("formReg");
let check =  document.querySelectorAll('.fa-circle-check');
let botonCrear = document.getElementById("btn-crear");
let inputImg  = document.getElementById("file");
let error = document.querySelectorAll(".fa-circle-xmark")
  
  let n = document.getElementById("nombre");
  let a = document.getElementById("apellido");
  let t = document.getElementById("telefono");
  let e = document.getElementById("email");
  let c = document.getElementById("contrasena");
  


fReg.addEventListener("submit", (evento) =>{

  evento.preventDefault()
  let inputs = []
  inputs.push(n, a, t,e,c);
  if(n.value == "" || a.value == ""|| t.value == "" || e.value == "" || c.value == "") {
    Swal.fire({
      icon: 'error',
      title: 'Oop...',
      text: 'Debes llenar todos los campos.',
      width: '300px',
      backdrop: `
        rgba(0,0,123,0.4)
        url("/img/6kp.gif")
        center
        top -80px
        no-repeat
      `
  })
 
  for(let i = 0 ; i < inputs.length; i++){
    if(inputs[i].value == ""){
      error[i].style.opacity = 1;
      check[i].style.opacity = 0;
      inputs[i].style.border = "2px solid red"
    }else if(inputs[i].value != ""){
      error[i].style.opacity = 0;
      check[i].style.opacity = 1;
      inputs[i].style.border = "2px solid #00ff40"
    }
  }
  }else{
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Confirmado',
      text: "Te has registrao perfectamente",
      showConfirmButton: false,
      width: '300px',
      backdrop: `
      rgba(0,0,123,0.4)
      url("/img/nRm.gif")
      center
      top -80px
      no-repeat
    `,
    
  })
  setTimeout(()=>{
      fReg.submit();
  },3000)
  }
})



