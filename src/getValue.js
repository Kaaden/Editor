function getCommod(e) {
    styleLink()
    let $dom = $(e)
    if ($dom) {
        menuInit($dom)
        editorInit($dom)
    }
}
//加载样式表
function styleLink() {
    let style = document.createElement('link');
    style.rel = 'stylesheet';
    style.href = "./styles.css";
    document.getElementsByTagName('HEAD').item(0).appendChild(style);
}

function $(_dom) {
    return new DomElement(_dom)
}
//封装dom
function DomElement(_dom) {
    if (_dom) {
        _dom = strTrim(_dom)
        let _len = _dom.includes("<") ? createElemByHTML(_dom) : findElemByHTML(_dom)
        if (_len.length) {
            for (let i = 0, len = _len.length; i < len; i++) {
                this[i] = _len[i]
            }
            this.length = _len.length
        }
    }
}
//去空格
function strTrim(_str) {
    return _str.replace(/\s+/g, "")
}
//根据 html 代码片段创建 dom 对象
function createElemByHTML(html) {
    var div = void 0;
    div = document.createElement('div');
    div.innerHTML = html;
    return div.children;
}
//查找dom节点
function findElemByHTML(html) {
    return document.querySelectorAll(html)
}
DomElement.prototype = {
    constructor: DomElement,
    attr: function attr(key, ele) {
        if (this.length && ele) {
            for (let i = 0, len = this.length; i < len; i++) {
                this[i].setAttribute(key, ele)
            }
        } else {
            return []
        }
    },
    appendHtml: function appendHtml($children) {
        for (let i = 0, len = this.length; i < len; i++) {
            for (let j = 0, leng = $children.length; j < leng; j++) {
                this[i].appendChild($children[j])
            }
        }
    },
    on: function on(type) {
        for (let i = 0, len = this.length; i < len; i++) {
            this[i].addEventListener(type, function () {
                console.log(1)
            })
        }
    },
    show: function show(e, child) {
        for (let i = 0, len = this.length; i < len; i++) {
            let dolist
            let item
            this[i].onmouseover = function () {
                
               
                dolist = $(e)
                item = $(child) || ""
                dolist.attr("style", "visibility:visible;")
                dolist.attr("style", "height:351px;")
                item && item.attr("style", "visibility:visible;")
                for (let i = 0, len = dolist[0].childNodes.length; i < len; i++) {
                    if (dolist[0].childNodes[i].tagName === "P") {
                        dolist[0].childNodes[i].setAttribute("id", i)
                        dolist[0].childNodes[i].onclick = function (e) {
                            
                            let text = $("#textArea")
                            console.log(text)
                            let p = $("<p></p>")
                            p[0].innerText = text[0].innerText
                            p = fontSize(e.target.id, p)
                            text[0].innerText = ""
                            text.appendHtml(p)
                        }
                    }
                }
            }
            this[i].onmouseout = function () {
                dolist = $(e)
                item = $(child) || ""
                dolist.attr("style", "visibility:hidden;")
                item && item.attr("style", "visibility:hidden;")
            }
        }
    }
}
//初始化menu
function menuInit($dom) {
    let $topMenu = $("<div></div>")
    let $fontsize = $("<i></i>")
    let $weight = $("<i></i>")

    $topMenu.attr('class', "menu");
    $weight.attr("class", "icon icon-jiacu1")
    $fontsize.attr("class", "icon icon-ziti")
    $fontsize.attr("style", "position:relative")
    menuItem($fontsize)

    $topMenu.appendHtml($fontsize)
    $topMenu.appendHtml($weight)
    $dom.appendHtml($topMenu)
}
// 初始化editor面板
function editorInit($dom) {
    let $editor = $("<div></div>")
    let $textElem = $("<div></div>")
    $textElem.attr('contenteditable', 'true')
    $textElem.attr("id", "textArea")
    $textElem.attr('class', 'textarea');
    $editor.attr('class', 'editor');

    $editor.appendHtml($textElem)
    $dom.appendHtml($editor);
}
//menu
function menuItem(main) {
    let $menuList = $("<div><span>字号</span><p>x-small</p><p>small</p><p>normal</p><p>large</p><p>x-large</p><p>xx-large</p></div>")
    $menuList.attr("id", "fontmenu")
    $menuList.attr("style", "visibility:hidden;")
    $menuList.attr("class", "menuItem")

    let $trian = $("<i></i>")
    $trian.attr("class", "triangle_border_up")
    $trian.attr("id", "trian")
    $trian.attr("style", "visibility:hidden;")
    main.appendHtml($trian)

    main.appendHtml($menuList)




    main.show("#fontmenu", "#trian")
}

function fontSize(type, dom) {
    switch (Number(type)) {
        case 1:
            dom.attr("style", "font-size:14px;")
            break;
        case 2:
            dom.attr("style", "font-size:18px;")
            break;
        case 3:
            dom.attr("style", "font-size:22px;")
            break;
        case 4:
            dom.attr("style", "font-size:26px;")
            break;
        case 5:
            dom.attr("style", "font-size:30px;")
            break;
        case 6:
            dom.attr("style", "font-size:32px;")
            break;
    }
    return dom
}