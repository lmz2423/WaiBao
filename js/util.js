/**
 * Created by luomingzhong on 2014/10/24.
 * @description 这个是基础工具类，用来与app交互的接口，如电话，登陆，注册，分享等
 * Utils工具庫
 */
var utils = (function () {
    'use strict';
    var utils = {},
        isAndroidOriPhone = false;
    /**
     * @description 判断是android设备还是 iPhone iPad设备,
     *   安卓设备isAndroidOriPhone 的值为false,反之为true.
     *
     * */


    var _isAndroidOriPhone = function () {
        var browserInformation = navigator.userAgent;
        if (browserInformation.indexOf('iPhone') >= 0 || browserInformation.indexOf("iPad") >= 0) {
            isAndroidOriPhone = true;
            return;
        }
        else if (browserInformation.indexOf('Android') >= 0) {
            isAndroidOriPhone = false;
            return;
        }
        isAndroidOriPhone = true;
        return;
    };


    /**
     * @description  调用app的登陆页面
     * @param {String} appSign  appSign 默认为宜人贷 appSign的值为"yrd","ydy"
     *
     */
    utils.login = function (appSign) {
        appSign = appSign || "yrd";

        //为宜人贷
        if (appSign === 'yrd') {
            if (isAndroidOriPhone) {
                var url = "creditease::login:";
                document.location = url;
            }
            else {
                yrd.login();
            }
        }
        //为宜定盈
        else if (appSign === "ydy") {
            if (isAndroidOriPhone) {
                url = "yidingying::login:";
                document.location = url;
            }
            else {
                yidingying.login();
            }
        }
    };

    /**
     * @description 调用app的注册页面
     * @param {String} appSign appSign 默认为宜人贷，appSign可填值为"yrd"，"ydy"
     */
    utils.register = function (appSign) {
        appSign = appSign || "yrd";

        //为宜人贷
        if (appSign === "yrd") {
            if (isAndroidOriPhone) {
                var url = "creditease::register:";
                document.location = url;
            }
            else
                yrd.register();
        }
        //为宜定盈
        else if (appSign === 'ydy') {
            if (isAndroidOriPhone) {
                url = "yidingying::register:";
                document.location = url;
            }
            else {
                yidingying.register();
            }
        }
    };
    /**
     * @description 调用app分享接口，传递分享的内容，为json格式的字符串。
     * @param appSign {String} appSign 默认为宜人贷，appSign可填值为"yrd"，"ydy"
     * @param jsonString {String} jsonString json格式的字符串
     */
    utils.shareInformation = function (appSign, jsonString) {
        appSign = appSign || 'yrd';

        //为宜人贷
        if (appSign === 'yrd') {
            if (isAndroidOriPhone) {
                var url = "creditease::share:" + jsonString;
                document.location = url;
            }
            else {
                yrd.share(jsonString);
            }
        }
        else if (appSign === "ydy") {
            if (isAndroidOriPhone) {
                url = "yidingying::share:" + jsonString;
                document.location = url;
            }
            else {
                yidingying.share(jsonString);
            }
        }
    };

    /**
     * description 该函数的作用是跳转到购买宜定盈app页面
     * @param appSign {String} appSign默认为宜人贷，appSign的可填写值为"yrd","ydy"
     */
    utils.buyProduct =function(appSign){
        appSign = appSign || 'yrd';
        //为宜人贷,不做处理
        if(appSign === 'yrd'){
            return;
        }
        else if(appSign === 'ydy') {
            if(isAndroidOriPhone){
                var url = "yidingying::buyProduct:";
                document.location = url;
            }
            else {
                yidingying.buyProduct();
            }
        }
    };


    /**
     * @description  调用系统的拨打电话的页面
     * @param e {eventObject} 事件对象，由于在android 的webview 有些webview无法打电话，为保证兼容性，添加此接口
     * @param appSign {String} appSign 默认为宜人贷，appSign可填值为"yrd"，"ydy"
     * @param phoneNumber {Strng} 电话号码。
     */
    utils.callPhone = function (e, appSign, phoneNumber) {
        appSign = appSign || 'yrd';

        //为宜人贷
        if (appSign === 'yrd') {
            //为iPhone手机，不做处理
            if (isAndroidOriPhone) {
                return;
            }
            else {
                e.preventDefault();
                yrd.call(phoneNumber);
            }
        }
        else if (appSign === 'ydy') {
            if (isAndroidOriPhone) {
                return;
            }
            else {
                e.preventDefault();
                yidingying.call(phoneNumber);
            }
        }
    };

    /**
     * @description 为某一个元素添加动画，基于animate.css动画庫
     * @param elementObject {Object} 元素节点对象
     * @param animationName {String}动画名称
     */
    utils.addAnimation = function (elementObject, animationName) {
        elementObject.classList.add("animated");
        elementObject.classList.add(animationName);
    };


    /**
     * @description 为某一个元素删除动画，基于animate.css动画庫
     * @param elementObject {Object} 元素节点对象
     * @param animationName {String} 动画名称
     */

    utils.removeAnimation = function (elementObject, animationName) {
        elementObject.classList.remove(animationName);
    };


    /**
     * @description 注册事件，可以同时注册n个事件,每个事件用空格分开
     * @param elementObject {Object}元素节点对象
     * @param eventType {String} 事件类型 eg "touchstart touchend ..." "click"
     * @param callfun {Function} 回调函数
     */
    utils.addEventsListen = function (elementObject, eventType, callfun) {
        if (arguments.length === 3) {

            var eventsArray = eventType.split(" "),
                eventsLength = eventsArray.length;
            for (var i = 0; i < eventsLength; i += 1) {
                elementObject.addEventListener(eventsArray[i], callfun);
            }
        }
        //抛出异常
        else {
            throw "the numbers of arguments is not three!Please three params!";
        }
    };

    /**
     * @description 获取浏览器的cookie
     * @param c_name {String} cookie的名字
     * @return 如果有cookie,那么返回cookie的值，如果没有，那么返回“”;
     * */
    utils.getCookie = function(c_name){
        var c_start = 0,
            c_end = 0;
        if (document.cookie.length > 0) {
            c_start = document.cookie.indexOf(c_name + "=");
            if (c_start !== -1)
                ;
            {
                c_start = c_start + c_name.length + 1;
                c_end = document.cookie.indexOf(";", c_start);
                if (c_end === -1)
                    c_end = document.cookie.length;
                return decodeURIComponent(document.cookie.substring(c_start, c_end));
            }
        }
        return "";
    };
    _isAndroidOriPhone();
    return utils;
}());



