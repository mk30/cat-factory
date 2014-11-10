var loadsvg = require('load-svg');
var createsvg = require('svg-create-element');

loadsvg('pinkcat2.svg', function (err, svg) {
    svg.setAttribute("height", "100%")
    svg.setAttribute("width", "100%")
    document.body.appendChild(svg);
    var k0 = document.querySelector('#kitty0')
    var k1 = document.querySelector('#kitty1')
    var k2 = document.querySelector('#kitty2')
    var r0 = k0.getBoundingClientRect()
    var r1 = k1.getBoundingClientRect()
    var r2 = k2.getBoundingClientRect()
    var x1 = r0.left - r1.left;
    var g1 = grp([k1]);
    g1.setAttribute("transform", "translate(" + x1 + ", 0)");
    var g2 = grp([k2]);
    var x2 = r0.left - r2.left;
    g2.setAttribute("transform", "translate(" + x2 + ", 0)");
    var times = 0
    var iv = setInterval(function () {
        if (times%4 == 0){
            k0.style.display = 'block';
            k1.style.display = 'none';
            k2.style.display = 'none';
        }
        else if (times%4 == 1){
            k0.style.display = 'none';
            k1.style.display = 'block';
            k2.style.display = 'none';
        }
        else if (times%4 == 2){
            k0.style.display = 'none';
            k1.style.display = 'none';
            k2.style.display = 'block';
        }
        else {
            k0.style.display = 'none';
            k1.style.display = 'block';
            k2.style.display = 'none';
        }
        times++
    }, 250)
    var kit = grp([g2, g1, k0])
    window.kit = kit
    var timeplus = 0 
    var move = setInterval(function (){
        kit.setAttribute("transform", "translate(" +
        timeplus%200 * -4 + ", " + Math.sin(timeplus/2) * 10 + ")")
        timeplus++
    }, 50)
});

function grp (elems){
    var g = createsvg('g')
    elems[0].parentNode.insertBefore(g, elems[0])
    elems.forEach(function (elem) {
        elem.parentNode.removeChild(elem)
        g.appendChild(elem)
    })
    return g
} 
