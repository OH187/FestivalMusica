document.addEventListener('DOMContentLoaded', function(){
    iniciarApp();
});

function iniciarApp(){
    crearGaleria();
    scrollNav(); //Controla o modifica la forma en como nos lleva a los enlaces
    navegacionFija();
};

function navegacionFija(){
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');

    window.addEventListener('scroll', function(){
        // console.log(sobreFestival.getBoundingClientRect()); //Nos da la ubicacion exacta del elemento
        if(sobreFestival.getBoundingClientRect().bottom < 0){ //Cuando toque la parte de abajo del elemento arriba de la ventana ejecutar lo siguiente
            barra.classList.add('fijo');
            body.classList.add('body-scroll');
        } else{
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');
        }
    });
}
//Nos permite llegar a la ubicacion del archivo segun el enlace
function scrollNav(){
    const enlaces = document.querySelectorAll('.navegacion-principal a');
    enlaces.forEach(enlace =>{
        enlace.addEventListener('click', function(e) {
            e.preventDefault();//Bloquea una funcion por defecto
            const id = e.target.attributes.href.value; //Ubica el id del enlace a tomar
            const seccion = document.querySelector(id);//Selecciona el id 
            seccion.scrollIntoView({behavior: 'smooth'});
        });
    });
}

//Creado la galeria de imagenes
function crearGaleria(){
    const galeria = document.querySelector('.galeria-imagenes');

    for(let i=1; i <= 12; i++){
        const imagen = document.createElement('picture');
        imagen.innerHTML = `
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/${i}.webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function(){
            mostrarImagen(i);
        }
        galeria.appendChild(imagen);
    }
}

//Mostrar la imagen
function mostrarImagen(id){
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;

//creando el contenedor para la imagen y la clase para el css
    const overlay = document.createElement('DIV'); //crea un elemento div
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
//Nos permite que al dar click fuera de la imagen esta se cierre
    overlay.onclick = function(){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

//Seleccionando el elemento body y agregando al final (añadiendo la imagen al html)
    const body = document.querySelector('body');//Selecciona el body
    body.appendChild(overlay); //Agrega la imagen al final en el body
    body.classList.add('fijar-body');

//Boton para cerrar la imagen grande (ventana modal)
const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
//Nos permite que al tocar la X podamos cerrar la ventana modal
    cerrarModal.onclick = function (){
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    };
    overlay.appendChild(cerrarModal);
}