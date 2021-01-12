var tower , towerImage;
var door, doorImage, doorGroup;
var railing,railingImage,railingGroup;
var ghost, ghostImage , invisibleGround;
var invBlock,invBlockGroup;
var gameState = "play"












function preload(){
  towerImage = loadImage("tower.png");
  doorImage = loadImage("door.png");
  railingImage = loadImage("climber.png");
  ghostImage = loadImage("ghost-standing.png");
  
}



function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300,10,10);
  tower.velocityY = 1.5
  tower.addImage("towerImg",towerImage);
  
  doorGroup = new Group();
  railingGroup = new Group();
   invBlockGroup = new Group();
  
  ghost = createSprite(200,200,50,50);
  ghost.addImage("ghostImg",ghostImage);
  ghost.scale = 0.36;
  invisibleGround = createSprite(500,550,1200,10)
  invisibleGround.visible = false
}




function draw(){
background("black");
  if( gameState === "play")
{
  
  if(tower.y > 500){
    tower.y = 300;
  }
  if(keyDown("left_arrow")){
    ghost.x = ghost.x - 3
  }
  if(keyDown("right_arrow")){
    ghost.x = ghost.x + 3
  }
  if(keyDown("space")){
    ghost.velocityY = -5 
  }
    ghost.velocityY = ghost.velocityY + 0.8
  if(invBlockGroup.isTouching(ghost)|| ghost.y < 0  ){
    ghost.destroy()   
    gameState = "end";
  }
  ghost.collide(invisibleGround);
  if(railingGroup.isTouching(ghost)){
ghost.veloctyY = 0}
  
  spawnDoors()

  

  drawSprites()
}
 if( gameState === "end"){
    textSize(30)
   text("Game Over",230,250)
   
 }
}

function spawnDoors(){
  if(frameCount%230=== 0){
     door = createSprite(200,50,10,10);
    door.addImage("doorImg",doorImage);
    door.velocityY = 1.5;
    door.x = Math.round(random(120,400));
    door.lifetime = 800;
    doorGroup.add(door); 
    

    
    
    railing = createSprite(200,106,10,10);
    railing.addImage("railingIMG", railingImage);
    railing.velocityY = 1.5;
    railing.x = door.x;
    railing.scale = 0.7;
    railing.lifetime = 800
    railingGroup.add(railing);  
    
    ghost.depth = door.depth;
    ghost.depth +=1
    
    invBlock = createSprite(200,110);
    invBlock.width = railing.width
    invBlock.height = 2
    invBlock.velocityY = 1.5
    invBlock.x = door.x;
    invBlockGroup.add(invBlock);
    invBlock.debug = true
  }
 
  
}