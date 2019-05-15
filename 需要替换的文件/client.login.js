document.write('<script language="JavaScript" type="text/javascript" src="./commons/js/rsa/rsa.pwd.public.js?path=./"></script>');//注意如果路径不一致，使用path指定路径
var protal = true;
$(function () {
	$(document.body).off("click").on("click", function () {
		breakAutoProcess();
	});
	//wangshibao bug41554 注释掉，该功能有下面的click事件就可以实现
	// $("#pwd").off('focus').on('focus', function () {
	// $("#pwd").select();
	// });
	$("#pwd").off("click").on("click", function () {
		$("#pwd").select();
	});
});

function loginPhone(time) {
	if (time == null || time == undefined) {
		try {
			time = parseInt(jsonData.automaticLoginTime);
		} catch (e) {
			time = 2000;
		}
	}
	try {
		if (event) {//防止用户名框有输入法的时候未输入密码的时候提交出去
			if (event.keyCode == 13 && document.frmLogin.pwd.value == "") {
				return;
			}
		}
	} catch (e) {
	}
	if ($.browser.isIE6 || $.browser.isIE7) {
		$.simpleAlert('不支持IE6/IE7浏览器版本', 'error', 2000);
		return;
	}
	if ($.browser.isChrome) {
		var ua = navigator.userAgent.toLowerCase();
		var ua1 = ua.substring(ua.indexOf("chrome/") + "chrome/".length);
		var ver = ua1.substring(0, ua1.indexOf("."));
		if (parseInt(ver) != 30 && parseInt(ver) < 35) {//特殊版本控制，IE8使用ChromeFrame插件机制
			$.simpleAlert('建议升级更新版本的<a href="https://www.google.com/chrome/browser/desktop/index.html" target="_blank">Chrome浏览器</a>', 'error', 2000);
			return;
		}
	}
	//初始化processbar的宽度
	$(".login-main-form-process").hide().css({
		width: "0px"
	});
	document.frmLogin.target = "_self";
	console.log(document.frmLogin.phoneNum);
	if (document.frmLogin.phoneNum==undefined && document.frmLogin.userid.value == "") {
		return false;
	}
	if (document.frmLogin.checkCode == undefined && document.frmLogin.pwd.value == "") {
		$.simpleAlert(getLanguage('fee70b6d6d0577c04beab7541a39edb6'), 'warning', 2000);
		return false;
	}
	if (document.frmLogin.userid==undefined && document.frmLogin.phoneNum.value == "") {
		return false;
	}
	if (document.frmLogin.pwd == undefined && document.frmLogin.checkCode.value == "") {
		return false;
	}
	//将按钮禁用
	disableAll();
	debugger;
	/*$(".login-main-form-process").show().animate({
		width: "464px"
	}, time, function () {*/
		/*pathname = location.pathname;
		myDomain = pathname.substring(0, pathname.lastIndexOf('/')) + '/';
		var largeExpDate = new Date();
		largeExpDate.setTime(largeExpDate.getTime() + (365 * 24 * 3600 * 1000));
		var pwdRSA = getCookie('AWSLOGINRSAPWD');
		var newPwdRSA = document.frmLogin.pwd.value.length != 256 ? rsa_pwd(document.frmLogin.pwd.value) : document.frmLogin.pwd.value;
		if (pwdRSA != null && pwdRSA != 'null' && pwdRSA != undefined) {
			document.frmLogin.pwd.value = (pwdRSA != newPwdRSA) ? newPwdRSA : pwdRSA;
			delCookie('AWSLOGINPWD');
		} else {
			document.frmLogin.pwd.value = newPwdRSA;
		}
		try {
			if (document.frmLogin.rememberMeUid.checked == true) {
				setCookie('AWSLOGINUID', document.frmLogin.userid.value, largeExpDate, myDomain);
			} else {
				setCookie('AWSLOGINUID', null, null);
			}
			if (document.frmLogin.rememberMePwd.checked == true) {
				//setCookie('AWSLOGINPWD', document.frmLogin.pwd.value, largeExpDate, myDomain);
				setCookie('AWSLOGINRSAPWD', document.frmLogin.pwd.value, largeExpDate, myDomain);
			} else {
				setCookie('AWSLOGINPWD', null, null);
				setCookie('AWSLOGINRSAPWD', null, null);
			}
		} catch (e) {
			alert(e);
		}*/
		document.frmLogin.cmd.value = 'CLIENT_USER_LOGIN';
		document.frmLogin.deviceType.value = 'pc';
		var d = new Date();
		var timeZone = d.getTimezoneOffset() / 60;
		//转换成UTC+(-)xx的格式
		if (timeZone < 0) {
			timeZone = Math.abs(timeZone);
		} else {
			timeZone = "-" + timeZone;
		}
		awsui.ajax.request({
			type: "POST",
			url: "./r/jd",
			dataType: "json",
			data: $('#frmLogin').serialize() + "&pwdEncode=RSA&timeZone=" + timeZone + "&loginUrl=" + (encodeURIComponent(window.location.href)),
			alert: false,
			ok: function (r) {
				//将按钮置为可用
				enableAll();
				//refresh page,submit to aws console home
				document.frmLogin.cmd.value = "CLIENT_USER_HOME";
				document.frmLogin.sid.value = r.data.sid;
				document.frmLogin.action = "./r/w";
				document.frmLogin.submit();
				return false;
			},
			err: function (r) {
				if (r.data && r.data.status == '6') {
					$("#pwd").val("");
				}
				awsui.ajax.alert(r);
			}
		});
	//});
}

function loginAccount(time) {
	if (time == null || time == undefined) {
		try {
			time = parseInt(jsonData.automaticLoginTime);
		} catch (e) {
			time = 2000;
		}
	}
	try {
		if (event) {//防止用户名框有输入法的时候未输入密码的时候提交出去
			if (event.keyCode == 13 && document.frmLogin.pwd.value == "") {
				return;
			}
		}
	} catch (e) {
	}
	if ($.browser.isIE6 || $.browser.isIE7) {
		$.simpleAlert('不支持IE6/IE7浏览器版本', 'error', 2000);
		return;
	}
	if ($.browser.isChrome) {
		var ua = navigator.userAgent.toLowerCase();
		var ua1 = ua.substring(ua.indexOf("chrome/") + "chrome/".length);
		var ver = ua1.substring(0, ua1.indexOf("."));
		if (parseInt(ver) != 30 && parseInt(ver) < 35) {//特殊版本控制，IE8使用ChromeFrame插件机制
			$.simpleAlert('建议升级更新版本的<a href="https://www.google.com/chrome/browser/desktop/index.html" target="_blank">Chrome浏览器</a>', 'error', 2000);
			return;
		}
	}
	//初始化processbar的宽度
	$(".login-main-form-process").hide().css({
		width: "0px"
	});
	document.frmLogin.target = "_self";
	console.log(document.frmLogin.phoneNum);
	if (document.frmLogin.phoneNum==undefined && document.frmLogin.userid.value == "") {
		return false;
	}
	if (document.frmLogin.checkCode == undefined && document.frmLogin.pwd.value == "") {
		$.simpleAlert(getLanguage('fee70b6d6d0577c04beab7541a39edb6'), 'warning', 2000);
		return false;
	}
	if (document.frmLogin.userid==undefined && document.frmLogin.phoneNum.value == "") {
		return false;
	}
	if (document.frmLogin.pwd == undefined && document.frmLogin.checkCode.value == "") {
		return false;
	}
	//将按钮禁用
	disableAll();
	debugger;
	$(".login-main-form-process").show().animate({
		width: "464px"
	}, time, function () {
		debugger;
		pathname = location.pathname;
		myDomain = pathname.substring(0, pathname.lastIndexOf('/')) + '/';
		var largeExpDate = new Date();
		largeExpDate.setTime(largeExpDate.getTime() + (365 * 24 * 3600 * 1000));
		var pwdRSA = getCookie('AWSLOGINRSAPWD');
		var newPwdRSA = document.frmLogin.pwd.value.length != 256 ? rsa_pwd(document.frmLogin.pwd.value) : document.frmLogin.pwd.value;
		if (pwdRSA != null && pwdRSA != 'null' && pwdRSA != undefined) {
			document.frmLogin.pwd.value = (pwdRSA != newPwdRSA) ? newPwdRSA : pwdRSA;
			delCookie('AWSLOGINPWD');
		} else {
			document.frmLogin.pwd.value = newPwdRSA;
		}
		try {
			if (document.frmLogin.rememberMeUid.checked == true) {
				setCookie('AWSLOGINUID', document.frmLogin.userid.value, largeExpDate, myDomain);
			} else {
				setCookie('AWSLOGINUID', null, null);
			}
			if (document.frmLogin.rememberMePwd.checked == true) {
				//setCookie('AWSLOGINPWD', document.frmLogin.pwd.value, largeExpDate, myDomain);
				setCookie('AWSLOGINRSAPWD', document.frmLogin.pwd.value, largeExpDate, myDomain);
			} else {
				setCookie('AWSLOGINPWD', null, null);
				setCookie('AWSLOGINRSAPWD', null, null);
			}
		} catch (e) {
			alert(e);
		}
		document.frmLogin.cmd.value = 'CLIENT_USER_LOGIN';
		document.frmLogin.deviceType.value = 'pc';
		var d = new Date();
		var timeZone = d.getTimezoneOffset() / 60;
		//转换成UTC+(-)xx的格式
		if (timeZone < 0) {
			timeZone = Math.abs(timeZone);
		} else {
			timeZone = "-" + timeZone;
		}
		awsui.ajax.request({
			type: "POST",
			url: "./r/jd",
			dataType: "json",
			data: $('#frmLogin').serialize() + "&pwdEncode=RSA&timeZone=" + timeZone + "&loginUrl=" + (encodeURIComponent(window.location.href)),
			alert: false,
			ok: function (r) {
				debugger;
				//将按钮置为可用
				enableAll();
				//refresh page,submit to aws console home
				document.frmLogin.cmd.value = "CLIENT_USER_HOME";
				document.frmLogin.sid.value = r.data.sid;
				document.frmLogin.action = "./r/w";
				document.frmLogin.submit();
				return false;
			},
			err: function (r) {
				if (r.data && r.data.status == '6') {
					$("#pwd").val("");
				}
				awsui.ajax.alert(r);
			}
		});
	});
}

function setChecked(id) {
	if (id == 'rememberMePwd') {
		if (document.getElementById(id).checked) {
			document.getElementById(id).checked = false;
		} else {
			document.getElementById(id).checked = true;
		}
	} else if (id == 'rememberMeUid') {
		if (document.getElementById(id).checked) {
			document.getElementById(id).checked = false;
		} else {
			document.getElementById(id).checked = true;
		}
	}
}

function onFocus() {
	if ($("#showProcessTitle").length > 0) {
		$('#showProcessTitle').html(getLanguage('fee70b6d6d61ff476bbc297df77c8371'));
	}
	document.title = getLanguage('fee70b6d6d61ff4754f85afc6c63eb87');
	if ($("#welcome").length > 0) {
		$('#welcome').html(getLanguage('fee70b6d6d61ff4754f85afc6c63eb87'));
	}
	if ($('#awsCopyRight').length > 0) {
		$('#awsCopyRight').html(getLanguage('fee70b6d6d61ff47139f7ef41dda77ae'));
	}
	if ($('#showProcessTitle').length > 0) {
		$('#showProcessTitle').html(getLanguage('fee70b6d6d61ff476bbc297df77c8371'));
	}
	if ($('#userNameField').length > 0) {
		$('#userNameField').html(getLanguage('fee70b6d6d61ff476964f3f6737e6aea'));
	}
	if ($('#passwordField').length > 0) {
		$("#passwordField").html(getLanguage('fee70b6d6d61ff4768cda2abf128e384'));
	}
	if ($('#rememberUserNameField').length > 0) {
		$('#rememberUserNameField').html(getLanguage('fee70b6d6d61ff4d3fb82f0266972257'));
	}
	if ($('#rememberPasswordField').length > 0) {
		$('#rememberPasswordField').html(getLanguage('fee70b6d6d61ff4d7d02b8c8d7eedc6f'));
	}
	if ($('#name').length > 0) {
		$('#name').text(getLanguage('cf5d098d50b14ba4a41825d9c7c31b02'));
	}
	if ($('#loginBtn').length > 0) {
		$('#loginBtn').text(getLanguage('fee70b6d6d61ff4d7422f09cf894bb25'));
	}
	if ($('#userid').length > 0) {
		$('#userid').attr('placeholder', getLanguage('fee70b6d6d61ff476964f3f6737e6aea'));
	}
	if ($('#pwd').length > 0) {
		$('#pwd').attr('placeholder', getLanguage('fee70b6d6d61ff4768cda2abf128e384'));
	}
	lang = getPortalLang();
	document.frmLogin.lang.value = lang;
	var userName = getCookie('AWSLOGINUID');
	var userpassword = getCookie('AWSLOGINPWD');
	var userpasswordRSA = getCookie('AWSLOGINRSAPWD');
	if (userName != 'null' && userName != null) {
		document.frmLogin.userid.value = userName;
		document.frmLogin.rememberMeUid.checked = true;
		if (userpassword == 'null') {
			document.frmLogin.pwd.focus();
		}
	} else {
		document.frmLogin.userid.value = document.frmLogin.userid.value;
		document.frmLogin.rememberMeUid.checked = document.frmLogin.rememberMeUid.checked;
		document.frmLogin.userid.focus();
	}
	if (document.frmLogin.userid.value == 'null') {
		document.frmLogin.userid.value = "";
		document.frmLogin.pwd.value = "";
		document.frmLogin.rememberMeUid.checked = false;
		document.frmLogin.rememberMePwd.checked = false;
		document.frmLogin.userid.focus();
	} else {
		if (userpassword != 'null' && userpassword != null) {
			document.frmLogin.pwd.value = userpassword;
			document.frmLogin.rememberMePwd.checked = true;
			if (userName != 'null') {
				$('#autoLoginProcess').css('display', '');
				//执行登录
				loginAccount();
			}
		} else if (userpasswordRSA != 'null' && userpasswordRSA != null) {
			document.frmLogin.pwd.value = userpasswordRSA;
			document.frmLogin.rememberMePwd.checked = true;
			if (userName != 'null') {
				$('#autoLoginProcess').css('display', '');
				//执行登录
				loginAccount();
			}
		} else {
			document.frmLogin.pwd.value = document.frmLogin.pwd.value;
			document.frmLogin.rememberMePwd.checked = document.frmLogin.rememberMePwd.checked;
			document.frmLogin.userid.focus();
		}
	}
}

//停止自动登录
function breakAutoProcess() {
	$(".login-main-form-process").stop();
	$('#autoLoginProcess').hide();
	$(".login-main-form-process").hide();
	enableAll();
	return;
}

function remberPsSet() {
	if (document.frmLogin.rememberMePwd.checked == true) {
		pathname = location.pathname;
		myDomain = pathname.substring(0, pathname.lastIndexOf('/')) + '/';
		var largeExpDate = new Date();
		largeExpDate.setTime(largeExpDate.getTime() + (365 * 24 * 3600 * 1000));
		setCookie('AWSLOGINPWD', document.frmLogin.pwd.value, largeExpDate, myDomain);
	} else {
		breakAutoProcess();
		setCookie('AWSLOGINPWD', null, null);
	}
}

function checkCodeEnabled() {
	//检测是否开启扫码登陆
	$.ajax({
		type: "GET",
		url: "./r/jd",
		dataType: "json",
		async: false,
		data: {
			cmd: "com.actionsoft.apps.scanlogin_data"
		},
		success: function (data) {
			qrcodeEnabled = data.qrcodeEnabled;
			weixinCodeEnabled = data.weixinCodeEnabled;
			corpId = data.corpId;
			agentId = data.agentId;
			if (corpId == null || agentId == null || corpId == "" || agentId == "") {
				weixinCodeEnabled = false;
			}
			if (qrcodeEnabled) {
				$.when(
					$.getScript("./apps/com.actionsoft.apps.scanlogin/js/qrcode.min.js"),
					$.getScript("./apps/com.actionsoft.apps.scanlogin/js/scanlogin.js"),
					$.Deferred(function (deferred) {
						$(deferred.resolve);
					})
				).done(function () {
					console.log("loadedQRCode");
					//place your code here, the scripts are all loaded
				});
			}
			if (weixinCodeEnabled) {
				var server = data.baseurl;
				// var server = "http://test.bpmon.com:8088/portal"
				redirectURI = server + "/r/ov?cmd=OAUTH_VALIDATE&originalCmd=" + data.cmd + "&corpid=" + data.corpId + "&appAgentId=" + data.agentId + "&oauthName=wechat";
				$.when(
					$.getScript("https://rescdn.qqmail.com/node/ww/wwopenmng/js/sso/wwLogin-1.0.0.js"),
					$.Deferred(function (deferred) {
						$(deferred.resolve);
					})
				).done(function () {
					console.log("loadedWeixinCode");
					//place your code here, the scripts are all loaded
				});
			}
		},
		error: function (r) {
		}
	});
}

//切换登陆方式
function changeForm(formType) {
	if (formType == 0) {
		if (qrcodeEnabled) {
			refreshQRCode();//刷新AWS二维码
		}
		if (weixinCodeEnabled) {
			refreshWeixinCode();//刷新企业微信二维码
		}
		$(".login-pwd-form").css("display", "none");
		$(".login-qrcode-form").css("display", "block");
	} else if (formType == 1) {
		$(".login-qrcode-form").css("display", "none");
		$(".login-pwd-form").css("display", "block");
	}
}

//生产微信二维码
function refreshWeixinCode() {
	var encoded = escape(redirectURI);
	window.WwLogin({
		"id": "wx_reg",
		"appid": corpId,
		"agentid": agentId,
		"redirect_uri": encoded,
		"state": "",
		"href": "data:text/css;base64,LmltcG93ZXJCb3ggLnFyY29kZSB7d2lkdGg6IDIwMHB4O30KLmltcG93ZXJCb3ggLnRpdGxlIHtkaXNwbGF5OiBub25lO30KLmltcG93ZXJCb3ggLmluZm8ge3dpZHRoOiAzMDBweDt9Ci8qLnN0YXR1c19pY29uIHtkaXNwbGF577yabm9uZSAgIWltcG9ydGFudH0qLwouaW1wb3dlckJveCAuc3RhdHVzIHsKICAgIHRleHQtYWxpZ246IGNlbnRlcjsKfQouaW1wb3dlckJveCAuc3RhdHVzIHB7CiAgICBjb2xvcjojNTE1MTUxOwogICAgZm9udC1zaXplOjE2cHg7CiAgICBmb250LWZhbWlseTogJ09wZW4gU2FucycsIGFyaWFsOwogICAgLXdlYmtpdC1mb250LXNtb290aGluZzogYW50aWFsaWFzZWQ7Cn0KLndycF9jb2RlX3JsX21hc2t7CiAgICB3aWR0aDogMjAwcHg7CiAgICBtYXJnaW46IDAgYXV0bzsKfQoKLmltcG93ZXJCb3ggLnN0YXR1c19zdWNjLCAuaW1wb3dlckJveCAuc3RhdHVzX2ZhaWx7CiAgICBtYXJnaW4tbGVmdDowcHg7Cn0KCi5pbXBvd2VyQm94IC5zdGF0dXNfc3VjYyAuc3RhdHVzX3R4dCBoNCwgLmltcG93ZXJCb3ggLnN0YXR1c19mYWlsIC5zdGF0dXNfdHh0IGg0ewogICAgY29sb3I6ICM1MTUxNTE7CiAgICBmb250LXNpemU6IDE2cHg7Cn0KLmltcG93ZXJCb3ggLnN0YXR1c19zdWNjIC5zdGF0dXNfdHh0IHAsIC5pbXBvd2VyQm94IC5zdGF0dXNfZmFpbCAuc3RhdHVzX3R4dCBwewogICAgY29sb3I6ICM1MTUxNTE7Cn0=",
	});
}

//加载扫码内容和JS
function loadCodeContent() {
	if (qrcodeEnabled || weixinCodeEnabled) {//显示二维码图标
		$("#qrcodeicon").css("display", "block");
	}
	if (qrcodeEnabled && weixinCodeEnabled) {
		$("#content_tab").css("display", "block");//显示tab
		$("#tab-qr").addClass("active");
	} else if (qrcodeEnabled) {
		$("#tab-weixin").remove();
		$("#tab-content-weixin").remove();
		$("#tab-qr").addClass("active");
	} else if (weixinCodeEnabled) {
		$("#tab-qr").remove();
		$("#tab-content-qr").remove();
		$("#tab-weixin").addClass("active");
	}
}