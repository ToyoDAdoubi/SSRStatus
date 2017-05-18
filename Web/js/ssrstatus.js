// ssrstatus.js
var error = 0;
var d = 0;
var server_status = new Array();

function timeSince(date) {
	if(date == 0)
		return "从未.";

	var seconds = Math.floor((new Date() - date) / 1000);
	var interval = Math.floor(seconds / 31536000);

	if (interval > 1)
		return interval + " 年前.";
	interval = Math.floor(seconds / 2592000);
	if (interval > 1)
		return interval + " 月前.";
	interval = Math.floor(seconds / 86400);
	if (interval > 1)
		return interval + " 日前.";
	interval = Math.floor(seconds / 3600);
	if (interval > 1)
		return interval + " 小时前.";
	interval = Math.floor(seconds / 60);
	if (interval > 1)
		return interval + " 分钟前.";
	/*if(Math.floor(seconds) >= 5)
		return Math.floor(seconds) + " seconds";*/
	else
		return "几秒前.";
}

function bytesToSize(bytes, precision, si){
	var ret;
	si = typeof si !== 'undefined' ? si : 0;
	if(si != 0) {
		var kilobyte = 1000;
		var megabyte = kilobyte * 1000;
		var gigabyte = megabyte * 1000;
		var terabyte = gigabyte * 1000;
	} else {
		var kilobyte = 1024;
		var megabyte = kilobyte * 1024;
		var gigabyte = megabyte * 1024;
		var terabyte = gigabyte * 1024;
	}

	if ((bytes >= 0) && (bytes < kilobyte)) {
		return bytes + ' B';

	} else if ((bytes >= kilobyte) && (bytes < megabyte)) {
		ret = (bytes / kilobyte).toFixed(precision) + ' K';

	} else if ((bytes >= megabyte) && (bytes < gigabyte)) {
		ret = (bytes / megabyte).toFixed(precision) + ' M';

	} else if ((bytes >= gigabyte) && (bytes < terabyte)) {
		ret = (bytes / gigabyte).toFixed(precision) + ' G';

	} else if (bytes >= terabyte) {
		ret = (bytes / terabyte).toFixed(precision) + ' T';

	} else {
		return bytes + ' B';
	}
	if(si != 0) {
		return ret + 'B';
	} else {
		return ret + 'iB';
	}
}

function uptime() {
	$.getJSON("json/stats.json", function(result) {
		$("#loading-notice").remove();
		if(result.reload)
			setTimeout(function() { location.reload(true) }, 1000);

		for (var i = 0; i < result.servers.length; i++) {
			var TableRow = $("#servers tr#r" + i);
			var ExpandRow = $("#servers #rt" + i);
			var hack; // fuck CSS for making me do this
			if(i%2) hack="odd"; else hack="even";
			if (!TableRow.length) {
				$("#servers").append(
					"<tr id=\"r" + i + "\" data-toggle=\"collapse\" data-target=\"#rt" + i + "\" class=\"accordion-toggle " + hack + "\">" +
						"<td id=\"status\"><div class=\"progress\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-warning\"><small>加载中</small></div></div></td>" +
						"<td id=\"ip\">加载中</td>" +
						"<td id=\"name\">加载中</td>" +
						"<td id=\"type\">加载中</td>" +
						"<td id=\"type_1\">加载中</td>" +
						"<td id=\"location\">加载中</td>" +
						"<td id=\"time\">加载中</td>" +
					"</tr>"
				);
				TableRow = $("#servers tr#r" + i);
				ExpandRow = $("#servers #rt" + i);
				server_status[i] = true;
			}
			TableRow = TableRow[0];
			if(error) {
				TableRow.setAttribute("data-target", "#rt" + i);
				server_status[i] = true;
			}

			// IP
			TableRow.children["ip"].innerHTML = result.servers[i].ip;

			// Name
			TableRow.children["name"].innerHTML = result.servers[i].name;
			
			// Type
			TableRow.children["type"].innerHTML = result.servers[i].type;
			
			// Type_1
			TableRow.children["type_1"].innerHTML = result.servers[i].type_1;

			// Location
			TableRow.children["location"].innerHTML = result.servers[i].location;
			
			// Status
			if (result.servers[i].status) {
				TableRow.children["status"].children[0].children[0].className = "progress-bar progress-bar-success";
				TableRow.children["status"].children[0].children[0].innerHTML = "<small>可用</small>";
			} else {
				TableRow.children["status"].children[0].children[0].className = "progress-bar progress-bar-danger";
				TableRow.children["status"].children[0].children[0].innerHTML = "<small>不可用</small>";
			}
			
			// time
			TableRow.children["time"].innerHTML = result.servers[i].time;
		};

		d = new Date(result.updated*1000);
		error = 0;
	}).fail(function(update_error) {
		if (!error) {
			$("#servers > tr.accordion-toggle").each(function(i) {
				var TableRow = $("#servers tr#r" + i)[0];
				var ExpandRow = $("#servers #rt" + i);
				TableRow.children["ip"].children[0].children[0].className = "progress-bar progress-bar-error";
				TableRow.children["ip"].children[0].children[0].innerHTML = "<small>错误</small>";
				TableRow.children["location"].innerHTML = "<div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-error\"><small>错误</small></div></div>";
				TableRow.children["status"].innerHTML = "<div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-error\"><small>错误</small></div></div>";
				TableRow.children["time"].innerHTML = "<div class=\"progress progress-striped active\"><div style=\"width: 100%;\" class=\"progress-bar progress-bar-error\"><small>错误</small></div></div>";
				if(ExpandRow.hasClass("in")) {
					ExpandRow.collapse("hide");
				}
				TableRow.setAttribute("data-target", "");
				server_status[i] = false;
			});
		}
		error = 1;
		$("#updated").html("更新错误.");
	});
}

function updateTime() {
	if (!error)
		$("#updated").html("最后更新: " + timeSince(d));
}

uptime();
updateTime();
setInterval(uptime, 2000);
setInterval(updateTime, 1000);


// styleswitcher.js
function setActiveStyleSheet(title) {
	var i, a, main;
	for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title")) {
			a.disabled = true;
			if(a.getAttribute("title") == title) a.disabled = false;
		}
	}
}

function getActiveStyleSheet() {
	var i, a;
	for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("rel").indexOf("style") != -1 && a.getAttribute("title") && !a.disabled)
			return a.getAttribute("title");
	}
	return null;
}

function getPreferredStyleSheet() {
	var i, a;
	for(i=0; (a = document.getElementsByTagName("link")[i]); i++) {
		if(a.getAttribute("rel").indexOf("style") != -1	&& a.getAttribute("rel").indexOf("alt") == -1 && a.getAttribute("title"))
			return a.getAttribute("title");
	}
return null;
}

function createCookie(name,value,days) {
	if (days) {
		var date = new Date();
		date.setTime(date.getTime()+(days*24*60*60*1000));
		var expires = "; expires="+date.toGMTString();
	}
	else expires = "";
	document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ')
			c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0)
			return c.substring(nameEQ.length,c.length);
	}
	return null;
}

window.onload = function(e) {
	var cookie = readCookie("style");
	var title = cookie ? cookie : getPreferredStyleSheet();
	setActiveStyleSheet(title);
}

window.onunload = function(e) {
	var title = getActiveStyleSheet();
	createCookie("style", title, 365);
}

var cookie = readCookie("style");
var title = cookie ? cookie : getPreferredStyleSheet();
setActiveStyleSheet(title);
