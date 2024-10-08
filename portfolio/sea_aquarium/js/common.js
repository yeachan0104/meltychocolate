//loading page

$(function(){
    setTimeout(function(){
        $("body").on("scroll touchmove mousewheel", function(event){
            event.preventDefault();
            event.stopPropagation();
        });
    });
    setTimeout(function(){
        $("#waiting").fadeOut();
        $("body").off("scroll touchmove mousewheel");
    }, 4500);
    setTimeout(function(){
        $("#fullpage,#header,#visual,#pagination,#quick").removeClass("hide");
    }, 5500);
});

//화면전환시 애니메이션을 위한 각 섹션별 hide클래스 제거

function remove_hide(i){
    $(".fullsection.full"+i).removeClass("hide");
}

var li_w
var change_speed = 750;
var release_times, times;
// 사이드 퀵버튼 클릭 이동
var remove;
function moving_sections(gnbindex,length){//화면전환 중에 다른 화면 전환 불가
        $(".quick li").removeClass("remove")
    if($(".quick li").eq(gnbindex).hasClass("long")){
        clearTimeout(remove);
        remove = setTimeout(function(){
            $(".quick li").eq(gnbindex).addClass("remove");
        },change_speed-100);
    }
    $(".quick  ,.quick_sub").stop().animate({marginTop: $(".quick").height()/2 - ($(".quick li").outerHeight(true) * gnbindex)}, change_speed);
    $(".quick li").removeClass("on").eq(gnbindex).addClass("on");
    $("ul.nav li").removeClass("on").eq(gnbindex).addClass("on");
    $(".quick_sub li").removeClass("on");
    var page_nb = parseInt($(".fullsection").eq(gnbindex).find(".full_sub_con").attr("data-index"));
    $(".fullsection").eq(gnbindex).find(".quick_sub li").eq(page_nb-1).addClass("on");
    $("#fullpage").stop().animate({"top": -length + "px"}, change_speed, "easeInOutQuint");
    $(".pagination b").text(gnbindex+1);
    remove_hide(gnbindex+1);

    setTimeout(function(){
        if($(".fullsection").eq(gnbindex).hasClass("blue")){
            $("body").addClass("blue");
            $("#header .logo img").attr("src", "img/logo_02.png");
            $(".line").css("background","#0f4e90");
            $("a").css("color","#0f4e90");
            $(".pagination").css("color","#fff");

        }else{
            $("body").removeClass("blue");
            $("#header .logo img").attr("src", "img/logo_01.png");
            $(".line").css("background","#fff");
            $("a").css("color","#fff");
            $(".ticket").css("color","#0f4e90");
        }
    }, 400)
}

function quickClick(){
    $(".quick li, ul.nav li").click(function(){
        if($("body").find(".quick_sub:animated").length >= 1) return false;
        var gnbindex = $(this).index();
        var length = 0;
        for(var i=1; i<(gnbindex+1); i++){
            length+=$(".full"+i).height();
        }
        //if($("body").find("#fullpage:animated").length >= 1) return false;
        moving_sections(gnbindex,length);
        return false;
    });
}

function fullset(){
    var pageindex = $("#fullpage > .fullsection").length; //fullpage 안에 섹션이(.fullsection) 몇개인지 확인하기
    $(".pagination span").text(pageindex);
    for(i=1;i<=pageindex;i++){
        $("#fullpage > .quick > ul").append("<li></li>"); //오른쪽 중단 퀵메뉴  도트 생성
    }


    $(".fullsection").each(function(i){
        var quick_sub_num = $(this).find(".full_sub").length;
        if(quick_sub_num >0){
            $("#fullpage > .quick > ul > li").eq(i).addClass("long");
            $(this).append("<div class='quick_sub'></div>");
            $(this).find(".quick_sub").append("<ul></ul>");
            for(a=1;a<=quick_sub_num;a++){
                $(this).find(".quick_sub ul").append("<li></li>");
            }
            var trans_y = parseInt($(".quick").height()/2 - i*($(".quick li").outerHeight(true)))*-1;
            $(this).find(".quick_sub").css("transform","translate("+0+","+trans_y+"px)");
        }
    });
    $(".quick_sub ul").each(function(){
        $(this).find("li").eq(0).addClass("on");
        var li_num = $(this).find("li").length;
        li_num -= 1;
        li_w = $(this).find("li").outerWidth(true);
        $(this).parent(".quick_sub").css("right",60+-1*li_w*li_num+"px");
    });

    $(".quick ,.quick_sub").css({marginTop: $(".quick").height()/2});
    $("#fullpage .quick ul li:first-child, #header ul.nav li:first-child").addClass("on"); //일단 화면이 로드 되었을때 퀵버튼에 1번째, 네비에 1번째에 불이 들어오게
    $(window).on("mousewheel DOMMouseScroll", function(event){
         if($("body").find(".quick_sub:animated").length >= 1) return false;
        clearTimeout(times);
        times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
        event.preventDefault();
        if(!$("body").hasClass("locked")){
            $("body").addClass("locked");
            var page = $(".quick ul li.on");
            //console.log(page.index()+1);  // 현재 on 되어있는 페이지 번호
            if($("body").find("#fullpage:animated").length >= 1){
                return false;
            }
            if(event.originalEvent.wheelDelta > 0 || event.originalEvent.detail < 0){//마우스 휠을 위로
                var before = page.index();
                var pagelength=0;
                for(var i=1; i<(before); i++){
                    pagelength += $(".full"+i).height();
                }
                if(page.index() > 0){ //첫번째 페이지가 아닐때 (index는 0부터 시작임)
                    page = page.index()-1;
                    moving_sections(page, pagelength);
                }
            }else{ // 마우스 휠을 아래로
                var nextPage = parseInt(page.index()+1); //다음페이지번호
                var lastPageNum = parseInt($(".quick ul li").length); //마지막 페이지번호
                //현재페이지번호 <= (마지막 페이지 번호 - 1)
                if(nextPage < lastPageNum){ //마지막 페이지가 아닐때만 animate !
                    var pagelength=0;
                    for(var i = 1; i<(nextPage+1); i++){
                        //총 페이지 길이 구하기
                        //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
                        pagelength += $(".full"+i).height();
                    }
                    moving_sections(nextPage, pagelength);
                }
            }
        }else{
            return false;
        }
        clearTimeout(release_times);
        release_times = setTimeout(function(){
            $("body").removeClass("locked");
        }, change_speed);
    });
    $(window).resize(function(){
        //페이지가 100%이기때문에 브라우저가 resize 될때마다 스크롤 위치가 그대로 남아있는것을 방지하기 위해
        var resizeindex = $(".quick ul li.on").index()+1;
        var pagelength = 0;
        for(var i = 1; i<resizeindex; i++){
            //총 페이지 길이 구하기
            //ex) 현재 1번페이지에서 2번페이지로 내려갈때는 1번페이지 길이 + 2번페이지 길이가 더해짐
            pagelength += $(".full"+i).height();
        }
        $("#fullpage").stop().animate({"top": -pagelength + "px"},0);
        full_sub_resize();
    });
}

var prnts_w, prnts_h,sub_counter;
function full_sub_resize(){
    $(".full_sub").each(function(){
        prnts_w = $(this).parents(".fullsection").width();
        prnts_h = $(this).parents(".fullsection").height();
        $(this).css({width: prnts_w, height:prnts_h});
    });
    $(".full_sub_con").each(function(){
        $(this).width(prnts_w * $(this).find(".full_sub").length);
    });
}

function full_sub_sizing(){
    full_sub_resize();
    $(".btn_left, .btn_right").each(function(){
        $(this).click(function(){
            sub_counter = parseInt($(this).parents(".fullsection").find(".full_sub_con").attr("data-index"));
            if($(this).hasClass("btn_left")){
                if(sub_counter > 1){
                    sub_counter -=1;
                }
            }else{
                if(sub_counter < $(this).parents(".fullsection").find(".full_sub").length){
                    sub_counter +=1;
                }
            }
            moving_quick_sub($(this));
            $(this).parent(".fullsection").find(".full_sub").eq(sub_counter-1).removeClass("hide");
        });
    });
}

function moving_quick_sub($this){
    var move_w = prnts_w;
    var li_all_length = $this.parents(".fullsection").find(".quick_sub li").length;
    $this.parents(".fullsection").find(".quick_sub li").removeClass("on");
    move_w = move_w * (sub_counter-1) * -1;
    $this.parents(".fullsection").find(".full_sub_con").stop().animate({left: move_w}, change_speed).attr("data-index", sub_counter);
    $this.parents(".fullsection").find(".quick_sub li").eq(sub_counter-1).addClass("on");
    $this.parents(".fullsection").find(".full_sub").eq(sub_counter-1).removeClass("hide");
    $this.parents(".fullsection").find(".quick_sub").stop().animate({right: 60+-1*li_w*(li_all_length-sub_counter)+"px"}, change_speed);
}

$(function(){
    fullset();
    quickClick();
    full_sub_sizing();
    $(".quick_sub li").click(function(){
        sub_counter = $(this).index() + 1;
        moving_quick_sub($(this));
    });
});

//inner scroll

$(function(){

    var before_x,after_x,this_scroll;
    $("#ANIMALS .full_con .slider").mousedown(function(){
        before_x = event.pageX;
        this_scroll = $("#ANIMALS .full_con .slider").scrollLeft();
        $(this).addClass("activate");
        $(this).mousemove(function(){
            if($(this).hasClass("activate")){
                $(this).addClass("moving");
                if($(this).hasClass("moving")){
                    after_x = event.pageX;
                    if(before_x != after_x){
                        $("#ANIMALS .full_con .slider").scrollLeft(this_scroll - (after_x - before_x));
                    }
                }else{
                    $(this).removeClass("activate").removeClass("moving");
                }
            }
        });
    }).mouseup(function(){
        $(this).removeClass("activate").removeClass("moving");
    }).mouseleave(function(){
        $(this).removeClass("activate").removeClass("moving");
    });

});

//동물 팝업 열기

function openModal(modalname){
    if(!$("#ANIMALS .full_con .slider").hasClass("moving")){
        for(var i=0; i<6; i++){
            if(modalname == animals_array[i][0]){
                $("#ANIMALS .modal .modal_content h1").html(animals_array[i][1]);
                $("#ANIMALS .modal .modal_content .text .menu").html(animals_array[i][2]);
                $("#ANIMALS .modal .modal_content .text .info").html(animals_array[i][3]);
                $("#ANIMALS .modal .modal_content .text .detail").html(animals_array[i][4]);
                $("#ANIMALS .modal .modal_content img.animals").attr("src",animals_array[i][5]);
                $("#ANIMALS .modal .modal_content img.scale").attr("src",animals_array[i][6]);
                $("#ANIMALS .modal").fadeIn(500);
            }
        }

        $(".modal").on("scroll touchmove mousewheel", function(event){ // 터치무브와 마우스휠 스크롤 방지
            event.preventDefault();
            event.stopPropagation();
        });
    }
}

// 팝업 닫기

$(document).on("click",".modal a.close, .cover",function(event){
    $(".modal").fadeOut(500);
    $(".modal").off("scroll touchmove mousewheel"); // 터치무브 및 마우스휠 스크롤 가능
});

//전시전 팝업열기

function openModal2(modalname){
    for(var i=0; i<6; i++){
        if(modalname == special_array[i][0]){
            $("#SPECIAL .full_sub_con .modal .modal_content img").attr("src",special_array[i][1]);
        $("#SPECIAL .full_sub_con .modal").fadeIn(500);
        }
    }

    $(".modal").on("scroll touchmove mousewheel", function(event){
            event.preventDefault();
            event.stopPropagation();
    });
}

//guide line

$(window).load(function(){
    $(document).keydown(function(event){
        var key = event.keyCode;
        if(key == 71){
            $(".guide_line").toggleClass("on");
        }
    });
});

//fish 패럴렉스

var w, h;
function resize(){
    w = $(window).width();
    h = $(window).height();
}
window.onresize = resize;

var p_fish_01_top,
    p_fish_01_left,
    p_fish_02_top,
    p_fish_02_left,
    p_fish_03_top,
    p_fish_03_left,
    p_fish_04_top,
    p_fish_04_left;

$(function(){
    resize();
    $("body").mousemove(function(event){
        var x = event.pageX, // 마우스 가로축 추출(왼쪽으로 갈수록 0)
            y = event.pageY; // 마우스 세로축 추출(윗쪽으로 갈수록 0)
        $(".mouse_x b").text(x);
        $(".mouse_y b").text(y);
        //마우스 좌표 추출

        p_fish_01_top  = h/2 - $(".p_fish_01").height()/2 + (h/2-y) * 0.0025;
        p_fish_01_left = w/2 - $(".p_fish_01").width()/2 + (w/2-x) * 0.0025;

        p_fish_02_top  = h/2 - $(".p_fish_02").height()/2 + (h/2-y) * 0.005;
        p_fish_02_left = w/2 - $(".p_fish_02").width()/2 + (w/2-x) * 0.005;

        p_fish_03_top  = h/2 - $(".p_fish_03").height()/2 + (h/2-y) * 0.01;
        p_fish_03_left = w/2 - $(".p_fish_03").width()/2 + (w/2-x) * 0.01;

        p_fish_04_top  = h/2 - $(".p_fish_03").height()/2 + (h/2-y) * 0.015;
        p_fish_04_left = w/2 - $(".p_fish_03").width()/2 + (w/2-x) * 0.015;

        $(".p_fish_01").css({top: p_fish_01_top, left: p_fish_01_left});
        $(".p_fish_02").css({top: p_fish_02_top, left: p_fish_02_left});
        $(".p_fish_03").css({top: p_fish_03_top, left: p_fish_03_left});
        $(".p_fish_04").css({top: p_fish_04_top, left: p_fish_04_left});
    });
});

//maps card-flip & reflect

$(function(){

    $("#MAPS.fullsection.full4 .full_con .flip .content .front").hover(function(){
        var $hover_li = $(this);
        $hover_li.on("mousemove", function(event){
            var x = event.pageX - $hover_li.offset().left - $(this).width()/2,
                y = event.pageY - $hover_li.offset().top - $(this).height()/2;
            $hover_li.css({transform:"perspective(1000px) rotateX("+(y/400)+"deg) rotateY("+(x/-500)+"deg)"}).find(".reflect").css({transform:"translate("+(x/2)+"px,"+(y/2)+"px)"});
        });
    },function(){
        $(this).css({transform:"perspective(1000px) rotateX(0deg) rotateY(0deg)"}).find(".reflect").css({transform:"translate(0,0)"});
        }
    );

    $(".btn_area").click(function(){
        $(".content").css({"transform": "rotateY( 180deg )", "transition": "all 1s ease-out"});
        var num = "0" + $("p", this).first().text();
        $(".back li").css("opacity", "0");
        $(".back li.back_bg").css("opacity", "1");
        $(".btn_plus").css("opacity", "0");
        $(".back_"+num).css("opacity", "1");
        $(".btn_"+num).css("opacity", "1");
        $("i.fa-arrow-alt-up").css("opacity", "0");
    }),
    $(".close2, #MAPS .cover").click(function(){
        $(".content").css({"transform": "rotateY( 0deg )", "transition": "all 1s ease-out"});
        $(".back li").css("opacity", "0");
        $(".btn_plus").css("opacity", "0");
    });

});




