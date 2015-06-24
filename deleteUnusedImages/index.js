
var path = require('path');
/*
* 遍历目录，获取未被引用的图片 list
* 获取所有图片和被引用的图片，求差值
*/

var IMG_PATH = 'img';

var root = fis.project.getProjectPath();

function getAllList(){
    var imgPath = path.join(root, IMG_PATH);
    var _allImageList = fis.util.find(imgPath, /.*\.(png|jpg|gif)/),
        ret = [];
    _allImageList.forEach(function(img){
        ret.push(path.relative(imgPath, img).replace(/\\/g,'/'));
    });
    return ret;
}
var allImageList = getAllList(),
    usedImageList = [];

function getUsedList(file){
    var content,
        reg,
        extname;
    if(file.isHtmlLike || file.isJsLike){
        content = file.getContent();
        allImageList.forEach(function(img){
            extname = path.extname(img);
            // md5
            reg = new RegExp(img.replace(extname, '') + '_[a-zA-z0-9]{7}' + extname);
            if(reg.test(content) && usedImageList.indexOf(img) === -1){
                usedImageList.push(img);
            }
        });
    }
}

function arrayDiff(all, part){
    var ret = [];
    all.forEach(function(img){
        if(part.indexOf(img) === -1){
            ret.push(img);
        }
    });
    return ret;
}

function getAllImageList(file){
    if(file.isImage()){
        allImageList.push(file.release);
    }
}

module.exports = function(files, settings, callback) {
    var file;
    // 获取被引用的图片 list
    files.forEach(function(fileInfo){
        file = fileInfo.file;
        getUsedList(file);
    });

    var unUsedImageList = arrayDiff(allImageList, usedImageList);
    var dest,
        name;
    files.forEach(function(fileInfo){
        file = fileInfo.file;
        // md5
        name = ((fileInfo.dest.to || '/') + fileInfo.dest.release).replace(/^\/*/g, '');
        dest = path.join(root, name);
        if(file.isImage()){
            if(unUsedImageList.indexOf(file.release.replace('/img/', '')) == -1){
                fis.util.write(dest, fileInfo.content); 
            }
        }else{
            fis.util.write(dest, fileInfo.content); 
        }
       
    });
}



/*module.exports = function (dest, file, content, settings, callback) {
    // 文件写入到 to 制定的目录时，判断是否为多余的图片，如果是多余的图片，则不写入
    console.log(dest.to)
    var to = dest.to,
        filename = file.toString(),
        relative = path.relative(root, filename);

    to = path.join(root, to);
    console.log(relative, to)
    var absolute = path.join(to, relative);
    fis.util.write(absolute, content, 'utf-8');
};*/

// 这句话一定要加上
module.exports.fullpack = true;
