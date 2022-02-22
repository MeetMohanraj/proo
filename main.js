Peter_pan_song = "";
Harry_potter_theme_song ="";
leftWrist_x =0;
leftWrist_y =0;
RightWrist_x =0;
RightWrist_y =0;
function preLoad(){
    Peter_pan_song = loadSound("music.mp3");
    Harry_potter_theme_song = loadSound("music2.mp3");
}
function setup(){
canvas = createCanvas(500,500);
canvas.center();

video = createCapture(VIDEO);
video.hide();

poseNet = ml5.poseNet(video,modelLoaded);
poseNet.on("pose",gotPoses);
}

function modelLoaded(){
  console.log("poseNet is initialized");

}
function gotPoses(results){
if(results.length>0){
    console.log(results);

leftWristX=results[0].pose.leftWrist.x;
leftWristY=results[0].pose.leftWrist.y;
console.log("leftWristX = "+leftWristX+" leftWrist_y = "+leftWrist_y);

rightWristX=results[0].pose.rightWrist.x;
rightWristY=results[0].pose.rightWrist.y;
console.log("RightWrist_x = "+RightWrist_x+" RightWrist_y = "+RightWrist_y);

}
}


function draw(){
    image(video,0,0,500,500);
stroke("red");
fill("red");
if (score_rightWrist>0.2){
circle(rightWristX,rightWristY,20);

if (rightWristY>0 && rightWristY <= 100){
document.getElementById("speed").innerHTML = "speed = 0.5x";
song.rate(0.5);

}
else if (rightWristY>100 && rightWristY <= 200){
    document.getElementById("speed").innerHTML = "speed = 1x";
    song.rate(1);
    
    }
    else if (rightWristY>200 && rightWristY <= 300){
        document.getElementById("speed").innerHTML = "speed = 1.5x";
        song.rate(1.5);
        
        }
        else if (rightWristY>300 && rightWristY <= 400){
            document.getElementById("speed").innerHTML = "speed = 2x";
            song.rate(2);
            
            }
            else if (rightWristY>400 && rightWristY <= 500){
                document.getElementById("speed").innerHTML = "speed = 2.5x";
                song.rate(2.5);
                
                }
}

if(score_leftWrist>0.2){

    

circle(leftWristX,leftWristY,20);
InNumberleftWristY = Number(leftWristY);
remove_decimals = floor(InNumberleftWristY);
volume = remove_decimals / 500;
document.getElementById("volume").innerHTML ="volume = "+volume;
song.setVolume("volume");
}
}
function play(){
    song.play();
    song.setVolume(1);
    song.rate(1);

}