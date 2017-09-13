# USAGE
 ### 在header中引入样式文件"styles.css" 
``` html 
 <link rel="stylesheet" href="${basePath}/dist/styles.css?version=">
```
 ### 在body底部引入js 
``` html
<script type="text/javascript" src="${basePath}/dist/pagination.js?version="></script>
```
 ### 在最后启用 
``` javascript
var pagination = new Pagination(pageCount, page);
pagination.deploy("#pagination")
```