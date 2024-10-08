/*----------------------roading cover--------------------------*/
var random_no;
var loading_percent_no = 0;

function loading() {
  random_no = Math.random();
  random_no = String(random_no);
  random_no = random_no.substring(2, 3);
  random_no = Number(random_no);
}
function loading_start() {
  var $loading_cover = $(".loading_cover");
  var repeat = setInterval(function () {
    if (loading_percent_no >= 300) {
      $(".loading_cover").css("opacity", "1");
    }
    if (loading_percent_no >= 350) {
      $loading_cover
        .fadeOut(500, function () {
          $(this).remove();
          $("body").removeClass("scroll_lock");
        })
        .find(".progress")
        .width(300);
      clearInterval(repeat);
    } else {
      loading();
      $loading_cover
        .find(".progress")
        .width($loading_cover.find(".progress").width() + random_no);
    }
    loading_percent_no += random_no;
  }, 50);
}
$(window).load(function () {
  loading_start();
});

history.scrollRestoration = "manual";
/*----------------------togle--------------------------*/
$(function () {
  $(".btn_open_nav").click(function () {
    $("body").toggleClass("open_nav");
  });
});
/*----------------section_01 slick----------------------*/
$(function () {
  $("#visual.section_01 .slider").slick({
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
  });
});
/*---------------section_03 slick-----------------------*/
$(function () {
  $("#Chocolate.section_03 .slider").slick({
    dots: true,
    arrows: true,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 3500,
    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          centerMode: false,
        },
      },
    ],
  });
});

/*---------------section_04 tab menu--------------------*/
$(window).load(function () {
  $(".tabs li").click(function () {
    var tab_id = $(this).attr("data-tab");

    $(".tabs li").removeClass("selected");
    $(".tab_content").removeClass("selected");

    $(this).addClass("selected");
    $("#" + tab_id).addClass("selected");
  });
});
/*------------section_05 bg parallax--------------------*/
let ticking = false;
function parallax_bg_moving(scrollPos) {
  $(".section_05 > div .bg").each(function () {
    var this_position_y = $(this).parent("div").offset().top;
    var this_position_arrive = (this_position_y - scrollPos) / 3;
    $(this).css({
      transform: "translateY(" + this_position_arrive + "px)",
    });
  });
}
document.addEventListener("scroll", function (e) {
  if (!ticking) {
    window.requestAnimationFrame(function () {
      parallax_bg_moving(window.scrollY);
      ticking = false;
    });
    ticking = true;
  }
});
/*------------section_09 slick------------------------------*/
$(function () {
  $("#history.section_09 .slider_box .slider").slick({
    dots: true,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3500,
  });
});
/*------------section_08 Instagram modal--------------------*/
$(function () {
  // Modal을 가져옵니다.
  var modals = document.getElementsByClassName("modal");
  // Modal을 띄우는 클래스 이름을 가져옵니다.
  var btns = document.getElementsByClassName("view_more");
  // Modal을 닫는 close 클래스를 가져옵니다.
  var spanes = document.getElementsByClassName("close");
  var funcs = [];

  // Modal을 띄우고 닫는 클릭 이벤트를 정의한 함수
  function Modal(num) {
    return function () {
      // 해당 클래스의 내용을 클릭하면 Modal을 띄웁니다.
      btns[num].onclick = function () {
        modals[num].style.display = "block";
        console.log(num);
        $("html").css({
          overflow: "hidden",
          height: "100%",
        });
      };

      // <span> 태그(X 버튼)를 클릭하면 Modal이 닫습니다.
      spanes[num].onclick = function () {
        modals[num].style.display = "none";
        $("html").removeAttr("style");
      };
    };
  }

  // 원하는 Modal 수만큼 Modal 함수를 호출해서 funcs 함수에 정의합니다.
  for (var i = 0; i < btns.length; i++) {
    funcs[i] = Modal(i);
  }

  // 원하는 Modal 수만큼 funcs 함수를 호출합니다.
  for (var j = 0; j < btns.length; j++) {
    funcs[j]();
  }

  // Modal 영역 밖을 클릭하면 Modal을 닫습니다.
  window.onclick = function (event) {
    if (event.target.className == "modal") {
      event.target.style.display = "none";
      $("html").removeAttr("style");
    }
  };
});
