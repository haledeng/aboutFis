# html 片段和对应的 css 放在一起管理

### 需求背景
html 片段放在 html 文件中，对应的样式放在 css 文件中，产品需求变更或视觉调整需要删掉某一块时，开发 GG 通常都只删除了响应的 html 片段，他们才不会去 css 文件中找到对于那个的样式，把它干掉呢！
程序员就是这么傲娇。这样就存在了冗余的样式，归根结底的原因是：`你特么能把 html 和 css 放在一起么，一个 delete 键解决所有烦恼`

===
### 问题重点
1. html 的引入，fis 已经有现成的方案，直接 `link` 一下就可以了。

    ```<link rel="import" src="modules/test/widget/index.html?__inline" >```
    
2. 重点是如何解决 css 样式的引入问题。

===
### 解决方案
1. 通过 link inline到页面中，然后使用插件将 inline 的样式文件提取到 head 头里面。
    + 优点： 引入简单，通用
    + 缺点： 样式对应不到源文件，修改不方便。
2. 使用注释的命令字引入样式，在 postpackage 中读取对应的文件进行处理，这里既可以读取源文件将样式直接插入到 html 中，又可以通过 map 
    获取对应的 cdn 路径，以 link 方式引入。

    ```<!-- require(modules/test/widget/index.scss) -->```
