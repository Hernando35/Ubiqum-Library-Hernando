$(document).ready(function () {
    $.getJSON("http://api.myjson.com/bins/1h3vb3", function (json) {
        data = json;
        console.log(json);
        getUbiqumBook();
        searchItem();
        if ('#section:empty') {
            console.log("The library is empty")
            let emptyBox = document.createElement("div");
            $(emptyBox).text("No book founded").addClass("empty-div");
        }
    });
});


const getUbiqumBook = () => {
    let book = data.books;
    const section = document.getElementById("full");

    for (let i = 0; i < book.length; i++) {
        const description = book[i].descripcion;
        const details = book[i].detalle;
        const language = book[i].idioma;
        const title = book[i].titulo;
        const portage = book[i].portada;

        var flipContainer = document.createElement("div");
        $(flipContainer).addClass("flip-container" + i).attr("ontouchstart", "this.classList.toggle('hover');").attr("data-id", i);
        var flipper = document.createElement("div");
        $(flipper).addClass("flipper");
        var front = document.createElement("div");
        $(front).addClass("front");
        var back = document.createElement("div");
        $(back).addClass("back");

        var imgPortada = document.createElement("img");
        $(imgPortada).attr("src", portage).attr("alt", "portada del libro" + title).addClass("image-portada");

        var ptitle = document.createElement("p");
        $(ptitle).text(title);

        var pDescripcion = document.createElement("p");
        $(pDescripcion).addClass("description-book").text(description);

        var buttonDetalle = document.createElement("button");
        $(buttonDetalle).addClass("btn button-book").attr("href", details).attr("data-fancybox", "gallery").text("More Info");

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
        full.append(flipContainer);
    }
}


const searchItem = () => {
    var qsRegex;
    $('.grid').isotope({
        itemSelector: '.flip-container',
        layoutMode: 'fitRows',
        filter: function search() {
            return qsRegex ? $(this).text().match(qsRegex) : true;
        }
    });

    var $quicksearch = $('#quicksearch').keyup(debounce(function () {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $grid.isotope();
    }));

    $(document).ready(debounce(function () {
        qsRegex = new RegExp($quicksearch.val(), 'gi');
        $grid.isotope();
    }, 10));

    function debounce(fn, threshold) {
        var timeout;
        threshold = threshold || 100;
        return function debounced() {
            clearTimeout(timeout);
            var args = arguments;
            var _this = this;

            function delayed() {
                fn.apply(_this, args);
            }
            timeout = setTimeout(delayed, threshold);
        };
    }
}



