
let divProncipal  = document.getElementById('principal');
let nombre = document.querySelectorAll('.nombreProducto');
let id = document.querySelectorAll('.id')
let nivel = document.querySelectorAll('.nivelCurso');
let precio = document.querySelectorAll('.precioCurso');
let profesor = document.querySelectorAll('.profeCurso');
let img = document.querySelectorAll(".imgCur");
let sub = document.getElementById('sub');
let total = document.getElementById('total');
let cuotas = document.getElementById('cuotas');

let imagenes = [];

for(g of img){
    imagenes.push(g.classList[1]);
}

let list = []
for(let i = 0; i < nombre.length; i++){

    let productos = {
        id: id[i].innerText,
        nombre: nombre[i].innerText,
        nivel: nivel[i].innerText,
        precio: precio[i].innerText,
        profesor: profesor[i].innerText,
        imagen: imagenes[i],
        
    }

    list.push(productos);
}

window.addEventListener("load", function(){
    let carritoAcu = document.getElementById("happy");
    let ca = document.getElementById('happy2')
    ca.innerText = carritoN.length;
    carritoAcu.innerText = carritoN.length;
})





// funcion agregar curso y localstorage;
let botones = document.querySelectorAll('.agreBtn');

botones.forEach(boton =>{
    boton.addEventListener("click", function(eve){
  
        eve.preventDefault();
        
        if(carritoN == undefined){
            let carritoN = []
            let ides = parseInt(boton.classList[1]);
            let productoNuevo = list.find(element =>{
                return element.id == ides;
            })
            carritoN.push(productoNuevo);
            localStorage.setItem("carrito", JSON.stringify(carritoN));
            carritoN = JSON.parse(localStorage.getItem("carrito"));
        }else if(carritoN.length > 0){
            let ides = parseInt(boton.classList[1]);
            let productoNuevo = list.find(element =>{
                return element.id == ides;
            })
            let x = carritoN.find(ele =>{
                return ele.id == ides;
            })
            console.log(x)
            if(x == undefined){
                
                carritoN = JSON.parse(localStorage.getItem("carrito"));
                carritoN.push(productoNuevo);
                localStorage.setItem("carrito", JSON.stringify(carritoN));
                

            }
               
        }
        Swal.fire({
            title: "NOTIFICAION",
            text: "Se agrego  a tu carrito de compras",
            showConfirmButton: false,
            icon: 'info',
            width: '400px',
            padding: "1rem",
            backdrop: false,
            timer:2000,
            toast: true,
            position: "bottom-end",
        })

        // let carritoAcu = document.getElementById("happy");
        // let ca = document.getElementById('happy2')
        // ca.innerText = carritoN.length;
        // carritoAcu.innerText = carritoN.length;

        setTimeout(()=>{
            location.reload();
        },2000)
    })  
});



// creacion del html del carrito carrito ;

let carritoN = JSON.parse(localStorage.getItem("carrito"));


for(i = 0 ; i < carritoN.length; i ++){

    let divCont = document.createElement("div");
    let divInfo = document.createElement('div');
    let labelNombre = document.createElement("label");
    let labelPrecio = document.createElement("label");
    let labelNivel = document.createElement("label");
    let labelProfesor = document.createElement("label");
    let btnRemver = document.createElement('button');
    let icon = document.createElement('i');
    let img = document.createElement('img');
   

    img.classList.add('logo-obj1')
    btnRemver.classList.add("remove");
    btnRemver.classList.add("l" + i);
    icon.classList.add("fa-solid");
    icon.classList.add("fa-circle-xmark");
    labelNombre.classList.add("c");
    divInfo.classList.add("info")
    divCont.classList.add("object1");
    labelNivel.classList.add("n");
    labelPrecio.classList.add("price");
    labelProfesor.classList.add("p")

    let url = "/img/paises/" + carritoN[i].imagen;
    img.src = url;
    labelNombre.innerText = carritoN[i].nombre;
    labelNivel.innerText = "Nivel: " +  carritoN[i].nivel;
    labelProfesor.innerText = "Profesor: " + carritoN[i].profesor;
    labelPrecio.innerText = "Precio: " + carritoN[i].precio;

    divProncipal.appendChild(divCont);
    divCont.appendChild(img);
    divCont.appendChild(divInfo)
    divInfo.appendChild(labelNombre);
    divInfo.appendChild(labelNivel);
    divInfo.appendChild(labelProfesor);
    divInfo.appendChild(labelPrecio);
 


}
// remver objeto 
let btnRemover = document.querySelectorAll('.remove');



btnRemover.forEach(btn =>{
    btn.addEventListener("click",()=>{

    })
})
// vaciar papelera
let vacirCarrito = document.getElementById('vaciar');
vacirCarrito.addEventListener("click", function(){
    carritoN = JSON.parse(localStorage.getItem('carrito'));
    localStorage.clear()
});






// sumar precios cursos 

let precios = carritoN.map(eje => parseFloat(eje.precio))
let totalPrecio = precios.reduce((total, numeros)=> {return total + numeros});
let cuotasMese = totalPrecio/6;
total.innerText = "$" + totalPrecio;
sub.innerText = "$" + totalPrecio;
cuotas.innerText ="$" +  (cuotasMese).toFixed(2);




