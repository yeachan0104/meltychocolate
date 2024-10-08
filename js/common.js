
/*---------Loading-----------*/
$(window).on('load', function () {
    setTimeout(function () {
        $("#loading").fadeOut(800, function () {
            $("#visual").removeClass("wait")
            $("body").removeClass("lock")
        });
    }, 4000);
});

/*새로고침 시 페이지 최상단 이동*/
history.scrollRestoration = "manual";
/*---전역변수---*/
var ticking = false;
/*---------Scroll Event-----------*/
document.addEventListener('scroll', function (e) {
    var wh = $(window).height();
    var current_scroll = window.scrollY;
    if (!ticking) {
        window.requestAnimationFrame(function () {
            scroll_nav(current_scroll);
            ticking = false;
        });
        ticking = true;
    }
    /*-----show_trigger-----*/
    $(".show_trigger").each(function () {
        var trigger = $(this).offset().top;
        if (current_scroll > (trigger - wh)) {
            $(this).parent().removeClass("wait_scroll");
            $(this).remove();
        }
        if (current_scroll >= 80) {
            $("#header").addClass("scroll");
        } else {
            $("#header").removeClass("scroll");
        }
    });
});

/*-------scroll_nav---------*/
function scroll_nav(scroll_y) {
    var section_h = new Array();
    section_h[0] = 0;
    $(".sections").each(function (i) {
        section_h[i] = $(this).height();
    });
    for (var i = 0; i < $(".sections").length; i++) {
        section_h[i + 1] = section_h[i] + section_h[i + 1];
    }
    if (scroll_y + 80 > section_h[3]) {
        //alert("contact");
    } else if (scroll_y + 80 > section_h[2]) {
        //alert("portfolio");
    } else if (scroll_y + 80 > section_h[1]) {
        //alert("skill");
    } else if (scroll_y + 80 > section_h[0]) {
        //alert("about");
    } else if (scroll_y < section_h[0]) {
    }
}
/*--nav 클릭시 움직임---*/
$(document).on('click', 'a[href^="#"]', function (event) {
    event.preventDefault();
    $("html,body").stop().animate({
        scrollTop: $($.attr(this, 'href')).offset().top - 78
    }, 800, 'easeInOutCubic');
});

/*--popup---*/
$(window).load(function () {
    $("#content_04.section_06 .width_con ul li.box_01").each(function () {
        $(this).click(function () {
            $("#content_04.section_06 .width_con .popup .main_img img").attr("src", "img/product_01_01.jpg");
            for (i = 0; i < 6; i++) {
                $("#content_04.section_06 .width_con .popup .v_con.four_con2 li img").eq(i).attr("style", "background: url(img/product_01_0" + (i + 1) + ".jpg) 50% no-repeat; background-size: cover;");
            }
            $("#content_04.section_06 .width_con .popup .v_con.four_con2").css({ "overflow-y": "hidden" });
            $("#content_04.section_06 .width_con .close, #content_04.section_06 .width_con .popup").addClass("on");
            $("#content_04.section_06 .width_con .popup .main_img h1").text("Print & Product Design");
            $("body").addClass("load");
            $("#content_04.section_06 .width_con .popup .v_con.four_con2 li").each(function () {
                $(this).click(function () {
                    var current_idx = $(this).index();
                    $("#content_04.section_06 .width_con .popup .main_img img").attr("src", "img/product_01_0" + (current_idx + 1) + ".jpg");
                    $("#content_04.section_06 .width_con .popup .main_img").scrollTop(0);
                });
            });
        });
    });
    $("#content_04.section_06 .width_con ul li.box_02").each(function () {
        $(this).click(function () {
            $("#content_04.section_06 .width_con .popup .main_img img").attr("src", "img/product_02_01.jpg");
            for (i = 0; i < 6; i++) {
                $("#content_04.section_06 .width_con .popup .v_con.four_con2 li img").eq(i).attr("style", "background: url(img/product_02_0" + (i + 1) + ".jpg) 50% no-repeat; background-size: cover;");
            }
            $("#content_04.section_06 .width_con .popup .v_con.four_con2").css({ "overflow-y": "hidden" });
            $("#content_04.section_06 .width_con .close, #content_04.section_06 .width_con .popup").addClass("on");
            $("#content_04.section_06 .width_con .popup .main_img h1").text("Graphic Design");
            $("body").addClass("load");
            $("#content_04.section_06 .width_con .popup .v_con.four_con2 li").each(function () {
                $(this).click(function () {
                    var current_idx = $(this).index();
                    $("#content_04.section_06 .width_con .popup .main_img img").attr("src", "img/product_02_0" + (current_idx + 1) + ".jpg");
                    $("#content_04.section_06 .width_con .popup .main_img").scrollTop(0);
                });
            });
        });
    });
    $("#content_04.section_06 .width_con ul li.box_03").each(function () {
        $(this).click(function () {
            $("#content_04.section_06 .width_con .popup .main_img img").attr("src", "img/product_03_01.jpg");
            for (i = 0; i < 6; i++) {
                $("#content_04.section_06 .width_con .popup .v_con.four_con2 li img").eq(i).attr("style", "background: url(img/product_03_0" + (i + 1) + ".jpg) 50% no-repeat; background-size: cover;");
            }
            $("#content_04.section_06 .width_con .close, #content_04.section_06 .width_con .popup").addClass("on");
            $("#content_04.section_06 .width_con .popup .main_img h1").text("Infomation Design");
            $("body").addClass("load");
            $("#content_04.section_06 .width_con .popup .v_con.four_con2 li").each(function () {
                $(this).click(function () {
                    var current_idx = $(this).index();
                    $("#content_04.section_06 .width_con .popup .main_img img").attr("src", "img/product_03_0" + (current_idx + 1) + ".jpg");
                    $("#content_04.section_06 .width_con .popup .main_img").scrollTop(0);
                });
            });
        });
    });
    $("#content_04.section_06 .width_con ul li.box_04").each(function () {
        $(this).click(function () {
            $("#content_04.section_06 .width_con .popup .main_img img").attr("src", "img/product_04_01.jpg");
            for (i = 0; i < 6; i++) {
                $("#content_04.section_06 .width_con .popup .v_con.four_con2 li img").eq(i).attr("style", "background: url(img/product_04_0" + (i + 1) + ".jpg) 50% no-repeat; background-size: cover;");
            }
            $("#content_04.section_06 .width_con .popup .v_con.four_con2").css({ "overflow-y": "hidden" });
            $("#content_04.section_06 .width_con .close, #content_04.section_06 .width_con .popup").addClass("on");
            $("#content_04.section_06 .width_con .popup .main_img h1").text("WEB & APP Design");
            $("body").addClass("load");
            $("#content_04.section_06 .width_con .popup .v_con.four_con2 li").each(function () {
                $(this).click(function () {
                    var current_idx = $(this).index();
                    $("#content_04.section_06 .width_con .popup .main_img img").attr("src", "img/product_04_0" + (current_idx + 1) + ".jpg");
                    $("#content_04.section_06 .width_con .popup .main_img").scrollTop(0);
                });
            });
        });
    });
    $("#content_04.section_06 .width_con ul li").click(function () {
        document.body.style = "overflow: hidden";
    });
    $("#content_04.section_06 .width_con .close, #content_04.section_06 .width_con .popup .btn_close, #content_04.section_06 .popupcover").click(function () {
        $("#content_04.section_06 .width_con .popup .v_con.four_con2").css({ "overflow-y": "scroll" });
        $("#content_04.section_06 .width_con .popup .v_con.four_con2").scrollTop(0);
        $("#content_04.section_06 .width_con .close, #content_04.section_06 .width_con .popup").removeClass("on");
        $("body").removeClass("load");
        document.body.style = "overflow: auto";
    });
});

var lastScrollTop = 0, delta = 15;

$(window).scroll(function () {
    var scrollTop = $(this).scrollTop() /* 스크롤바 수직 위치를 가져옵니다, 괄호 안에 값(value)이 있을 경우 스크롤바의 수직 위치를 정합니다. */
    // Math.abs: 주어진 숫자의 절대값을 반환(return)합니다.
    if (Math.abs(lastScrollTop - scrollTop) <= delta) // 스크롤 값을 받아서 ~
        return; // ~ 리턴

    if ((scrollTop > lastScrollTop) && (lastScrollTop > 0)) {
        /* 화면에 나오지 않을 때, top값은 요소가 보이지 않을 정도로 사용해야함 */
        $("#header").css("top", "-80px");
    } else {
        $("#header").css("top", "0px");
    }
    lastScrollTop = scrollTop;
});