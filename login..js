$(function () {
    // 去注册账号
     $('#gotoRegi').click(function () {
          $('.regiBox').show();
          $('.loginBox').hide();
     })

     // 去登录 
     $('#gotoLogin').click(function () {
          $('.regiBox').hide();
          $('.loginBox').show();
     });

     // 从layui中获取到form表单的功能
     let form = leyui.form;
     let layer = layui.layer;

     // 表单校验
     form.verify({
         // 我们既支持上述函数式的方式，也支持下述数组的形式
         // 数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
         pass: [/^[\S]{6,12}$/,"密码必须6到12位，且不能出现空格"],

         // 再次确认密码的校验 需要和密码框的内容保持一致 ——》函数写法
         repass:function (value,item) {
              // value:表单的值、item:表单的DOM对象
              // console.log(value,item);

              // 注册表单中密码框的内容 ——》坑，获取密码框需要精确，得是注册表单中的密码框
              let pwd = $('.regiBox input[name=password').val();
              // console.log(pwd);

              // 判断密码框内容是否和确认密码框的内容是否一致
              if (value != pwd) {
                   // return 后面的内容就是提示文字
                   return "两次输入的密码不一致!!!!"
              }  
         },
     });

     // 注册的ajax代码
      $('#regiForm').on('submit',function (e) {
            e.preventDefault();

            // 手机表单数据
            let data = $(this).serialize();

            // 直接发送ajax请求
            $.ajax({
                 type:'POST',
                 url:'/api/reguser',
                 data,
                 success:function (res) {
                       console.log(res);

                    if(res.status !== 0) {
                         // return console.log('注册失败!' + res.message);
                         return layer.msg('注册失败!!' + res.message);
                    }
                    // console.log('注册成功!');
                    layer.msg('注册成功');
                    // 注册成功，显示登陆form(去登录);
                    $('#gotoLogin').click();
                 }
            })
      })
})