layui.use(['element','upload','layer'], function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var upload = layui.upload;
    var layer = layui.layer;
    //监听导航点击
    element.on('nav(demo)', function(elem){
      
    });
    var image1 = null,image2 = null,image3 = null,image4 = null;
    
   $(".upload").on("click",function(){
        uploadImg(1)
   })
   $(".upload2").on("click",function(){
        uploadImg(2)
   })
   function uploadImg(type){
    var formData = new FormData();
    if(type==1){
        var urls = faceUrl+'/portrait/startCompareForByte';
        formData.append("pic1", image1);
        formData.append("pic2", image2);
    }else{
        var urls = faceUrl+'/portrait/startCompareForZKKZ';
        formData.append("pic1", image3);
        formData.append("pic2", image4);
    }
    
   
    var layCover =  layer.load(1, {
        shade: [0.1,'#fff'] //0.1透明度的白色背景
      });
    $.ajax({
        type:"POST",
        data:formData,
        url:urls,
        async:true,
        cache: false,
        processData: false,
        contentType: false,
        success:function(data){
            layer.close(layCover)
            console.log(data);
            var data = JSON.parse(data);
            layer.alert("相似度："+data.data)
        
        },error:function(){
            layer.close(layCover)
        } 
    });
   }
    //执行实例
    var uploadInst = upload.render({
        elem: '#test1' //绑定元素
        ,auto: false //选择文件后不自动上传
        ,accept:"images"
        ,drag:true
        ,choose:function(obj){
            var files = obj.pushFile();
            //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
            obj.preview(function(index, file, result){
                $(".image1").attr("src",result);
                image1 = file
            });
        }
    });
    var uploadInst2 = upload.render({
        elem: '#test2' //绑定元素
        ,auto: false //选择文件后不自动上传
        ,accept:"images"
        ,drag:true
        ,choose:function(obj){
            var files = obj.pushFile();
    
            
            obj.preview(function(index, file, result){
                $(".image2").attr("src",result)
                image2 = file;
            });
        }
    });
    var uploadInst3 = upload.render({
        elem: '#test3' //绑定元素
        ,auto: false //选择文件后不自动上传
        ,accept:"images"
        ,drag:true
        ,choose:function(obj){
            var files = obj.pushFile();
    
            
            obj.preview(function(index, file, result){
                $(".image3").attr("src",result)
                image3 = file;
            });
        }
    });
    var uploadInst4 = upload.render({
        elem: '#test4' //绑定元素
        ,auto: false //选择文件后不自动上传
        ,accept:"images"
        ,drag:true
        ,choose:function(obj){
            var files = obj.pushFile();
    
            
            obj.preview(function(index, file, result){
                $(".image4").attr("src",result)
                image4 = file;
            });
        }
    });

});