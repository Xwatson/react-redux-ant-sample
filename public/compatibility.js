(function() {
    var userAgent = navigator.userAgent
    var isIE = userAgent.indexOf('compatible') > -1 && userAgent.indexOf('MSIE') > -1 // 判断是否IE浏览器
    if (isIE) {
        var reIE = new RegExp('MSIE (\\d+\\.\\d+);')
        reIE.test(userAgent)
        var fIEVersion = parseFloat(RegExp['$1']) // IE版本
        if (fIEVersion < 9) {
            window.onload = function() {
                document.body.innerHTML = '<div style="font-size: 18px;width: 500px;margin: 0 auto;margin-top: 10%;text-align:center; position: relative;">' +
                    '<p class="glyphicon glyphicon-warning-sign" style="font-size: 30px;float: left;color: gray;margin:10px 20px 0 0;"></p>' +
                    '<p style="line-height: 27px">您的IE浏览器版本过低请升级至<a href="https://support.microsoft.com/zh-cn/help/17621/internet-explorer-downloads">IE9</a>（包含）以上，<br/>' +
                    '或使用<a href="http://rj.baidu.com/soft/detail/14744.html">chrome(谷歌)</a>，<a href="http://www.firefox.com.cn/">firefox(火狐)</a>浏览器访问本系统。</p>' +
                    '</div>'
            }
        }
    }
})()
