# aboutFis

### initPage
用于在fis中初始化一个 Page，生成 Page的基本结构，包括js，css引用，简单数据上报等。

===
### requireInHtml
场景：需求或视觉变更需要`删除页面中的某个模块时，开发通常都只删掉了html片段，对应的css没有处理`，根本原因是资源没有放在一起管理。
在html中把模块对应的html片段和css放在一起管理。

===
### widgetInHtml
使用 widget 方式加载 html 片段，由构建自动读取对应的 css 文件。这里以一种组件化的方式加载 html 和 css, 暂时不考虑 js。

```
<widget src="xxx/xxx/xxx.html">
```

===
### deleteUnusedImages
fis 产出时将没有被css 和 html 引用的图片干掉。这里没有考虑 js 里面拼接字符串引用的图片。
