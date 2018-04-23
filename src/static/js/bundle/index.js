
//JavaScript代码区域
layui.use(['layer', 'element', 'jquery'], function () {

    var layer = layui.layer;
    var element = layui.element;
    var $ = layui.jquery;
    $("#menu_three").on("click", function () {
        $(this).next().toggle();
    })
    $("ol").on("click", "li a", function () {//三级
        $.each($(this).parent().siblings(), function (i, e) {
            $(e).find("a").removeClass('three_this')
        });
        $(this).addClass('three_this');// 添加当前元素的样式
    })

    element.on('nav(test)', function (elem) {//监听左侧菜单栏
        if(elem.attr("lay-href")){//如果存在lay-href属性，则调用index.tabAdd方法
            index.tabAdd(elem);
        }
    });
    
    // element.on('tabDelete(test)', function(data){//删除tab页监听
    //     console.log(data);
    // });
    element.on('tab(test)', function(data){//监听tab页变化  则调用左侧菜单高亮匹配函数
        
        index.menuThis(data.elem.find("li").eq(data.index).attr("lay-id"));
    });
    var index = {
        tabAdd: function (elet) {//新增tab
            var _this = this;
            var len = $(".layui-tab-title li[lay-id='"+elet.attr("lay-href")+"']").length;
            
            if(len==0){

                var str ='<iframe src="'+elet.attr("lay-href")+'" frameborder="0" ></iframe>'
           
                //新增一个Tab项
                element.tabAdd('test', {
                    title: elet.text(), //用于演示
                    content: str,
                    id: elet.attr("lay-href") //实际使用一般是规定好的id，这里以时间戳模拟下
                })
            }
            _this.tabChange(elet.attr("lay-href"))
        }, 
        tabDelete: function (href) {//删除指定Tab项
            
            element.tabDelete('test', href); //删除：“商品管理”
        },
        tabChange: function (href) {//切换到指定Tab项
            
            element.tabChange('test', href); //切换到：用户管理
        },
        menuThis:function(href){
            $(".layui-nav .layui-this").removeClass("layui-this")
            $(".layui-nav a[lay-href='"+href+"']").parent().addClass("layui-this")
        }
    }

    
})  
