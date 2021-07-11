var road,roadImg;
var player,plImg,plImg2,plImg3,plImg4,plImg5,plImg6;
var mud,mudImg;
var npc,img1,img2,img3,img4,img5,img6,img7,img8;
var npcGroup,mudGroup,quizGroup,YGroup,NGroup;
var setImg,giveQue;
var pavement1,pavement2;
var score = 0;
var lifeline = 5;
var visible;
var quiz;
var que;
var c,r1,r2,r3,e1,e2,e3,g1,g2,g3;
var destroyer;
var op1,op2;
var i1,i2,i3,i4,i5,i6,i7,i8,i9,i10,i11,i12,i13,i14,i15,i16,i17,i18;
var quizEnable = "yes";
var trans = 255;
var feedback1,feedback2,feedback3;
var sGroup,fuel;
var fff;
var f = 100;

function preload(){
  roadImg = loadImage("road.png");
  fuel = loadImage("fuel.png");
  feedback1 = loadImage("questions/feedback_1.png");
  feedback2 = loadImage("questions/feedback_2.png");
  feedback3 = loadImage("questions/feedback_3.png");
  mudImg = loadImage("images/mud.png");
  plImg = loadImage("imgs/vehicle1_2.png");
  plImg2 = loadImage("imgs/vehicle2_2.png");
  plImg3 = loadImage("imgs/vehicle3_2.png");
  plImg4 = loadImage("imgs/vehicle4_2.png");
  plImg5 = loadImage("imgs/vehicle5_2.jpg");
  plImg6 = loadImage("imgs/vehicle6_2.png");
  img1 = loadImage("imgs/npc1.png");
  img2 = loadImage("imgs/npc2.png");
  img3 = loadImage("imgs/npc3.png");
  img4 = loadImage("imgs/npc4.png");
  img5 = loadImage("imgs/npc5.png");
  img6 = loadImage("imgs/npc6.png");
  img7 = loadImage("imgs/npc7.png");
  img8 = loadImage("imgs/npc8.png");
  c = loadImage("questions/caution.png");
  r1 = loadImage("questions/riddle_1.png");
  r2 = loadImage("questions/riddle_2.png");
  r3 = loadImage("questions/riddle_3.png");
  e1 = loadImage("questions/math_equation_1.png");
  e2 = loadImage("questions/math_equation_2.png");
  e3 = loadImage("questions/math_equation_3.png");
  g1 = loadImage("questions/gk_1.png");
  g2 = loadImage("questions/gk_2.png");
  g3 = loadImage("questions/gk_3.png");
  i1 = loadImage("questions/op_eq_1_1.png");
  i2 = loadImage("questions/op_eq_1_2.png");
  i3 = loadImage("questions/op_eq_2_1.png");
  i4 = loadImage("questions/op_eq_2_2.png");
  i5 = loadImage("questions/op_eq_3_1.png");
  i6 = loadImage("questions/op_eq_3_2.png");
  i7 = loadImage("questions/op_gk_1_1.png");
  i8 = loadImage("questions/op_gk_1_2.png");
  i9 = loadImage("questions/op_gk_2_1.png");
  i10 = loadImage("questions/op_gk_2_2.png");
  i11 = loadImage("questions/op_gk_3_1.png");
  i12 = loadImage("questions/op_gk_3_2.png");
  i13 = loadImage("questions/op_ri_1_1.png");
  i14 = loadImage("questions/op_ri_1_2.png");
  i15 = loadImage("questions/op_ri_2_1.png");
  i16 = loadImage("questions/op_ri_2_2.png");
  i17 = loadImage("questions/op_ri_3_1.png");
  i18 = loadImage("questions/op_ri_3_2.png");
}

function setup() {
  createCanvas(windowWidth,windowHeight);

  npcGroup = createGroup();
  mudGroup = createGroup();
  quizGroup = new Group();
  YGroup = new Group();
  NGroup = new Group();
  sGroup = new Group();

  player = createSprite(windowWidth/2,windowHeight-100);
  player.addImage(plImg);
  player.scale = 0.6;

  pavement1 = createSprite(90,-windowHeight*21/2,180,windowHeight*21);
  pavement1.visible = false;

  pavement2 = createSprite(windowWidth-90,-windowHeight*21/2,180,windowHeight*21);
  pavement2.visible = false;
}

function draw() {
  background("black");

  image(roadImg,0,0,windowWidth,windowHeight);
  //camera.y = player.y-200;

  destroyer = createSprite(windowWidth/2,player.y + 100,windowWidth,20); 
  destroyer.visible = false;

  spawnQuiz();

  if( player.isTouching(YGroup) )
{
  score=score+25;
 destroyQuery();
}
if( player.isTouching(NGroup)  )
{
  score=score-20;
  
  destroyQuery();
}
  
  if(keyDown("right")){
    player.x = player.x+5;
  }

  if(keyDown("left")){
    player.x = player.x-5;
  }

  if(keyDown("up")){
    if(frameCount%20===0){
      var strips = createSprite(windowWidth/2,0,5,15);
      strips.shapeColor = "white";
      strips.velocityY = 5;
      strips.depth = player.depth - 1;
    }
    spawnMud();
    spawnNPCs();
  }

  if(keyDown("down")){
    player.y = player.y+2;
  }

  if(player.isTouching(mudGroup)){
    score -= 30;
    mudGroup.destroyEach();
  }

  if(score >= 50){
    player.addImage(plImg2);
    player.scale = 0.4;
  }

  if(score >= 100){
    player.addImage(plImg3);
    player.scale = 0.6;
  }

  if(score >= 150){
    player.addImage(plImg4);
    player.scale = 0.75;
  }

  if(score >= 200){
    player.addImage(plImg5);
    player.scale = 0.4;
  }

  if(npcGroup.isTouching(player)){
    score = score - 20;
    lifeline = lifeline - 1;
    npcGroup.destroyEach();
  }

  if(npcGroup.isTouching(destroyer)){
    npcGroup.destroyEach();
    score = score + 10;
  }

  player.collide(pavement1);
  player.collide(pavement2);

  drawSprites();

  textSize(25);
  fill("red");
  textFont("chiller");
  text("Score : "+score,10,50);
  text("Lifelines : "+lifeline,10,100);
  fill("black");
  text("Increase score to",1100,50);
  text("upgrade carrier vehicle.",1100,100);
  text("Pass a vehicle : +10",1100,150);
  text("Collide with a vehicle : -10",1100,200);
  text("Collide with vehicle: lifeline-1",1085,250);
  text("Touch the mud : -25",1100,300);
  image(fuel,30,200,50,400);
  textSize(20);
  text(f,43,400);
  if(frameCount % 50 === 0 && f > 0){
    f = f -1;
  }
  if(f <= 0){
    var hider = createSprite(windowWidth/2,windowHeight/2,windowWidth,windowHeight);
    hider.shapeColor = "black";

    if(keyDown("left")){
      player.x = player.x - 0;
    }
    if(keyDown("right")){
      player.x = player.x + 0;
    }
    mudGroup.setVelocityEach(0,0);
    textSize(25);
    fill("yellow");
    text("Ran out of FUEL !",windowWidth/2,100);
    text("Please replay.",windowWidth/2,150);
  }
}

function spawnMud(){
  if(frameCount % 600 === 0){
    mud = createSprite(random(250,windowWidth-250),player.y - 500);
    mud.addImage(mudImg);
    mud.scale = 0.3;
    mud.velocityY = 5+frameCount/1000;
    mud.depth = player.depth-1; 
    mudGroup.add(mud);
  }
}

function spawnNPCs(){
  if(frameCount % 200 === 0){
    npc = createSprite(random(250,windowWidth-250),player.y - 500);
    npc.velocityY = 5+frameCount/1000;
    setImg = Math.round(random(1,8));
    switch(setImg){
      case 1 : npc.addImage(img1);
      break;
      case 2 : npc.addImage(img2);
      break;
      case 3 : npc.addImage(img3);
      break;
      case 4 : npc.addImage(img4);
      break;
      case 5 : npc.addImage(img5);
      break;
      case 6 : npc.addImage(img6);
      break;
      case 7 : npc.addImage(img7);
      break;
      case 8 : npc.addImage(img8);
      break;
      default : break;
      }
      npc.scale = 0.8;
      npcGroup.add(npc);
  }
}


function destroyQuery(){
  que.destroy();
  op1.destroy();
  op2.destroy();
}

function spawnQuiz()
{

  if(frameCount===400){
  que = createSprite(windowWidth/2,camera.y-500);
  giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-330);
  op2 = createSprite(windowWidth/2+70,camera.y-330);

        que.addImage(r1);
        op1.addImage(i13);
        op2.addImage(i14); 
        
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;

        quizGroup.add(que);
        YGroup.add(op2);
        NGroup.add(op1);
  }
 else if (frameCount===800)
 {
        que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

      op1 = createSprite(windowWidth/2-70,camera.y-330);
      op2 = createSprite(windowWidth/2+70,camera.y-330);
        que.addImage(r2);
        op1.addImage(i15);
        op2.addImage(i16);
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  else if (frameCount===1200)
  {
    que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-330);
  op2 = createSprite(windowWidth/2+70,camera.y-330);
        que.addImage(r3);
        op1.addImage(i17);
        op2.addImage(i18);
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  else if (frameCount===1600)
  {
    que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-330);
  op2 = createSprite(windowWidth/2+70,camera.y-330);
        que.addImage(e1);
        op1.addImage(i1);
        op2.addImage(i2);
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  else if (frameCount===2000)
  {
    que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-330);
  op2 = createSprite(windowWidth/2+70,camera.y-330);
        que.addImage(e2);
        op1.addImage(i3);
        op2.addImage(i4);
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  else if (frameCount===2400)
  {
    que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-330);
  op2 = createSprite(windowWidth/2+70,camera.y-330);
        que.addImage(e3);
        op1.addImage(i5);
        op2.addImage(i6);
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  else if (frameCount===2800)
  {
    que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-330);
  op2 = createSprite(windowWidth/2+70,camera.y-330);
        que.addImage(g1);
        op1.addImage(i7);
        op2.addImage(i8);
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  else if (frameCount===3200)
  {
    que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-330);
  op2 = createSprite(windowWidth/2+70,camera.y-330);
        que.addImage(g2);
        op1.addImage(i9);
        op2.addImage(i10);
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  else if (frameCount===3600)
  {
    que = createSprite(windowWidth/2,camera.y-500);
      giveQue = Math.round(random(1,9));

  op1 = createSprite(windowWidth/2-70,camera.y-330);
  op2 = createSprite(windowWidth/2+70,camera.y-330);
        que.addImage(g3);
        op1.addImage(i11);
        op2.addImage(i12);
        que.velocityY = 5;
        op1.velocityY = 5;
        op2.velocityY = 5;
        quizGroup.add(que);
        YGroup.add(op1);
        NGroup.add(op2);
  }
  }