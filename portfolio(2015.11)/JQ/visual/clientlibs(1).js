/**
 *
 * Javascript Library
 *
 **/
// Firing up Functions
$(function() {

	// filename 갖고 오기
	APFEJ.fileName();

	// PC 버전 상단 검색 버튼 클릭시 입력창 노출
	if ( $("#srcButton").length ) APFEJ.srcButton();

	// 서브 페이지 2뎁스-3뎁스
	if ( $("#btn2depth").length ) APFEJ.subMenu();

    // 서브 페이지 2뎁스-3뎁스
	if ( $("#btn3depth").length ) APFEJ.subMenu();


	// 세로형 텝메뉴
	if ( $(".vTabWrap a").length ) APFEJ.tabMenuVertical();

	// 가로형 텝메뉴 // 가로형 텝메뉴
	if ( $(".hTabWrap").length ) APFEJ.tabMenuHorizontal();

	// 왼쪽 텝메뉴가 있을때
	if ( $("#lnb .tabMenu").length && getParameterByName('tid', -1) === -1) {
		APFEJ.tabMenuLeft();
	}

	// 왼쪽 엥커가 있을때
	if ( $("#lnb .tabAnchor").length ) APFEJ.tabAnchorLeft();

	//아코디언
    if (getParameterByName('aid', -1) === -1) APFEJ.accordion();

	//이미지 슬라이더
	if ( $('.slider').length ) APFEJ.imageSlider();

	//textarea 클릭시 글씨 없애기
	//if ( $(".refresh").length ) APFEJ.removeText();

	// 글로벌맵 이미지 온오프
	if ( $('.globalMap').length ) APFEJ.globalMap();

    // btnDownload 클릭
    if ( $('a.btnDownload').length ) APFEJ.btnDown();

	//방문판매 지도
	if ( $('#mapSelect').length ) APFEJ.mapSelection();

	// ie8용 메인네비게이션 메뉴 위치
	if ( $('.ie8').length ) APFEJ.ie8MenuPos();

	// footer 매장찾기
	if ( $('.toggleTrigger').length ) APFEJ.storeLocations();
	
	// 알럿 후 포커스
	if ( $('.alert').length ) APFEJ.alertFocus();
});

$(window).load(function() {

	// 상단 메뉴 네비게이션
	if ( $('#visual').length ) {
		APFEJ.mainNavigation();
	}

});

// Global Variable Definition
// Amore Pacific Front End Javascript
var APFEJ = {};


(function(window, NS) {

	// 알럿 후 포커스
	NS.alertFocus = function(){
		$("a.alert").click(function(){
			alert('서비스 준비 중입니다.');
			$(this).focus();
			return false;
		});
	}

	// filename 갖고 오기
	NS.fileName = function() {
		var url = $.url();
		var fn = $.url("filename");
	};

	// PC 버전 상단 검색 버튼 클릭시 입력창 노출
	NS.srcButton = function() {
		var tempText = $("#srcButton span").html(),
			tempTextNew = "검색 상자 닫기";
		$("#srcButton").toggle(
			// jss : 검색 
			function(){ $(".srcBox").fadeIn("slow"); $(this).addClass("toggle").find("span").html(tempTextNew); },
			function(){ $(".srcBox").fadeOut("slow"); $(this).removeClass("toggle").find("span").html(tempText);  }
		);
	};

	// 서브 페이지 2뎁스-3뎁스
	NS.subMenu = function() {
        $("#btn2depth").toggle(
            function(){
				$("#btn3depth").siblings().fadeOut();

                $(this).siblings().fadeIn();
                //$(this).attr("title","2단계 메뉴 닫기");
                $(this).find('span').text("메뉴 목록 닫기").addClass('on');
            },
            function(){
                $(this).siblings().fadeOut();
                //$(this).attr("title","2단계 메뉴 열기");
                $(this).find('span').text("메뉴 목록 열기").removeClass('on');
            }
        );
        $("#btn3depth").toggle(
            function(){
				$("#btn2depth").siblings().fadeOut();

                $(this).siblings().fadeIn();
                //$(this).attr("title","3단계 메뉴 닫기");
                $(this).find('span').text("메뉴 목록 닫기").addClass('on');
            },
            function(){
                $(this).siblings().fadeOut();
                //$(this).attr("title","3단계 메뉴 열기");
                $(this).find('span').text("메뉴 목록 열기").removeClass('on');
            }
        );
        $("#wrapper").click(function(){
            if ($("#directMenu").find("ul").css("display")=="block")
            {
                $("#btn2depth").click();
            }
        });
    };

	// 세로형 텝메뉴
    NS.tabMenuVertical = function (){
        var init = function() {
            var vTabWrapHeight = $(".vTabWrap dd:eq(0)").height();
            if (vTabWrapHeight > 170) {
                $(".vTabWrap").css("height", vTabWrapHeight);
            } else {
                $(".vTabWrap").css("height", "170px");
            }
        };
        init();

        $(".vTabWrap a").click(function(){
            $(this).parent().parent().addClass("hover").siblings().removeClass("hover");
            var vTabWrapHeight = $(this).parent().next().height();
            if (vTabWrapHeight > 170) {
                $(this).parents('.vTabWrap').css("height", vTabWrapHeight);
            } else {
                $(this).parents('.vTabWrap').css("height", "170px");
            }
        });
	};

	// 가로형 텝메뉴 // 가로형 텝메뉴
	NS.tabMenuHorizontal = function() {
        var conWidth =$(".con").width()
        conWidth2 = $(".hTabWrap").width()
        $(".con").css("width",conWidth2)
        $(".hTabWrap .tab").click(function(){
            $(this).parent().addClass("hover").siblings().removeClass("hover");
        });
        //$(".srcResult .hTabWrap").find("li").css("height", $(".hTabWrap").height()); // 상세 검색 텝버튼 RWD 자동 높이
        $(window).resize(function(){
            conWidth2 = $(".hTabWrap").width()
            $(".con").css("width",conWidth2)
	    // 주석처리 2014-02-06 je
            //if ($(window).width() < 767)
            //{
                //$(".srcResult .hTabWrap").find("li").css("height", $(".hTabWrap").height()); // 상세 검색 텝버튼 RWD 자동 높이
            //} else {
                //$(".srcResult .hTabWrap").find("li").css("height", "31px");
            //}
        });
        // adding class 'last' to last LI children a.tab element
        $('.hTabWrap').each(function() {
            var lastLIElem = $(this).children('ul').children('li').last();
            lastLIElem.children('a.tab').addClass('last');
        });
	};

	// 왼쪽 앵커메뉴가 있을때
	NS.tabAnchorLeft = function () {
		if ($("#lnb > .tabAnchor")) {
			if(!$(".tabAnchor li").length){
				return;
			};
			$(".tabAnchor li:first a").addClass("hover");
			$(".tabAnchor li a").bind("click", function(){
				$('.tabAnchor li a').removeClass('hover');
				$(this).addClass('hover');
			});
		}
	};

	 /* 아코디언 검색 관련 함수 */
    // 왼쪽 텝메뉴가 있을때
    NS.tabMenuLeft = function(tabIndex) {
    	var agt = navigator.userAgent.toLowerCase();
        var tabid,
            initTabMenu = $(".tabMenu li:first a"),
            initTabCont = $(".tabCont:first");

        if ($("#lnb > .tabMenu")) {
            if(!$(".tabMenu li").length || tabIndex == 0){ //탭이 없는 경우 tabIndex에 0을 줘서 경우 함수 종료 시킴
                return;
            }
            if (tabIndex) {
                $(".tabMenu li a").each(function() {
                    if ($(this).attr('tabidx') === tabIndex) {
                        initTabMenu = $(this);
                        initTabCont = $($(this).attr('href'));
                    }
                });
            }
            $(".tabCont").hide();
            $('.tabMenu li a').removeClass('hover');
            initTabMenu.addClass("hover");
            initTabCont.show();
            $(".tabMenu li a").bind("click", function(e){
                e.preventDefault();
                $('.tabMenu li a').removeClass('hover');
                $(this).addClass('hover');
                tabid = $(this).attr('href');
                $('.tabCont').hide();
                $(tabid).show();
                if (agt.indexOf("msie")){
	                $('.gMap').each(function(i,values){
						window.frames[i].initialize();
	                });
                }
            });
        }
    };

    //아코디언
    NS.accordion = function(listIndex) {
        var thisListWrap,
            thisList;

        if (listIndex == 0) { //아코디언이 없는 listIndex에 0을 줘서 경우 함수 종료 시킴
            return;
        }

        if (listIndex) { //listIndex가 있을 경우

            if (isNaN(listIndex) === false) { //게시판 형태가 아닐 경우 index로 처리
                thisList = $('a.q').eq(listIndex);
            } else { //게시판 형태일 경우 idx 값을 받아서 처리(문자일경우)

                if ($('.accordion').length > 1) {
                    thisListWrap = $('.tabCont:visible a.q');
                } else {
					thisListWrap = $('a.q');
                }

                thisListWrap.each(function() {
                    if ($(this).attr("idx") === listIndex) {
                        thisList = $(this);
						if (typeof window.console != 'undefined' && typeof window.console.log != 'undefined') {
							console.log($(this).attr('idx'));
						}
                    }
                });

            }
            if (thisList != undefined) {
	            thisList.find(".arrow").attr("title","자세히 보기 닫기");
	            thisList.addClass("virtual").parent().find("div.grayBox").slideDown(function(){
	                if (thisList.parent().siblings().find("a").hasClass("virtual")){
	                    thisList.parent().siblings().find("div.grayBox").hide();
	                    thisList.parent().siblings().find("a").removeClass("virtual").find(".arrow").attr("title","자세히 보기");
	                }
	            });
        	}
        }
        // 첫번째 콘텐츠 열어두기 // 글로벌경영
        $("a.q").live({
            click: function(){//trackClicksEx("Accordion Tab");
                if ($(this).hasClass("virtual")){ // 이미 열려 있는 경우
                    $(this).siblings().find(".arrow").attr("title","자세히 보기 ");
                    $(this).removeClass("virtual").parent().find("div.grayBox").slideUp(function(){
                        $(this).siblings().find(".arrow").attr("title","자세히 보기 ");
                    }); // 닫고
                } else {  // 새로 여는 경우
                    $(this).find(".arrow").attr("title","자세히 보기 닫기");
                    $(this).addClass("virtual").parent().find("div.grayBox").slideDown(function(){
                        if ($(this).parent().siblings().find("a").hasClass("virtual")){
                            $(this).parent().siblings().find("div.grayBox").slideUp();
                            $(this).parent().siblings().find("a").removeClass("virtual").find(".arrow").attr("title","자세히 보기");
                        }
                    });
                }
            }
        });
    };

    //글로벌 경영 아코디언 및 좌측메뉴 컨트롤
    NS.accordionCtrl = function(listIndex, tabIndex) { //함수 호출 시 APFEJ.accordionCtrl( , )
    	NS.tabMenuLeft(tabIndex);
        NS.accordion(listIndex);
    };
    /* //아코디언 검색 관련 함수 */

	//이미지 슬라이더
	NS.imageSlider = function() {
		var sliderWrap = $('.slider');
		sliderWrap.each(function() {
			var slider = $(this)
				, item = slider.find('.slides > li')
				, indicator = slider.find('.sliderPaging').find('a')
				, btnPrev = slider.find('.btnArrowL-1')
				, btnNext = slider.find('.btnArrowR-1')
				, currentIdx = 0
				, lastIdx = item.length - 1;
			showIndicator();
			// binding
			btnPrev.on({
				click : function() {
					currentIdx -= 1;
					if ( currentIdx < 0 ) currentIdx = lastIdx;
					itemChange();
					return false;
				}
			});
			btnNext.on({
				click : function() {
					currentIdx += 1;
					if ( currentIdx > lastIdx ) currentIdx = 0;
					itemChange();
					return false;
				}
			});
			indicator.each(function(i) {
				$(this).on({
					click : function() {
						currentIdx = i;
						itemChange();
						return false;
					}

				});
			});
			function itemChange() {
				item.hide();
				item.eq(currentIdx).fadeIn(200);
				showIndicator();
			}
			function showIndicator() {
				indicator.removeClass('hover');
				indicator.eq(currentIdx).addClass('hover');
			}
		});
	};

	//textarea 클릭시 글씨 없애기
	NS.removeText = function() {
        $(".refresh").bind("click focus" , function(){
            $(this).text("");
        });
	};

    // btnDownload 클릭
    NS.btnDown = function() {
        clickNfocus('a.btnDownload');

        function clickNfocus(o) {
            if ( typeof o != 'string' ) return false;

            var _Trigger = $(o);

            _Trigger.each(function() {
                $(this).on({
                    'click focusin' : function() {
                        _Trigger.removeClass('active');
                        $(this).addClass('active');
                    }
                    , 'focusout' : function() {
                        $(this).removeClass('active');
                    }
                });
            });
        }
    };

	// 글로벌맵 이미지 온오프
	NS.globalMap = function() {
        var globalMap = $('.globalMap')
            , trigger = globalMap.children('a');

        trigger.each(function() {
            var thisImage = $(this).children('img');

            $(this).on({
                "mouseenter focusin" : function() {
                    thisImage.attr({
                        'src' : thisImage.attr('src').replace('_off','_on')
                    });
                }
                , "mouseleave focusout" : function() {
                    thisImage.attr({
                        'src' : thisImage.attr('src').replace('_on','_off')
                    });
                }
            });
        });
	};

	//방문판매 지도
	NS.mapSelection = function() {
		// definite Vars
		var _MapSelect = $('#mapSelect')
			, _MapArea = $('#mapArea')
			, _MapTrigger = _MapArea.find('a.pin')
			, _ProvinceWrap = $('#provinceWrap')
			, _Province = _ProvinceWrap.find('.province')
			, _ProvinceTrigger = _Province.children('ul').children('li').filter(function() {
					if ( $(this).is(":first-child") ) return $(this);
				}).find('a')
			, _ProvinceCloser = _ProvinceWrap.find('.btnClose')
			, _SelectWrap = $('#selectWrap');

		_MapTrigger.each(function() {
			var _This = $(this)
				, _ThisProvince = $(_This.attr('href'));

			_This.on({
				click : function() {

					if ( _ProvinceWrap.is(':hidden') ) {
						_SelectWrap.hide();
						_ProvinceWrap.show();
					}

					_MapTrigger.removeClass('active');
					_This.addClass('active');
					_Province.hide();
					_ThisProvince.show();

					return false;
				}
				, 'keydown keypress' :  function(e) {
					if ( e.keyCode === 9 && !e.shiftKey ) {
						if ( _ThisProvince.is(':visible') ) {
							_ProvinceWrap.focus();
						}
					}
				}
			});
		});

		_ProvinceCloser.on({
			click : function() {
				_ProvinceWrap.hide();
				_SelectWrap.show();
				_MapTrigger.filter('.active').focus();
				_MapTrigger.removeClass('active');
			}
		});

		_ProvinceTrigger.each(function() {

			var _This = $(this).parents('.province');

			$(this).on({
				'keydown keypress' :  function(e) {
					if ( e.keyCode === 9 && e.shiftKey ) {
						e.preventDefault();
						_MapTrigger.filter('.active').focus();
					}
				}
			});
		});
	}

	// ie8용 메인네비게이션 메뉴 위치
	NS.ie8MenuPos = function() {
		$('.ie8 #dep0204 ul li').each(function() {
		    var nList = $(this).index();
		    if (nList == 1) {
		        $(this).css({top : '38%'});
		    } else if (nList == 2) {
		        $(this).css({top : '67%'});
		    } else if (nList == 3) {
		        $(this).css({left : 255});
		    } else if (nList == 4) {
		        $(this).css({top : '30%', left : 255});
		    } else if (nList == 5) {
		        $(this).css({top : '60%', left : 255});
		    }
		});
		$('.ie8 #dep0205 ul li').each(function() {
		    var nList = $(this).index();
		    if (nList == 1) {
		        $(this).css({top : '13%'});
		    } else if (nList == 2) {
		        $(this).css({top : '33%'});
		    } else if (nList == 3) {
		        $(this).css({top : '53%'});
		    } else if (nList == 4) {
		        $(this).css({top : '78%'});
		    } else if (nList == 5) {
		        $(this).css({left : 255});
		    }
		});
	};

	// footer 매장찾기
	NS.storeLocations = function() {
		if ( $('.toggleTrigger').length ) slideToggleFunc();
	};

	function slideToggleFunc() {
		var _Trigger = $('.toggleTrigger')
			, _Target = $('.toggleTarget');

		_Target.hide().removeClass('active').attr('data-open','false');

		_Trigger.each(function() {
			var _ThisTarget = $(this).next('.toggleTarget')
				, _StatusText = $(this).find('.alternative');

			$(this).on({
				click : function() {
					var _Status = _ThisTarget.attr('data-open');
					if ( _Status == 'false' ) {
						$(this).addClass('active');
						_StatusText.text('메뉴닫기');
						_ThisTarget.slideDown(150, function() {
							_ThisTarget.attr('data-open','true');
						});
					} else {
						$(this).removeClass('active');
						_StatusText.text('메뉴보기');
						_ThisTarget.removeClass('active').slideUp(150, function() {
							_ThisTarget.attr('data-open','false');
						});
					}
				}
			});
		});
	}
	
	// Navigation for Main
	NS.mainNavigation = function(depth1, depth2) {

		var _IsIE8 = $('html').hasClass('ie8')
			, _Event = detectOrientation()
			, _GnbWrapper = $('#nav')
			, _GnbWSubWrapper = $('#visual .navwrap > div')
			, _GnbMobileTrigger = $('#mobileNav')
			, _DesktopSize = 1024
			, _Viewport = viewport().width
			, _Args = arguments
			, _Depth1 = _Args.length ? _Args[0] : null
			, _Depth2 = _Args.length > 1 ? _Args[1] : null
			, _NextBtn = $('.indexSlider > a.btnRight')
			, _PrevBtn = $('.indexSlider > a.btnLeft')
			, _Indicator = $('.indexSlider > .indicator > a')
			, _AllEvents = 'click mouseenter mouseleave focusin focusout keydown'
			, _IndexSliderWrapper = $('.indexSlider')
			, slider = $('.indexSlider')
			, item = slider.find('.slides > li')
			, indicator = slider.find('.sliderPaging').find('a')
			, btnPrev = slider.find('.btnLeft')
			, btnNext = slider.find('.btnRight')
			, _BrandTrigger = $('#dep0202').find('a') // 2014-02-10
			, currentIdx = 0
			, lastIdx = item.length - 1
			, autoRoll = true
			, setTimer = null
			, rollTimer = null
			, nowPlaying = false
			, rollDelay = 4000
			, oldWidth = viewport().width
			, IsAnimating = false;

		DoRoll();
		showIndicator();
		setDepth1ColorClass();

		item.each(function() {
			$(this).css({
				position : 'relative'
				, left : 0
				, top : 0
				, zIndex : 4
			});
		});

		// binding
		btnPrev.on({
			click : function() {
				if ( !IsAnimating ) {
					IsAnimating = true;
					clearTimeout(setTimer);
					clearInterval(rollTimer);
					rollTimer = null;
					setTimer = null;
					nowPlaying = false;

					rollingReverse();
				}

				return false;
			}
			, 'focusin mouseenter' : function() {
				clearTimeout(setTimer);
				clearInterval(rollTimer);
				rollTimer = null;
				setTimer = null;
				nowPlaying = false;
			}
			, 'focusout mouseleave' : function() {
				clearTimeout(setTimer);
				clearInterval(rollTimer);
				rollTimer = null;
				setTimer = null;
				nowPlaying = false;

				DoRoll(true);
			}
		});

		btnNext.on({
			click : function() {
				if ( !IsAnimating ) {
					IsAnimating = true;
					clearTimeout(setTimer);
					clearInterval(rollTimer);
					rollTimer = null;
					setTimer = null;
					nowPlaying = false;

					rolling();
				}

				return false;
			}
			, 'focusin mouseenter' : function() {
					clearTimeout(setTimer);
					clearInterval(rollTimer);
					rollTimer = null;
					setTimer = null;
					nowPlaying = false;
			}
			, 'focusout mouseleave' : function() {
				clearTimeout(setTimer);
				clearInterval(rollTimer);
				rollTimer = null;
				setTimer = null;
				nowPlaying = false;

				DoRoll(true);
			}
		});

		indicator.each(function(i) {
			$(this).on({
				click : function() {
					if ( !IsAnimating ) {
						IsAnimating = true;
						clearTimeout(setTimer);
						clearInterval(rollTimer);
						rollTimer = null;
						setTimer = null;
						nowPlaying = false;

						currentIdx = i;
						itemChange();
					}

					return false;
				}
				, 'focusin mouseenter' : function() {
					clearTimeout(setTimer);
					clearInterval(rollTimer);
					rollTimer = null;
					setTimer = null;
					nowPlaying = false;
				}
				, 'focusout mouseleave' : function() {
					clearTimeout(setTimer);
					clearInterval(rollTimer);
					rollTimer = null;
					setTimer = null;
					nowPlaying = false;

					DoRoll(true);
				}

			});
		});

		indicator.last().on({
			keydown : function(e) {
				if( !e.shiftKey && e.keyCode === 9) {
					clearTimeout(setTimer);
					clearInterval(rollTimer);
					rollTimer = null;
					setTimer = null;
					nowPlaying = false;

					DoRoll(true);
				}
			}
		});

		function DoRoll(check) {
			nowPlaying = true;
			if ( rollTimer ) rollTimer;
			if ( check ) {
				rollTimer = setInterval(rolling, rollDelay);
			} else {
				rollTimer = setInterval(rolling, rollDelay);
			}
		}

		function rolling() {
			currentIdx += 1;
			if ( currentIdx > lastIdx ) currentIdx = 0;
			itemChange();
		}

		function rollingReverse() {
			currentIdx -= 1;
			if ( currentIdx < 0 ) currentIdx = lastIdx;
			itemChange();
		}

		function itemChange() {
			item.eq(currentIdx).css({
				position : 'absolute'
				, zIndex : 5
			}).fadeIn(800, function() {
				item.not($(this)).hide();
				$(this).css({
					position : 'relative'
					, zIndex : 4
				});
				IsAnimating = false;
			});
			showIndicator();
			setDepth1ColorClass();
		}
		function showIndicator() {
			indicator.removeClass('hover');
			indicator.eq(currentIdx).addClass('hover');
		}

		function setDepth1ColorClass() {
			var navWrap = _GnbWrapper.children('.navwrap')
				, depth1Trigger = navWrap.find('a.dep01')

			//console.log(currentIdx);

			removeDepth1ColorClass();

			depth1Trigger.addClass('RollColor'+ currentIdx);

		}

		function removeDepth1ColorClass() {
			var navWrap = _GnbWrapper.children('.navwrap')
				, depth1Trigger = navWrap.find('a.dep01')

			for ( var i = 0; i < depth1Trigger.length; i++ ) {
				depth1Trigger.removeClass('RollColor'+i);
			}
		}

		_DetectingStatus(_Viewport);

		// Check IE8
		if ( _IsIE8 || !_isMobile() ) {
			$(window).resize(function() {
				_Viewport = viewport().width;

				if ( oldWidth !== _Viewport ) {
					_DetectingStatus(_Viewport);
					oldWidth = _Viewport;
				}
			});
		} else {
			window.addEventListener(_Event, function() {
				_Viewport = viewport().width;
				_DetectingStatus(_Viewport);
			}, false);
		}

		// SliderHeight
		function SliderHeight() {
			return item.first().height() - 40;
		}

		// DetectStatus
		function _DetectingStatus(wWidth) {

			_GnbWrapper.find('a').off(_AllEvents);
			_GnbWrapper.off(_AllEvents);
			$("#srcBoxBtn").off(_AllEvents);
			$('#srcBoxBtn #srcButtonM').removeClass('toggle').off(_AllEvents);

			$("#srcBoxBtn").hide().attr('data-status','close');

			if ( wWidth >= _DesktopSize ) {
				_GnbWrapperHeight();
				_DesktopBinding();
			} else {
				_MobileBinding();
			}
		}

		// PositionGnbWrapper
		function _GnbWrapperHeight() {
			_GnbWSubWrapper.height(SliderHeight());
		}

		// Desktop
		function _DesktopBinding(posLeft) {

			var _NavWrap = _GnbWrapper.children('.navwrap')
				, _Depth1Trigger = _NavWrap.find('a.dep01')
				, _Depth2Wrapper = _NavWrap.children('div')
				, _FirstTrigger = _Depth1Trigger.first()
				, _bynum = $("#btn_bynum")		//jss : 메인 by Numbers 버튼 
				, _snsMenu = $("#snsMenu")		//jss : SNS메뉴
				, _LastTrigger = _NavWrap.find('a').last();

			_DesktopInit();

			// jss : 메인 by Numbers 버튼 보이기 
			_bynum.css('display','block');
			// jss : SNS메뉴 보이기 
			_snsMenu.css('display','block')

			_Depth1Trigger.each(function() {
				var _ThisDepth2Wrapper = $(this).next('div');

				if ( _isMobile() ) {
					$(this).off().on({
						touchstart : function() {
							_Depth2Wrapper.hide();
							_ThisDepth2Wrapper.show();
							_Depth1Trigger.removeClass('hover');
							$(this).addClass('hover');

							_GnbWrapper.height(SliderHeight()+40);

							clearTimeout(setTimer);
							clearInterval(rollTimer);
							rollTimer = null;
							setTimer = null;
							nowPlaying = false;
						}
					});
				} else {
					$(this).off().on({
						mouseenter : function() {
							_Depth2Wrapper.hide();
							_ThisDepth2Wrapper.show();
							_Depth1Trigger.removeClass('hover');
							$(this).addClass('hover');

							_GnbWrapper.height(SliderHeight()+40);

							clearTimeout(setTimer);
							clearInterval(rollTimer);
							rollTimer = null;
							setTimer = null;
							nowPlaying = false;
						}
						, focus : function() {
							_Depth2Wrapper.hide();
							_ThisDepth2Wrapper.show();
							_Depth1Trigger.removeClass('hover');
							$(this).addClass('hover');

							_GnbWrapper.height(SliderHeight()+40);

							clearTimeout(setTimer);
							clearInterval(rollTimer);
							rollTimer = null;
							setTimer = null;
							nowPlaying = false;
						}
						/*, click : function() {
							$(this).blur();
						}*/ // 2014-02-12 삭제
					});
				}
			});

			_GnbWrapper.off().on({
				mouseleave : function() {
					_MenuHide();

					clearTimeout(setTimer);
					clearInterval(rollTimer);
					rollTimer = null;
					setTimer = null;
					nowPlaying = false;

					DoRoll();
				}
			});

			// _FirstTrigger focus
			_FirstTrigger.on({
				focusin : function() {
					clearTimeout(setTimer);
					clearInterval(rollTimer);
					rollTimer = null;
					setTimer = null;
					nowPlaying = false;
				}
				, keydown : function(e) {
					if( e.shiftKey && e.keyCode === 9) {
						_MenuHide();

						clearTimeout(setTimer);
						clearInterval(rollTimer);
						rollTimer = null;
						setTimer = null;
						nowPlaying = false;

						DoRoll(true);
					}
				}
			});

			// _LastTrigger focus
			_LastTrigger.on({
				focusout : function(e) {
					var e = e || window.event
						, _Target = $(e.relatedTarget);

					if ( !_Target.parents('.navwrap').length ) {
						_MenuHide();
						clearTimeout(setTimer);
						clearInterval(rollTimer);
						rollTimer = null;
						setTimer = null;
						nowPlaying = false;

						DoRoll(true);
					}
				}
			});

			function _MenuHide() {
				_GnbWrapper.removeAttr('style');
				_Depth2Wrapper.hide();
				_Depth1Trigger.removeClass('hover');
			}

			// Desktop Init
			function _DesktopInit() {
				_GnbWrapper.removeAttr('style');
				_GnbWrapper.find('.dep02').find('ul').removeAttr('style').show();
				_GnbWrapper.find('.dep01').removeClass('hover');
				_GnbWrapper.find('.dep01').next().hide(); // 2014-02-12
				$('#visual').css('background-color','#fff'); // 2014-02-28

				setDepth1ColorClass();

				$("#srcBoxBtn").removeClass('toggle').hide();
				$('#srcBoxWrap').hide().attr('data-status','close');
			}
		}

		// Mobile
		function _MobileBinding() {

			var _Body = $('body')
				, _IsAnimating = false
				, _Depth1Trigger = _GnbWrapper.find('a.dep01')
				, _Depth1Wrapper = _Depth1Trigger.next('div')
				, _Depth2Trigger = _Depth1Wrapper.find('a[href="#nohref"]')
				, _Depth2Wrapper = _Depth2Trigger.next('ul')
				, _SearchOpenTrigger = $("#srcBoxBtn")
				, _SearchTrigger = $('#srcBoxBtn #srcButtonM')
				, _SearchWrapper = $("#srcBoxWrap")
				, _TempTextM = $("#srcButtonM span").html()
				, _TempTextMNew = "검색 상자 닫기"
				, _bynum = $("#btn_bynum")		//jss : 메인 by Numbers 버튼 
				, _IsSearchAnimating = false;

			_MobileInit();

			_GnbMobileTrigger.off().on({
				click : function() {
					var _Height = $("#wrapper").height() - $("#header").height() + 150;
					_GnbWrapper.css({
						height : _Height + 'px'
					});

					var _This = $(this)
						, _Status = _This.attr('data-status')
						, _Width = _GnbWrapper.width()
						, _Image = _This.find('img');

					if ( !_IsAnimating ) {

						if ( _Status == 'open' ) {
							// jss : 메인 by Numbers 버튼 감추기 
							_bynum.fadeIn("slow")
							_IsAnimating = true;

							_Image.filter('.open').css('display','none');
							_Image.filter('.close').css('display','block');

							_This.attr('data-status', 'close');

							_GnbWrapper.animate({
								left : - _Width
								, opacity : 0
							}, 500, function() {
								_GnbWrapper.hide();
								//_FixMenu(); 2014-02-12
								_IsAnimating = false;
							});



							_SearchOpenTrigger.fadeOut(150);
							 _OpenSearchBox();
							setTimeout(function() {
								//_Body.removeClass('menuOpen');
								_Body.css('background-color','#fff');
							}, 100);

						} else {
							// jss : 메인 by Numbers 버튼 보이기 
							_bynum.fadeOut("slow")
							_IsAnimating = true;

							_Image.filter('.open').css('display','block');
							_Image.filter('.close').css('display','none');

							_This.attr('data-status', 'open');

							_GnbWrapper.show().animate({
								left : 0
								, opacity : 1
							}, 500, function() {
								_IsAnimating = false;
							});

							_SearchOpenTrigger.fadeIn(150);
							setTimeout(function() {
								//_Body.addClass('menuOpen');
								_Body.css('background-color','#f5f5f5');
							}, 100);
						}
					}

				}
			});

			_Depth1Trigger.each(function() {
				var _ThisDepthWrapper = $(this).next('div');
				$(this).off().on({
					click : function() {
						if ( _ThisDepthWrapper.is(':hidden') ) {


                            _Depth1Trigger.removeClass('active');
							_Depth1Trigger.removeClass('fix');
							_Depth1Wrapper.filter(':visible').stop(true, true).slideUp();
							_ThisDepthWrapper.stop(true, true).slideDown();

							_Depth1Trigger.removeClass('hover');
							$(this).addClass('hover');
						} else {


                            $(this).removeClass('active');
                            $(this).removeClass('fix');
							$(this).removeClass('hover');

							_ThisDepthWrapper.stop(true, true).slideUp();
						}
					}
				});
			});

			_Depth2Trigger.each(function() {
				var _ThisDepthWrapper = $(this).next('ul');
				$(this).off().on({
					click : function() {
						if ( _ThisDepthWrapper.is(':hidden') ) {
							_Depth2Wrapper.filter(':visible').stop(true, true).slideUp();
							_ThisDepthWrapper.stop(true, true).slideDown();

							_Depth2Trigger.removeClass('hover');
							$(this).addClass('hover');
						} else {
							$(this).removeClass('hover');
							_ThisDepthWrapper.stop(true, true).slideUp();
						}
					}
				});
			});

			_BrandTrigger.each(function() {

				$(this).off().on({
					click : function() { 
						if ( _CheckBrand() ) {

							_GnbMobileTrigger.find('img').filter('.open').css('display','none');
							_GnbMobileTrigger.find('img').filter('.close').css('display','block');

							_GnbMobileTrigger.attr('data-status', 'close');

							_GnbWrapper.css({
								left : -(_GnbWrapper.width())
								, opacity : 0
							});

							_GnbWrapper.hide();
							_FixMenu();
							_IsAnimating = false;

							_SearchOpenTrigger.hide();
							 _OpenSearchBox();
							//_Body.removeClass('menuOpen');
							_Body.css('background-color','#fff');
						}
					}
				});
			});


			// MobileInit
			function _MobileInit() {

				var _Width = viewport().width
					, _Height = $("#wrapper").height() - $("#header").height() + 150;

				//_Body.removeClass('menuOpen');
				_Body.css('background-color','#fff');
				$('#visual').css('background-color','#fff');

				removeDepth1ColorClass();

				_Depth1Trigger.removeClass('hover');
				_Depth2Trigger.removeClass('hover');
				_Depth1Wrapper.hide();
				_Depth2Wrapper.hide();

				_GnbWrapper.removeAttr('style');
				_GnbWSubWrapper.removeAttr('style');

				_GnbMobileTrigger.removeClass('hover').attr('data-status','close');
				_GnbMobileTrigger.find('img').css('display','none');
				_GnbMobileTrigger.find('img.close').css('display','block');

				_GnbWrapper.css({
					display : 'none'
					, marginLeft : '-6.1%'
					, paddingRight : '6.1%'
					, opacity : 0
					, height : _Height + 'px'
					, width : _Width + 'px'
					, left : - _Width + 'px'
				});

				_GnbWrapper.find('a.dep01').css({
					paddingLeft : '2%'
				});

				_IsSearchAnimating = false;
				_SearchWrapper.attr('data-status','close');
				// _SearchWrapper.css('height',0).hide(); // EJ
				_GnbWrapper.css('top','198px');/*20150401 수정_GnbWrapper.css('top','100px');*/
				_SearchOpenTrigger.hide();

			}

			_SearchTrigger.off().on({
				click : _OpenSearchBox
			});

			function _OpenSearchBox() {
				var _SearchBoxStatus = _SearchWrapper.attr('data-status')
					_GnbStatus = _GnbMobileTrigger.attr('data-status');

				if ( !_IsSearchAnimating ) {

					if ( _SearchBoxStatus == 'close' ) {
						if ( _GnbStatus != 'close' ) {

							_IsSearchAnimating = true;
							_SearchWrapper.attr('data-status', 'open');
							_SearchWrapper.slideDown(500, function() { // EJ
								_IsSearchAnimating = false;
							});
							_GnbWrapper.animate({ top: "170px" }, 500);
							_SearchTrigger.addClass("toggle").find("span").html(_TempTextMNew);
						}
					} else if ( _SearchBoxStatus == 'open' ) {
						_IsSearchAnimating = true;
						_SearchWrapper.attr('data-status', 'close');
						_SearchWrapper.slideUp(500, function(){ // EJ
							_IsSearchAnimating = false;
							_SearchWrapper.hide()
						});
						_GnbWrapper.animate({ top: "100px" }, 500);
						_SearchTrigger.removeClass("toggle").find("span").html(_TempTextM);
					}
				}
			}
		}
	} // end of mainNavigation

	// Navigation for Sub
	NS.subNavigation = function(news, depth1, depth2, depth3) {

		var _IsIE8 = $('html').hasClass('ie8')
			, _Event = detectOrientation()
			, _GnbWrapper = $('#nav')
			, _GnbWSubWrapper = $('.navwrap > div')
			, _GnbMobileTrigger = $('#mobileNav')
			, _DesktopSize = 1024
			, _Viewport = viewport().width
			, _Args = arguments
			, _IsNews = _Args.length ? news : false
			, _Depth1 = _Args.length > 1? depth1 - 1 : null
			, _Depth2 = _Args.length > 2 ? depth2 - 1 : null
			, _Depth3 = _Args.length > 3 ? depth3 - 1 : null
			, _BrandTrigger = $('#dep0202').find('a')
			, _Status = null
			, oldWidth = viewport().width
			, _AllEvents = 'click mouseover mouseout mouseenter mouseleave focusin focusout keydown';
			
		_DetectingStatus(_Viewport);

		// Fix Depth1 & Depth2
		function _FixMenu() {
			var _NavWrap = _GnbWrapper.children('.navwrap')
				, _Depth1Trigger = _NavWrap.find('a.dep01')
				, _Depth2Wrapper = _Depth1Trigger.next('div')
				, _Depth2Trigger = _Depth2Wrapper.find('.dep02 > li > a')
				, _Depth3Wrapper = _Depth2Trigger.next('ul')
				, _Depth3Trigger = _Depth2Trigger.next('ul').children('li').children('a')
				, _DesktopNewsWrapper = $('#directMenu')
				, _DesktopNewsTrigger = _DesktopNewsWrapper.find('li')
				, _MobileNewsWrapper = $('#utilnavAll')
				, _MobileNewsDepth1Wrapper = $('#dep0206')

				, _MobileNewsDepth1Trigger = _MobileNewsDepth1Wrapper.find('li').find('a')

			_NavWrap.find('a').removeClass('fix hover');

			_Depth2Wrapper.hide();

			if ( _Status == 'mobile' ) {
				_Depth3Wrapper.hide();
			} else {
				_Depth3Wrapper.show();
			}

			if ( _IsNews ) {
				if ( _Status == 'mobile' ) {
					_MobileNewsDepth1Wrapper.show();
					_MobileNewsDepth1Trigger.removeClass('hover');
					_MobileNewsDepth1Trigger.eq(_Depth1).addClass('hover');
				} else {
					_DesktopNewsWrapper.removeClass('hover');
					_DesktopNewsTrigger.eq(_Depth1).addClass('hover');
				}
			} else {
				if ( _Depth1 != null ) {
					_Depth1Trigger.eq(_Depth1).addClass('fix');
					if ( _Status == 'mobile' ) {
						_Depth2Wrapper.eq(_Depth1).show();
						_Depth1Trigger.eq(_Depth1).addClass('hover');
					}
					if ( _Depth2 != null ) {
						_Depth1Trigger.eq(_Depth1).next('div').find('.dep02 > li').eq(_Depth2).children('a').addClass('fix');
						if ( _Status == 'mobile' ) _Depth1Trigger.eq(_Depth1).next('div').find('.dep02 > li').eq(_Depth2).find('ul').show();
						if ( _Depth3 != null ) {
							_Depth1Trigger.eq(_Depth1).next('div').find('.dep02 > li').eq(_Depth2).find('ul').find('li').eq(_Depth3).find('a').addClass('fix');

						}
					}
				}
			}
		}

		// If Brand Menu, remove URL   modify 2014-10-14 by dooo
        /*
		if ( _CheckBrand() ) {
			_BrandTrigger.each(function() {
				var ThisHref= $(this).attr('href').split('#');
				$(this).attr('href', '#' + ThisHref[1]);
			});
		}
        */

		// Check IE8
		if ( _IsIE8 || !_isMobile() ) {
			$(window).resize(function() {
				_Viewport = viewport().width;

				if ( oldWidth !== _Viewport ) {
					_DetectingStatus(_Viewport);
					oldWidth = _Viewport;
				}
			});
		} else {
			window.addEventListener(_Event, function() {
				_Viewport = viewport().width;
				_DetectingStatus(_Viewport);
			}, false);
		}

		// CheckBrand   modify 2014-10-14 by dooo
		function _CheckBrand() {
			if ( _Depth1 == 1 ) return true;
			else return false;
		}


		// DetectStatus
		function _DetectingStatus(wWidth) {

			_GnbWrapper.find('*').off(_AllEvents);
			_GnbWrapper.off(_AllEvents);
			$("#srcBoxBtn").off(_AllEvents);
			$('#srcBoxBtn #srcButtonM').removeClass('toggle').off(_AllEvents);

			$('#srcBoxWrap').hide().attr('data-status','close');

			if ( wWidth >= _DesktopSize ) {
				_DesktopBinding();
				_Status = 'desktop';
			} else {
				_MobileBinding();
				_Status = 'mobile';
			}

			_FixMenu();
		}

		// Desktop
		function _DesktopBinding() {

			var _NavWrap = _GnbWrapper.children('.navwrap')
				, _Depth1Trigger = _NavWrap.find('a.dep01')
				, _Depth2Wrapper = _NavWrap.children('div')
				, _FirstTrigger = _Depth1Trigger.first()
				, _LastTrigger = _NavWrap.find('a').last()
				, _Timer = null;

			_DesktopInit();

			_Depth1Trigger.each(function() {
				var _This = $(this)
					, _ThisWrapper = _This.next('div');

				_This.off().on({
					'mouseenter focusin' : function(e) {

						e.stopPropagation()
					// 2014-02-12
						if ( _Depth2Wrapper.filter(':visible').length ) {
							_Depth2Wrapper.hide();
							_ThisWrapper.show();
						} else {
							_ThisWrapper.stop(true, true).slideDown(150);
						}
						_Depth1Trigger.removeClass('hover');
						_This.addClass('hover');
					// end of 2014-2-14
					}
				});
			});

			_NavWrap.off().on({
				mouseleave : function() {
					_MenuHide();
				}
			});

			// _FirstTrigger focus
			_FirstTrigger.on({
				keydown : function(e) {
					if( e.shiftKey && e.keyCode === 9) {
						_MenuHide();
					}
				}
			});

			// _LastTrigger focus
			_LastTrigger.on({
				focusout : function(e) {
					var e = e || window.event
						, _Target = $(e.relatedTarget);

					if ( !_Target.parents('.navwrap').length ) {
						_MenuHide();
					}
				}
			});

			// MenuHide
			function _MenuHide() {
				_Depth1Trigger.removeClass('hover');
				_Depth2Wrapper.slideUp(150);
			}

			// Desktop Init
			function _DesktopInit() {
				$("#srcBoxBtn").hide();
				_GnbWrapper.removeAttr('style');
				_GnbWrapper.find('.dep01').find('ul').removeAttr('style').show();
				_GnbWrapper.find('.dep02').find('ul').removeAttr('style').show();
				$('#srcBoxWrap').hide().attr('data-status','close');
				$('body').css('background-color','#fff'); // 2014-03-04

				$('a.dep01').css({ // 2014-02-10
					'background' : 'none'
					, 'text-decoration' : 'none'
				});
				$('.navwrap a.dep01').removeAttr('style').css('padding-left','2%'); // 2014-02-13
				$('#directMenu a.dep01').removeAttr('style'); // 2014-02-13
				$("#snsMenu").css('display','block');		//jss : SNS메뉴

			}

            //modify 2014-10-14 by dooo
			_BrandTrigger.each(function() {
				$(this).off().on({
					click : function() {
						if ( _CheckBrand() ) {
							_Depth1Trigger.removeClass('hover');
							_Depth2Wrapper.hide();
						}
					}
				});
			});
		}


		// Mobile
		function _MobileBinding() {

			var _Body = $('body')
				, _IsAnimating = false
				, _Depth1Trigger = _GnbWrapper.find('a.dep01')
				, _Depth1Wrapper = _Depth1Trigger.next('div')
				, _Depth2Trigger = _Depth1Wrapper.find('a[href="#nohref"]')
				, _Depth2Wrapper = _Depth2Trigger.next('ul')
				, _SearchOpenTrigger = $("#srcBoxBtn")
				, _SearchTrigger = $('#srcBoxBtn #srcButtonM')
				, _SearchWrapper = $("#srcBoxWrap")
				, _snsMenu = $("#snsMenu")		// jss : SNS메뉴 
				, _TempTextM = $("#srcButtonM span").html()
				, _TempTextMNew = "검색 상자 닫기"
				, _IsSearchAnimating = false;

			_MobileInit();

			_GnbMobileTrigger.off().on({

				click : function() {
					var _Height = $("#wrapper").height() - $("#header").height() + 150;
					_GnbWrapper.css({
						height : _Height + 'px'
					});

					var _This = $(this)
						, _Status = _This.attr('data-status')
						, _Width = _GnbWrapper.width()
						, _Image = _This.find('img');

					if ( !_IsAnimating ) {


						if ( _Status == 'open' ) {

							// jss : SNS메뉴 버튼 감추기 
							_snsMenu.fadeIn("slow")

							_IsAnimating = true;

							_Image.filter('.open').css('display','none');
							_Image.filter('.close').css('display','block');

							_This.attr('data-status', 'close');

							_GnbWrapper.animate({
								left : - _Width
								, opacity : 0
							}, 500, function() {
								_GnbWrapper.hide();
								_FixMenu();
								_IsAnimating = false;
							});



							_SearchOpenTrigger.fadeOut(150);
							 _OpenSearchBox();
							setTimeout(function() {
								//_Body.removeClass('menuOpen');
								_Body.css('background-color','#fff');
							}, 100);


						} else {
							// jss : SNS메뉴 버튼 감추기 
							_snsMenu.fadeOut("slow")

							_IsAnimating = true;

							_Image.filter('.open').css('display','block');
							_Image.filter('.close').css('display','none');

							_This.attr('data-status', 'open');

							_GnbWrapper.show().animate({
								left : 0
								, opacity : 1
							}, 500, function() {
								_IsAnimating = false;
							});

							_SearchOpenTrigger.fadeIn(150);
							setTimeout(function() {
								//_Body.addClass('menuOpen');
								_Body.css('background-color','#f5f5f5');
							}, 100);
						}
					}

				}
			});

			_Depth1Trigger.each(function() {

				var _ThisDepthWrapper = $(this).next('div');
				$(this).off().on({
					click : function() {


						if ( _ThisDepthWrapper.is(':hidden') ) {


                            _Depth1Trigger.removeClass('active');
							_Depth1Trigger.removeClass('fix');
							_Depth1Wrapper.filter(':visible').stop(true, true).slideUp();
							_ThisDepthWrapper.stop(true, true).slideDown();

							_Depth1Trigger.removeClass('hover');
							$(this).addClass('hover');

						} else {

							$(this).removeClass('active');
							$(this).removeClass('fix');
							$(this).removeClass('hover');
							_ThisDepthWrapper.stop(true, true).slideUp();



						}
					}
				});
			});

			_Depth2Trigger.each(function() {
				var _ThisDepthWrapper = $(this).next('ul');
				$(this).off().on({
					click : function() {
						if ( _ThisDepthWrapper.is(':hidden') ) {

							_Depth2Wrapper.filter(':visible').stop(true, true).slideUp();
							_ThisDepthWrapper.stop(true, true).slideDown();

							_Depth2Trigger.removeClass('hover');
							$(this).addClass('hover');
						} else {
							$(this).removeClass('hover');
							_ThisDepthWrapper.stop(true, true).slideUp();
						}
					}
				});
			});

           // modify 2014-10-14 by dooo

			_BrandTrigger.each(function() {
				$(this).off().on({
					click : function() {
						if ( _CheckBrand() ) {

							_GnbMobileTrigger.find('img').filter('.open').css('display','none');
							_GnbMobileTrigger.find('img').filter('.close').css('display','block');

							_GnbMobileTrigger.attr('data-status', 'close');

							_GnbWrapper.css({
								left : -(_GnbWrapper.width())
								, opacity : 0
							});

							_GnbWrapper.hide();
							_FixMenu();
							_IsAnimating = false;

							_SearchOpenTrigger.hide();
							 _OpenSearchBox();
							//_Body.removeClass('menuOpen');
							_Body.css('background-color','#fff');
						}
					}
				});
			});



			// MobileInit
			function _MobileInit() {

				var _Width = viewport().width
					, _Height = $("#wrapper").height() - $("#header").height() + 150;

				//_Body.removeClass('menuOpen');
				_Body.css('background-color','#fff');

				_Depth1Trigger.removeClass('hover');
				_Depth1Trigger.removeAttr('style'); // 2014-02-10
				_Depth2Trigger.removeClass('hover');
				_Depth1Wrapper.hide();
				_Depth2Wrapper.hide();

				_GnbWrapper.removeAttr('style');
				_GnbWSubWrapper.removeAttr('style');

				_GnbMobileTrigger.removeClass('hover').attr('data-status','close');
				_GnbMobileTrigger.find('img').css('display','none');
				_GnbMobileTrigger.find('img.close').css('display','block');

				_GnbWrapper.css({
					display : 'none'
					, marginLeft : '-6.1%'
					, paddingRight : '6.1%'
					, opacity : 0
					, height : _Height + 'px'
					, width : _Width + 'px'
					, left : - _Width + 'px'
				});

				_GnbWrapper.find('a.dep01').css({
					paddingLeft : '2%'
				});

				_IsSearchAnimating = false;
				_SearchWrapper.attr('data-status','close');
				_GnbWrapper.css('top','198px');//20150401 수정_GnbWrapper.css('top','100px');
				_SearchOpenTrigger.hide();

			}

			_SearchTrigger.off().on({
				click : _OpenSearchBox
			});

			function _OpenSearchBox() {
				var _SearchBoxStatus = _SearchWrapper.attr('data-status')
					_GnbStatus = _GnbMobileTrigger.attr('data-status');

				if ( !_IsSearchAnimating ) {

					if ( _SearchBoxStatus == 'close' ) {
						if ( _GnbStatus != 'close' ) {

							_IsSearchAnimating = true;
							_SearchWrapper.attr('data-status', 'open');
							_SearchWrapper.slideDown(500, function() {
								_IsSearchAnimating = false;
							});
							_GnbWrapper.animate({ top: "170px" }, 500);
							_SearchTrigger.addClass("toggle").find("span").html(_TempTextMNew);
						}
					} else if ( _SearchBoxStatus == 'open' ) {
						_IsSearchAnimating = true;
						_SearchWrapper.attr('data-status', 'close');
						_SearchWrapper.slideUp(500, function(){
							_IsSearchAnimating = false;
							_SearchWrapper.hide()
						});
						_GnbWrapper.animate({ top: "100px" }, 500);
						_SearchTrigger.removeClass("toggle").find("span").html(_TempTextM);
					}
				}
			}
		}
	} // end of subNavigation
})(window, APFEJ);

/* UI Script */
// Window Load
$(window).load(function() {

	// slideGallery
	if ( $('#slideGallery').length ) {
		frontUI.slideGallery({
			visibleLength : 5,			
			motionTime : 300 // 300 = 0.3초.
		});
	}

});

// frontUI definition
var frontUI = frontUI || {};

// ie7 check
if ( $.browser.msie ) {
	if ( $.browser.version < 8 ) var ie7 = true;
}

// viewport
function viewport() {
	var e = window, a = 'inner';
	if (!('innerWidth' in window )) {
		a = 'client';
		e = document.documentElement || document.body;
	}
	return { width : e[ a+'Width' ] , height : e[ a+'Height' ] };
}

// slideGallery
frontUI.slideGallery = function(options) {

	var slideGallery = $('#slideGallery')
		, outerFrame = slideGallery.children('.listGroup')
		, innerFrame = outerFrame.children('ul')
		, item = innerFrame.children('li')
		, btnLeft = slideGallery.find('.btnArrowL')
		, btnRight = slideGallery.find('.btnArrowR')
		, visibleLength = options.visibleLength || 5
		, maxLength = item.length
		, minLength = 0
		, currentIdx = 0
		, lastVisibleIdx = currentIdx + (visibleLength - 1)
		, movingWidth = item.first().outerWidth(true)	
		, motionTime = options.motionTime		
		, rollingCheck = false;
		
	// checking rolling function is able
	if ( maxLength > visibleLength ) {
		mainFunc();
	}

	// main Function
	function mainFunc() {

		// first Setting Hidden Items
		sethidden();	
		
		btnRight.on({
			click : function() {
				if ( !rollingCheck ) {
					rollingCheck = true;
					rolling();
				}
				return false;
			}
		});	
		
		btnLeft.on({
			click : function() {
				if ( !rollingCheck ) {
					rollingCheck = true;
					rollingReverse();
				}
				return false;
			}
		});

	}	

	// rolling
	function rolling() {

		item.removeClass('hidden');

		currentIdx += 1;

		if ( currentIdx == maxLength ) currentIdx = 0;

		innerFrame.stop(true, true).animate({
			'marginLeft' : -movingWidth
		}, motionTime, function() {
			innerFrame.children('li').first().appendTo(innerFrame);
			innerFrame.css('marginLeft',0);
			sethidden();
			rollingCheck = false;
		});
	}

	// rollReverse
	function rollingReverse() {

		item.removeClass('hidden');

		currentIdx -= 1;

		if ( currentIdx < 0 ) currentIdx = maxLength - 1;

		innerFrame.children('li').last().prependTo(innerFrame);
		innerFrame.css('marginLeft',-movingWidth);

		innerFrame.stop(true, true).animate({
			'marginLeft' : 0
		}, motionTime, function() {
			sethidden();
			rollingCheck = false;
		});
	}

	// addClass to hidden items
	function sethidden() {
		item.addClass('hidden');
		innerFrame.children('li').each(function(i) {
			if ( i < 5 ) {
				$(this).removeClass('hidden');
			}
		});
	}	
}


/**
 * popup event
 *
 * 1. 해당 페이지에 연관된 팝업 (path, branch attribute 명시)
 * <button class="popup" data-path="<%=component.getPath()%>" data-branch="branch">new</button>
 *
 * 2. 회원, 주소검색 등 공통 팝업 (branch attribute 만 명시)
 * <button class="popup" data-branch="member">Member Search</button>
 *
 *  3. 팝업창에 파라미터 전달 (1, 2 선태후 params 추가)
 *  <button class="popup" data-path="<%=component.getPath()%>" data-branch="branch" data-params="siteCd=MBS&bbsCd=A01">new</button>
 */
jQuery(function($){
	$('.popup').click(function() {
		window.name="새창";

		var path = $(this).data('path');
		var branch = $(this).data('branch');
		var params = $(this).attr('data-params');
		var url;

		var w = 600;
		var h = 600;
		var left = (screen.width/2)-(w/2);
		var top = (screen.height/2)-(h/2);
		var popupOption = 'width=' + w + ',height=' + h + ',left=' + left + ',top=' + top;
		if(path!=null){
			url = '/apps/inhouse/components/popup/popup.html?path='+path+'&branch='+branch;
			if (params != null) {
				url += "&" + params;
			}
			window.open(url, '', popupOption);
		}else{
			url = '/apps/inhouse/components/popup/popup.html?path=/apps/inhouse/components/popup&branch='+branch;
			if (params != null) {
				url += "&" + params;
			}
			window.open(url, '', popupOption);
		}

	});
});

/**
 *  id가 pagenavi인 위치에 페이지 네비게이션을 그려주고,
 *  페이지 클릭시 해당 페이지의 movePage 함수를 실행한다.
 * @param total				총 검색결과 갯수
 * @param pageSize		한 페이지당 보여지는 건수
 * @param pageNum		현재 보여질 페이지번호(1부터 시작)
 */
function pageNavigation(total, pageSize, pageNum) {
	var totalPageNum = Math.ceil(total / pageSize);
	var temp = Math.floor((pageNum - 1) / 10);
	var beginPageNum = (temp === 0) ? 1 : temp * 10 + 1;
	var endPageNum = 0;
	if (totalPageNum - beginPageNum > 9) {
		endPageNum = beginPageNum + 9;
	} else {
		endPageNum = totalPageNum;
	}

	/**
	 * 배열 첫째 요소 [0]: 첫 페이지로 이동
	 * 배열 둘째 요소 [1]: 이전 단계로 이동
	 * 배열 셋째 요소 [2]: 다음 단계로 이동
	 * 배열 넷째 요소 [3]: 마지막 페이지로 이동
	**/
	//PC용 페이지네이션 설정
	var numPrev = beginPageNum - 10;
	var numNext = beginPageNum + 10;
	var isPageArrow = new Array(4);
	var hover = new Array(4);
	isPageArrow[0] = isPageArrow[1] = isPageArrow[2] = isPageArrow[3] = "return false;";
	hover[0] = hover[1] = hover[2] = hover[3] = "hover";
	//모바일용 페이지네이션 설정
	var numPrevM = pageNum - 1;
	var numNextM = pageNum + 1;
	var isPageArrowM = new Array(4);
	var hoverM = new Array(4);
	isPageArrowM[0] = isPageArrowM[1] = isPageArrowM[2] = isPageArrowM[3] = "return false;";
	hoverM[0] = hoverM[1] = hoverM[2] = hoverM[3] = "hover";

	if(total > pageSize) {
		if(pageNum > 1) {
			isPageArrow[0] = "movePage(1);";
			hover[0] = "";
			isPageArrowM[0] = "movePage(1);";
			hoverM[0] = "";
			isPageArrowM[1] = "movePage("+numPrevM+");";
			hoverM[1] = "";
		}
		if(numPrev > 0) {
			isPageArrow[1] = "movePage("+numPrev+");";
			hover[1] = "";
		}
		if(numNext <= totalPageNum){
			isPageArrow[2] = "movePage("+numNext+");";
			hover[2] = "";
		}
		if(pageNum != totalPageNum) {
			isPageArrow[3] = "movePage("+totalPageNum+");";
			hover[3] = "";
			isPageArrowM[2] = "movePage("+numNextM+");";
			hoverM[2] = "";
			isPageArrowM[3] = "movePage("+totalPageNum+");";
			hoverM[3] = "";
		}
	}

	var nvi = "<div class='page'>";
	if (total != 0) {
		nvi += "<a href='#nohref' class='btnFirst "+hover[0]+"' onclick='"+isPageArrow[0]+"'><span>처음 목록</span></a> ";
		nvi += "<a href='#nohref' class='btnPrev "+hover[1]+"' onclick='"+isPageArrow[1]+"'><span>이전목록</span></a> ";
		nvi += "<span class='num'>"
		for (var i = beginPageNum; i <= endPageNum; i++) {
			if (i == pageNum) {
				nvi += "<a href='#nohref' class='select' onclick='movePage(" + i + ")'>" + i + "<span>현재페이지</span></a> ";
			} else {
				nvi += "<a href='#nohref' onclick='movePage(" + i + ")'>" + i + "</a> ";
			}
		}
		nvi += "</span>"
		nvi += "<a href='#nohref' class='btnNext "+hover[2]+"' onclick='"+isPageArrow[2]+"'><span>다음 목록</span></a> ";
		nvi += "<a href='#nohref' class='btnEnd "+hover[3]+"' onclick='"+isPageArrow[3]+"'><span>마지막 목록</span></a> ";
	}
	nvi+="</div>"
	$('#pagenavi').html(nvi);

	var mnvi = "<div class='page'>";
	if (total != 0) {
		mnvi += "<a href='#nohref' class='btnFirst "+hoverM[0]+"' onclick='"+isPageArrowM[0]+"'><span>처음 목록</span></a>";
		mnvi += "<a href='#nohref' class='btnPrev "+hoverM[1]+"' onclick='"+isPageArrowM[1]+"'><span>이전 목록</span></a>";
		mnvi += "<span class='num'>"
			mnvi += "<a href='#nohref' onclick='movePage("+pageNum +")' class='select'>"+ pageNum +"<span>현재페이지</span></a>";
			mnvi += "<span>/"+totalPageNum +"</span>";
		mnvi += "</span>"
		mnvi += "<a href='#nohref' class='btnNext "+hoverM[2]+"' onclick='"+isPageArrowM[2]+"'><span>다음 목록</span></a>";
		mnvi += "<a href='#nohref' class='btnEnd "+hoverM[3]+"' onclick='"+isPageArrowM[3]+"'><span>마지막 목록</span></a>";
	}
	mnvi+="</div>"
	$('#mpagenavi').html(mnvi);
}

/**
 *  Get방식일때 url에서 parameter를 뽑아주는 함수
 * @param name			url parameter 키
 * @param defaultValue  키가 존재 하지않을경우 리턴되는값
 * @returns					키에 해당하는 값
 */
function getParameterByName(name, defaultValue) {
	if (typeof(defaultValue) === undefined) {
		defaultValue = "";
	}

	href = location.href;
	name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
	var regexS = "[\\?&]"+name+"=([^&#]*)";
	var regex = new RegExp( regexS );
	var results = regex.exec( href );
	if( results === null )
		return defaultValue;
	else
		return decodeURIComponent(results[1].replace(/\+/g, " "));
}
/*
 * Cookie 저장
 * @param key
 * @param val
 */
var setCookie = function(key, val, expire) {
	var d = new Date();
	d.setTime(d.getTime()+(expire*24*60*60*1000));

	var expires = "expires="+d.toGMTString();
	document.cookie = key + "=" + val + "; " + "expires=" + expires;
}

/*
 * Cookie 호출
 * @param key
 */
var getCookie = function(key) {
	var name = key + "=";
	var ca = document.cookie.split(';');

	for(var i=0; i<ca.length; i++)
	{
		var c = $.trim(ca[i]);
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}

/*
 * Cookie 삭제
 * @param key
 */
function deleteCookie(key){
	var expireDate = new Date();

	expireDate.setDate( expireDate.getDate());
	document.cookie = key + "= " + "; expires=" + expireDate.toGMTString();
}
/**
 * 검색 결과를 excel로 다운로드
 * @param jsonParams	검색 조건 json
 * @param selector		servet selector
 * @returns
 */
function excelDownload(jsonParams, selector){
	if(!jsonParams){
		alert("Search First!");
		return null;
	}
	alert('데이터가 많을 시 느릴 수 있습니다.');
	window.open('/bin/servlet/download.' + selector + '?' + $.param(jsonParams));
}

//check having invalid tags
function hasInvalidTag(str){
	var reason;
	if(str.indexOf('script') > -1 ){
		reason = 'script';
	}else if(str.indexOf('iframe') > -1){
		reason = 'iframe';
	}else if(str.indexOf('javascript') > -1){
		reason = 'javascript';
	}else{

	}

	if(reason){
		return reason;
	}else
		return false;
}

//check having invalid character
function hasInvalidChar(str){
	var reason;
	if(str.indexOf('&') > -1 ){
		reason = '&';
	}else if(str.indexOf('%') > -1){
		reason = '%';
	}else if(str.indexOf('|') > -1){
		reason = '|';
	}else if(str.indexOf(';') > -1){
		reason = ';';
	}else if(str.indexOf(':') > -1){
		reason = ':';
	}else if(str.indexOf('<') > -1){
		reason = '<';
	}else if(str.indexOf('>') > -1){
		reason = '>';
	}else if(str.indexOf('`') > -1){
		reason = '`';
	}

	if(reason){
		return reason;
	}else
		return false;
}

function fileDownload(index){
	var f = document.createElement("form");
	f.setAttribute('method', 'GET');
	f.setAttribute('action', '/bin/file.download');
	f.setAttribute('target', 'emptyFrame');
//alert(index);
	var i1 = document.createElement('input');
	i1.setAttribute('type', 'text');
	i1.setAttribute('name', 'idx');
	i1.setAttribute('value', index);

	f.appendChild(i1);

    if (typeof window.console != 'undefined' && typeof window.console.log != 'undefined') {
		console.log(f);
	}

	document.body.appendChild(f);
	f.submit();
	document.body.removeChild(f);

}
// textarea의 내용을 치환해서 DB에 넣은 경우 내용을 수정하기 위해 textarea로 내용을 다시 가져올 때 사용
function replaceBack(content) {
	var tmp;
	tmp = content.replace(/<br>/gi, "\n")
				 .replace(/&amp;/gi, "&")
				 .replace(/&nbsp;&nbsp;&nbsp;/gi, "\t")
				 .replace(/&nbsp;/gi, " ")
				 .replace(/&lt;/gi, "<")
				 .replace(/&gt;/gi, ">")
				 .replace(/&quot;/gi, "\"")
				 .replace(/&#39;/gi, "\'");
	return tmp;
}
function changePage() {
    location.href=$("#selectBox option:selected").val();
}

//글로벌 경영에서 해상도가 작아짐에 따라서.. 자동으로 한국페이지로 이동
$(function(){
    $(window).resize(function() {
        var MobilewWdth = $(window).width();
        if(MobilewWdth < 767 && $.url("filename")=="all") {
            location.href=$("#selectBox option:selected").val();
        }
        
    });
});


$(function() {
	var MobilewWdth = $(window).width();
    if(MobilewWdth < 767 ) {
		//$("a#global-mobile").attr('href','/content/company/ko-kr/group/global-activites/korea.html'); 
        $("a#global-mobile").attr('href','/content/company/ko-kr/group/amorepacificintheworld/korea.html'); 

    }
	if(MobilewWdth < 767 && $.url("filename")=="all") {
		//location.href="/content/company/ko-kr/group/global-activites/korea.html"; 
        location.href="/content/company/ko-kr/group/amorepacificintheworld/korea.html"; 
    }
});
