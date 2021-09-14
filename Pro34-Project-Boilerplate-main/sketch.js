const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;





var unsafeman1
var bk
var ground
var rope1
var gunshoot
var ammos=[]
var options={
isStatic: true,

}
function preload(){
bk=loadImage("background.png")
gunshoot=loadSound("gunshoot.mp3")
 
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  engine = Engine.create();
  world = engine.world;

  ground=Bodies.rectangle(500,520,3000,10)
 unsafeman1= new unsafeman(  900,400,100,100)
 rope1=new rope(7,{x:900,y:10})
 
   Matter.Composite.add(rope1.body,unsafeman1);
 unsafeman1_con = new link(rope1,unsafeman1);
 gun1=new gun(125,395,35,35)
player=new Player( 100,430,500,500)

 rectMode(CENTER);
 ellipseMode(RADIUS);
 
}

function draw() 
{
 
  background( 51);
  Engine.update(engine);
  imageMode(CENTER);
  rect(ground.position.x,ground.position.y,3000,10 )
 unsafeman1.display()
 rope1.show()
player.display()
gun1.display()
 collide()
 
for (var i = 0; i <  ammos.length; i++) {
  showammo(i,ammos);
}
 
 
 
}
function keyPressed() {
  if (keyCode === 32) {
    var posX = gun1.body.position.x;
    var posY =  gun1.body.position.y;
    var angle =  gun1.body.angle;

    var  Ammo= new  ammo(posX, posY, 20, 20, angle);

    Ammo.trajectory = [];
    Matter.Body.setAngle( Ammo.body, angle);
     ammos.push(Ammo);
  }
}
function  showammo(index,ammos) {
  ammos[index].display();
if(
   ammos[index].body.position.x > width||
   ammos[index].body.position.y > height){
if(!ammos[index].isRemoved){
   ammos[index].remove(index,ammos );
}else{
 ammos[index].trajectory = [];
}
}
}
function keyReleased() {
  if (keyCode === 32) {
    if (ammos.length) {
      var angle =  gun1.body.angle;
       ammos[ ammos.length - 1].shoot(angle);
       gunshoot.play()
    }
  }
}

 
 function drop(){
  rope1.break();
  unsafeman1_con.detach();
   unsafeman1_con= null; 
 }
  

function collide(){
  for (var i = 0; i <  ammos.length; i++){
    var ammoCollision = Matter.SAT.collides (
      ammos[i].body,
      rope1.body

     
    )
  
    if(ammoCollision.collided){
      drop()
       }

      }
   
}