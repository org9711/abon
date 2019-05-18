//const anime = require('../../anime-master/lib/anime.js')
//import anime from '../../anime-master/lib/anime.js';

document.getElementById("Capa_1").onmouseover = function() {earthMouseOver()};
document.getElementById("Capa_1").onmouseout = function() {earthMouseOut()};

function earthMouseOver(){
    anime({
    targets: '#layer3',
    translateY: [
        {value: -100, duration: 3000},
    ],
});
}

function earthMouseOut(){
    anime({
    targets: '#layer3',
    translateY: [
        {value: 0, duration: 3000},
    ],
});
}

document.getElementById("heart").onmouseover = function() {heartMouseOver()};
document.getElementById("heart").onmouseout = function() {heartMouseOut()};

function heartMouseOver(){
    anime({
    targets: '.heartpath',
    duration: 600,
    easing: 'easeInOutSine',
    translateX: [
        {value: 10},
        {value: -10},
        {value: 5},
        {value: -5},
        {value: 0}
    ]
    });
    
    anime({
        targets: '.heartpath2',
        duration: 600,
        easing: 'easeInOutSine',
        translateX:[
            {value: -10},
            {value: 10},
            {value: -5},
            {value: 5},
            {value: 0}
        ]
    });
}

function heartMouseOut(){
    
}


document.getElementById("piggy").onmouseover = function() {piggyMouseOver()};
document.getElementById("piggy").onmouseout = function() {piggyMouseOut()};

function piggyMouseOver(){
    anime({
    targets: ['#g5789', '#g5797', '#ellipse5799', '#circle5801'],
    duration: 600,
    easing: 'easeInOutSine',
    translateX: [
        {value: 10},
        {value: -10},
        {value: 5},
        {value: -5},
        {value: 0}
    ]
    });
    
    anime({
        targets: ['#circle5805', '#circle5807', '#path5862'],
        duration: 600,
        easing: 'easeInOutSine',
        translateX:[
            {value: -10},
            {value: 10},
            {value: -5},
            {value: 5},
            {value: 0}
        ]
    });
}
    
