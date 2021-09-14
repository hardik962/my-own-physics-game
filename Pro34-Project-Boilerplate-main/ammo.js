class  ammo{
  constructor(x, y, width, height, archerAngle) {
    var options = {
      restitution: 0.8,
      friction: 1.0,
      density: 1.0,
      isStatic: true
    };
    this.width = width;
    this.height = height;
  
    this.body = Bodies.rectangle(x, y, this.width, this.height, options);
    this.image = loadImage(" bullet.png");
    this.trajectory = [];
    this.isRemoved = false;
   
     
    World.add(world, this.body);
  }

  
    

  shoot( ammoAngle) {
    this.velocity = p5.Vector.fromAngle( ammoAngle + PI / 2);
    this.velocity.mult(25);

    Matter.Body.setVelocity(this.body, {
      x: this.velocity.x,
      y: this.velocity.y
    });

    Matter.Body.setStatic(this.body, false);
  }
  remove(index, ammo){
    this.isRemoved = true;
     
    
    
       Matter.World.remove(world,this.body)
       ammo.splice(index,1)
        
    
    
    }

  display() {
  

 

    var pos = this.body.position;
    var angle = this.body.angle;

    push();
    translate(pos.x, pos.y);
    rotate(angle);
    imageMode(CENTER);
    image(this.image, 0, 0, this.width, this.height);
    pop();

    if (this.body.velocity.x > 0 && this.body.position.x > 400) {
      var position = [this.body.position.x, this.body.position.y];
      this.trajectory.push(position);
    }

    for (var i = 0; i < this.trajectory.length; i++) {
      fill("white");
        ellipse(this.trajectory[i][0], this.trajectory[i][1], 5, 5);
    }
  }
}
