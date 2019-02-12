(function($) {

 var selectboxeFfect = function(element, options){
   var settings = $.extend({}, $.fn.selectboxeffect.defaults, options); //초반 셋팅값 가져오기
     var vars = {
            currentSlide: 0,
			oldSlide: 0,
			startSlide: 0,
			countImage: 0,
            currentImage: '',
			totaltab: 0,	
			currenttab: 0,	
			arrawidth:0,
			arraheight:0,
			arrawidth2:0,
            totalSlides: 0,
            randAnim: '',
            running: false,
            paused: false,
            stop: false
        };

       var slider = $(element);		
	    //이미지사이즈
	
    


	slider.parent().append("<div class='select' tar='" + slider.attr("name") + "' style='float:" +  settings.sefloat + ";position: relative;width:" + settings.width + "px;height:" + settings.height + "px;margin-left:" + settings.marginleft + "px;margin-right:" + settings.marginright + "px;line-height:" + settings.height + "px;background-color:#FFFFFF;border:" + settings.border + ";background-image:url(" +  settings.backgroundimage  + ");background-position:right center;background-repeat:no-repeat;cursor:pointer;'></div>");
    $(".select[tar='" + slider.attr("name") + "']").append("<div class='itembox' tar='" + slider.attr("name") + "'  style='float: left;position: relative;width:" + settings.width + "px;height:" + settings.height + "px;cursor:pointer;'></div>");
	$(".itembox[tar='" + slider.attr("name") + "']").append("<div class='itemtitle' tar='" + slider.attr("name") + "'  style='float: left;position: relative;width:" + settings.width + "px;height:" + settings.height + "px;cursor:pointer;'></div>");
	$(".itembox[tar='" + slider.attr("name") + "']").append("<div class='itemlist' tar='" + slider.attr("name") + "'  style='float: left;position: absolute;width:" + settings.width + "px;height:auto;left:-1px;top:" + settings.height + "px;z-index:1;background-color:" + settings.listOverColor + ";line-height:" + settings.height + "px;cursor:pointer;display:none;border:" + settings.border + ";'></div>");
    slider.css({opacity: 0,width:'0px'})
   slider.find('option').each(function() {	 
         $(".itemlist[tar='" + slider.attr("name") + "']").append("<div  class='selectitem'  tar='" + slider.attr("name") + "'  style='float: left;position: relative;width:" + settings.width + "px;height:" + settings.height + "px;line-height:" + settings.height + "px;cursor:pointer;' sort='" + vars.totalSlides + "'><span>" + $(this).text() + "</span></div>")
			vars.totalSlides++;
   });    
   
    $(".itemtitle[tar='" + slider.attr("name") + "']").click(function(){
     $(".itemlist[tar='" + slider.attr("name") + "']").css({'z-index':10}).show();
   });

    $(".itemtitle[tar='" + slider.attr("name") + "']").append("<span>" + slider.find('option:selected').text() + "</span>");

   $(".itemlist[tar='" + slider.attr("name") + "']").hover(function(){},function(){
     $(this).css({'z-index':1}).hide();
   
   });
      
   $(".selectitem[tar='" + slider.attr("name") + "']").click(function(){
    //alert($(this).attr('sort'));
 	slider.find('option:eq(' + $(this).attr('sort') + ')').attr('selected', 'selected');
    $(".itemtitle[tar='" + slider.attr("name") + "']").empty().append($(this).html());
    $(".itemlist[tar='" + slider.attr("name") + "']").css({'z-index':1}).hide();
   });

   settings.afterLoad.call(this);
	return this;
	 };


  
 $.fn.selectboxeffect = function(options) {
    //데이터 로딩셋팅
        return this.each(function(key, value){
            var element = $(this);
			
			 selectboxeFfect($(element), options);
        });

	};

//Default settings
	$.fn.selectboxeffect.defaults = {
	    width: 300,
		height: 18,
		marginleft: 0,
		marginright: 0,
		sefloat: 'none',
		border: "1px #000000 solid",
		listOverColor : "#FFFFFF",
	    backgroundimage:"/images/arrow.gif",
		pauseOnHover: true,
		beforeChange: function(){},
		afterChange: function(){},
		slideshowEnd: function(){},
        lastSlide: function(){},
        afterLoad: function(){}
	};
	
	$.fn._reverse = [].reverse;

})(jQuery);


