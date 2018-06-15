
var canvas, context;
var HEIGHT = window.innerHeight, WIDTH = window.innerWidth;
const PI =  Math.PI;
const gamma = 2.2;

const x = WIDTH * 0.68;
const y = HEIGHT * 0.5;
const r = 250;
var mixing = {alpha:0.5};

var anim;
var timer;

class Segment 
{
    constructor( startAngle, endAngle, partsAmount )
    {
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        this.partsAmount = partsAmount;
        this.firstSegmentColor = "#FFFFFF";
        this.lastSegmentColor = "#000000";
    }
}

document.addEventListener( "DOMContentLoaded", start );

function start()
{
    prepareCanvas();
    segment = new Segment( 0, 2 * PI, 100 );
    setupGui(); 
    main();
}

function main() 
{
    //Update();
    Draw();
    timer = setTimeout(function() {
        anim = requestAnimationFrame(main);
    }, 1000 / 24);
}

function prepareCanvas()
 {
    canvas = document.createElement('canvas');
    canvas.height = HEIGHT;
    canvas.width = WIDTH;
    document.body.appendChild(canvas);
    context = canvas.getContext("2d");
}

function setupGui()
 {
    var gui = new dat.GUI();
    gui.add(segment, 'partsAmount', 10, 255)
        .name("Segment amount")
        .step(1);
    gui.addColor( segment, 'firstSegmentColor' );
    gui.addColor( segment, 'lastSegmentColor' );
    gui.add( mixing, 'alpha', 0, 1 )
        .name( "Mixing constant" )   
        .step( 0.05 );
}

function Update() 
{

}

function Draw() 
{
    // clear screen
    context.fillStyle = "#E0E0E0";
    context.fillRect(0, 0, WIDTH, HEIGHT);

    // text
    context.fillStyle = "#000000";
    context.font = "bold italic 40px Arial";
    context.fillText( "Color mixing demo", WIDTH * 0.1, HEIGHT * 0.1  );

    // circles
    let startAngle = segment.startAngle;
    let endAngle = segment.endAngle;
    let deltaAngle = ( segment.endAngle - segment.startAngle ) / segment.partsAmount;

    
    let rgbColorFirst = HEX2RGB( segment.firstSegmentColor );
    let rgbColorLast = HEX2RGB( segment.lastSegmentColor );
    let deltaColor = [0, 0, 0];
    let mixColor = [0, 0, 0];
    //
    for (let i = 0; i < 3; i++)
    {
        deltaColor[i] = ( rgbColorLast[i] - rgbColorFirst[i] ) / segment.partsAmount;
        mixColor[i] = rgbColorLast[i] * ( 1 - mixing.alpha ) + rgbColorFirst[i] * mixing.alpha; 
    }
    //
    for ( let i = 0; i < segment.partsAmount; i++ )
    {
        let newColor = [0, 0, 0];
        for (let j = 0; j < 3; j++)
        {
            newColor[j] = rgbColorFirst[j] + i * deltaColor[j]; 
        }

        context.beginPath();
        context.fillStyle = RGB2HEX( newColor );
        context.strokeStyle = RGB2HEX( newColor );
    
        context.moveTo(x, y);
        context.arc(x, y, r, startAngle + deltaAngle * i, startAngle + deltaAngle * ( i + 1 ));
        context.stroke();
        context.fill();
        context.closePath(); 
    }

    // quadrants
    context.fillStyle = RGB2HEX( rgbColorLast );
    context.fillRect( x - 2.75 * r, y - 0.75 * r, r, r );

    context.fillStyle = RGB2HEX( rgbColorFirst );
    context.fillRect( x - 2.248 * r, y - 0.25 * r, r, r );

    context.fillStyle = RGB2HEX ( mixColor );
    context.fillRect( x - 2.25 * r, y - 0.25 * r, 0.5 * r, 0.5 * r );
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
    let decimal = parseInt( hex.substring( 1, 7 ), 16 );

    let r = decimal >> 16;
    let g = ( decimal >> 8 ) & 0xFF;
    let b = decimal & 0xFF;

    return [r, g, b];
}
