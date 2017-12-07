$(function () {

        $('form').bootstrapValidator({
            //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
            // excluded: [':disabled', ':hidden', ':not(:visible)'],

            //2. 指定校验时的图标显示，默认是bootstrap风格
            feedbackIcons: {
                valid: 'glyphicon glyphicon-ok',
                invalid: 'glyphicon glyphicon-remove',
                validating: 'glyphicon glyphicon-refresh'
            },

            //3. 指定校验字段
            fields: {
                //校验用户名，对应name表单的name属性
                username: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '用户名不能为空'
                        },
                        //长度校验
                        stringLength: {
                            min: 3,
                            max: 10,
                            message: '用户名长度必须在3到10之间'
                        },
                        callback:{
                            message: '用户名错误'
                        }

                    }
                },
                password: {
                    validators: {
                        //不能为空
                        notEmpty: {
                            message: '密码不能为空'
                        },
                        //长度校验
                        stringLength: {
                            min: 6,
                            max: 30,
                            message: '密码长度必须在6到30之间'
                        },
                        callback:{
                            message: '密码错误'
                        }

                    }
                }
            }

        }).on('success.form.bv', function (e) {
            e.preventDefault();
            //使用ajax提交逻辑
            $.ajax({
                    url: "/employee/employeeLogin",
                    data: $('form').serialize(),
                    type: 'post',
                    success: function (backdata) {
                        console.log(backdata);
                        var validator = $("form").data('bootstrapValidator');
                        if(backdata.success) {

                        }
                        else {
                            if(backdata.error==1001) {
                                // console.log('密码错误');
                                validator.updateStatus('password', 'INVALID', 'callback')
                            }
                            if(backdata.error==1000) {
                                // console.log('用户名错误');
                                validator.updateStatus('username', 'INVALID', 'callback')
                            }
                        }
                    }
                });
        });
       
        $('button[type=reset]').click(function() {
            var validator = $("form").data('bootstrapValidator');
            validator.resetForm();//重置表单，并且会隐藏所有的错误提示和图标
        })
    // })
})