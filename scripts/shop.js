

$(document).ready(function () {
    $.getJSON("http://api.myjson.com/bins/1h3vb3", function (json) {
        data = json;
        console.log(json);
        printAll();
        searchItem();
        if ("#section:empty") {
            console.log("Library is empty")
            var emptyDiv = document.createElement("div");
            $(emptyDiv).text("No Book Found").addClass("empty-div");
        }
    });
});

const printAll = () => {
    var books = data.books;
    var section = document.getElementById("section");
    for (let i = 0; i < books.length; i++) {
        const titles = books[i].titulo;
        const description = books[i].descripcion;
        const detail = books[i].detalle;
        const portate = books[i].portada;
        const language = books[i].idioma;

        var flipContainer = document.createElement("div");
        $(flipContainer).addClass("flip-container " + i ).attr("ontouchstart", "this.classList.toggle('hover');").attr("data-id", i);
        
        var flipper = document.createElement("div");
        $(flipper).addClass("flipper");
        
        var front = document.createElement("div");
        $(front).addClass("front");
        
        var back = document.createElement("div");
        $(back).addClass("back");

        var imgPortada = document.createElement("img");
        $(imgPortada).attr("src", portate).attr("alt", "portada del libro" + titles).addClass("image-portada");

        var ptitle = document.createElement("p");
        $(ptitle).text(titles);
        
        var pDescripcion = document.createElement("p");
        $(pDescripcion).addClass("description-book").text(description);
        var buttonDetalle = document.createElement("button");
        
        $(buttonDetalle).addClass("btn button-book").attr("href", detail).attr("data-fancybox", "gallery").text("More Info");

        var titleDiv = document.createElement("div");
        $(titleDiv).addClass("title-book");
        
        var descriptionDiv = document.createElement("div");
        $(descriptionDiv).addClass("more-info-book");

        titleDiv.append(ptitle);
        descriptionDiv.append(pDescripcion);
        descriptionDiv.append(buttonDetalle);

        front.append(imgPortada);

        back.append(titleDiv);
        back.append(descriptionDiv);

        flipper.append(front);
        flipper.append(back);
        flipContainer.append(flipper);
        section.append(flipContainer);
    }
}


var qsRegex;

const searchItem = () => {

var $grid = $('.grid').isotope({
    itemSelector: '.flip-container',
    layoutMode: 'fitRows',
    filter: function search() {
        return qsRegex ? $(this).text().match(qsRegex) : true;
    }
});

    $(document).ready(debounce (function () {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
    $grid.isotope();
    }, 10));
        
var $quicksearch = $('.quicksearch').keyup(debounce(function () {
    qsRegex = new RegExp($quicksearch.val(), 'gi');
    $grid.isotope();
    console.log("Hello World!");
}, 200));

function debounce(fn, threshold) {
    var timeout;
    return function debounced() {
        if (timeout) {
            clearTimeout(timeout);
        }

        function delayed() {
            fn();
            timeout = null;
        }
        timeout = setTimeout(delayed, threshold || 100);
    }
}
}








