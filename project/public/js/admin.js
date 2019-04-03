$(function () {
    function waring(string) {
        $('body').append('<div class="warning">'+string+'</div>');
        $('.warning').fadeIn(function () {
            $('.warning').fadeOut(2500,function () {
                $('.warning').html('');
            })
        })
    }
    //管理页面选中效果
    $('#nav-box').find('a').eq($('#nav-box').attr('num')).addClass('seled');
    //添加新分类
    $('#btn').on('click',function () {
        if ( $('#txt').val()==='' ){
            waring('新分类添加失败')
        } else{
            $.ajax({
                url:'/admin/add_category/add',
                type:'get',
                data:{
                    name:$('#txt').val()
                },
                success:function (suc) {
                    console.log(suc);
                    if (suc.code===1) {
                        waring('分类名已存在');
                    }else if(suc.code===2){
                        waring('分类名添加成功');
                    }else{
                        waring('分类名添加失败');
                    }
                },
                error:function (err) {
                    console.log(err);
                }
            })
        }
    });
    //删除分类
    $('.box1').find('a:nth-child(2)').on('click', function () {

        var id= $(this).parent().find('input').eq(0).val();

        var txt=  "确定要删除吗？";

        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm,{
            onOk:function
                () {
                $.ajax({
                    url: '/admin/manage_category/delete',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id: id
                    },
                    success: function (json) {
                        if (json.code === 5) {
                            window.location.reload();
                            waring('删除成功');
                        }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }
        });

    });
   //修改分类
    $('.box1').find('a:nth-child(1)').on('click', function () {

        var id = $(this).parent().find('input').eq(0).val();

        var name = $(this).parent().parent().find('td').eq(1).html();

        $('#sub').on('click', function () {
            if ($('#recipient-name').val() === name) {
                $('#recipient-name').val('类名不能重复').fadeOut().fadeIn(function () {
                    $('#recipient-name').val('')
                });
            } else if ($('#recipient-name').val() === '') {
                $('#recipient-name').val('类名不能为空').fadeOut().fadeIn(function () {
                    $('#recipient-name').val('');
                });
            }else{
                $.ajax({
                    url:'/admin/manage_category/modify',
                    type:'get',
                    dataType:'json',
                    data:{
                        id:id,
                        name:$('#recipient-name').val()
                    },
                    success:function (suc) {
                        if(suc.code===3){
                            $('#recipient-name').val('类名不能重复').fadeOut().fadeIn(function () {
                                $('#recipient-name').val('')
                            });
                        }else if(suc.code===4){
                            window.location.reload();
                        }else{
                            $('#recipient-name').val('类名不能重复').fadeOut().fadeIn(function () {
                                $('#recipient-name').val('')
                            });
                       }
                    },
                    error:function (err) {
                        console.log(err);
                    }
                })
            }
        });

    });
    //新增文章
    $('#article-btn').on('click',function () {

       var optioned= $('#select').find('option').eq(0).html();

            if ($('#title').val()===''&&$('#description').val()===''&&$('#content').val()==='') {
                waring('所有内容均不可为空！')
            }else{
                $.ajax({
                    url:"add_article/add",
                    type:'post',
                    dataType:'json',
                    data:{
                        title:$('#title').val(),
                        description:$('#description').val(),
                        content:$('#content').val(),
                        select:$('#select').select().val(),
                        sel_id:$('#select').find('option:selected').attr('abc')
                    },
                    success:function (info) {
                        if (info.code===6){
                            waring('上传成功！');
                            $('#title').val('');
                            $('#description').val('');
                            $('#content').val('');
                            $('#select').val(optioned);
                        }
                    },
                    error:function (info2) {
                        console.log(info2);
                    }
                })
            }
        });
    //删除文章
    $('.box').find('a:nth-child(2)').on('click', function () {

        var id= $(this).parent().parent().find('td').eq(1).html();

        var txt=  "确定要删除吗？";

        window.wxc.xcConfirm(txt, window.wxc.xcConfirm.typeEnum.confirm,{
            onOk:function () {
                $.ajax({
                    url: 'manage_article/delete',
                    type: 'get',
                    dataType: 'json',
                    data: {
                        id: id
                    },
                    success: function (json) {
                       if (json.code===7) {
                           window.location.reload();
                           waring('删除成功')
                       }
                    },
                    error: function (err) {
                        console.log(err);
                    }
                })
            }
        });
    });
    // 修改文章
    $('#modify-btn').on('click',function () {

        var optioned= $('#modify_select').find('option').eq(1).html();

        if ($('#modify_title').val()===''&&$('#modify_description').val()===''&&$('#modify_content').val()==='') {
            waring('所有内容均不可为空！')
        }else{
            $.ajax({
                url:"modify/work",
                type:'post',
                dataType:'json',
                data:{
                    id:$('#article_id').val(),
                    title:$('#modify_title').val(),
                    description:$('#modify_description').val(),
                    content:$('#modify_content').val(),
                    select:$('#modify_select').find('option:selected').html(),
                    sel_id:$('#modify_select').find('option:selected').attr('abc')
                },
                success:function (info) {
                    if (info.code===8){
                        waring('修改成功！');
                        window.location.href = '/admin/manage_article';
                    }
                },
                error:function (info2) {
                    console.log(info2);
                }
            })
        }
    })
});