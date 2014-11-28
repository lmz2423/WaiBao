/**
 * Created by creditease on 2014/11/19.
 */
var Index = {};
(function () {
    var pageWidth = window.innerWidth,
        pageHeight = window.innerHeight;

    var pages = document.querySelectorAll(".page");
    var peopleContain = document.querySelectorAll(".peopleContain");
    var mainContain = document.querySelector(".mainContain");
    var pepleDgree = 360/peopleContain.length;
    var pageDgree = 360 /4;

    /**
     * @description 设置 窗口大小*/
    Index.setPages = function () {
        var i = 0,
            pageslength = pages.length;

        for (i; i < pageslength; i += 1) {
            pages[i].style.width = pageWidth + 'px';
            pages[i].style.height = pageHeight + 'px';
        }
        mainContain.style.width = pageWidth + 'px';
        mainContain.style.height =pageHeight +'px';
    };

    //添加前缀
    Index.addPrefix = function (styleString) {
        if (styleString in document.documentElement.style) {
            return styleString;
        }

        var prefix = ['Moz', 'ms', 'o', 'webkit'];
        var length = prefix.length;
        for (var i = 0; i < length; i += 1) {
            prefix[i] = prefix[i] + styleString.substring(0, 1).toUpperCase() + styleString.substring(1);
            if (prefix[i] in document.documentElement.style) {
                return prefix[i];
            }
        }
    }
    Index.nav3D =function(){
        var transfom = this.addPrefix("Transform");
        var transformZ = Math.round((pageHeight/ 2) / Math.tan(Math.PI / peopleContain.length));
        for (var i = 0; i < peopleContain.length; i += 1) {
            peopleContain[i].style[transfom] = "rotateX(" + (-i * pepleDgree) + "deg)" + "translateZ(" + transformZ + "px)";
        }
        var transformX = Math.round((pageWidth/ 2) / Math.tan(Math.PI / 4));
        for(var i= 0,j=0;i<pages.length;i+=1){
            if(j%4===0){
                j=0;
            }
            pages[i].style[transfom] = "rotateY(" + (-j * pageDgree) + "deg)" + "translateZ(" + transformX + "px)";

            j++;
        }
    };
}());
Index.setPages();
Index.nav3D();