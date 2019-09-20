layui.use(['element','upload','layer','form'], function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var upload = layui.upload;
    var layer = layui.layer;
    var form = layui.form;
    var face = null,base64 = null; 
    element.on('nav(demo)', function(elem){});
    $(".upload").on("click",function(){
        sontrast(1);
    })
    form.on('submit(demo1)', function(data){
        var data = data.field
        goImg(data)
        return false;
      });
    
    
    function goImg(data){
        var obj_ajax = {};
        obj_ajax.reqStr = JSON.stringify(data);
        common.ajax("/server/getORCode","get",obj_ajax,success);
        function success(data){
            $('.QRshow').find("img").attr("src", "data:image/png;base64," + data);//图片放置
        }
    }
    
     
})