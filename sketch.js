
const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

var airplaneImg;
var airplane;
var coinImg;
var cloudImg;
var parrotImg;
var blueBirdImg;
var birdImg;
var score = 0;

function preload(){
	airplaneImg = loadImage("plane.png");
	coinImg = loadImage("coin.png");
	cloudImg = loadImage("cloud.png");
	parrotImg = loadImage("parrot.png");
	blueBirdImg = loadImage("blueBird.png");
	birdImg = loadImage("bird.png");
}

function setup() {
	createCanvas(windowWidth, windowHeight);


	engine = Engine.create();
	world = engine.world;

	//Create the Bodies Here.
	airplane = createSprite(windowWidth- 1000, windowHeight- 400, 60, 40);
	airplane.addImage(airplaneImg);
	airplane.setCollider('circle',0,0,150);

	coinsGroup = new Group();
	obstaclesGroup = new Group();


	Engine.run(engine);

  
}


function draw() {
  rectMode(CENTER);
  background(80, 162, 218);

  fill("black")
  textSize(20);
  text("Score: "+ score,30,50);

  if(gameState === PLAY){
	spawnCoins();
	spawnClouds();
	spawnObstacles();

	if(keyDown("UP_ARROW")){
		airplane.y = airplane.y-3;
	}
	if(keyDown("DOWN_ARROW")){
		airplane.y = airplane.y+3;
	}

	if(airplane.isTouching(coinsGroup)){
		coinsGroup.destroyEach();
		score = score+10;
	}
	
	drawSprites();

	if(airplane.isTouching(obstaclesGroup)){
	  gameState = END;
	}
  }

  if(gameState === END){
	  textSize(40);
	  text("GAME OVER", windowWidth- 1000, windowHeight- 400 );
  }

  
 
}

function spawnCoins() {
	if (frameCount % 240 === 0) {
	  var coin = createSprite(width+20,height-300,40,10);
	  coin.y = Math.round(random(100,600));
	  coin.addImage(coinImg);
	  coin.scale = 0.1;
	  coin.velocityX = -(6 + 3*score/100);
	  coin.lifetime = 500;
	  coin.setCollider('circle',0,0,100);
	  coinsGroup.add(coin);
	  
	}
	
  }
  function spawnClouds() {
	if (frameCount % 60 === 0) {
	  var cloud = createSprite(width+20,height-300,40,10);
	  cloud.y = Math.round(random(100,600));
	  cloud.addImage(cloudImg);
	  cloud.scale = 0.5;
	  cloud.velocityX = -(6 + 3*score/100);
	  cloud.lifetime = 500;
	  
	  
	}
	
  }

  function spawnObstacles() {
	if (frameCount % 180 === 0) {
	  var obstacle = createSprite(width+20,height-300,40,10);
	  obstacle.y = Math.round(random(100,600));
	  obstacle.velocityX = -(6 + 3*score/100);
	  obstacle.setCollider('circle',0,0,50);

	  var rand = Math.round(random(1,2,3));
    switch(rand) {
      case 1: obstacle.addImage(parrotImg);
              break;
      case 2: obstacle.addImage(blueBirdImg);
			  break;
	  case 3: obstacle.addImage(birdImg);
              break;
      default: break;
    }
	  obstacle.scale = 0.5;
	  obstacle.lifetime = 500;
	  obstaclesGroup.add(obstacle);
	  
	  
	}
	
  }



