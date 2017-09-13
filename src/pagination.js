require('./pagination.css')
/**
 * 分页对象
 * @param pCount 页数
 * @param page 当前页
 * */
function Pagination(pCount, page) {
    // 分页的分页大小
    this.pPSize = 5;
//        this.total = total;
//        this.pSize = pSize;
    this.page = page ? page : 1;
    // 页数
//        this.pCount = total % pSize !== 0 ? Math.floor(total / pSize) + 1 : total / pSize;
    this.pCount = pCount < 1 ? 1 : pCount;
    // 分页的页数
    this.pPCount = this.pCount % this.pPSize !== 0 ? Math.floor(this.pCount / this.pPSize) + 1 : this.pCount / this.pPSize;
    // 当前的分页页码
    this.pPage = Math.floor((this.page - 0) / this.pPSize) + 1;
}

Pagination.prototype = {
    constructor: Pagination,
    container: "<ul class='pagination'></ul>",
    previous: "<li>\n" +
    "      <a href=\"javascript: void\" aria-label=\"Previous\" class='previous'>\n" +
    "        <span aria-hidden=\"true\" class='iconfont'>&#xe600;</span>\n" +
    "      </a>\n" +
    "    </li>",
    next: "<li>\n" +
    "      <a href=\"javascript: void\" aria-label=\"Next\" class='next'>\n" +
    "        <span aria-hidden=\"true\" class='iconfont'>&#xe601;</span>\n" +
    "      </a>\n" +
    "    </li>",
    number: function (n) {
        var current = n === this.page ? "current" : "";
        return "<li><a href=\"javascript: void\" aria-label=\"Page\" class='page " + current + "'>" + n + "</a></li>\n";
    },
    ellipsis: function () {
        return "<li><span>...</span></li>\n"
    },
    /**
     * 创建页数链接
     * */
    createNumberPage: function () {
        var nav = this.number(1);
        var min = this.page - Math.floor(this.pPSize / 2);
        var max = this.page + Math.floor(this.pPSize / 2);
        if (min < 0 || this.pPage === 1) {
            min = 2;
        }
        if (this.pPage === 1) {
            max = this.pPSize;
        }
        if (max > this.pCount || this.pPage === this.pPCount) {
            max = this.pCount;
        }
        // 不是第一页前插省略号
        if (this.pPage !== 1) {
            nav += this.ellipsis();
        }
        for (var i = min; i <= max; i++) {
            nav += this.number(i);
        }
        // 如果不是最后一页后补省略号
        if (this.pPage !== this.pPCount && this.pCount !== 1) {
            nav += this.ellipsis();
        }
        return nav;
    },
    /**
     * 部署分页到容器
     * @param target jquery 选择器或dom
     * */
    deploy: function (target) {
        var pageNav = $(this.container).append(this.previous).append(this.createNumberPage()).append(this.next);
        $(target).append(pageNav)
            .delegate(".previous", "click", function (event) {
                var page = this.page - 1;
                this.go(page);
            }.bind(this))
            .delegate(".next", "click", function () {
                var page = this.page + 1;
                if (page > this.pCount) {
                    page = this.pCount;
                }
                this.go(page);
            }.bind(this))
            .delegate(".page", "click", function (event) {
                var page = +$(event.target).text();
                this.go(page);
            }.bind(this));
    },
    go: function (page) {
        if (page < 1 || page > this.pCount || page === this.page) {
            return;
        }
        var url = window.location.href;
        var regx = /page=(\d)+/;
        if (url.match(regx)) {
            url = url.replace(regx, "page=" + page);
        } else {
            regx = /\?/;
            if (url.match(regx)) {
                url = url.replace(regx, "?page=" + page);
            } else {
                url += "?page=" + page;
            }
        }
        window.location.href = url;
    }
};
window.Pagination = Pagination;

export {Pagination};
