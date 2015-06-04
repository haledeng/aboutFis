/*
* 初始化页面, include:
* 1. 目录结构, html, scss, js, async.js
* 2. 测速 和 pv上报
*/
var path = require('path'),
	fs = require('fs');

var settings = {
	src: 'src',
	htmlDir: 'src/',
	jsDir: 'src/modules/${name}'
};

var inlineJsTpl = "require.async(['zepto', 'common', '${name}'], function($, T, main){\r\n" + 
    "\tmain.init();\r\n" +
	"\trequire.async(['qqapi', 'common/common.async'], function (mqq){});\r\n" +
"});" ;


// 测速 和 pv上报
var speedAndPvReportTpl = "function speedAndPvReport(){\r\n" + 
	"\twindow.speedOpts = {\r\n" + 
    "\t\tcgiTotal: 1,\r\n" + 
    "\t\tisdFlags: '7832-56-'+ (window.isPack?'20':'65')\r\n" + 
	"\t};\r\n" + 
	"\t__inline('/inline/speed.inline.js');\r\n" + 
	"\twindow.packReportOpts = {\r\n" + 
    "\t\tpackMid: 615625,\r\n" + 
    "\t\tunpackMid: 615626\r\n" + 
	"\t};\r\n" + 
	"\t__inline('/inline/packReport.inline.js');\r\n" + 
	"}\r\n",
	_bindEvents = "\r\nfunction bindEvents(){\r\n}\r\n",
	_init = "\r\nfunction init(){\r\n" + "\tspeedAndPvReport();\r\n \tbindEvents();\r\n" + "}\r\n",
	_exports = "\r\nmodule.exports = {\r\n" + "\tinit: init\r\n" + "};";

module.exports = function(grunt){
	grunt.registerTask('initPage', function(){
		var ref = grunt.config.get('ref'),
			htmlContent = '',
			pageName = grunt.option('name');
		if(!pageName) return;
		settings.jsDir = settings.jsDir.replace('${name}', pageName);
		if(fs.existsSync(settings.jsDir)){
			console.log('dir has existed!');
			return;
		}
		// js 目录
		fs.mkdirSync(settings.jsDir);
		// xxx.inline.js
		fs.writeFileSync(path.join(settings.jsDir, pageName + '.inline.js'), inlineJsTpl.replace('${name}', pageName))
		// xxx.js
		fs.writeFileSync(path.join(settings.jsDir, pageName + '.js'), _bindEvents + speedAndPvReportTpl + _init + _exports);
		// xxx.scss
		fs.writeFileSync(path.join(settings.jsDir, pageName + '.scss'), '@charset "utf-8";\r\n');

		// generate html

		try{
			htmlContent = grunt.file.read('grunt/template.html');
		}catch(e){
			console.log('template.html not found!');
			return;
		}
		
		htmlContent = htmlContent.replace(/\${name}/g, pageName);
		fs.writeFileSync(path.join(settings.src, pageName + '.html'), htmlContent);
	});

	return {
	    initPage: {}
	};
};

