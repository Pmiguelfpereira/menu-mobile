//Desenvolvido por Pedro Pereira
var myarray = new Array();

// CSS ANIMATION EFFECTS CREDITS: https://daneden.github.io/animate.css/
var csseffectshow = "fadeIn";
var csseffecthide = "fadeOut";
var csseffecthideul = "fadeOutLeft";
var csseffectshowli = "fadeInRight";
var cssreverseeffecthideul = "fadeOutRight";
var cssreverseeffectshowli = "fadeInLeft";
var csseffecthidetitle = "fadeOut";
var csseffectshowtitle = "fadeIn";

// END ANIMATION
function searchli(clone, mid, mfather) {
    clone.children("li").each(function () {
        if ($(this).children("ul").length > 0) {
            var parentElement = $(this).clone();
            ultitle = parentElement.children('a').text();
            mid = mid + 1;
            $(this).append("<div id='next_m_" + mid + "' class='m_arrow-lf'><img src='/imgs/arrow.svg'></div>");
            cloneul = $(this).children("ul").clone().attr({
                'id': "menu_" + mid,
                'data-father': mfather,
                'class': 'mob_ul',
                'data-title': ultitle
            });

            $(this).find("ul").remove();
            cloneresult = searchli(cloneul, (mid + 1), mid);
            if (cloneresult != 0) {
                myarray.push(cloneresult);
            }
        } else {
            return 0;
        }
    });
    return clone;
}

function buildmenu(idul) {
    //Index para os menus
    var mfather = 0;
    var mid = 0;
    var divname = "m_ul_ct";
    myarray = [];

    $("body").prepend('<div id="m_top"><div id="m_content"><div id="m_title">Menu</div><div id="' + divname + '"></div><div id="m_bottom"><a class="btn_back" id="back_' + mfather + '_' + mid + '">Voltar</a></div></div></div>');

    colneul = $("#" + idul).clone().attr({
        'id': "menu_" + mid,
        'data-father': mfather,
        'class': 'mob_ul',
        'data-title': 'Menu'
    });

    colneul = searchli(colneul, mid, mfather);

    $("#" + divname).append(colneul);

    myarray.forEach(function (item) {
        $("#" + divname).append(item);
    });
}

function effectshowli(id, reverse=0) {
    var effect = csseffectshowli;
    if(reverse){
        effect = cssreverseeffectshowli;
    }
    
    setTimeout(function(){ 
        //Animation Show ul
        $("#menu_" + id).show();
        $("#menu_" + id).addClass("" + effect + " animated ");
        $("#menu_" + id).one(
            "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
            function () {
                $("#menu_" + id).removeClass("" + effect + " animated ");
            }
        );
}, 800);


}

function effecthideul(id , reverse=0) {
    var effect = csseffecthideul;
    if(reverse){
        effect = cssreverseeffecthideul;
    }
    //Animation Hide Menu
    $("#menu_" + id).addClass(" "+ effect +" animated ");
    $("#menu_" + id).one(
        "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        function () {
            $("#menu_" + id).removeClass(""+ effect +" animated ");
            $("#menu_" + id).hide();
        }
    );
}


function effectitle(val){
    $("#m_title").addClass(""+csseffecthidetitle+" animated ");
    $("#m_title").one(
        "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        function () {
            $("#m_title").removeClass(""+csseffecthidetitle+" animated ");
            $("#m_title").html(val);
            $("#m_title").addClass(""+csseffectshowtitle+" animated ");
            $("#m_title").one(
                "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
                function () {
                    $("#m_title").removeClass(""+csseffectshowtitle+" animated ");
                }
            );
        }
    );
}

function nextm(id) {
    if ($("#menu_" + id).length > 0) {
        var father = $("#menu_" + id).attr("data-father");
        $(".btn_back").attr("id", "back_" + father + "_" + id);
        effecthideul(father);
        effectshowli(id);
        effectitle($("#menu_" + id).attr('data-title'));
    }
}

function backm(back) {
    if ($("#menu_" + back[1]).length > 0 && $("#menu_" + back[1]).is(":hidden")) {
        effecthideul(back[2],1);
        effectshowli(back[1],1);
        effectitle($("#menu_" + back[1]).attr('data-title'));

    } else {
        $('body').removeClass('m_open');
        //Animation Hide Menu
        $("#m_top").addClass(""+csseffecthide+" animated ");
        $("#m_top").one(
            "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
            function () {
                $("#m_top").removeClass(""+csseffecthide+" animated ");
                $("#m_top").hide();
            }
        );
    }
}

function open_menu() {
    $('body').addClass('m_open');
    $("#m_top").show();
    //Animation Show Menu
    $("#m_top").addClass(""+csseffectshow+" animated ");
    $("#m_top").one(
        "animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",
        function () {
            $("#m_top").removeClass(""+csseffectshow+" animated ");
        }
    );

}

$(document).ready(function () {
    if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent) ||
        /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {
        id_ul = "menuprinc";
        buildmenu(id_ul);

        $('#trigger-menu').on("click", function () {
            open_menu();
        });

        $('.m_arrow-lf').on("click", function () {
            nextm($(this).attr('id').split("_").pop());
        });

        $('.btn_back').on("click", function () {
            backm($(this).attr('id').split("_"));
        });

    }
});
