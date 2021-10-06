var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg,zombieGroup
var heart,heartImg1,heartImg2,heartImg3
var life=3
var bullets=50,bulletsGroup
var score=0;
var gameState= "fight"
var winSound
var loseSound
var explosionSound
function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  
  bgImg = loadImage("assets/bg.jpeg")
  zombieImg= loadImage("assets/zombie.png")
  heartImg1=loadImage("assets/heart_1.png")
  heartImg2=loadImage("assets/heart_2.png")
  heartImg3=loadImage("assets/heart_3.png")
  winSound=loadSound("assets/win.mp3")
  loseSound=loadSound("assets/lose.mp3")
  explosionSound=loadSound("assets/explosion.mp3")

}
function setup() {

   
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  

//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = true
   player.setCollider("rectangle",0,0,300,300)
  
zombieGroup=new Group();
bulletsGroup=new Group();

heart1=createSprite(displayWidth-150,20)
heart1.addImage(heartImg1)
heart1.scale=0.2
heart1.visible=false

heart2=createSprite(displayWidth-95,20)
heart2.addImage(heartImg2)
heart2.scale=0.2
heart2.visible=false;

heart3=createSprite(displayWidth-100,20)
heart3.addImage(heartImg3)
heart3.scale=0.2


}

function draw() {
  background(0); 
  if(gameState==="fight"){
   if(life===3){
     heart3.visible=true;
     heart1.visible=false;
     heart2.visible=false;
   }
   if(life===2){
    heart3.visible=false;
    heart1.visible=false;
    heart2.visible=true;
  }
  if(life===1){
    heart3.visible=false;
    heart1.visible=true;
    heart2.visible=false;
  }
  if(life===0){
    loseSound.play()
    gameState="lost"
  }
 if(score===80){
   winSound.play();
   gameState="won"

 }
if(bullets===0){
  loseSound.play();
  gameState="bullet"
}
  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
   bullet=createSprite(displayWidth-1150,player.y-30,20,10)
   bullet.velocityX=20
   bulletsGroup.add(bullet)
   bullets=bullets-1
   player.depth=bullet.depth
   player.depth=player.depth+1
  player.addImage(shooter_shooting)
  explosionSound.play();
  
 
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
if(zombieGroup.isTouching(player)){
  loseSound.play();
   for(var i=0;i<zombieGroup.length;i++)
   { if(zombieGroup[i].isTouching(player))
    { zombieGroup[i].destroy()
      
      life=life-1
     }
     }
      
     }

     if(zombieGroup.isTouching(bulletsGroup)){
       
      for(var i=0;i<zombieGroup.length;i++)
   { if(zombieGroup[i].isTouching(bulletsGroup))
    { zombieGroup[i].destroy()
      bulletsGroup.destroyEach();
      score=score+2
      explosionSound.play();

     }
     }
  }

enemy();
}
drawSprites();
textSize(20)
fill ("yellow")
text("lives:"+life,displayWidth-150,displayHeight/2-300)
text("bullets:"+bullets,displayWidth-150,displayHeight/2-280)
text("score:"+score,displayWidth-150,displayHeight/2-260)
  
 if(gameState==="lost"){
  textSize(100)
  fill ("red")
  text("GAME LOST",400,400)
  player.destroy()
  zombieGroup.destroyEach()

}
 else if(gameState==="won"){
   textSize(100)
   fill ("red")
  text ("YOU WIN",400,400)
  player.destroy();
  zombieGroup.destroyEach()

 }
 else if(gameState==="bullet"){
  textSize(100)
  fill ("red")
 text ("YOU RAN OUT OF BULLETS",100,400)
 player.destroy();
 bulletGroup.destroyEach()
 zombieGroup.destroyEach()
 }

}

function enemy(){
  if(World.frameCount%100===0){
  zombie=createSprite(random(900,1000),random(200,500))
  zombie.addImage(zombieImg)
  zombie.velocityX=-3
  zombie.scale=0.15
  zombie.debug=true;
  zombie.setCollider("rectangle",0,0,400,400)
  zombieGroup.add(zombie)
  zombie.lifetime=400;
  }
}

