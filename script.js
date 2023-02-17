const clickButton = document.querySelectorAll('.btncarrito')
const clickButtonCompra = document.getElementById('btncarritocompra')
const tabla = document.querySelector('.tabla-carrito')
console.log(clickButtonCompra)
//console.log(clickButton)
//console.log(tabla-carrito)
let carrito = []


clickButton.forEach(btn => {
    btn.addEventListener('click', addToCarritoItem)
})


/// Funcion para sacar cuando hacemos click el boton y luego traemos toda la card.
function addToCarritoItem(e){
const button = e.target
const item = button.closest('.card')
//console.log(item)
const itemTitle = item.querySelector('.card-title').textContent;
//console.log(itemTitle)
const itemPrice = item.querySelector('.precio').textContent;
//console.log(itemPrice)
const itemImg = item.querySelector('.img-to-carrito').src;
//console.log(itemImg)

const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
}

addItemCarrito(newItem)
}

/// Funcion para agregar a carrito nuevos items
function addItemCarrito(newItem){
    
    const alert = document.querySelector('.alert')
    setTimeout(function(){
        alert.classList.add('hide')
    }, 
    2000)
    alert.classList.remove('hide')

    const inputElemento = tabla.getElementsByClassName('input__element')
    for(let i =0; i < carrito.length ; i++){
        if(carrito[i].title.trim() === newItem.title.trim()){
            carrito[i].cantidad++  
             const inputValue = inputElemento[i]
             inputValue.value++;
            return null;
        }
    }
    carrito.push(newItem)
    renderCarrito()
}
//console.log(carrito)

function renderCarrito(){
    tabla.innerHTML = ''
    carrito.map(item => {
        const tr = document.createElement('tr')
        tr.classList.add('itemCarrito')
        const content = `
        <th scope="row">1</th>
        <td class="title">${item.title}</td>
        <td class="table__productos">
            <img src="${item.img}" alt="prodcuto">
        </td>
        <td class="table__precio"><p>${item.precio}</p></td>
        <td class="table__cantidad">
            <input class="input__element" type="number" min="1" value="${item.cantidad}">
            <button class="delete btn btn-danger">X</button>
        </td>
        `
        tr.innerHTML = content
        tabla.append(tr)

        tr.querySelector('.delete').addEventListener('click', removeItemCarrito)
        tr.querySelector('.input__element').addEventListener('change', sumaCantidad)
    })
    carritoTotal()
}

function carritoTotal(){
    let total = 0
    const itemCartTotal = document.querySelector('.total-edit-1')
    carrito.forEach((item) => {
        const precio = Number(item.precio.replace('$', ''))
        total = total + precio*item.cantidad
    }
    )

    itemCartTotal.innerHTML = `Total $${total}`
    addLocalStorage()
}

function removeItemCarrito(e){

    const alert = document.querySelector('.remove-hide')
    setTimeout(function(){
        alert.classList.add('remove-hide')
    }, 
    2000)
    alert.classList.remove('remove-hide')

    const buttonDelete = e.target
    const tr = buttonDelete.closest('.itemCarrito')
    //console.log(tr)
    const title = tr.querySelector('.title').textContent
    for(let i=0; i<carrito.length ; i++){
        if(carrito[i].title.trim() === title.trim()) {
            carrito.splice(i, 1)
        }
    }
    tr.remove()
    carritoTotal()
}

function sumaCantidad(e){
    const sumaInput = e.target
    const tr = sumaInput.closest('.itemCarrito')
    const title = tr.querySelector('.title').textContent
    carrito.forEach(item =>{
        if(item.title.trim() === title){
            sumaInput.value < 1 ? (sumaInput.value = 1) : sumaInput.value
            item.cantidad = sumaInput.value
            carritoTotal()
        }
    })
}

function addLocalStorage(){
    localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
    const storage = JSON.parse(localStorage.getItem('carrito'))
    if(storage){
        carrito = storage
        renderCarrito()
    }
}

//console.log(clickButtonCompra)
clickButtonCompra.addEventListener('click', () => {
    swal.fire({
        icon: "info",
        title: "Usted esta por finalizar su compra",
        text: "Si desea realizar la compra presione SI en caso contrario para volver al carrito precione NO",
        showCancelButton: true,
        confirmButtonText: "Comprar",
        cancelButtonText: "Cancelar"
    })
})
// clickButtonCompra.onclick = () => {
//     swal.fire({
//         icon: "info",
//         title: "Usted esta por finalizar su compra",
//         text: "Si desea realizar la compra presione SI en caso contrario para volver al carrito precione NO",
//         showCancelButton: true,
//         confirmButtonText: "Comprar",
//         cancelButtonText: "Cancelar"
//     }).then((result) => {
//         if (result == true) {
//             Swal.fire({
//                 icon: "success",     
//                 title: "Gracias por comprar con nosotros",
//              }
//             )
//         }
//       })
// }