'use strict';
var path = require('path');

/*
* 遍历目录，获取未被引用的图片 list
* 获取所有图片和被引用的图片，求差值
*/

var IMG_PATH = 'img';

var root = fis.project.getProjectPath();

function getAllList(){
	var imgPath = path.join(root, IMG_PATH);
	return fis.util.find(imgPath, /.*\.(png|jpg|gif)/);
}
var allImageList = getAllList(),
	usedImageList = [];

function getUsedList(file){
	var content,
	if(file.isHtmlLike || file.isJsLike){
		content = file.getContent();
		allImageList.forEach(function(img){
			if(~content.indexOf(img) && ~~usedImageList.indexOf(img)){
				usedImageList.push(img);
			}
		});
	}
}

// 为毛这里配置有2种？貌似和版本有关系
// module.exports = function(files, settings, callback)
module.exports = function (dest, file, content, settings, callback) {
	// 文件写入到 to 制定的目录时，判断是否为多余的图片，如果是多余的图片，则不写入
};
