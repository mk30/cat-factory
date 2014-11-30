var loadsvg = require('load-svg');
var createsvg = require('svg-create-element');


function createSprite (elems) {
    var bounds = [];
    for (var i = 0; i < elems.length; i++) {
        elems[i].style.display = 'none';
        console.log(elems[i]);
        bounds[i] = elems[i].getBoundingClientRect();
    }
    var align = [];
    for (var i = 1; i < elems.length; i++) {
        align[i] = bounds[0].left - bounds[i].left;
        elems[i].setAttribute(
           "transform", "translate(" + align[i] + ", 0)"
        );
    }
    return function () {
        var g = document.createElement('g');
        var frames = [];
        for (var i = 0; i < elems.length; i++) {
            var c = elems[i].cloneNode(true);
            g.appendChild(c);
            frames.push(c)
        }
        return {
            element: g,
            show: show,
            move: move,
            length: elems.length
        };
        function show (index) {
            for (var i = 0; i < elems.length; i++) {
                if (i == index){
                    document.querySelector(
                        '#' + frames[index].id
                    ).style.display = 'block';
                }
                else {
                    document.querySelector(
                        '#' + frames[i].id
                    ).style.display = 'none';
                }
            }
        }
        function move (x, y) {
                document.querySelector(
                      'g' 
                    ).setAttribute(
                        "transform", "translate(" +
                        x + ", " +
                       y + ")")
            }
    };
}

loadsvg('pinkcat2improved.svg', function (err, svg) {
    svg.setAttribute("height", "100%")
    svg.setAttribute("width", "100%")
    svg.setAttribute("align", "right")
    document.body.appendChild(svg);
    //your #xxx0 group should be your first frame
    var k0 = document.querySelector('#kitty0')
    var k1 = document.querySelector('#kitty1')
    var k2 = document.querySelector('#kitty2')
    var createCat = createSprite([k0, k1, k2]);
    var cat = createCat()
    var index = 0;
    var iv = setInterval(function () {
        cat.show(index++ % cat.length)
        }, 500 )
    var timeplus = 0
    var move = setInterval(function () {
            cat.move(200 + timeplus%200 * -4,
                Math.sin(timeplus/2) * 10)
            timeplus++
            }, 50 )
});
