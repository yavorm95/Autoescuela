function $(x){
    return document.getElementById(x);
}

function GetClass(name, x){
    return document.getElementsByClassName(name)[x];
}

function remove(id) {
    $   (id).parentNode.removeChild($(id));
}


var preg = JSON.parse(preguntas);
var ok = [];
var nope = [];
var clickedIDs = [];
var fallos = 0;
var totalPreguntas = 0;

var square = function(x){
    this.num = x;
    this.option;
}

square.prototype.display = function(target){
    var sqElement = document.createElement('div');
        sqElement.setAttribute('class', 'number');
        sqElement.setAttribute('id', `${this.num}`)
        sqElement.setAttribute('onclick', `clic(${this.num})`)
        sqElement.innerHTML = `${this.num}`;
        target.appendChild(sqElement);
}

square.prototype.finished = function(target){
    var sqElement = document.createElement('div');
        sqElement.setAttribute('class', 'number');
        sqElement.setAttribute('id', `${this.num}`)
        sqElement.setAttribute('onclick', `show(${this.num})`)
        sqElement.innerHTML = `${this.num}`;
        target.appendChild(sqElement);
}

function button_click(num) {
    for (var x in preg){
        var sq_inst = new square(x);
        sq_inst.display($('bottom'));
        totalPreguntas++;
    }
    clic(num);
    remove('button');
    CreateFinalButton(num);
}

function CreateFinalButton(num) {
    var final_button = document.createElement("button");
    final_button.innerHTML = "Finish Test";
    final_button.setAttribute('id', 'button');
    final_button.setAttribute('onclick', `Finish(${num})`);
    GetClass("foto","0").appendChild(final_button);
}

function clic(num) {
    
    $('question').innerHTML = preg[`${num}`].p + '<br>';
    $('a').innerHTML = 'a) ' + preg[`${num}`].a;
    $('a').setAttribute('onclick', `Selected(${num}, this)`);
    $('a').style.color = 'gray';
    
    $('b').innerHTML = 'b) ' + preg[`${num}`].b;
    $('b').setAttribute('onclick', `Selected(${num}, this)`);
    $('b').style.color = 'gray';
    
    $('c').innerHTML = 'c) ' + preg[`${num}`].c;
    $('c').setAttribute('onclick', `Selected(${num}, this)`);
    $('c').style.color = 'gray';
    
    if(clickedIDs[num] != undefined){
        $(clickedIDs[num]).style.color = 'lightgreen';
    }
    
    $('foto').setAttribute('src',`img/${num}.JPG`); 
}

function Selected(num, target){
    var target_id = target.getAttribute('id')
    var answers = GetClass('question', 0).children;
    for (var x in answers){
        if (answers[x].tagName == 'A'){
            answers[x].children[0].style.color = 'gray';
        }
    }
    
    clickedIDs[num] = target_id;
    target.style.color = 'lightgreen';
    Answer(num, target_id);
}

function Answer(num, clicked_id){
    var goodGuess = preg[`${num}`].ok;
    
    if(clicked_id == goodGuess){
        ok[`${num}` - 1] = preg[`${num}` - 1];
        $(num).style.borderColor = 'black';
    }else{
        nope[`${num}` - 1] = preg[`${num}` - 1];
        $(num).style.borderColor = 'black';
        fallos++;
    }
}

function Finish(num){
    for (x in preg){
        remove(x);
    }
    recreate(num);
}

function recreate(num){
    for (var x in clickedIDs){
        if (clickedIDs[x] !== preg[x].ok){
            var sq_insta = new square(x);
            sq_insta.finished($('bottom'));
            show(x); 
        }
    }
    
    if (clickedIDs.length > totalPreguntas - 3) {
        if(fallos >= 4){
            $('foto').setAttribute('src',`img/suspendido.jpg`);
        }else{
        $('foto').setAttribute('src',`img/Aprobado.png`);
            }
    }else{
        $('foto').setAttribute('src',`img/suspendido.jpg`);
    }
    
    remove('button');
    createReloadButton();     
}    

function show(num) {    
    $('question').innerHTML = preg[`${num}`].p + '<br>';
    $('a').innerHTML = 'a) ' + preg[`${num}`].a;
    $('b').innerHTML = 'b) ' + preg[`${num}`].b;
    $('c').innerHTML = 'c) ' + preg[`${num}`].c;
    $('a').setAttribute('onclick', `function(){}`);
    $('b').setAttribute('onclick', `function(){}`);
    $('c').setAttribute('onclick', `function(){}`);
    $('a').style.color = 'gray';
    $('b').style.color = 'gray';
    $('c').style.color = 'gray';

    $(preg[`${num}`].ok).style.color = 'lightgreen';
    $(clickedIDs[num]).style.color = 'red';
    
}

function createReloadButton() {
    var reset_button = document.createElement("button");
    reset_button.innerHTML = "Reload Test";
    reset_button.setAttribute('id', 'button');
    reset_button.addEventListener('click', function(){
        location.reload();
    });
    GetClass("foto","0").appendChild(reset_button);
}










