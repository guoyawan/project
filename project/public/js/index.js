$(function () {
    //封装的提示函数
    function waring(string) {
        $('body').append('<div class="warning">'+string+'</div>');
        $('.warning').fadeIn(function () {
            $('.warning').fadeOut(2500,function () {
                $('.warning').html('');
            })
        })
    }
    //侧边栏显示
    $('#side-open').on('click',function () {
       $('.right-side').animate({left:0},1000);
       $('.main').animate({left:'160px'},1000);
       $('.cover').fadeIn();
    });
    //侧边栏掩藏
    $('#side-out').on('click',function () {
        $('.right-side').animate({left:'-160px'},1000);
        $('.main').animate({left:0},1000);
        $('.cover').fadeOut();
    });
    //登录提示
    $('[data-toggle="tooltip"]').tooltip();
    //注册显示
    $('#sig').on('click',function () {
        $('#load-logo').fadeIn().fadeOut();
        $('.load').fadeOut(function () {
            $('#load-logo').fadeIn();
            $('.sig').fadeIn();
        });

    });
    // 登录显示
    $('#load').on('click',function () {
        $('#load-logo').fadeOut();
        $('.sig').fadeOut(function () {
            $('#load-logo').fadeIn();
            $('.load').fadeIn();
        });

    });
    // 退出登录
    $('#logout').on('click', function () {
        $.ajax({
            url: 'api/user/logout',
            success: function (json) {
                console.log(json);
                if (json.code === 5) {
                    window.location.reload();
                }
            }
        })
    });
    //注册
    $('#sig-btn').on('click',function () {
        if($('#username1').val()===''&&$('#password1').val()===''){
            waring('用户名密码均不可为空');
            return;
        }
        if (!$('#password1').val()===$('#repassword1').val()){
            waring('两次输入密码不一致');
            return;
        }
        if (!(/^\w{4,12}$/).test($('#username1').val())){
            waring('用户名必须为4-12位字母或数字');
            return;
        }
        if (!(/^\w{4,12}$/).test($('#password1').val())){
            waring('密码必须为4-12位字母或数字');
            return;
        }
        $.ajax({
            type:'get',
            dataType:'json',
            url:'user/sig',
            data:{
                username:$('#username1').val(),
                password:$('#password1').val()
            },
            success:function (suc) {
                console.log(suc);
                if (suc.code===2){
                    console.log(suc);
                    waring('注册成功');
                    $('#load-logo').fadeOut();
                    $('.sig').fadeOut(function () {
                        $('#load-logo').fadeIn();
                        $('.load').fadeIn();
                    })
                }else if(suc.code===1){
                   waring('用户名已存在')
                }else{
                    waring('注册失败')
                }
            },
            error:function (err) {
                console.log(err);
            }
        })
    });
    // 登录
    $('#log-btn').on('click',function () {
        if($('#username').val()===''&&$('#password').val()===''){
           waring('用户名密码均不可为空！');
            return;
        }
        $.ajax({
            type:'get',
            dataType:'json',
            url:'user/log',
            data:{
                username:$('#username').val(),
                password:$('#password').val()
            },
            success:function (suc) {
                console.log(suc);
                if (suc.code===3){
                    console.log(suc);
                    waring('登陆成功');
                    window.location.href = '/';
                }else if (suc.code===4) {
                    waring('用户名或密码错误')
                    ;
                }else{
                   waring('登录失败');
                }
            },
            error:function (err) {
                console.log(err);
            }
        })


    });
    //留言
    $('#msg-btn').on('click',function () {
       if($('#msg_user').val()===''){
           waring('请登录后评论')
       }else if($('#msg').val()===''){
            waring('留言不能为空')
        }else{
            $.ajax({
                url:"reading/massage",
                type:'post',
                dataType:'json',
                data:{
                    discuss:$('#msg').val(),
                    id:$('#single_id').val(),
                    username:$('#msg_user').val()
                },
                success:function (suc) {
                    console.log(suc);
                   if(suc.code===1){
                       $('#msg_user').html()==='';
                       window.location.reload();
                   }
                },
                error:function (err) {
                    console.log(err);
                }
            })
        }
    });
    //留言删除
    $('.msg-body').find('em').on('click',function () {
        var msg_id= $(this).attr('acc');
        var art_id= $('.msg-body').attr('acd');
        var txt=  "确定要删除吗？";

        if ($("#msg_users").html()===$("#msg_users").attr('user')){
        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm, {
            onOk: function () {
                $.ajax({
                    url: 'reading/msg/del',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        msg_id: msg_id,
                        art_id: art_id

                    },
                    success: function (json) {
                        console.log(json);
                        if (json.code === 2) {
                            window.location.reload();
                            waring('删除成功')
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }
            })
        }else{
            waring('主人，你只能删除自己发表的评论呦')
        }
    })
});
