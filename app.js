$(()=>{
  //set play area
  const $mainDiv=$('<div>').addClass('container');
  $('body').append($mainDiv);
 
  //set 9 holes
  for (let i=1; i<=9; i++){
    var $holeDiv=$('<div>').addClass('hole'+i).attr('id','hole').addClass('holes');
    $holeDiv.append("<img class='img' src='./img/hole3.png' width='100px' height='100px'>");
    $('.container').append($holeDiv);
  }
  
  //show Rat
  const showRat=()=>{
    i = Math.floor(Math.random()*9+1);
    $('.hole'+i).children('.img').attr('src','./img/rat.png');
    setTimeout(hideRat,ratShowTime);
  }
  
  //hide Rat
  const hideRat=()=>{
  $('img').attr('src','./img/hole3.png');
  }

  //click start game button
  $('#start').on('click',()=>{
    startGame();
    $('#start').attr('disabled',true);
  })

  //startGame
  let show;
  var count;
  var ratShowTime;
  var cycleTime;
  const startGame=()=>{
    if($('#easyMode').attr('disabled')==='disabled'){
      ratShowTime=1000;
      cycleTime=2000;
    }
    if($('#hardMode').attr('disabled')==='disabled'){
      ratShowTime=600;
      cycleTime=1600;
    }
    show=setInterval(showRat,cycleTime);
    count=setInterval(countDown,1000);
  }

  //once clicked rat
  var sum=0;
  $('#hole img').on('click', function(){
    console.log('clicked');
    if($(this).attr('src')==='./img/rat.png'){
      sum+=100;
      $('#sum').text(sum);
      setTimeout(hitRat,50);
      $(this).effect('shake',{direction:'up',times:2,distance:2});//https://releases.jquery.com/ui/
    }
    console.log($(this).attr('src'));
  });
   
  //timer
  let times=30;
  const countDown=()=>{
  times--;
  $('#timer').text(times);
  console.log(times);
  if (times==0){
    clearInterval(show);
    clearInterval(count);
    setTimeout(()=>{alert('Your final score: '+sum)},1020);
  }
  if (times<=10){
    $('#timer').css('color','red');
  }
}

 /////////////////////////////////////////////////////// other features///////////////////////////////////////////////////////////////
 // hit sound
  var hitSound=new Audio('./audio/hitsound.mp3');
  $('.holes').on('click',()=>{
    hitSound.play();
  })

  //once hit the rat = boom image
  const hitRat=()=>{
    $('.hole'+i).children('.img').attr('src','./img/oncehitit.png');
  }

  //reset game
  $('#reset').on('click',()=>{
    resetGame();
  })

  //reset game function
  const resetGame=()=>{
    $('#start').removeAttr('disabled');
    clearInterval(show);
    clearInterval(count);
    $('#timer').text('30');
    times=30;
    $('#sum').text('0');
    sum=0;
    $('#timer').css('color','black');
  }

  //set cursor to a hammer            //https://icons8.com/icons/set/hammer
  $('.container').on('click',()=>{
    setTimeout(hammerHit,10);
    setTimeout(hammerReady,100);
  })
  const hammerHit=()=>{
    $('.container').css('cursor','url(./img/hammer2.png),auto');
  }
  const hammerReady=()=>{
    $('.container').css('cursor','url(./img/hammer1.png),auto');
  }

  //choose different mode
  //once pressed easyMode button
  $('#easyMode').on('click',()=>{
    $('#easyMode').attr('disabled',true);
    $('#reset').removeAttr('disabled');
    $('#hardMode').removeAttr('disabled');
    resetGame();
  })

  //once pressed hardMode button
  $('#hardMode').on('click',()=>{
    $('#reset').removeAttr('disabled');
    $('#easyMode').removeAttr('disabled');
    $('#hardMode').attr('disabled',true);
    resetGame();
  })

  setTimeout(()=>{alert('Please choose --Easy Mode-- or --Hard Mode-- to start the game')},1000);
})