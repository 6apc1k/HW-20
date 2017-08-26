var winningArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16'];
var animating = false;
var emptyCell = 15;
var steps = 0;
var start;
var intervalID;


var myArray = winningArray.slice();
$(document).ready(function() {
    paint();
    $('.cell').css('pointer-events', 'none');
    $('.newGame span').addClass('blink');
    $('.newGame').click(function(){
        steps = 0;
        $('.newGame span').removeClass('blink');
        shuffle(myArray);
        repaint();  
        clock();      
    });
    $('.win').click(function(){
        myArray = winningArray.slice();
        repaint();
        setTimeout(() => {startNew()}, 100); 
    })
})

function paint () {
    for (var i = 0; i < myArray.length; i++) {
        var $div = $("<div></div>", {"class": "cell"});
        $div.html(myArray[i]);
        $div.addClass(`number${myArray[i]}`);
        if (myArray[i] === '16') {
            $div.css('visibility', 'hidden');
            $div.addClass('empty');
            emptyCell = i;
        }     
        $('.box').append($div);        
    } 
    $('.cell').on('click', function() {
        $(this).css('border', '1px solid #356399');
        $(this).css('box-shadow', '0px 0px 20px 3px rgba(0,0,0,0.25)');
        animation($(this));
        changePosition(myArray.indexOf($(this).html()), emptyCell);
    });
    $('.steps span').html(steps);    
}

function repaint() {
    $('.box').html('');
    paint();
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function swapArrEl (x, y) {
    var b = myArray[y];
    myArray[y] = myArray[x];
    myArray[x] = b;
}

function changePosition (x, y) {
   if (checkNeighbour(x)) {
        ++steps;
        swapArrEl(x, y);
        setTimeout(() => {repaint();}, 50);
        setTimeout(() => {startNew()}, 60);
   } else {
    var element = `.number${myArray[x]}`
    $(element).effect("highlight", {color:'#24466d', easing:'easeInElastic'}, 100);
   }
}

function animation (elem) {
    if (myArray.indexOf(elem.html()) == myArray.indexOf('16') - 1) {
        elem.animate({left: "+=75"}, 70);
    } else if (myArray.indexOf(elem.html()) == myArray.indexOf('16') + 1) {
        elem.animate({left: "-=75"}, 70);
    } else if (myArray.indexOf(elem.html()) == myArray.indexOf('16') - 4) {
        elem.animate({top: "+=75"}, 70);
    } else if (myArray.indexOf(elem.html()) == myArray.indexOf('16') + 4) {
        elem.animate({top: "-=75"}, 70);
    }
}

function compare () {
    return (myArray.length == winningArray.length) && myArray.every(function(element, index) {
        return element === winningArray[index];     
    });
}

function startNew() {
    if (compare()) {
        if (confirm('You won! Do you want to play again?')) {
            steps = 0;
            shuffle(myArray);
            repaint();
            clock(); 
        } else {
            alert('Thanks for playing!');
            window.clearInterval(intervalID);
            $('.cell').css('pointer-events', 'none');
        }
    }
}

function checkNeighbour(x) {
    var a = false;
    [-4, -1, 1, 4].map(function(num) {
        return x + num;
    }).forEach(function(el) {
        if(myArray[el] == '16') {
            a = true;
        } 
    });
    return a;
}

function timeString(num) {
    return ( num < 10 ? "0" : "" ) + num;
  } 

function clock () {
    window.clearInterval(intervalID);     
    start = new Date;
    intervalID = window.setInterval(function() {
    var total_seconds = (new Date - start) / 1000;   

    var hours = Math.floor(total_seconds / 3600);
    total_seconds = total_seconds % 3600;

    var minutes = Math.floor(total_seconds / 60);
    total_seconds = total_seconds % 60;

    var seconds = Math.floor(total_seconds);

    hours = timeString(hours);
    minutes = timeString(minutes);
    seconds = timeString(seconds);

    var currentTimeString = hours + ":" + minutes + ":" + seconds;

    $('.time span').html(currentTimeString);
    }, 1000);
}



