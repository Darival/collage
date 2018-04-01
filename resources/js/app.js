function rotate() {
    $(".gallery > a > img").each(function(){
        let number = 0 + Math.floor(Math.random() * 20)-10;
        $(this).css('transform','rotate('+number+'deg)');
    });
    setTimeout(function(){rotate()},1500);
}
function breathe() {
    $("h1").each(function(){
        $(this).css('text-shadow','0px 0px 0px rgba(0,0,0,.7)');
        $(this).css('transform','scale(.8)');
    });
    setTimeout(function() {
        $("h1").css('text-shadow','2px 2px 6px rgba(0,0,0,.7)');
        $("h1").css('transform','scale(1)');
        setTimeout(function(){
            breathe();
        },1500);
    },1500);
}

$().ready(function(){
    rotate();
    breathe();
})