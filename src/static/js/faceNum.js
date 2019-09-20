layui.use(['element','upload','layer','code'], function(){
    var element = layui.element; //导航的hover效果、二级菜单等功能，需要依赖element模块
    var upload = layui.upload;
    var layer = layui.layer;
    var code = layui.code;
    var face = null,base64 = null; 
    element.on('nav(demo)', function(elem){});
    $(".upload").on("click",function(){
        sontrast(1);
    })
    //goCanvas();
    function goCanvas(data){
        var str = '<canvas id="canvas" class="layui-col-md12 mt20 faceCode imgview codeM"></canvas>';
        $(".canbox").html(str)
        var cts = document.getElementById("canvas"); 
        var getPixelRatio = function(context) {
            var backingStore = context.backingStorePixelRatio ||
                context.webkitBackingStorePixelRatio ||
                context.mozBackingStorePixelRatio ||
                context.msBackingStorePixelRatio ||
                context.oBackingStorePixelRatio ||
                context.backingStorePixelRatio || 1;
        
            return (window.devicePixelRatio || 1) / backingStore;
        };
        var ratio = getPixelRatio(cts);
        //var ratio = 1;
        
        //erase();
        //创建image对象
        var imgObj = new Image();
       var width = cts.width;
       var height = cts.height;
        imgObj.src =base64; //"/static/images/gaoq.jpg" //
        //待图片加载完后，将其显示在canvas上
        
        imgObj.onload = function(){
                ctx = cts.getContext('2d');
                ctx.clearRect(0, 0, width,height);
                ctx.msImageSmoothingEnabled = true;
                ctx.imageSmoothingEnabled = true;
                ctx.lineWidth = .8;
                ctx.strokeStyle = "red";
                ctx.drawImage(this, 0, 0,width* ratio,height*ratio);//this即是imgObj,保持图片的原始大小：470*480
                
                $.each(data.faces,function(i,o){
                    var x = o.fx*width;
                    var y = o.fy*height;
                    var w = o.fw*width;
                    var h = o.fh*height;
                    ctx.rect(x,y,w,h);
                })
                ctx.stroke();
                //ctx.drawImage(this, 0, 0,1024,768);//改变图片的大小到1024*768
         
        }


 
    }
    
    function sontrast(type){
        var urls =ctxFace+ "/portrait/getFaceNumAndFace";
        goImg();
     
        function goImg(){

            var formData = new FormData();
            formData.append("pic1",face)
            console.log(face);
        
            
             common.ajaxFormData(urls,"post",formData,success);
             function success(data){
                var data = JSON.parse(data);
                goCanvas(data.data)
                layer.alert("人脸数量："+data.data['result']);
                console.log(data)
                //var str1 = ' <pre class="layui-code">'+str+'</pre>  '
                 
             }
        }
    }
    var uploadInst = upload.render({
        elem: '#test1' //绑定元素
        ,auto: false //选择文件后不自动上传
        ,accept:"images"
        ,drag:true
        ,exts:"jpg|jpeg"
        ,choose:function(obj){
            
             
             
            //预读本地文件，如果是多文件，则会遍历。(不支持ie8/9)
            obj.preview(function(index, file, result){
                face = file;
                base64 = result;
                $(".image1").attr("src",result);
               
            });
        }
    });
    
     
})