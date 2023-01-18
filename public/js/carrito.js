let divProncipal  = document.getElementById('principal');
let nombre = document.querySelectorAll('.nombreProducto');
let id = document.querySelectorAll('.id')
let nivel = document.querySelectorAll('.nivelCurso');
let precio = document.querySelectorAll('.precioCurso');
let profesor = document.querySelectorAll('.profeCurso');

let list = []
for(let i = 0; i < nombre.length; i++){

    let productos = {
        id: id[i].innerText,
        nombre: nombre[i].innerText,
        nivel: nivel[i].innerText,
        precio: precio[i].innerText,
        profesor: profesor[i].innerText,

    }

    list.push(productos);
}



let botones = document.querySelectorAll('.agreBtn');
botones.forEach(boton =>{
    boton.addEventListener("click", function(){
        let carritoN = [];
        
        if(carritoN ==  1){
            let ides = parseInt(boton.classList[1]);
            let agregarProduct = list.filter(element =>{
                return element.id == ides;
            })
            carritoN.push(agregarProduct)
            localStorage.setItem('carrito', JSON.stringify(carritoN));
        }else {
            carritoN = JSON.parse(localStorage.getItem('carrito'));
            let ides = parseInt(boton.classList[1]);
            let agregarProduct = list.find(element =>{
                return element.id == ides;
            })
    
            let ex = carritoN.find(element =>{
                return element.id == ides;
            })
            if( ex == undefined){
                carritoN.push(agregarProduct);
            }else if (ex.id == ides){
                alert('ya esta el curso en el carrito');
            }
            localStorage.setItem('carrito', JSON.stringify(carritoN));
        }
 
        
    
        
    })
});
// carrito ;

for(let i = 0; i < carritoN.length; i++){
    let divCont = document.createElement("div");
    let divInfo = document.createElement('div');
    let labelNombre = document.createElement("label");
    let labelPrecio = document.createElement("label");
    let labelNivel = document.createElement("label");
    let labelProfesor = document.createElement("label");

    labelNombre.classList.add("c");
    divInfo.classList.add("info")
    divCont.classList.add("object1");
    labelNivel.classList.add("n");
    labelPrecio.classList.add("price");
    labelProfesor.classList.add("p")


    labelNombre.innerText = carritoN[i].nombre;
    labelNivel.innerText = "Nivel: " +  carritoN[i].nivel;
    labelProfesor.innerText = "Profesor: " + carritoN[i].profesor;
    labelPrecio.innerText = "Precio: " + carritoN[i].precio;

    divProncipal.appendChild(divCont);
    divCont.appendChild(divInfo)
    divInfo.appendChild(labelNombre);
    divInfo.appendChild(labelNivel);
    divInfo.appendChild(labelProfesor);
    divInfo.appendChild(labelPrecio);
}



let vacirCarrito = document.getElementById('vaciar');


vacirCarrito.addEventListener("click", function(){
    carritoN = JSON.parse(localStorage.getItem('carrito'));
    localStorage.clear()
});

