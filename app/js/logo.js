function initLogo(){

    // INSTANTIATE MIXITUP ON LOGO
    var $logo = $('#logo');

    $logo.mixitup({
        listClass: 'list',
        easing: 'ease-in-out',
        targetDisplayList: 'inline-block',
        filterSelector: 'none',
        sortSelector: 'none'
    });
    
    var timer = setInterval(function(){            
        $logo.mixitup('sort', 'random');
    }, 5000);
};

$(document).ready(function(){
    initLogo()
})
