
var canvas, context;
var HEIGHT = window.innerHeight, WIDTH = window.innerWidth;
const pi =  Math.PI;
const gamma = 2.2; 

class Rectangle
{
    constructor( color ) {
        this.color = color;
      }

}

var rectangleSize = WIDTH / 10; 
var rectangle1, rectangle2, rectangle3, rectangle3g;

var timer, anim;

document.addEventListener( "DOMContentLoaded", start );

function start() 
{
    prepareCanvas();
    createRectangles();
    setupGui();
    main();
}

function main() 
{
    Update();
    Draw();
    timer = setTimeout(function() {
        anim = requestAnimationFrame( main );
    }, 1000 / 24);
}

function prepareCanvas() 
{
    canvas = document.createElement( "canvas" );
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    document.body.appendChild( canvas );
    context = canvas.getContext( "2d" );
}

function setupGui() 
{
    var gui = new dat.GUI();
    gui.addColor( rectangle1, 'color' );
    gui.addColor( rectangle2, 'color' );
}

function createRectangles()
{
    rectangle1 = new Rectangle( "#FF0000" );
    rectangle2 = new Rectangle( "#0000FF" );
    rectangle3 = new Rectangle( "#FF00FF" );
    rectangle3g = new Rectangle( "#FF00FF" );
}

function Update() 
{
    let rgb1 = HEX2RGB( rectangle1.color );
    let rgb2 = HEX2RGB (rectangle2.color );
    let rgb3 = [ 0, 0, 0 ];
    let rgb3g = [ 0, 0, 0 ];
    //
    for ( let i = 0; i < 3; i++ )
    {
        rgb3[i] = ( rgb1[i] + rgb2[i] ) * 0.5;
        rgb3g[i] =  Math.pow( ( rgb1[i] / 255 + rgb2[i] / 255 ) * 0.5, 1 / gamma) * 255;
    }
    rectangle3.color = RGB2HEX( rgb3 );
    rectangle3g.color = RGB2HEX( rgb3g );
}

function Draw() 
{
    // clear screen
    context.fillStyle = "#FFFFFF";
    context.fillRect( 0, 0, WIDTH, HEIGHT );
    
    //text
    context.fillStyle = "#000000";
    context.font = "30px Arial";
    context.fillText( "Mixing colors with NO gamma correction", WIDTH * 0.4 - 2 * rectangleSize, HEIGHT * 0.5 - 2.1 * rectangleSize );
    context.fillText( "Mixing colors with gamma correction", WIDTH * 0.4 - 2 * rectangleSize, HEIGHT * 0.9 - 2.1 * rectangleSize );
    
    // rectangles
    
    //up
    context.fillStyle = rectangle1.color;
    context.fillRect( WIDTH * 0.4 - 2 * rectangleSize , HEIGHT * 0.5 - 2 * rectangleSize, rectangleSize, rectangleSize );

    context.fillStyle = rectangle2.color;
    context.fillRect( WIDTH * 0.4,                      HEIGHT * 0.5 - 2 * rectangleSize, rectangleSize, rectangleSize );

    context.fillStyle = rectangle3.color;
    context.fillRect( WIDTH * 0.5 + 2 * rectangleSize,  HEIGHT * 0.5 - 2 * rectangleSize, rectangleSize, rectangleSize );

    //bottom
    context.fillStyle = rectangle1.color;
    context.fillRect( WIDTH * 0.4 - 2 * rectangleSize , HEIGHT * 0.9 - 2 * rectangleSize, rectangleSize, rectangleSize );

    context.fillStyle = rectangle2.color;
    context.fillRect( WIDTH * 0.4,                      HEIGHT * 0.9 - 2 * rectangleSize, rectangleSize, rectangleSize );

    context.fillStyle = rectangle3g.color;
    context.fillRect( WIDTH * 0.5 + 2 * rectangleSize,  HEIGHT * 0.9 - 2 * rectangleSize, rectangleSize, rectangleSize );
}


function RGB2HEX( rgb )
{
    let decimal = rgb[0] << 16 | (rgb[1] << 8 & 0xFFFF) | rgb[2];
    let hex = decimal.toString( 16 );
    hex = "000000".substring( 0, 6 - hex.length ) + hex;
    
    return '#' + hex.toUpperCase();
}

function HEX2RGB( hex )
{
    let decimal = parseInt( hex.substring( 1,7 ), 16 );

    let r = decimal >> 16;
    let g = ( decimal >> 8 ) & 0xFF;
    let b = decimal & 0xFF;

    return [ r, g, b ];
}
