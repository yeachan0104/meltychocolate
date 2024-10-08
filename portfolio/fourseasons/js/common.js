
/* --------------------------------loading-----------------------------------------*/
var random_no,
    loading_percent_no = 0;
function loading(){
    random_no = Math.random();
    random_no = String(random_no);
    random_no = random_no.substring(2,3);
    random_no = Number(random_no);
}
function loading_start(){
    var $loading_cover = $(".loading_cover");
    var repeat = setInterval(function(){
        if(loading_percent_no >= 300){
            $loading_cover.fadeOut(500,function(){
                $(this).remove();
            }).find(".progress").height(300);
            clearInterval(repeat);
            $("html, body").removeClass("lock_scroll");
        }else{
            loading();
            $loading_cover.find(".progress").height($loading_cover.find(".progress").height() + random_no);
        }
        loading_percent_no += random_no;
    }, 50);
}
/*------------------------------------------스크롤이벤트 시작--------------------------------------*/
history.scrollRestoration = "manual"; //스크롤을 최상단으로 이동시킴
var section_h = new Array(),
    underbar_left,
    underbar_width,
    current_scroll,
    wh
let ticking = false;
function moving_underbar(move){
    underbar_left = $("#header.section_01 .width_con ul.nav li").eq(move).find("a").position().left;
    underbar_width = $("#header.section_01 .width_con ul.nav li").eq(move).find("a").width();
    $("#header.section_01 .width_con ul.nav li.underbar").css({left:underbar_left, width:underbar_width});
}
function scrollevents(scrollPos){
    if(scrollPos >= 300){
        $("#header.section_01").addClass("scroll");
    }else{
        $("#header.section_01").removeClass("scroll");
    }
    
    if(scrollPos+120 >= section_h[11]){
        //alert("footer");
        moving_underbar(10);
    }else if(scrollPos+120 >= section_h[10]){
        //alert("contact");
        moving_underbar(9);
    }else if(scrollPos+120 >= section_h[9]){
        //alert("instagram");
        moving_underbar(8);
    }else if(scrollPos+120 >= section_h[8]){
        //alert("membership");
        moving_underbar(7);
    }else if(scrollPos+120 >= section_h[7]){
        //alert("service");
        moving_underbar(6);
    }else if(scrollPos+120 >= section_h[6]){
        //alert("amenities");
        moving_underbar(5);
    }else if(scrollPos+120 >= section_h[5]){
        //alert("forvip");
        moving_underbar(4);
    }else if(scrollPos+120 >= section_h[4]){
        //alert("offer");
        moving_underbar(3);
    }else if(scrollPos+120 >= section_h[3]){
        //alert("accommodation");
        moving_underbar(2);
    }else if(scrollPos+120 >= section_h[2]){
        //alert("reservation");
        moving_underbar(1);
    }else if(scrollPos+120 >= section_h[1]){
        //alert("reservation");
        moving_underbar(0);
    }
    video_stop(pageYOffset);
    offer_add_con(pageYOffset);
    setVisible($('#forvip.section_06 .width_con .title_con h2')); //비행기 스크롤 이동 효과
}
function show_whatever(el, current_scroll, wh){ //28번째 줄에서 각 매개변수에 .show_trigger, current_scroll, wh를 전달받음
    var el_offset_t = el.offset().top; //el_offset_t 변수에 .show_trigger의 y좌표값을 넣음
    if(current_scroll > el_offset_t - wh){ //현재 스크롤값이 .show_trigger의 y좌표값에서 내 창의 높이를 뺀 값보다 크면 -> 화면의 중앙에 도착하면
        el.parent().removeClass("wait_scroll"); //.show_trigger의 부모속성중에 wait_scroll class를 제거해라
        el.remove(); //현재의 .show_trigger를 선택해제
    }
}
function doSomething(scrollPos) {
    var wh =  $(window).height();//wh 변수에 내 창의 높이 넣음
    current_scroll = scrollPos; //current_scroll 변수에 현재 스크롤값을 넣음
    $(".show_trigger").each(function(){
        show_whatever($(this), current_scroll, wh);//show_whatever함수에 (.show_trigger, current_scroll, wh값을 전달)
    });
}
document.addEventListener('scroll', function(e) {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            scrollevents(window.scrollY);
            doSomething(window.scrollY);
            ticking = false;
        });
        ticking = true;
    }
});
/*---------------------------다른부분 이동시 움직임---------------------*/
/* 헤더메뉴 여러번 클릭했을때 클릭효과 멈춰줌*/
$(document).on('click', 'a[href^="#"]', function(event){
    event.preventDefault();
    $("html,body").stop().animate({
        scrollTop: $($.attr(this, 'href')).offset().top
    }, 2000,'easeInOutCubic');
});
/*------------------------------------스크롤이벤트 끝-------------------------*/
/*-----------------------section_02 visual-----section_05 offer---------------------------------------*/
var video_con_01 = "";
var video_con_02 = "";
var once_up = true;
var once_down = true;

let video_01_interval = setInterval(function(){
    $("#video_con_01").attr("src",video_con_01);
},20 * 1000);

let video_02_interval = setInterval(function(){
    $("#video_con_02").attr("src",video_con_02);
},25 * 1000);

function video_stop(a){
    if(a >= 0 && a <= section_h[1] && once_up){
        $("#visual.section_02 iframe#video_con_01").attr('src',video_con_01);
        $("#offers.section_05 .video_con iframe#video_con_02").attr('src','');
        once_up = false;
        once_down = true;
        clearInterval(video_01_interval);
        clearInterval(video_02_interval);
        video_01_interval = setInterval(function(){
        $("#video_con_01").attr("src",video_con_01);
        },25 * 1000);
    }else if(a >= section_h[2] && a <= section_h[3] && once_down){
        $("#offers.section_05 .video_con iframe#video_con_02").attr('src',video_con_02);
        $("#visual.section_02 iframe#video_con_01").attr('src','');
        once_up = true;
        once_down = false;
        clearInterval(video_01_interval);
        video_02_interval = setInterval(function(){
        $("#video_con_02").attr("src",video_con_02);
    },35 * 1000);
    }
}
function plus_minus (minimum,maximum,element){
    var nb = Number((element.parent().find("h5").text()));
    if(nb >= minimum && nb <= maximum){
        if(element.hasClass('fa-plus') && nb < maximum){
            nb += 1;
        }else if(element.hasClass('fa-minus') && nb > minimum){
            nb -= 1;
        }
    }
    if(nb == minimum || nb == maximum){
        element.addClass("limit");
    }else if(nb > minimum && nb < maximum){
        element.parent().find("i").removeClass("limit");
    }
    element.parent().find("h5").text(nb);    
};
$(function(){
/*----------------------------------section_03 reservation----------------------------------- */    
    var count = "#reservation.section_03 .width_con .wrap .info_con .info.count i";
    $(count).click(function(){
        var $this = $(this);
        if($this.parent().hasClass("zero")){
            plus_minus(0,9,$this);
        }else{
            plus_minus(1,9,$this);
        }
    });
       $("#datepicker").datepicker({
           dateFormat: 'dd-mm-yy', //달력 날짜 형태
           showOtherMonths: true,//빈 공간에 현재월의 앞뒤월의 날짜를 표시
           changeYear: true, //option값 년 선택 가능
           changeMonth: true //option값  월 선택 가능
        });
       //초기값을 오늘 날짜로 설정해줘야 합니다.
       $('#datepicker').datepicker('setDate', 'today');
       $("#datepicker2").datepicker({
           dateFormat: 'dd-mm-yy',
           showOtherMonths: true,
           changeYear: true,
           changeMonth: true,
           minDate: "+1D"
        });
       $('#datepicker2').datepicker('setDate', 'today');
/*--------------section_04 accommodations 이미지 슬릭--------------------------*/
    $('#accommodations.section_04 .width_con .accommo .contents .inner').slick({
        focusOnSelect : true,
        dots: true,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        speed: 500,
        fade: true,
        variableWidth: true
    });
    /*------------------section_07 amenities 이미지 슬릭-------------------------*/
    $("#amenities.section_07 .width_con .slider").slick({
        slidesToShow: 3,
        arrows: true,
        dots: false,
        centerMode: true,
        centerPadding:'0px',
        focusOnSelect : true
    });
/*---------------------section_08 서비스 변경------------------------------------------*/
    var $main = $("#service.section_08 .width_con"),
        $title_top = $("#service.section_08 .width_con .title_con.left h4"),
        $title_bottom = $("#service.section_08 .width_con .title_con.right h4"),
        $border =$("#service.section_08 .width_con .sub .border"),
        service_change_time = 250; //fadeIn,fadeOut 각 250ms씩    
    var text_border = [  //2차원 배열 생성, 데이터 추가 7x3 배열
        ["윗 설명","아랫 설명"], //배열은 0부터 시작이므로 햇갈리지않게 0번째배열을 주석처럼 사용
        ["1","We service the finest location for the wedding of your dreams.<br>FOUR SEASONS is with you for a beautiful wedding,<br>befitting an event that only happens once in a lifetime.","Our wedding specialists are more than wedding-day coordinators.<br>By learning about you, your relationship, your style and your preferences,<br>you and your wedding specialist are sure to form a personal bond.<br>From invitations to decorations, floral creations to cakes,<br>you can trust us to simplify the entire planning process and make your dream wedding a reality."],
        ["2","The casino is equipped with facilities for a wide variety of games<br>from which guests can choose, including roulette, blackjack, baccarat. Enjoy the thrill of casino games at the luxurious Seven Luck Casino !","Location : 3F<br>Hours : 24 Hours<br>Number of game tables/machines<br>Seven Luck Casino is only open to foreigners.<br>- Baccarat: 30 - Blackjack: 8 - Roulette: 4 - Poker: 2<br>- Slot machines: 116<br>"],
        ["3","Join a group class in the Pilates studio, work on your flexibility in our spacious stretching zone,go at your own pace on our state-of-the-art, cardiovascular equipment and weight machines.","Location : 3F<br>Operating Hours : Fitness 07:00 ~ 22:00<br>Information : Free use when using the room<br>Reservations and Inquiries : 82 32 743 9090<br>"],
        ["4","Unwind after a busy day with<br> an evening cocktail and light supper buffet<br>in this elegant lounge designed specifically for the business traveller.","After a busy day in the city, our Executive Club Lounge is the perfect place to relax and unwind with an evening cocktail and a light supper buffet while admiring spectacular views of Seoul. You’ll also find a hot breakfast buffet, all-day refreshments and afternoon tea served daily."],
        ["5","Have your business meetings and family gatherings<br>at four seasons hotel, where a modern atmosphere<br>and independent rooms will make events shine.","The restaurant is divided into eight live stations, including Asian cuisine, Japanese cuisine, Western cuisine, a noodle bar, cold meals, Korean grill, desserts, and drinks so that guests can sample exquisite dishes<br>from around the world."],
        ["6","The bakery, which is carefully baked every morning in the hotel bakery kitchen and served fresh, is filled with bread and beautiful cakes containing taste and health through the know-how of the hotel patissier.","LOUNGE | 07:30 - 20:30<br>LOUNGE 64 seats<br>※ Coffee & Beverage Take Out 50% off<br>※ 20% off bakery after 6pm"]
    ];
    function change_service(n){
        $main.find(".main_01").css({background: "url(img/service/img_service_0"+n+"_a.jpg) 50% no-repeat", backgroundSize: "cover"});
        $main.find(".main_02").css({background: "url(img/service/img_service_0"+n+"_b.jpg) 50% no-repeat", backgroundSize: "cover"});
        //width_con에서 main_01과 main_02를 찾아서 css를 변경 change_service에서 n을 변수로 받아서 url에 대입
        $title_top.fadeOut(service_change_time,function(){ //fadeOut 변수로 바뀌는 시간을 받아서 실행(시간만큼 천천히 사라짐)
            $(this).html(text_border[n][1]).fadeIn(service_change_time); //this=title_top의 html을 배열의 n행 1열로 바꾸고 변수로 준 시간만큼 fadeIn
        });
        $title_bottom.fadeOut(service_change_time,function(){
            $(this).html(text_border[n][2]).fadeIn(service_change_time);//this=title_bottom의 html을 배열의 n행 2열로 바꾸고 변수로 준 시간만큼 fadeIn
        });
               
        /*테두리 박스 생성, 제거*/
        $border.find(".border_box").removeClass("show").eq(n - 1).addClass("show"); // 눌러진 박스에 show 추가
        $border.removeClass("point").eq(n - 1).addClass("point"); //눌러진 박스에 point 추가
    }
    change_service(1); //기본 값으로 n에 1을 넣어주어서 첫번째 배열들의 정보가 나타나게됨    
    $("#service.section_08 .width_con .border").click(function(){ //.border 클래스 클릭시 함수 실행
        var btn_no = $(this).find("img").attr("src");//btn_no에 boder클래스에서 img 태그를 찾고 속성 src의 정보를 저장
            btn_no = btn_no.replace(/img\/service\/img_service_0/g,"").replace(/_c.jpg/g,"");
        //저장된 src에서 img\/service\/img_service_0을 제외한 나머지 부분을 남기고 다시 _c.jpg를 제거하여 중앙의 숫자만 저장
        change_service(btn_no); //추출한 번호를 change_service에 변수로 주어서 위의 함수를 실행시킴 
    });
    /* -----------------section_09 Membership 카드 슬릭------------------------*/
    function flip_reset(a,b){        //함수 선언(변수는 a, b)
        if(a != b){  //a와 b 가 같지 않다면 > 카드의 위치를 특정하기 위한 조건
            $(".flip").removeClass("flip"); // 모든  flip 클래스에서 flip 을 제거
        }
    }
    var this_flip_slide_before = 0;
    var this_flip_slide_after = 0;  //변수를 0으로 초기화
    $('#membership.section_09 .width_con .cards_slider').slick({ //.card_slider를 슬릭함수로 실행
        slide: 'div',    //div 를 슬라이드화
        centerMode: true,  // 중앙으로 위치시키는
        centerPadding: '0px', //중앙의 패딩값 설정
        slidesToShow: 3,    //한번에 보여지는 슬라이드 수
        focusOnSelect: true,  //focus 될 때 이벤트 발동 되도록 설정
        dots: true,
        arrows: false,
        swipeToSlide: true
        
    }).on("beforeChange", function(){ //beforeChange 시작전에 바꿔줌 > slick-center의 인덱스 수로
        this_flip_slide_before = $("#membership.section_09 .width_con .cards_slider .card.slick-center").index();
    }).on("afterChange", function(){ //이후에 바꿔줌 > slick-center 의  인덱스 수
        this_flip_slide_after = $("#membership.section_09 .width_con .cards_slider .card.slick-center").index();
        flip_reset(this_flip_slide_before, this_flip_slide_after); //flip_reset 의 함수 변수를 재 설정
    });
    //flip 클래스가 남아있는것을 방지하기 위한 함수 식
    $(document).on("mouseup","#membership.section_09 .width_con .cards_slider .card.slick-center",function(){
        if(!$(this).hasClass("flip")){ //flip 클래스를 가지고 있지 않다면
            $(this).addClass("flip"); //flip 클래스 추가
        }else{  //가지고 있다면 제거
            $(this).removeClass("flip");
        }
    });
    $(document).on('click', 'a[href^="#"]', function(event){
        event.preventDefault();
        $("html,body").stop().animate({
            scrollTop: $($.attr(this, 'href')).offset().top
        }, 2000,'easeInOutCubic');
    });
/*-----------------------section_11 contact----------------------------------------*/
    var map_border= [
    ["이미지경로","맵src","주소","번호"],
        ["1","img/img_contact_01.jpg","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.3357878237157!2d126.97322561591326!3d37.570709979797115!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357ca2932e4b46ef%3A0xbc18b3d1ec10a17a!2sFour%20Seasons%20Hotel%20Seoul!5e0!3m2!1sen!2skr!4v1665022730918!5m2!1sen!2skr","97 Saemunan-ro, Jongno-gu, Seoul","+82 (2) 6388-5000<br>+82 (2) 6388-5000<br>+82 (2) 6388-5000"],
        ["2","img/img_contact_02.jpg","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3268.6376356612686!2d135.7739851158616!3d34.99074028036097!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x600108cbf1f3175d%3A0x9ee84eec6cef1ded!2sFour%20Seasons%20Hotel%20Kyoto!5e0!3m2!1sen!2skr!4v1665022467567!5m2!1sen!2skr","445-3, Myohoin, Myohoin Maekawacho<br>Higashiyama Ward, Kyoto, 605-0932, Japan","+81 3-5222-7222<br>+81 3-5222-7222<br>+81 3-5222-7222"],
        ["3","img/img_contact_03.jpg","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3058.594672458647!2d116.46501081596348!3d39.950455279422044!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x35f1ac81800ce6ab%3A0x2359d82fdc5e6276!2sFour%20Seasons%20Beijing!5e0!3m2!1sen!2skr!4v1665022584776!5m2!1sen!2skr","China, Beijing, Chaoyang, 100125","+86 10 5695 8888<br>+86 10 5695 8888<br>+86 10 5695 8888"]
    ];
    $("#contact.section_11 .width_con .box div.contact_logo i").click(function(){
        $("#map_con").attr("src","https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13512624.561322931!2d121.4885126649071!3d34.22351359051828!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x356455ebcb11ba9b%3A0x91249b00ba88db4b!2sSouth%20Korea!5e0!3m2!1sen!2skr!4v1665023049535!5m2!1sen!2skr").fadeOut(250).fadeIn(250);
        $("#contact.section_11 #marker").removeClass("show");
        $("#contact.section_11 .width_con .box_info_con").removeClass("show");
        $("#contact.section_11 .width_con .box_menu").addClass("show");
    });
    $("#contact.section_11 .width_con .box_menu div").click(function(){
        $("#contact.section_11 #marker").addClass("show");
        $("#contact.section_11 .width_con .box_info_con").addClass("show");
        $("#contact.section_11 .width_con .box_menu").removeClass("show");
        var click_no = $(this).parent().find("div").index(this) + 1;
        $("#contact.section_11 .width_con .box_info_con .contact_img").attr("src",map_border[click_no][1]);
        $("#map_con").attr("src",map_border[click_no][2]).fadeOut(250).fadeIn(250);
        $("#contact.section_11 .width_con .box .box_info .title_con h5.adress").html(map_border[click_no][3]);
        $("#contact.section_11 .width_con .box .box_info .title_con h5.number").html(map_border[click_no][4]);
    });
/*-------------------section_12 Footer 계열사로고 효과------------------------*/
    $("#footer.section_12 .width_con .img_slide div").each(function(){
        var menu_with_sum = 0;
        var $this = $(this);
        $this.html($this.html()+$this.html()+$this.html());
        //$this.width($this.find("img").length * $this.find("img").outerWidth())
        for(i=0; i < $this.find("img").length; i++){
            menu_with_sum += $this.find("img").eq(i).outerWidth();
        }
        $this.width(menu_with_sum);
    });
});
/*-------------------section_05 offer--------------------------------*/
function offer_add_con(a){
    if( a >= section_h[4] - 1100){
        $('#offers.section_05 .width_con .img_con .img_offer').css({transform:"translateY("+(116 * -1)+"px)", opacity:1});
    }
    /*
    else if(true == false){
        $('#offers.section_05 .width_con .img_con .img_offer').css({transform:"translateY("+(190)+"px)", opacity:0}); //렘 용량을 아끼기 위해 사용하지않으면 스타일 초기화
        }
        */
    }
/*---------------------- section_06 For Vip 비행기 날라가는 효과-----------------*/
function setVisible(a){
    if( a.length > 0 ){
        var stdPos = $(window).scrollTop() + $(window).height() - ($(window).height() / 3); //현재 스크롤 위치+ 총 높이 - (총높이 /3 )
        var position_var = (stdPos-a.offset().top)/6; 
        if( stdPos > a.offset().top - 200 && stdPos-a.offset().top < 1200){//a(h1 태그의 높이값)에서 200을 뺀(비행기 동작을 미리 보여주기위해) && 비행기 section 가장 아랫부분을 넘기지 않으면서
            //a.addClass('on');
            $('#forvip.section_06 .width_con img').css({transform:"translate("+position_var+"px,"+(position_var*-1)+"px)"});
        }else{
            $('#forvip.section_06 .width_con img').attr("style",""); //렘 용량을 아끼기 위해 사용하지않으면 스타일 초기화
        }
    }
}
// .scrollTop() 현재보이는 브라우저의 스크롤바 수직 위치 , $(window).height() 현재 보이는 브라우저의 높이 
// ($(window).height() / 3) 나누기3이유?? > 화면의 3분의 2지점에서 실행되게 하기위해서
// offset().top: 화면상에서 특정 요소의 y축 위치
/* ---------------------------스크롤이벤트 헤더 메뉴별 높이구하기--------------------------*/
$(window).load(function(){
    loading_start();
    scrollevents(0);
    section_h.push(0);
    for(i=1; i<=$(".sections").length;i++){
        section_h.push(section_h[i-1] + $(".sections").eq(i).height());
    }
    moving_underbar(0);
    video_con_01 = $("#video_con_01").attr("src");
    video_con_02 = $("#video_con_02").attr("src");
});