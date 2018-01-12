<template>
    <div class="top_hui">
        <a href="javascript:;" id="hui"></a>
    </div>
</template>
<script>
    export default {
    name: 'TopFan',
    data(){
    return {
      
    }
    },
     created () {
         this.$nextTick(function() {
             this.fanding()
         })
      },  
     methods: {
     fanding(){
      let gotop = $("#hui");
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
     }
    }
    }
</script>

<style >
@import "../style/common.css"
</style>