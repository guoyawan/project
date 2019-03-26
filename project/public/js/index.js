$(function () {
    function waring(string) {
        $('body').append('<div class="warning">'+string+'</div>');
        $('.warning').fadeIn(function () {
            $('.warning').fadeOut(2500,function () {
                $('.warning').html('');
            })
        })
    }

    $('#side-open').on('click',function () {
       $('.right-side').animate({left:0},1000);
       $('.main').animate({left:'160px'},1000);
       $('.cover').fadeIn();
    });

    $('#side-out').on('click',function () {
        $('.right-side').animate({left:'-160px'},1000);
        $('.main').animate({left:0},1000);
        $('.cover').fadeOut();
    });

    $('[data-toggle="tooltip"]').tooltip();

    $('#sig').on('click',function () {
        $('#load-logo').fadeIn().fadeOut();
        $('.load').fadeOut(function () {
            $('#load-logo').fadeIn();
            $('.sig').fadeIn();
        });

    });

    $('#load').on('click',function () {
        $('#load-logo').fadeOut();
        $('.sig').fadeOut(function () {
            $('#load-logo').fadeIn();
            $('.load').fadeIn();
        });

    });

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
});
