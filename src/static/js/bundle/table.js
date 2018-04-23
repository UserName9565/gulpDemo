layui.use(['table','jquery','laypage','layer','element'], function(){
    var table = layui.table;
    var laypage = layui.laypage;
    var layer= layui.layer;
    var $ = layui.jquery;
    var element = layui.element;
    var page = {
        count:"103",
        limit:7,
        groups:5,
        theme: '#c00' 
    }
    //第一个实例
    table.render({
      elem: '#mobile',
      id:'idTest'
      ,height: 300
      ,url: '/static/layui/json/human.json' //数据接口
      ,page: page //开启分页
      ,limit:9
      ,cols: [[ //表头
        {type:'checkbox'},
        {field: 'username', title: '用户名', width:80}
        ,{field: 'sex', title: '性别', width:80, sort: true,toolbar:"#sex"}
        ,{field: 'city', title: '城市', width:80,event:"city"} 
        ,{field: 'sign', title: '签名', width: 177,edit:"text"}
        ,{field: 'experience', title: '积分', width: 80, sort: true}
        ,{field: 'score', title: '评分', width: 80, sort: true}
        ,{field: 'classify', title: '职业', width: 80}
        ,{field: 'wealth', title: '财富', width: 135, sort: true},
        {field:'id', title: '操作',fixed: 'right', width:150, align:'center', toolbar: '#barDemo'}
      ]],
      text: {
        none: '暂无相关数据' //默认：无数据。注：该属性为 layui 2.2.5 开始新增
      }
    });
    laypage.render({
      elem: '#mobile'
      ,jump: function(obj,first){
        //obj包含了当前分页的所有参数，比如：
        console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
        console.log(obj.limit); //得到每页显示的条数
        
        //首次不执行
        if(!first){
          console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
          console.log(obj.limit); //得到每页显示的条数
          //do something
        }
      }
    });

    //监听工具条
    table.on('tool(mobile)', function(obj){ //注：tool是工具条事件名，test是table原始容器的属性 lay-filter="对应的值"
      var data = obj.data; //获得当前行数据
      var layEvent = obj.event; //获得 lay-event 对应的值（也可以是表头的 event 参数对应的值）
      var tr = obj.tr; //获得当前行 tr 的DOM对象
      
      if(layEvent === 'detail'){ //查看
        //do somehing
        layer.msg(data.id)
      } else if(layEvent === 'del'){ //删除
        layer.confirm('真的删除行么', function(index){
          obj.del(); //删除对应行（tr）的DOM结构，并更新缓存
          layer.close(index);
          //向服务端发送删除指令
        });
      } else if(layEvent === 'edit'){ //编辑
        //do something
        
        //同步更新缓存对应的值
        obj.update({
          username: '123'
          ,title: 'xxx'
        });
      }else if(layEvent==="city"){
        layer.msg(data.city)
      }
      });

      //操作表格
      var active = {
        getCheckData: function(){ //获取选中数据
          var checkStatus = table.checkStatus('idTest')
          ,data = checkStatus.data;
          layer.alert(JSON.stringify(data));
        }
        ,getCheckLength: function(){ //获取选中数目
          var checkStatus = table.checkStatus('idTest')
          ,data = checkStatus.data;
          layer.msg('选中了：'+ data.length + ' 个');
        }
        ,isAll: function(){ //验证是否全选
          var checkStatus = table.checkStatus('idTest');
          layer.msg(checkStatus.isAll ? '全选': '未全选')
        }
      };
      $('.demoTable .layui-btn').on('click', function(){
        var type = $(this).data('type');
        active[type] ? active[type].call(this) : '';
      });
  });