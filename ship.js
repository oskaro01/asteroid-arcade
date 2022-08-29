function Ship(){  //constructor func.  with its obj 
  //constructor gets called when an object is created using the new keyword.

  //ASSIGNING PROPERTIES TO OBJECT
  
  this.pos= createVector(width/2, height/2);  // creating vec for pos ,,, magnitude , direction
  this.r=14; //ship size 
  this.heading=0; //head of the triagle 
  //this. to assign property , var to the obj
  this.rotation=0;
  this.vel= createVector(0,0);  // for velocity

  //MOVEMENT OF ONLY THE SHIP
  this.isBoosting=false;  //for initial state therefore no movement therfore false
  this.boosting=function(z){  // movement property z
    this.isBoosting=z;
  }

  this.update= function(){ // movement

    if(this.isBoosting){
      this.boost();
    }
    this.pos.add(this.vel); // update by velocity // getting pos vec by vel
    this.vel.mult(0.97); // reducing vel little
  }


  //MOVEMENT OF THE SHIP INCLUDING THE ASTEROIDS
  this.boost=function(){

    //creating vec from angle ,,, build in p5 func
    // Vector used to describe a position, velocity, or acceleration.
   var force= p5.Vector.fromAngle(this.heading); // a vec that move forwords by it's heading or head(angle)
    force.mult(0.2);
    this.vel.add(force); //adding  this.force >> to vel
  } 


  
   this.hits =function(asteroid){  // caution for asteroids
     var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y); // detecting distance between ship and asteroids for collition
     if (d<this.r + asteroid.r){
       return true;
     } else {
       return false;
     }
   }

  

  this.render= function(){  //render func. for showing output in browser
    push(); //saving movements // so we dont move the asteroids with ship

    //converting co ordinant to x y system for using vector
    //translating the triagle
    translate(this.pos.x, this.pos.y); //trans func. translate coordinant system by x y value
    rotate(this.heading + PI/2); // rotaing offset by 90 deg
    //noFill(0);
    //stroke(255); // 255 means white

    triangle(-this.r, this.r, this.r, this.r, 0, -this.r); // 3sets of x and y positon >> -x1,y1   x2,y2   x3,-y3

    pop();  // storing movements
  }



  this.edges=function(){
    // width
    if(this.pos.x > width + this.r){  // if its all the way off the screen therefore greater than width then >> reposition it to -this.r
      this.pos.x = -this.r;
    }else if(this.pos.x <-this.r){
      this.pos.x = width + this.r; // this.r , -this.r neutral pos for x
    }
  
    // height
    if(this.pos.y > height + this.r){
      this.pos.y = -this.r;
    }else if(this.pos.y <-this.r){
      this.pos.y = height + this.r;
    }
  }
  



  this.setRotation= function(a){  // reciving angle a 
    this.rotation=a;
  }

  this.turn= function(){
   this.heading +=this.rotation; //making the ship rotate //func.
  }

}