
//Variable para dependencia general de Gulp
const {src, dest, watch, parallel} = require("gulp");//Manda a llamar el archivo gulp de la carpeta node_modules
//src sirve para identificar un archivo y dest para guardarlo, son llamadas propias de Gulp

//Variables para cada dependencia o paquete Gulp especifico
const sass = require('gulp-sass')(require('sass'));//require importa las dependencias
const plumber = require('gulp-plumber'); //Plugins para mostrar errores mas concisos
const webp = require('gulp-webp'); //Plugins que nos permite convertir imagenes a webp
const imageMin = require('gulp-imagemin'); //Plugin para hacer mas ligeras las imagenes
const cache = require('gulp-cache'); //Plugin o dependencia para guardar datos en cache
const avif = require('gulp-avif');
const autoprefixer = require('autoprefixer'); //Ayuda a que nuestro css tenga soporte en todos los navegadores
const cssnano = require('cssnano'); //Comprimira nuestro css
const postcss = require('gulp-postcss'); //Hara algunas transformaciones junto a cssnano y autoprefixer
const sourcemaps = require('gulp-sourcemaps'); //crea un mapa del css para poder ubicar los elelemtnos a traves del navegador
const terser = require('gulp-terser-js');//Comprimidor de codigo JavaScript

//Permite obtener los archivos scss y guardarlos en la carpeta correspondiente a css
function css(done){ //Parametro que nos avisa del final
    src('src/scss/**/*.scss')//Identificar el archivo de SASS
    .pipe(sourcemaps.init())//Inicia sourcemaps
    .pipe(plumber())//Permite mostrar un error de manera mas concisa y sin detener el gulp
    .pipe(sass()) //Compilar las funciones de SASS
    .pipe(postcss([autoprefixer(), cssnano()]))//Mejoras de css
    .pipe(sourcemaps.write('.'))//Lo guarda en la misma ubicacion
    .pipe(dest("build/css")); //Almacena en el disco duro
    
    done(); //Es el callback que avisa a gulp cuand llegamos al final
}

//Convertir imagenes de otros formatos a webp
function conversionWebp(done){
    const opciones ={
        quality: 50
    };
    src('img/**/*.{png,jpg}')
    .pipe(webp(opciones))
    .pipe(dest('build/img'))
    done();
}

//Aligerar las imagenes
function imagenes(done){
    const opciones = {
        optimizationLevel: 3
    }
    src('img/**/*.{png,jpg}')
    .pipe( cache(imageMin(opciones)))
    .pipe(dest('build/img'))
    done();
}
//Convertir imagenes de otros formatos a avif
function conversionAvif(done){
    const opciones ={
        quality: 50
    };
    src('img/**/*.{png,jpg}')
    .pipe(avif(opciones))
    .pipe(dest('build/img'))
    done();
}

function javaScript(done){
    src('src/js/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(terser())
    .pipe(sourcemaps.write('.'))
    .pipe(dest('build/js'))

    done()
}
//Observa todos los archivos con extension scss y los guardar como css en la carpeta segun la funcion anterior
function dev(done) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javaScript);
    done();
}

exports.css = css;//Esto manda a llamar la funcion de arriba y despues se llama con npx en la consola (npx gulp css)
exports.imagenes = imagenes;
exports.javaScript = javaScript;
exports.conversionWebp = conversionWebp;
exports.conversionAvif = conversionAvif;
exports.dev = parallel( imagenes, conversionWebp, conversionAvif, javaScript, dev); //Parallel nos permite iniciar 2 procesos de una sola vez
