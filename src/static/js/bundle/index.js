$(".btn").on("click",()=>{
    location.href = "./views/damand/damandInput.html"

});


var index = {
    demo:function(b,back){
        setTimeout(function(){
            back()
        },2000)
        ;
    }
}
