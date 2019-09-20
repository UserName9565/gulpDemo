var yunUrl = 'http://120.27.14.173:8500';
// var faceUrl = 'http://114.215.71.182:8870';
// var ctxFace = 'http://192.168.1.250:8888'
var faceUrl = '';
 var ctxFace = ''
var common = {
    getString: function (name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return null;
            
        }
    },
     
   
    getLoginName:function(){
        var obj = sessionStorage.getItem("headCard");
        return JSON.parse(obj)
    },
   
    douhao:function(text,num){
        var strs=text.split(",");
        strs = strs[1]+"==##"+num+"==##"+""+"==##"+null
        return strs
    },
    
    ajax:function(url,type,data,success,error){//地址 传输方式  传递参数  成功回掉  失败回掉
         var obj_ajax = data;
         var layCover =  layer.load(1, {
            shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
        $.ajax({
            type:type,
            url:url,
            datatype: "json",
            async:true,
            data:obj_ajax,
            success:function(data){
                layer.close(layCover)
                 //var data = JSON.parse(data)
                    success(data)
            },
            error:function(data){
                layer.close(layCover)
            }
                
        });
    },
    ajaxFormData:function(url,type,data,success,error){
        var layCover =  layer.load(1, {
            shade: [0.1,'#fff'] //0.1透明度的白色背景
          });
        $.ajax({
            type:type,
            data:data,
            url:url,
            async:true,
            cache: false,
            processData: false,
            contentType: false,
            success:function(data){
                layer.close(layCover)
                 //var data = JSON.parse(data)
                    success(data)
            },
            error:function(data){
                layer.close(layCover)
            }
        });
    },
    getXmlNode:function (str){

        
        //创建文档对象
        var parser=new DOMParser(); 
        var xmlDoc=parser.parseFromString(str,"text/xml"); 
        //提取数据 
       
        var countrys = xmlDoc.getElementsByTagName('item'); 
        
         
        var obj ={}
        for (var i = 0; i < countrys.length; i++) { 
            var desc = countrys[i].getAttribute("desc");
            obj[desc] = countrys[i].textContent
              
        }; 
      
      
        return obj;
        
        },
        
        
        infoToJson: function (str){//将数据转成json格式	
        var s = this.getXmlNode(str);
        //	console.log(s);
        //转成json格式
        var obj = eval('(' + s + ')');
        //	console.log(obj);
        
        //输出json
         console.log(obj[0].id)
        return obj;
        },
        isEndTime:function(starttime){
            var myData = new Date(); 
            var times = myData.getTime(); 
            starttime = starttime.replace(new RegExp("-","gm"),"/");
            var starttimeHaoMiao = (new Date(starttime)).getTime(); //得到毫秒数
            
            return (times-starttimeHaoMiao)
        },
        dianTime:function(starttime){
            return starttime.replace(new RegExp("-","gm"),".");
        }
}