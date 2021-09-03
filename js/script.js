$(function () {

    {//Cambiar idioma
        
        let elementos = $("*[data-lang]");
        let currentLang = "esp";

        $(".esp, .en").on("click", function(){
            clickIdioma(this);
        });

        function clickIdioma(elemento){
            //Si clica la opcion de español y no esta en español cambia el idioma
            if($(elemento).hasClass("esp") && currentLang =="en"){
                cambiaIdioma(elementos);
                currentLang ="esp";
            //Si ha clicado la otra opcion 
            }else if($(elemento).hasClass("en") && currentLang == "esp"){
                cambiaIdioma(elementos);
                currentLang ="en";
            }
        }

        function cambiaIdioma(elementos){
            elementos.each(function(){
                let elemento = $(this);
                let texto = elemento.text();
                elemento.text(elemento.data("lang"));
                elemento.data("lang",texto);
            })
        }

    }  

    {//Codigo que muestra y oculta el menu desplegable
        let botonDesplegable = $("#boton-flotante");
        let menuFlotante = $("#menu-desplegable");
        botonDesplegable.on("mouseup", function () {
            if (menuFlotante.css("display") == "block") {
                menuFlotante.hide();
                botonDesplegable.css("background-color", "white");

            } else {
                menuFlotante.show();
                botonDesplegable.css("background-color", "#9dbdca")
            }
        })

        //se oculta todo si
        $(window).resize(function name(params) {
            if (window.innerWidth >= 1000) {
                menuFlotante.hide()
            } else {
                const event = new Event('scroll');
                window.dispatchEvent(event)
            }
        })
    }


    {//Codigo que muestra o oculta el boton flotante dependiendo si el div es o no visible.
        let header = document.getElementsByTagName("header")[0];
        var botonDesplegable = $("#boton-flotante");
        let menuFlotante = $("#menu-desplegable");
        $(window).on("scroll", capar(function (event) {
            (header.getBoundingClientRect()["y"] < -550) ? botonDesplegable.show() : (botonDesplegable.hide(), menuFlotante.hide(), botonDesplegable.css("background-color", "white"));
        }, 300))

        //para que solo se use cada x milisegundos 
        function capar(func, interval) {
            var lastCall = 0;
            return function () {
                var now = Date.now();
                if (lastCall + interval < now) {
                    lastCall = now;
                    return func.apply(this, arguments);
                }
            };
        }
    }

    {//Codigo que agranda las imagenes y las pone en el centro de la pantalla 
        let imagenes = $(".agrandar");
        let expandida = false; //indica si hay una imagen expandida o nó 
        let imagen; //donde se guarda la dirección de la imagen cargada

        $(document).on("mouseup", function (evento) {
            let elemento = evento.target;
            if (!expandida && elemento.classList.contains("agrandar")) {
                expandir(elemento);
                imagen = elemento;
                expandida = true;
            } else if (imagen != null) {
                $(imagen).removeAttr('style');//se retira el estilo que lo deja en el centro de la pantalla 
                imagen = null;
                expandida = false;
            }
        })

        function expandir(elemento) {
            let ancho = window.innerWidth * 8 / 10;
            let alto = window.innerHeight * 8 / 10;
            let anchoOriginal = elemento.dataset.x;
            let altoOriginal = elemento.dataset.y;

            if (ancho > anchoOriginal) {
                ancho = anchoOriginal
            }
            if (alto > altoOriginal) {
                alto = altoOriginal
            }

            /*  $(elemento).css({
                 "width": ancho + "px",
                 "max-width": anchoOriginal + "px",
                 "max-height": alto + "px",
                 "height": "auto",
                 "margin-block":"none",
                 "transform": "translate(-50vw, 10px)",
                 "filter": "drop-shadow(0px 0px 500px)"
             }); */
            
            $(elemento).css({
                "width": ancho + "px",
                "max-width": anchoOriginal + "px",
                "max-height": alto + "px",
                "top": "50%",
                "left": "50%",
                "margin-left": "-" + ancho / 2 + "px",
                "margin-top": "-" + (alto / 2) - 50 + "px",
                "position": "fixed",
                "height": "auto",
                "filter": "drop-shadow(0px 0px 500px)"
            });
        }

    }

    //Link de github, apaño temporal
    $(".github").on("click", function(){
        window.open("https://github.com/JSillero");
    })


});