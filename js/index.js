var ultimate = false;

$("#blue2").hide();
$("#blue1").click(function(){
  $("#blue1").hide();
  $("#blue2").show();
});
$("#blue2").click(function(){
  $("#blue2").hide();
  $("#blue1").show();
});


$("#dot").hide();
var baseUrl = "https://s3.amazonaws.com/freecodecamp/simonSound";
var audio = ["1.mp3", "2.mp3", "3.mp3", "4.mp3"];
$("#start").click(function(){
  newGame();
});
var strict = false;

$("#strict").click(function(){
  $("#dot").toggle();
  if(strict === true){
    strict = false;
  }
  else{
    strict = true;
  }
});
var board = {
  stage : 1 ,
  pattern : [],
  response : [] 
};
var counter = 0;


function newGame(){
    resetBoard();
    create();
    round(board.pattern);
    counter = 0;
    $("#count").text(board.stage);
}
 $("#leftTop").mousedown(function(){
         onClick($(this),0,"rgb(68, 163, 66)","rgb(147, 242, 145)",500,1);
});
$("#rightTop").mousedown(function(){
        onClick($(this),1,"rgb(145, 37, 37)","rgb(255, 145, 145)",500,1);
});
$("#leftBottom").mousedown(function(){
        onClick($(this),2,"rgb(155, 142, 69)","rgb(224, 217, 173)",500,1);
});
$("#rightBottom").mousedown(function(){
       onClick($(this),3,"rgb(34, 55, 99)","rgb(168, 187, 227)",500,1);
});


function check(){
  
  if(board.pattern[counter] === board.response[board.response.length-1]){
    counter++;
    return true;
  }
  
  else{
    return false;
  }
}


function resetBoard(){
  board.stage = 1;
  board.pattern = [];
  board.response = [] 
}

function resetResponse(){
  board.response = [];
  counter = 0 ;
}

function upgrade(){
  board.stage++;
  resetResponse();
  var pick = Math.floor((Math.random()*4));
  board.pattern.push(pick);
  round(board.pattern);
  $("#count").text(board.stage);
  
}

function userResponse(dom){
  
  board.response.push(dom);
  if(check()){
    if(board.pattern.length === board.response.length){
      if(board.stage >= 20){
        $("#count").text("WIN");
      }
      else{
        setTimeout(function(){
        upgrade();
      },1000);
      }
    } 
  }
  else{
    if(strict === true){
      resetBoard();
      create();
    }
    resetResponse();
    eachPress(dom);
     $("#count").text("!!");
    setTimeout(function(){
    round(board.pattern);
    }, 1000);
    setTimeout(function(){
      $("#count").text(board.stage);
      
    },1000);
    
  }
}

function create(){
  var pick = Math.floor((Math.random()*4));
  board.pattern.push(pick);
}





function onClick(dom,song,original,hover,interval,stopTimer){
  var stop = 0;
  var timer = setInterval(function(){
    stop++;
    if(stop >= stopTimer*2){
      clearInterval(timer);
      $(dom).css("background-color",original);
    }
    
    if(stop%2 !== 0){
      new Audio(baseUrl + audio[song]).play();
      $(dom).css("background-color",hover);
    }
    else{
      $(dom).css("background-color",original);
    }
    
  },interval);
}

function round(arr){
  var t = 0 ;
  var round = setInterval(function(){
        if(t > arr.length){
          clearInterval(round);
        }                  
        eachPress(arr[t]);                 
        t++;                      
  },1000);  
}

function eachPress(num){
  var dom,song,original,hover;
  if(num === 0){
    dom ="#leftTop" ;
    song = 0;``
    original = "rgb(68, 163, 66)";
    hover ="rgb(147, 242, 145)" ;
  }
  if(num === 1){
    dom = "#rightTop";
    song = 1;
    original = "rgb(145, 37, 37)";
    hover ="rgb(255, 145, 145)" ;
  }
  if(num === 2){
    dom = "#leftBottom";
    song = 2;
    original = "rgb(155, 142, 69)" ;
    hover ="rgb(224, 217, 173)" ;
  }
  if(num === 3){
    dom = "#rightBottom";
    song = 3 ;
    original = "rgb(34, 55, 99)";
    hover ="rgb(168, 187, 227)" ;
  }
  onClick($(dom),song,original,hover,500,1);
}