<!DOCTYPE html>
<html>
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
    <meta name="renderer" content="webkit"/>
<%@ page contentType="text/html; charset=UTF-8" %>
<%@page import="com.actionsoft.webframework.bean.AWSWebServerConfig"%>

<%
 response.setHeader("Expires", "Sat, 6 May 1995 12:00:00 GMT");
 response.setHeader("Cache-Control", "no-store, no-cache, must-revalidate");
 response.addHeader("Cache-Control", "post-check=0, pre-check=0");
 response.setHeader("Pragma", "no-cache");
%>
<%
  String loginTime=Long.toString(System.currentTimeMillis());
%>

<title></title>
<link rel="shortcut icon" type="image/ico" href="favicon.ico"/>
<link rel="stylesheet" type="text/css" href="commons/css/awsui.css"/>
<link rel="stylesheet" type="text/css" href="index/theme1/theme.css"/>
<script type="text/javascript" src="commons/js/jquery/scripts/jquery.js"></script>
<script type="text/javascript" src="commons/js/awsui.js"></script>
<script type="text/javascript" src="commons/js/public.js"></script>
<script type="text/javascript" src="commons/js/lang.js"></script>
<script type="text/javascript" src="apps/_bpm.portal/js/client.login.js"></script>
<script type="text/javascript">
$(document).ready(function(){
	if($.browser.isIE6 || $.browser.isIE7){
	    window.location.href = "./version.jsp";
	}
	var bg = "index/theme1/bg" + getRandom(7) + ".jpg";
	$("#login-bg").attr("src", bg);
	$("input:first").focus();
	$("#userid, #pwd").on("keyup", function(e){
		if(e.keyCode == 13){
			loginAccount(0);
		}
	})
	onFocus();
});
function loadLang(){
	try{
		var lang=getPortalLang();
		document.getElementById('portal_lang').value=lang;
	}catch(e){}
}
function getRandom(n){
	return Math.floor(Math.random()*n+1)
}
</script>
<style>
    .awsui-simple-tab a{
        font-size: 16px;
        width: 50%;
        margin: 0px;
        padding: 12px 0px;
        display: block;
        float: left;
        color:#515151;
        background-color: transparent!important;
        font-weight: 300;
    }
    .awsui-simple-tab .active{
        font-weight: 400;
        color:#515151;
        border-bottom:#cecece 2px solid;
    }
    .awsui-simple-tab .active:hover
    {
        color: #515151;
    }
</style>
</head>
<body>
<script language="javascript">
<%if (!AWSWebServerConfig.isDefLogin()) {%>
	window.location='index_sso.jsp';//CAS SSO
<%}%>
</script>
<form name="frmLogin" id="frmLogin" method="post" >
    <img src="" id="login-bg"/>
        <div class="login-main">

        <div style="padding-left:10px;position:absolute;DISPLAY: none" id='autoLoginProcess' name='autoLoginProcess'>
            <div id="showProcessTitle" name="showProcessTitle" style="text-align: left; font-family: 微软雅黑, Verdana, Arial, Helvetica, sans-serif; color:black; "></div>
        </div>
        <div class="login-main-form login-pwd-form">
            <div class="login-main-form-process"></div>
            <div class="awsui-iconfont" id="qrcodeicon" onclick="phoneForm();" style="display:none;font-size:25px;cursor: pointer;position:absolute;text-align:right;width:100%">手机登录</div>
            <div class="login-main-form-top">
                <div class="aws-login-font" id="welcome" style="font-size:18px;position:absolute;top:-50px;text-align:center;width:100%">欢迎登录AWS BPM PaaS门户</div>
                <div id="users">
                    <input style="display:none">
                    <input onclick="breakAutoProcess();" id="userid" name="userid" maxlength="32" placeholder="用户名" style="" type="text" autocomplete="off"/>
                    <input style="display:none">
                    <input onclick="breakAutoProcess();" id="pwd" name="pwd" maxlength="32" placeholder="密码" type="password" autocomplete="off"/>
                </div>
                <span onclick="return loginAccount(0);" class="login-button aws-login-font" id="loginBtn">登录</span>
                <div style="margin:8px 0px;">
                    <input name="rememberMeUid" id="rememberMeUid" type="checkbox"/>
                    <label class="aws-login-font" style="vertical-align:middle;" for="rememberMeUid" id="rememberUserNameField">记住用户名</label>
                    <input name="rememberMePwd" id="rememberMePwd" type="checkbox"/>
                    <label class="aws-login-font" style="vertical-align:middle;" for="rememberMePwd" id="rememberPasswordField">记住密码</label>
                </div>

            </div>
            <div style="text-align:right;position:absolute;bottom:12px;right:37px;">
                <select class="aws-login-font"  name=lang id=lang onchange="setLangCookie(this.value);loadLang();">
                    <option value=cn>中文</option>
                    <option value=en>English</option>
                    <option value=big5>繁體</option>
                </select>
            </div>
        </div>
        <!-- 扫码登录开始 -->
        <div class="login-main-form login-qrcode-form" style="display: none;height: 400px">
            <div style="display:none;padding: 0px;height:auto;text-align: center;float: left;width: 100%;    border-bottom: 1px solid #cecece" class="awsui-simple-tab" contentid="content" id="content_tab" >
                <a tit="tab1"  id="tab-qr" style="border-right: 1px #cecece solid;width:49%;">移动门户扫码登录</a>
                <a tit="tab2" id="tab-weixin">企业微信扫码登录</a>
            </div>
            <div id="content" class="aws-simple-tab-content" style="float: left;width: 100%;">
                <div tit="tab1" id="tab-content-qr" style="padding:20px;">
                    <div class="login-main-form-top" style="margin-top: 20px;position: static;">
                        <div id="code" style="padding: 15px;background: #fff;width:170px;margin: 0 auto;"></div>
                        <div style="margin: 0 auto;display: none;width:200px;" ><img id="photo"  style="width:100%"> </div>
                        <div class="ng-hide" style="margin: 0 auto;display: none;left:132px;top:40px;width:200px;position: absolute;">
                            <div style="position: absolute;background: white;opacity: 0.9;width: 200px;height: 200px;"></div>
                            <div  style="text-align: center;position: absolute;left: 45px;top:55px">
                                <p class="refresh_tips" style="font-size: 14px;color:#515151">当前二维码已过期</p>
                                <button type="button" onclick="refreshQRCode()"class="awsui-btn refresh">刷新</button>
                            </div>
                        </div>
                        <div class="aws-login-font" style="font-size:16px;font-weight:400;text-align: center">
                            <p class="message">请使用移动门户扫描二维码登录</p>
                            <p class="login_message" style="display: none;"><span style="font-weight: bold;font-size: 18px;"> 扫描成功</span><br/>请在移动门户确认登录</p>
                        </div>
                    </div>
                </div>
                <div tit="tab2" id="tab-content-weixin" style="padding:20px;text-align:center;">
                    <div id="wx_reg" style="">
                    </div>
                </div>
            </div>
            <div style="text-align:right;position:absolute;bottom:12px;right:37px;cursor: pointer;border-bottom:1px solid #cecece"onclick="changeForm(1);" >
                账户密码登录
            </div>
        </div>
        <!-- 扫码登录结束 -->
    </div> 
    <div class="login-bottom"><a target="_blank" href="http://www.actionsoft.com.cn">
        <img width="110px" src="index/theme1/copyright.png" style="border:0px;margin-right:18px;"/>
    </a></div>
    <input type="hidden" name="cmd" />
    <input type="hidden" name="sid" />
    <input type="hidden" name="deviceType" />
    <input type="hidden" name="_CACHE_LOGIN_TIME_" value="<%=loginTime%>" />
</form>
</body>
<script>
     var loginFlag=0;//登录切换
    var count = 60; //间隔函数，1秒执行
    var InterValObj1; //timer变量，控制时间
    var curCount1;//当前剩余秒数
    if(!$.browser.isIE8) {
        // qrcodeicon
        var corpId, agentId, redirectURI, qrcodeEnabled = false, weixinCodeEnabled = false;
        checkCodeEnabled();
        loadCodeContent();
    }
     function phoneForm(){
        if(loginFlag==0){
            //$("#loginBtn").attr("onclick","return loginPhone(0)");
            $("#users").html(`<input style="display:none">
                    <input onclick="breakAutoProcess();" id="phoneNum" name="phoneNum" maxlength="32" placeholder="手机号" style="" type="text" autocomplete="off"/>
                    <input style="display:none">
                    <input onclick="breakAutoProcess();" id="checkCode" name="checkCode" maxlength="32" placeholder="验证码" type="text" autocomplete="off"/>
                    <input id="doverifica_login" onclick="sendMessage2()" type="button" class="btn-sm btn-primary" value="获取验证码">
                    <input style="display:none">
                    <input id="userid" name="userid"  type="hidden" value="0"/>
                    <input style="display:none">
                    <input id="pwd" name="pwd"  type="hidden" value="0"/>`);
            $("#qrcodeicon").html(`用户名登陆`);
            loginFlag=1;            
        }else if(loginFlag==1){
            //$("#loginBtn").attr("onclick","return loginAccount(0)");
            $("#users").html(`<input style="display:none">
                    <input onclick="breakAutoProcess();" id="userid" name="userid" maxlength="32" placeholder="用户名" style="" type="text" autocomplete="off"/>
                    <input style="display:none">
                    <input onclick="breakAutoProcess();" id="pwd" name="pwd" maxlength="32" placeholder="密码" type="password" autocomplete="off"/>`);
            loginFlag=0;
              $("#qrcodeicon").html(`手机登陆`);
        }

    }

 
    //开始发送手机登陆验证码
    function sendMessage2(){
        curCount1 = count;
        var phone = $.trim($('#phoneNum').val());
        //设置button效果，开始计时
        $("#doverifica_login").attr("disabled", "disabled");
        $("#doverifica_login").val( + curCount1 + "秒再获取");
        InterValObj1 = window.setInterval(SetRemainTime2, 1000); //启动计时器，1秒执行一次
        //向后台发送处理数据

        $.ajax({
            type: "GET",
            url: "./r/jd",
            dataType: "json",
            data:{
                 cmd:"com.awspaas.user.apps.dxyz_login",
                 phoneNumber:phone
            },
            success:function(data){
                if(data.flag==2){
                    alert("无此手机号用户");
                    window.clearInterval(InterValObj1);//停止计时器
                    $("#doverifica_login").removeAttr("disabled");//启用按钮
                }
            }
        })

    }
   
    function SetRemainTime2() {
        if (curCount1 == 0) {
            window.clearInterval(InterValObj1);//停止计时器
            $("#doverifica_login").removeAttr("disabled");//启用按钮
            $("#doverifica_login").val("重新发送");
            $.ajax({
                type:"GET",
                url: "./r/jd",
                data:{
                    cmd:"com.awspaas.user.apps.dxyz_reset"
                },
                success:function(data){
                    if(data.flag==2){
                        alert("无此手机号用户");
                         window.clearInterval(InterValObj1);//停止计时器
                         $("#doverifica_login").removeAttr("disabled");//启用按钮
                    }
                }
            })
        }else {
            curCount1--;
            //注册
            $("#doverifica_login").val(curCount1 + "秒再获取");
        }

    }
</script>
</html>