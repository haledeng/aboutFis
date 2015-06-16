'use strict';
var path = require('path'),
	fs = require('fs');

var STYLE_END_TAG = /<\/style>/;

module.exports = function(ret, conf, setting, opts){
	var require_reg = /<!--\s*require\(([^\)]*)\)\s*-->/,
		matches;
	fis.util.map(ret.src, function(subpath, file){
		if(file.isHtmlLike){
			var content = file.getContent();
			if((matches = content.match(require_reg))){
				// 处理css文件依赖
				var _filename = path.dirname(matches[1]);
				_filename = _filename.replace('.scss', '.css');
				
				var _filePath = path.join(path.dirname(file.toString()), _filename),
					_cssContent = fis.util.read(_filePath);
				content = content.replace(STYLE_END_TAG, '\r\n' + _cssContent + '</style>');
				content = content.replace(require_reg, '');
				file.setContent(content);
			}
		}
	});	
};
