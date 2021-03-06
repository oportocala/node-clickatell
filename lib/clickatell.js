var http = require('http'),
	url = require('url');

exports.Clickatell = function (auth) {
	function send(number, message, callback) {
		var query = 'user=' + auth.user + '&password=' + auth.password + '&api_id=' + auth.api_id + '&to=' + number + '&text=' + encodeURIComponent(message);
		if (auth.from) {
			query += '&from=' + auth.from;
		}
		if (auth.mo) {
			query += '&mo=1'
		}
		var options = {
			host: 'api.clickatell.com',
			port: 80,
			path: "/http/sendmsg?" + query
		};
		http.get(options,function (res) {
			res.setEncoding('utf8');
			var body = "";
			res.on('data', function (chunk) {
				body += chunk;
			});
			res.on('end', function () {
				if (callback) {
					callback(body, {query: query, options: options});
				}
			});
		}).on('error', function (e) {
			console.log("Got error: " + e.message);
		});
	};

	return {
		send: send
	}
};

