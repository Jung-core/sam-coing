(function($, window) { 
  var common = {
    Swiper: null,
    el    : {
      doc         : $(document),
      win         : $(window),
      subWrapperEl: null,
      headerEl    : null,
      body        : null
    },
    selector: {
      wrapperEl   : '.wrapper',
      subWrapperEl: '.wrapper.sub',
      companySub  : '.wrapper.sub.company',
      headerEl    : '.header',
      headerWrapEl: '.headerWrap',
      mainSliderEl: '.mainVisual',
      accordionEl : '.privacyList',
      tabEl       : '.tabType',
      btnTopEl    : '.btnTop',
      body        : 'body, html'
    },
    handler: {
      ready: function() {

        common.el.wrapperEl = $(common.selector.wrapperEl);
        common.el.subWrapperEl = $(common.selector.subWrapperEl);
        common.el.body = $(common.selector.body);
        common.Swiper = window.Swiper;
    

        
        common.el.doc.find(common.selector.btnTopEl).each(function(idx, el) {
          topBtn.init(el);
        })

        common.el.doc.find(common.selector.companySub).each(function(idx, el) {
          companyScroll.init(el);
        });

        common.el.doc.find(common.selector.subWrapperEl).each(function(idx, el) {
          clickVision.init(el);
        });

        common.el.doc.find(common.selector.subWrapperEl).each(function(idx, el) {
          if ($('body').find('.privacyArea').length == 0) {
            scrollNextSec.init(el); 
          }
        });

        common.el.doc.find(common.selector.accordionEl).each(function(idx, el) {
          accordion.init(el);
        })


        //$('body').one('DOMNodeInserted', '.header', function(event) {
          common.el.headerEl = $(common.selector.headerEl);
          common.el.headerWrapEl = $(common.selector.headerWrapEl);

          common.el.doc.find(common.selector.mainSliderEl).each(function(idx, el) {
            mainSlider.init(el);
          });
          common.el.doc.find(common.selector.headerEl).each(function(idx, el) {

            showGnb.init(el);

            if(common.el.wrapperEl.hasClass('sub')) { // sub
              gnbFixed.init(el);

            } else { // main
              mainSlider.handler.setSlideBlue();
            }

            if(common.el.wrapperEl.hasClass('jsPrivacy')) { // sub privacy
              $(common.selector.headerEl).addClass('blue');
            }

            // 메뉴 활성화
            var arr = window.location.href.split('/');
            var str = arr[arr.length-1];
            $('.openMenu>.snb a').each(function(idx, el) {
              var tarr = el.href.split('/');
              var tstr = tarr[tarr.length-1];
              if (tstr === str) {
                $(el).closest('li').addClass('on');
                $(el).closest('ul.depth').parent('li').addClass('on');
              }
            });

          });          

          common.el.doc.find(common.selector.tabEl).each(function(idx, el) {
            tab.init(el);
          })
        //});


      },
      load: function() {
        if(companyScroll.el.subTxtEl !== null){
          companyScroll.el.subTxtEl.addClass('on');
          companyScroll.el.btnScrollEl.addClass('on');
        }
        common.el.win.trigger('scroll.subTxtTgl');
        common.el.win.trigger('scroll.btnScrollTgl');
        common.el.win.trigger('resize.sub');
      }
    }
  };


  common.el.doc.ready(common.handler.ready);
  common.el.win.on('load', common.handler.load);
  
  // project util object
  var utils = {
    scrollDisabled: function() {
      if (common.el.body.find('.jsDimCont').length) {
        $('body').css({
          marginTop: -common.el.win.scrollTop()
        })
        setTimeout(function(){
          common.el.headerWrapEl.removeClass('scroll');
          gnbFixed.handler.setResponPosition();
        },25)
      }
      $('html').css({
        'position':'fixed',
        'overflow-y':'hidden'
      });
    },
    scrollEnabled: function() {
      $('html').css({
        'position':'',
        'overflow-y':''
      });
      if (common.el.body.find('.jsDimCont').length) {
        var scrollTop = parseInt($('body').css('margin-top'));
        $('body').css({
          marginTop: ''
        })
        $(window).scrollTop(-scrollTop);
      }
    }
  };

  var slider = {
    el: {
      swipeEl: null
    },
    swiper: null,
    init  : function(target, option) {
      var swipe = new common.Swiper(target, option);

      return swipe;
    },
    bind: function() {
      
    }
  };


  var mainSlider = {
    swiper: null,
    el    : {
      swipeEl       : null,
      swiperWrapper : null,
      swiperLi      : null,
      prevEl        : null,
      nextEl        : null,
      playEl        : null,
      progressBar   : null,
      numCountTextEl: null,
      contEl        : null,
      controlsEl    : null,
      pagingBarEl   : null,
      numCountEl    : null
    },
    selector: {
      
    },
    handler: {
      playHanldr: function() {

        if (mainSlider.el.playEl.hasClass('pause')) {
          mainSlider.el.playEl.removeClass('pause')
          mainSlider.el.playEl.addClass('play')
          mainSlider.el.playEl.text('재생')
          
          mainSlider.swiper.autoplay.start();
          
        } else {
          mainSlider.el.playEl.removeClass('play')
          mainSlider.el.playEl.addClass('pause')
          mainSlider.el.playEl.text('정지')

          mainSlider.swiper.autoplay.stop();
          
        }

      },
      progressBarHandlr: function() {
        var total = $(mainSlider.swiper.slides).not('.swiper-slide-duplicate').length;
        var per = ((mainSlider.swiper.realIndex + 1) / total) * 100;
        mainSlider.el.progressBar.css({
          width: per + '%'
        })

        mainSlider.el.numCountTextEl.html(mainSlider.swiper.realIndex+1);
      },
      setSlideBlue: function() {
        if(mainSlider.swiper.realIndex === 0) {
          common.el.headerEl.addClass('blue');
          mainSlider.el.controlsEl.addClass('blue');
          mainSlider.el.pagingBarEl.addClass('blue');
          mainSlider.el.numCountEl.addClass('blue');
        } else {
          common.el.headerEl.removeClass('blue');
          mainSlider.el.controlsEl.removeClass('blue');
          mainSlider.el.pagingBarEl.removeClass('blue');
          mainSlider.el.numCountEl.removeClass('blue');
        }
      },
    },
    setProperty: function(el) {
      this.el.swipeEl = $(el);
      this.el.playEl = this.el.swipeEl.find('.playJs');
      this.el.prevEl = this.el.swipeEl.find('.prev');
      this.el.nextEl = this.el.swipeEl.find('.next');
      this.el.progressBar = this.el.swipeEl.find('.pagingBar .bar');
      this.el.numCountTextEl = this.el.swipeEl.find('.numCount span').eq(0);
      this.el.swiperWrapper = this.el.swipeEl.find('.swiperMain');
      this.el.swiperLi = this.el.swipeEl.find('.swiperMain > li');
      this.el.controlsEl = this.el.swipeEl.find('.controls');
      this.el.pagingBarEl = this.el.swipeEl.find('.pagingBar');
      this.el.numCountEl = this.el.swipeEl.find('.numCount');


      this.el.swipeEl.addClass('swiper-container');
      this.el.swiperWrapper.addClass('swiper-wrapper');
      this.el.swiperLi.addClass('swiper-slide');
      this.el.contEl = this.el.swiperLi.find('.cont');
      

      var option = {
        speed: 1000,
        // autoplay: {
        //   delay: 5000,
        //   disableOnInteraction: false // 이전/다음 기능, 드래그 실행하면 자동 슬라이드 정지 해제
        // },
        slidesPerView: 1,
        navigation: {
          nextEl: this.el.nextEl,
          prevEl: this.el.prevEl
        },
        loop: true
      }

      this.swiper = slider.init(this.el.swipeEl, option);
      $(el).find('.swiperMain>li .clearBg').css({transition:'1.5s ease 2s'});
      $(el).find('.swiperMain>li .sVisual').css({transition:'all 1.3s ease 1s'});
      $(el).find('.swiperMain>li .cont').css({transition:'all 1s ease 1s'});

    },
    bind: function() {
      this.swiper.on('slideChangeTransitionStart',mainSlider.handler.setSlideBlue);
      this.swiper.on('slideChangeTransitionEnd', mainSlider.handler.progressBarHandlr);
      this.el.playEl.on('click', mainSlider.handler.playHanldr);
    },
    init: function(el) {
      this.setProperty(el);
      this.bind();
    }
  };

  
  var showGnb = {
    el: {
      headerEl    : null,
      headerWrapEl: null,
      gnbMenuEl   : null,
      logoEl      : null,
      gnbEl       : null,
      gnbContEl   : null
    },
    selector: {
      headerWrapEl: common.selector.headerWrapEl,
      gnbMenuEl   : '.gnbMenu',
      logoEl      : '.logo'
    },
    handler: {
      showAndHide: function(e) {
        e.preventDefault();
        
        if(showGnb.el.headerEl.hasClass('open')) { // gnb open 상태

          utils.scrollEnabled();
          showGnb.el.headerEl.removeClass('open');
          showGnb.el.gnbMenuEl.html('menu');

          // 서브페이지 gnb
          if(common.el.wrapperEl.hasClass('sub')) {
            if($('.jsDummy').offset().top !== 0) { 
              showGnb.el.headerEl.css({position: 'absolute'});
              showGnb.el.headerWrapEl.addClass('scroll');
              gnbFixed.handler.setResponPosition();
              showGnb.el.headerEl.removeClass('blue');
            } else if (common.el.subWrapperEl.hasClass('jsPrivacy')) { // privacy page, scrollTop 0일때 setblue
              showGnb.el.headerEl.addClass('blue');
            }
          }
          // 서브페이지 스와이퍼 return
          if(!mainSlider.swiper) { 
            return;
          }
          if(mainSlider.swiper.realIndex === 0) {
            showGnb.el.headerEl.addClass('blue');
          }
          mainSlider.swiper.autoplay.start(); // 스와이퍼 다시재생



        } else { // gnb close 상태

          utils.scrollDisabled();
          showGnb.el.headerEl.removeClass('blue');
          showGnb.el.headerEl.addClass('open');
          showGnb.el.gnbMenuEl.html('close');


          // 메인페이지 로고클릭 gnb 닫힘
          if(!common.el.wrapperEl.hasClass('sub')) {
            
            showGnb.el.logoEl.on('click', function() {
              showGnb.el.headerEl.removeClass('open');
              showGnb.el.gnbMenuEl.html('close');

              if(mainSlider.swiper.realIndex === 0) {
                showGnb.el.headerEl.addClass('blue');
              }
            })
          }
          

          // 서브페이지 gnb
          if(common.el.wrapperEl.hasClass('sub')) {
            showGnb.el.headerEl.css({position: 'fixed'});
            showGnb.el.headerWrapEl.removeClass('scroll');
            showGnb.el.headerWrapEl.css({
              position: 'absolute',
              top     : '0px'
            })

          }
          // 서브페이지 스와이퍼 return
          if(!mainSlider.swiper) { 
            return;
          }
          mainSlider.swiper.autoplay.stop(); //스와이퍼 정지
          
        }
      },
      moShowAndHide: function(e) {
        var target = $(e.target).closest('li');
        if(target.hasClass('on')) {
          target.removeClass('on');
        } else {
          target.addClass('on');
          target.siblings('li').removeClass('on');
        }
      },
      pcGnbElToggle: function(e) {
        if(common.el.win.width() <= 767){
          return false;
        }
        var target = $(e.target).closest('li');

        target.addClass('on');
        target.siblings('li').removeClass('on');
      },
      clickHideGnb: function() { // 동일페이지 링크이동
        var $this = $(this);
        var targetIdx = $this.closest('li').index();
        var wrapIdx = $this.closest('ul').closest('li').index();
        if ($('body').find('.jsDimCont').length) {
          if (wrapIdx == 0) {
            if(targetIdx == 1 || targetIdx == 2){
             $('.gnbMenu.close').click();
            }
          }
        }
        if ($('body').find('.tabArea').length) {
          if (wrapIdx == 2) {
            if(targetIdx == 1){
             $('.gnbMenu.close').click();
            }
          }
        }
        
      }
    },
    setProperty: function(el) {
      this.el.headerEl = $(el);
      this.el.headerWrapEl = this.el.headerEl.find(this.selector.headerWrapEl);
      this.el.gnbMenuEl = this.el.headerEl.find(this.selector.gnbMenuEl);
      this.el.logoEl = this.el.headerEl.find(this.selector.logoEl);
      this.el.gnbEl = this.el.headerEl.find('.openMenu .snb > li').not('.langMo');
      this.el.gnbContEl = this.el.headerEl.find('.openMenu > .snb > li > .depth a');

      this.el.gnbEl.removeClass('on');
    },
    bind: function() {
      showGnb.el.gnbMenuEl.on('click', showGnb.handler.showAndHide);
      showGnb.el.gnbEl.on('click', showGnb.handler.moShowAndHide);
      showGnb.el.gnbEl.on('mouseenter', showGnb.handler.pcGnbElToggle);
      showGnb.el.gnbContEl.on('click',showGnb.handler.clickHideGnb);
    },
    init: function(el) {
      this.setProperty(el);
      this.bind();
    }
  }

  var gnbFixed = {
    currentScroll : null,
    previousScroll: 0,
    el: {
      headerWrapEl: null
    },
    selector: {
      headerWrapEl: common.selector.headerWrapEl
    },
    handler: {
      setResponPosition: function() {

        gnbFixed.el.headerWrapEl.css({
          position: 'fixed'
        })


        if(common.el.win.width() >= 1920) {
          gnbFixed.el.headerWrapEl.css({
            top: '-23px'
          })
          
        }

        if(common.el.win.width() < 1920) {
          gnbFixed.el.headerWrapEl.css({
            top: '-1.1979vw'
          })

        }

        if(common.el.win.width() < 720) {
          gnbFixed.el.headerWrapEl.css({
            top: '0'
          })
        }
      },
      fixHead: function() {
        if (common.el.headerEl.hasClass('open')) {
          return
        }

        var childOffsetTop = common.el.subWrapperEl.children().eq(1).offset().top;
        var curOffsetTop = -(childOffsetTop);

        gnbFixed.currentScroll = curOffsetTop;

        // scrollDown
        if(gnbFixed.currentScroll > gnbFixed.previousScroll) {
          gnbFixed.el.headerWrapEl.removeClass('scroll');
          if (!(parseInt(gnbFixed.el.headerWrapEl.css('top')) < 0) || common.el.win.width() > 767) {
            gnbFixed.el.headerWrapEl.css({
              position: 'fixed',
              top: '-150px'
            })
          }

        } else { // scrollUp
          if (!gnbFixed.el.headerWrapEl.hasClass('scroll')) {
            gnbFixed.el.headerWrapEl.addClass('scroll');
            gnbFixed.handler.setResponPosition();
          }
           
          common.el.win.one('resize', function() {
            gnbFixed.handler.setResponPosition();

          })

          if(common.el.subWrapperEl.hasClass('jsPrivacy')) {
            $(common.selector.headerEl).removeClass('blue')
          }
        }

        gnbFixed.previousScroll = gnbFixed.currentScroll;

        if(childOffsetTop === 0) { // window.scrollTop = 0
          gnbFixed.el.headerWrapEl.removeClass('scroll');
          gnbFixed.el.headerWrapEl.css({
            position: 'absolute',
            top: 0
          })

          //privacy page
          if(common.el.subWrapperEl.hasClass('jsPrivacy')) { 
            $(common.selector.headerEl).addClass('blue')
          }
        }


      },
      companyFixHead: function() {

        var contOT = $('.jsContent').offset().top;
        var wST = common.el.win.scrollTop();

        gnbFixed.currentScroll = wST;
        
        if(contOT < wST+100) { // 연혁 부분에 도달
          gnbFixed.el.headerWrapEl.removeClass('scroll');
          gnbFixed.el.headerWrapEl.css({
            position: 'fixed',
            top: '-150px'
          })

          // scrollUp
          if(gnbFixed.currentScroll < gnbFixed.previousScroll) {
            gnbFixed.el.headerWrapEl.addClass('scroll');
            gnbFixed.handler.setResponPosition();            

            common.el.win.one('resize', function() {
              gnbFixed.handler.setResponPosition();

            })
          }
          gnbFixed.previousScroll = gnbFixed.currentScroll;



        } else if(contOT >= wST) { // 연혁부분 아닐 때
          gnbFixed.el.headerWrapEl.removeClass('scroll');
          gnbFixed.el.headerWrapEl.css({
            position: 'absolute',
            top: 0
          })
        }
      }

    },
    setProperty: function(el) {
      this.el.headerWrapEl = $(this.selector.headerWrapEl);
      
    },
    bind: function() {
      // 회사소개페이지
      if(common.el.subWrapperEl.hasClass('company')) { 
        common.el.win.on('scroll', gnbFixed.handler.companyFixHead);
      } else { // 회사소개 제외 서브페이지
        common.el.subWrapperEl.on('scroll', gnbFixed.handler.fixHead);
      }
    },
    init: function(el) {
      this.setProperty(el);
      this.bind();
      
    }
  }

  // 채용정보페이지 탭
  var tab = {
    benefitStartArea: null,
    el: {
      visualArea  : null,
      tabAreaEl   : null,
      tabEl       : null,
      tabLiEl     : null,
      newcomerEl  : null,
      careerEl    : null,
      headerWrapEl: null
    },
    selector: {
      headerWrapEl: common.selector.headerWrapEl
    },
    handler: {
      tabClick: function(e) {
        var target = $(e.target).closest('li');

        target.addClass('on');
        target.siblings('li').removeClass('on')
        tab.handler.tabShowArea(e);

      },
      tabShowArea: function(e) {

        e.preventDefault();

        var value = tab.el.visualArea.height() - tab.el.headerWrapEl.height()
        
        if(tab.el.tabLiEl.eq(0).hasClass('on')) { // 신입사원 클릭
          tab.el.newcomerEl.show();
          tab.el.careerEl.hide();

        } else if(tab.el.tabLiEl.eq(1).hasClass('on')) { //경력사원 클릭
          tab.el.careerEl.show();
          tab.el.newcomerEl.hide();
        }

        common.el.subWrapperEl.animate({
          scrollTop: value
        },300)

      },
      fixedTab: function(e) {
        var visualOT = -(tab.el.visualArea.offset().top); // === window.scrollTop
        var visualHeight = tab.el.visualArea.height();
        var newAndCareer = $('.newcomer, .career');


        if (visualOT > visualHeight) { // 탭 fixed 시작
          tab.el.tabAreaEl.addClass('fixed');
          newAndCareer.css({marginTop:tab.el.tabAreaEl.outerHeight(true)});
          if(tab.el.headerWrapEl.hasClass('scroll')) {

            if(common.el.win.width() >= 1920) { // pc

              tab.el.tabAreaEl.css({
                top: '27px',
                margin: '56px auto 0'
              })
              
            }
  
            if(common.el.win.width() < 1920) { // pc, tablet
              tab.el.tabAreaEl.css({
                top: '1.4063vw',
                margin: '2.9167vw auto 0'
              })
  
            }
  
            if(common.el.win.width() < 720) { // mo
              tab.el.tabAreaEl.css({
                top: '13.509vw',
                margin: '5.8333vw auto 0'
              })
            }

          }else {
            tab.el.tabAreaEl.css({
              top: 0,
              margin: '0 auto'
            })
          }


        } else if(visualOT < visualHeight) {
          tab.el.tabAreaEl.removeClass('fixed');
          newAndCareer.css({marginTop:''});
            if(common.el.win.width() < 720) {
              tab.el.tabAreaEl.css({
                top: 0,
                margin: '5.8333vw auto 0'
              })
            }
        } 


        // 복리후생 섹션 탭 hide

        var benefitStartArea;

        if(tab.el.newcomerEl.css('display') === 'block') { // 신입사원영역 보일 때
          benefitStartArea = tab.benefitStartArea.eq(0).offset().top
        } else if(tab.el.newcomerEl.css('display') === 'none'){ // 경력사원영역 보일 때
          benefitStartArea = tab.benefitStartArea.eq(1).offset().top
        }

        if (benefitStartArea < 0) { 
          tab.el.tabAreaEl.hide();
        } else {
          tab.el.tabAreaEl.show();
        }

      }
    },
    setProperty: function(el) {
      this.benefitStartArea = common.el.subWrapperEl.find('.imgArea.recruit');
      this.el.visualArea = $('.visual');
      this.el.tabAreaEl = $(el).closest('.tabArea');
      this.el.tabEl = $(el);
      this.el.tabLiEl = $(el).find('li');
      this.el.newcomerEl = this.el.tabAreaEl.siblings('.newcomer');
      this.el.careerEl = this.el.tabAreaEl.siblings('.career');
      this.el.headerWrapEl = $(this.selector.headerWrapEl);

      this.el.careerEl.hide();

    },
    bind: function() {
      common.el.subWrapperEl.on('scroll', tab.handler.fixedTab)
      this.el.tabLiEl.on('click', tab.handler.tabClick);
    },
    init: function(el) {
      this.setProperty(el);
      this.bind();
    }
  }

  var topBtn = {
    el: {
      btnTopEl: null,
      dummyEl : null
    },
    selector: {

    },
    handler: {
      goTopCompany: function(e) {
        e.preventDefault();

        $('body,html').animate({
          scrollTop: '0'
        }, 800);

      },
      goTop: function(e) {
        e.preventDefault();

        common.el.subWrapperEl.animate({
          scrollTop: '0'
        }, 800);
        

      },
      subpageBtnShow: function() {
        var endValDummy = topBtn.el.dummyEl.offset().top + topBtn.el.dummyEl.height();

        if(endValDummy < 200) {
          topBtn.handler.btnShow();
          topBtn.el.btnTopEl.find('a').css({'cursor': 'pointer'});

        } else if(endValDummy > 200){
          topBtn.handler.btnHide();
          topBtn.el.btnTopEl.find('a').css({'cursor': 'default'});
        }
      },
      companyBtnShow: function() {
        var wST = common.el.win.scrollTop();
        var val = common.el.subWrapperEl.find('.jsDimCont').offset().top + (common.el.win.height()/2)
        
        if(val < wST) {
          topBtn.handler.btnShow();
          topBtn.el.btnTopEl.find('a').css({'cursor': 'pointer'});

        } else if(val >= wST){
          topBtn.handler.btnHide();
          topBtn.el.btnTopEl.find('a').css({'cursor': 'default'});
        }

      },
      btnShow: function() { 
        topBtn.el.btnTopEl.stop().animate({
          zIndex: 1,
          opacity: 1
        },100);
      },
      btnHide: function() {            
        topBtn.el.btnTopEl.stop().animate({
          zIndex: 0,
          opacity: 0
        },100);
      }
    },
    setProperty: function(el) {
      this.el.btnTopEl = $(el);

      this.el.btnTopEl.css({'opacity': 0});

      var dummy = $('<div class="jsDummy"></div>');
      common.el.subWrapperEl.prepend(dummy);
      this.el.dummyEl = $('.jsDummy');

      this.el.dummyEl.css({
        width: '100%',
        height: '100vh',
        position: 'absolute',
        zIndex: '-100'
      })

    },
    bind: function(el) {

      // 회사소개페이지
      if(common.el.subWrapperEl.hasClass('company')) { 
        common.el.win.on('scroll', topBtn.handler.companyBtnShow);
        $(el).on('click', topBtn.handler.goTopCompany)
      } else { // 회사소개 제외 서브페이지
        common.el.subWrapperEl.on('scroll', topBtn.handler.subpageBtnShow);
        $(el).on('click', topBtn.handler.goTop)
      }

    },
    init: function(el) {
      this.setProperty(el);
      this.bind(el);
    }
  }

  // 회사소개페이지 버튼클릭, 타이틀 opacity
  var companyScroll = {
    el: {
      subWrapperEl: null,
      jsContEl    : null,
      jsDimContEl : null,
      btnScrollEl : null,
      subTopEl    : null,
      subTxtEl    : null,
      locationEl  : null
    },
    selector: {
      jsContEl   : '.jsContent',
      jsDimContEl: '.jsDimCont',
      btnScrollEl: '.btnScroll',
      subTopEl   : '.subTop.company',
      subTxtEl   : '.subTop .subTxt'
    },
    handler: {
      subTxtTgl: function() {
        if(companyScroll.el.subTopEl.offset().top > common.el.win.height()/2 && companyScroll.el.subTxtEl.hasClass('on')) {
          companyScroll.el.subTxtEl.stop().animate({
            opacity: 0
          }, 150).removeClass('on');
        } 

        if(companyScroll.el.subTopEl.offset().top < common.el.win.height()/2 && !companyScroll.el.subTxtEl.hasClass('on')) {
          companyScroll.el.subTxtEl.stop().animate({
            opacity: 1
          }, 150).addClass('on');
        }
        
      },
      btnScrollTgl: function() {
        var winHalfHeight = common.el.win.height()/2
        var jsDimCont = companyScroll.el.jsDimContEl.offset().top
        var wST = common.el.win.scrollTop();
        var btnShowVal = winHalfHeight + jsDimCont

        if(wST > btnShowVal && companyScroll.el.btnScrollEl.hasClass('on')) {
          companyScroll.el.btnScrollEl.stop().animate({
            opacity: 0
          }, 300).removeClass('on').hide();
        } 

        if(wST <= btnShowVal && !companyScroll.el.btnScrollEl.hasClass('on')) {
          companyScroll.el.btnScrollEl.stop().animate({
            opacity: 1
          }, 300).addClass('on').show();
        }
      },
      // footerBugFix: function() {
      //   var locationOT = companyScroll.el.locationEl.offset().top
      //   var wST = common.el.win.scrollTop();

      //   if(wST > locationOT - wST/2) {
      //     companyScroll.el.subTopEl.hide();
      //   } else {
      //     companyScroll.el.subTopEl.show();
      //   }

      // }
    },
    setProperty: function(el) {
      this.el.subWrapperEl = common.el.subWrapperEl;
      this.el.jsContEl = $(this.selector.jsContEl);
      this.el.jsDimContEl = $(this.selector.jsDimContEl);
      this.el.btnScrollEl = $(this.selector.btnScrollEl);
      this.el.subTopEl = $(this.selector.subTopEl);
      this.el.subTxtEl = $(this.selector.subTxtEl);
      this.el.locationEl = this.el.subWrapperEl.find('.jsContent #location');
      
    },
    bind: function() {
      common.el.win.on('scroll.subTxtTgl', companyScroll.handler.subTxtTgl);
      common.el.win.on('scroll.btnScrollTgl', companyScroll.handler.btnScrollTgl);
      // common.el.win.on('scroll', companyScroll.handler.footerBugFix);
    },
    init: function(el) {
      this.setProperty(el);
      this.bind();
    }
  }

  var scrollNextSec = {
    el: {
      scrollBtnEl: null
    },
    val: {
      oldT: 0
    },
    methode: {
      scrollMove: function(target, val, call) {
        target.stop().animate({
          scrollTop: val
        }, 1000, call);
      }
    },
    handler: {
      mouseWheel: function(e) {
        var subWrap = common.el.subWrapperEl;
        var step1 = subWrap.find('.container').eq(0);
        var step1H = Math.ceil(step1.height());
        var step2 = subWrap.find('.container').eq(1);
        var step2H = Math.ceil(step2.height());
        var scrollTop = Math.ceil($(window).scrollTop());
        var wheelY = e.originalEvent.wheelDelta;
        var scrollTarget = $('html');
        var conH = step1H + step2H;
        if (scrollTarget.find('.header.open').length) { 
          return true;
        }
        if (!step2.hasClass('jsDimCont')) {
          scrollTop = Math.ceil(subWrap.scrollTop());
          scrollTarget = subWrap;
          conH = step1H;
        }
        
        if ($(e.currentTarget).hasClass('btnScroll')) {
          wheelY = -1
        }
        
        if (scrollTop < conH + wheelY) {
          e.preventDefault();
          if (!scrollTarget.is(':animated')) {
            e.preventDefault();
            if (wheelY < 0) {
              if (scrollTop < step1H) {
                scrollNextSec.methode.scrollMove(scrollTarget, step1H);
              } else if (step2.hasClass('jsDimCont')){
                scrollNextSec.methode.scrollMove(scrollTarget, conH);
              }
            } else {
              if (scrollTop <= step1H + wheelY) {
                if (scrollTop === 0){
                  return true;
                }
                scrollNextSec.methode.scrollMove(scrollTarget, 0);
              } else if (step2.hasClass('jsDimCont')){
                scrollNextSec.methode.scrollMove(scrollTarget, step1H);
              }
            }
          }
        }
      },
      touchstart: function(e) {
        var win = common.el.win;
        var body = $('body');
        var bh = common.el.body;
        var subWrap = common.el.subWrapperEl;
        var startY = e.originalEvent.changedTouches[0].clientY;
        var moveY = 0;
        var step1 = subWrap.find('.container').eq(0);
        var step1H = step1.height();
        var thisScroll = $(window).scrollTop();
        var scrollTop = 0;
        var count = 0;
        if (win.scrollTop() >= win.height()) {
          subWrap.data('moveCount', true);
        }
        if (body.find('.header.open').length || subWrap.data('moveCount') === true) { 
          return true;
        }

        if (thisScroll < step1H){
          subWrap.find('.container.visual').off('touchmove.lock').on('touchmove.lock',function(e) {
            e.preventDefault();
            if (e.originalEvent) {
              moveY = e.originalEvent.changedTouches[0].clientY;
            }
            win.trigger('scroll.subScroll')
          });
          subWrap.find('.container.visual').trigger('touchmove.lock');
        } 
        
        win.off('scroll.subScroll').on('scroll.subScroll', function(e) {
            scrollTop = win.scrollTop();
            if (e.isTrigger > 0 && startY > moveY) {
              scrollTop = -1;
              thisScroll = -2;
            }

            if(!bh.is(':animated')){
              if (scrollTop < step1H ){
                if (scrollTop > thisScroll){
                  scrollNextSec.methode.scrollMove(bh, step1H, function() {
                    subWrap.find('.container.visual').off('touchmove.lock');
                    subWrap.data('moveCount',true);
                    win.off('scroll.subScroll');
                  });
                }
              }
            }
        });
      },
      resize: function() {
        var win = common.el.win;
        var body = common.el.body;
        common.el.body.find('.jsDimCont').each(function() {
          var $this = $(this);
          var visual = body.find('.visual');
          var vTxtArea = visual.find('.subTxt');
          var vTxtAreaH = vTxtArea.height();
          var visualH = visual.height();
          var txtArea = $this.find('.scrollTxt');
          var txtAreaH = txtArea.height();
          var header = $('.headerWrap');
          var headerH = header.height();
          var winH = win.height();
          if (txtAreaH > winH - headerH) {
            $this.height(winH + txtAreaH - winH + headerH*2);
          }
        });
      },
      btnShow: function() {
        var wST = common.el.subWrapperEl.scrollTop();
        var step2StartArea = $('.container').eq(1).offset().top + common.el.win.height()

        if(wST >= step2StartArea && scrollNextSec.el.scrollBtnEl.hasClass('on')) {
          scrollNextSec.el.scrollBtnEl.stop().animate({
            opacity: 0
          }, 150).removeClass('on').hide();
        } 

        if(wST < step2StartArea && !scrollNextSec.el.scrollBtnEl.hasClass('on')) {
          scrollNextSec.el.scrollBtnEl.stop().animate({
            opacity: 1
          }, 150).addClass('on').show();
        }

      },
    },
    setProperty: function(el) {
      
      this.el.scrollBtnEl = $(el).find('.btnScroll');
      this.val.oldT = common.el.subWrapperEl.scrollTop();
      
    },
    bind: function(el) {
      var subWrap = common.el.subWrapperEl;
      
      this.el.scrollBtnEl.on('click', scrollNextSec.handler.mouseWheel);
      subWrap.on('mousewheel.subScroll', scrollNextSec.handler.mouseWheel);
      if (common.el.body.find('.jsDimCont').length) {
        subWrap.find('.container.visual').on('touchstart.subScroll', scrollNextSec.handler.touchstart);
      } 
      common.el.win.on('resize.sub', scrollNextSec.handler.resize);
      subWrap.on('scroll', scrollNextSec.handler.btnShow);

    },
    init: function(el) {
      this.setProperty(el);
      this.bind(el);
    }
  };

  var clickVision = {
    el: {
      clickEl: null

    },
    handler: {
      click: function(e) {
        var target = $(e.target).closest('a');

        if(target.hasClass('on')) {
          target.removeClass('on')
          target.find('span').removeClass('close').addClass('plus').html('열기')
        } else {
          target.addClass('on');
          target.closest('li').siblings('li').find('a').removeClass('on');
          target.find('span').removeClass('plus').addClass('close').html('닫기')
          target.closest('li').siblings('li').find('a > span').removeClass('close').addClass('plus').html('열기');
        }
      }
    },
    setProperty: function(el) {
      this.el.clickEl = $(el).find('ul.visionList > li a');
      this.el.closeEl = this.el.clickEl.find('span');
      this.el.clickEl.removeClass('on');

    },
    bind: function(el) {
      clickVision.el.clickEl.on('click', clickVision.handler.click);
    },
    init: function(el) {
      this.setProperty(el);
      this.bind(el);
    }
  };

  var accordion = {
    el: {
      accordionEl: null
    },
    handler: {
      accorClick: function(e) {
        var target = $(e.target);
        
        if(target.hasClass('on')) {
          target.removeClass('on');
        } else {
          target.addClass('on');
          target.closest('li').siblings('li').find('a').removeClass('on');
        }

      }
    },
    setProperty: function(el) {
      this.accordionEl = $(el).find('li');
    },
    bind: function(el) {
      this.accordionEl.on('click', this.handler.accorClick);
    },
    init: function(el) {
      this.setProperty(el);
      this.bind(el);
    }
  }


  var mvJs = {
    utils: {
      scrollDisabled: utils.scrollDisabled,
      scrollEnabled : utils.scrollEnabled
    }
  };

  window.mvJs = mvJs;
})($, window);
