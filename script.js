(()=>{

    const properties={
        spaceDiameter:32,
        dotDiameter:14,
        wavelength:100,
        velocity:.02,
        direction:1,
        displacement:1
    }

const canvas= document.createElement('canvas');
ctx=canvas.getContext('2d');

let w=canvas.width=innerWidth;
let h=canvas.height=innerHeight;

let dotsList;

canvas.style.background='rgba(17,17,23,1)';

document.querySelector('body').appendChild(canvas);

window.onresize=function(){
    w=canvas.width=innerWidth;
    h=canvas.height=innerHeight;
    init();
}

class Dot{
    constructor(x,y,num){
        this.x=x;
        this.y=y;        
        this.radius=properties.dotDiameter/2;
        this.scale=getDistance(x,y)/properties.wavelength;
        this.text=num;
    }

    update(){
        this.resize();
        this.draw();
    }

    resize(){
        this.scale=this.scale-properties.velocity*properties.direction;
    }

    draw(){
        let s=(1-Math.abs(Math.sin(this.scale)));
        let o=(1-s)*255;
        let r=this.radius*s;
/*        ctx.beginPath();
        ctx.arc(this.x,this.y,r,0,2*Math.PI,false);
        ctx.closePath();*/
        ctx.fillStyle=`rgba(${o},255,${o},${s})`;
        ctx.fillText(this.text,this.x,this.y);
    }
}

init();


function init(){

    dotsList=[];

    const dotsCountX=w/properties.spaceDiameter|0;
    const dotsCountY=h/properties.spaceDiameter|0;

    const startX=(properties.spaceDiameter +w-dotsCountX*properties.spaceDiameter)/2;
    const startY=(properties.spaceDiameter +h-dotsCountY*properties.spaceDiameter)/2;

    let displacement=properties.spaceDiameter/4*properties.displacement;

    for(let j=0;j<dotsCountY;j++){
        displacement=-displacement;
        let y=startY+j*properties.spaceDiameter;    
        for(let i=0;i<dotsCountX;i++){
            let x=startX+i*properties.spaceDiameter+displacement;
            dotsList.push(new Dot(x,y,j+i))
        }
    }
    
}

loop();
function loop(){

ctx.clearRect(0,0,w,h);

for (let a in dotsList){
    dotsList[a].update();
}

requestAnimationFrame(loop);
}

function getDistance(x,y){
    let dx=w/2-x;
    let dy=h/2-y;
    return Math.sqrt((dx*dx)+(dy*dy));
}

})();