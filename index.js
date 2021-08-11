data  = [
    {
       name:"Sajde kiye hai",
       film:"Kata Meeta",
       songName:"song1.mp3",
       image :"img1.jfif",
    },
    {
        name:"Kisse se tum",
        film:"Andazz",
        songName:"song2.mp3",
        image :"img2.jfif",   
     },
     {
        name:"Aj kehna",
        film:"Andazz",
        songName:"song3.mp3",
        image :"img3.jfif" ,  
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