let form = document.getElementById("form-contacto");
let btn = document.getElementById("boton");
let nombre = document.getElementById("nombre");
let apellido = document.getElementById("apellido");
let email = document.getElementById("email");
let telefono= document.getElementById("telefono");
let mensaje = document.getElementById("mensaje");
let check =  document.querySelectorAll('.fa-circle-check');
let error = document.querySelectorAll(".fa-circle-xmark")




form.addEventListener("submit", (evento)=>{
    let height = "-80px";
    let posicion; "center"
    let alto = window.innerHeight;
    if(alto > 800 && alto <= 900){
        height = "-100px"  
    }else if(alto > 550 && alto <= 700){
        // height ="-120px"
        posicion = "bottom"
    }


    evento.preventDefault();
    let c = []
    c.push(nombre, apellido, email, telefono, mensaje)
    if(nombre.value == "" || apellido.value == "" || email.value == "" || telefono.value == "" || mensaje.value == ""){
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
        for(let i = 0 ; i < c.length; i++){
            if(c[i].value == ""){
                
                c[i].style.border = "1px solid red";
                error[i].style.display = "inline";
                check[i].style.display = "none";
            }else if(c[i].value != ""){
                c[i].style.border = "2px solid #00ff40";
                check[i].style.display = "inline";
                error[i].style.display = "none";

            }
        }

    }else{
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Confirmado',
            text: "Tu mensaje fue enviado correctamente",
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
            form.submit();
        },3000)
        
    }

});