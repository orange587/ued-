$(function() {
    //<!--首页轮播-->
    $('#owl-demo').owlCarousel({
        items: 1,
        navigation: true,
        navigationText: ["上一个", "下一个"],
        autoPlay: true,
        stopOnHover: true
    }).hover(function() {
        $('.owl-buttons').show();
    }, function() {
        $('.owl-buttons').hide();
    });
    // banner列表图片点击放大
    // 图片点击放大
    var img_index = 0;
    var img_src = "";
    $(function() {
        //计算居中位置
        var mg_top = ((parseInt($(window).height()) - parseInt($(".photo-div").height())) / 2);
        $(".photo-div").css({
            "margin-top": "" + mg_top + "px"
        });
        //关闭
        $(".photo-close").click(function() {
            $(".mask").hide();
            $(".photo-panel").hide();
        });
        //下一张
        $(".photo-panel .photo-div .arrow-next").click(function() {
            img_index++;
            if (img_index >= $(".a-img img").length) {
                img_index = 0;
            }
            img_src = $(".a-img img").eq(img_index).attr("src");
            photoView($(".a-img img"));
        });
        //上一张
        $(".photo-panel .photo-div .arrow-prv").click(function() {
            img_index--;
            if (img_index < 0) {
                img_index = $(".a-img img").length - 1;
            }
            img_src = $(".a-img img").eq(img_index).attr("src");
            photoView($(".a-img img"));
        });
        //如何调用？
        $(".a-img img").click(function() {
            $(".mask").show();
            $(".photo-panel").show();
            img_src = $(this).attr("src");
            img_index = $(this).index();
            photoView($(this));
        });

    });

    //自适应预览
    function photoView(obj) {
        if ($(obj).width() >= $(obj).height()) {
            $(".photo-panel .photo-div .photo-img .photo-view-h").attr("class", "photo-view-w");
            $(".photo-panel .photo-div .photo-img .photo-view-w img").attr("src", img_src);
        } else {
            $(".photo-panel .photo-div .photo-img .photo-view-w").attr("class", "photo-view-h");
            $(".photo-panel .photo-div .photo-img .photo-view-h img").attr("src", img_src);
        }
        //此处写调试日志
        // console.log(img_index);
    };
     
});