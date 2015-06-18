/*
 * fis
 * http://fis.baidu.com/
 */
'use strict';
var path = require('path');
var STYLE_END_TAG = /<\/style>/,
	HEAD_END_TAG = /<\/head>/;

module.exports = function (ret, conf, setting, opt) {
	var require_reg = /<!--\s*require\(([^\)]*)\)\s*-->/,
		matches;
	fis.util.map(ret.src, function(subpath, file){
		if(file.isHtmlLike){
			var content = file.getContent();
			if((matches = content.match(require_reg))){
				// 处理css文件依赖
				var _filename = matches[1];

				if(opt.pack){
					// inline方式	
					var f = fis.file.wrap(_filename),
						_cssContent = f.getContent();
					content = content.replace(STYLE_END_TAG, _cssContent + '\n$&');
				}else{
					// link 方式
					var _link = '<link rel="stylesheet" type="text/css" href="'+ ret.map.res[_filename].uri +'">';
					content = content.replace(HEAD_END_TAG, _link + '\n$&');
				}
				file.setContent(content);
			}
		}
	});
};
