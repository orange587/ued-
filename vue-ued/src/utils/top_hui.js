// JavaScript Document

  $(document).ready(function() {
    var gotop = $("#hui");
	gotop.hide();
    $(function() {
      $(window).scroll(function() {
        if ($(window).scrollTop() > 500) {
          gotop.fadeIn(300);
        } else {
          gotop.fadeOut(300);
        }
      });
      gotop.click(function() {
        $('body,html').animate({
          scrollTop: 0
        },
        600);
        return false;
      });
    });
  });