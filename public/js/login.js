let fLog = document.getElementById("formLog");
let botonLogin = document.getElementById("boton-envia")
let e = document.getElementById("email");
let p = document.getElementById("password");
let check =  document.querySelectorAll('.fa-circle-check');
let error = document.querySelectorAll(".fa-circle-xmark")

fLog.addEventListener("submit", function(event) {
  let height = "-80px";
  let posicion; "center"
  let alto = window.innerHeight;
  if(alto > 800 && alto <= 900){
      height = "-100px"  
  }else if(alto > 550 && alto <= 700){
      // height ="-120px"
      posicion = "bottom"
  }
  event.preventDefault();
  console.log(e.value)
  let h = [];
  h.push(e, p);
  console.log(h)
  if(e.value == "" || p.value == ""){
      Swal.fire({
        icon: 'error',
        title: '<label class="opss">Oops...</label>',
        text: 'Debes llenar todos los campos.',
        position: `${posicion}`,
        width: '300px',
        backdrop: `
          rgba(0,0,123,0.4)
          url("/img/6kp.gif")
          center
          top ${height}
          no-repeat
        `
      })
      for(let i = 0 ; i < h.length; i++){
        if(h[i].value == ""){
            
            h[i].style.border = "1px solid red";
            error[i].style.opacity = 1;
            check[i].style.display = 0;
        }else if(h[i].value != ""){
            h[i].style.border = "2px solid #00ff40";
            check[i].style.opacity = 1;
           error[i].style.opacity = 0;
        }
    }
  }else{
    Swal.fire({
      position: 'center',
      title: 'Iniciando Sesión',
      showConfirmButton: false,
      timerProgressBar: true,
      position: `${posicion}`,
      timer:3000,
      backdrop: `
      rgba(0,0,123,0.4)
      url("/img/Pak.gif")
      center
      top ${height}
      no-repeat
    `,
    didOpen: () => {
      Swal.showLoading()
      const b = Swal.getHtmlContainer().querySelector('b')
      timerInterval = setInterval(() => {
        b.textContent = Swal.getTimerLeft()
      }, 100)
    },
    willClose: () => {
      clearInterval(timerInterval)
    }
  }).then((result) => {
    /* Read more about handling dismissals below */
    if (result.dismiss === Swal.DismissReason.timer) {
      console.log('I was closed by the timer')
    }
    
  })
  setTimeout(()=>{
      fLog.submit();
  },3000)
  }

});
