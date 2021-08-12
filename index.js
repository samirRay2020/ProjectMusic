data  = [
    {
       name:"Sajde kiye hai",
       film:"Kata Meeta",
       songName:"song1.mp3",
       image :"img1.jpg",
    },
    {
        name:"Kisse se tum",
        film:"Andazz",
        songName:"song2.mp3",
        image :"img2.jpg",   
     },
     {
        name:"Aj kehna",
        film:"Andazz",
        songName:"song3.mp3",
        image :"img3.jpg" ,  
     }
]

let audio = [0,0,0];
function audioObject(){ 
    for(let i=0;i<3;i++){
        let song = "./songs/"+data[i].songName;
        audio[i] = new Audio(song); 
    }     
}
audioObject();
let index = 0;
let isPlaying = false;

//Checks if audio is playing or not
function playingOrNot(){
   if(isPlaying){
       document.querySelector(".music-container").style.backgroundColor = "grey";
   }else{
       document.querySelector(".music-container").style.backgroundColor = "#ffffff";  
   } 
}

function playSong(){
        if(isPlaying==false){
            console.log("called");
            audio[index].play();
            document.querySelector("#Play").classList.replace("fa-play-circle","fa-pause-circle");
            document.querySelector("img").classList.add("anime");
            isPlaying = true;
        }else{
            isPlaying = false;
            audio[index].pause();
            document.querySelector("#Play").classList.replace("fa-pause-circle","fa-play-circle");
            document.querySelector("img").classList.remove("anime");
        }
    playingOrNot();
}

 document.querySelector("#Play").addEventListener("click",function(){
    playSong();
 })

document.querySelector("#forward").addEventListener("click",function(){
    if(isPlaying==true)
      playSong();
       index = (index+1)%data.length;
       let name = data[index].name;
       let film = data[index].film;
       document.querySelector("#title").textContent = name;
       document.querySelector("#artist").textContent = film;
       document.querySelector("img").setAttribute("src","./images/"+data[index].image);
       playSong();

})

document.querySelector("#back").addEventListener("click",function(){

    if(isPlaying==true)
      playSong();

       index = ((index-1)+(data.length))%data.length;
       let name = data[index].name;
       let film = data[index].film;
       document.querySelector("#title").textContent = name;
       document.querySelector("#artist").textContent = film;
       document.querySelector("img").setAttribute("src","./images/"+data[index].image);
       playSong();

})

// progress bar working
let minute = 0;
let ans = "";
function stom(sec){
   sec = Math.floor(sec);
   let min = Math.floor(sec/60);
   let s = sec%60;
   let ans = min+":";
   if(s>=0 && s<=9){
        ans += "0"+s;
   }else 
        ans += s; 
    return ans;
}
const progressTimer = document.querySelector("#Progress");
const duration = document.querySelector(".duration");
const cTime = document.querySelector(".current-time");
for(let i=0;i<3;i++){
  audio[i].addEventListener("timeupdate",function(event){
    const currentTime = Math.floor(event["path"]["0"]["currentTime"]);
    const totalTime = event["path"]["0"]["duration"];
    const progressPercentage = (currentTime*100)/totalTime;
    progressTimer.style.width = `${progressPercentage}%`;

    // music duration update
    let totalDuration = stom(totalTime);
    duration.textContent =  totalDuration;

    // currentTime update
    if(currentTime%60<10)
     ans = Math.floor((currentTime/60))+":0"+(currentTime%60);
    else 
     ans = Math.floor((currentTime/60))+":"+(currentTime%60);
    cTime.textContent = ans;  
  })
}

for(let i=0;i<3;i++){
    audio[i].addEventListener("ended",function(){
         document.querySelector("#forward").click();
    })
}

// changing song and width if user click detected
function currentTimeCalculator(width){
    let cWidth = width;
    let currentPercentage = (100*cWidth)/350; 
    let cTimeClicked = (audio[index].duration * currentPercentage)/100;
    return cTimeClicked;
}

document.querySelector("#progressDiv").addEventListener("click",function(event){
   let cTimeClicked = currentTimeCalculator(event["offsetX"]);
   audio[index].currentTime = cTimeClicked;
  if(isPlaying==false)
   playSong();
})

//Forwarding and Backwarding by 5 seconds
document.querySelector("#fivesecforward").addEventListener("click",function(event){
     audio[index].currentTime += 5;
})

document.querySelector("#fivesecbackward").addEventListener("click",function(event){
    audio[index].currentTime -= 5;
})

