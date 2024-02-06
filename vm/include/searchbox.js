/***************************************************/
/* searchbox.js copyright M,Muto. 2008-            */
/***************************************************/

// 検索ボックスを表示する
function initSearchBox( no, obj1, obj2, obj3, obj4, obj5 ) {

    // 一度すべての検索ボックスを閉じる
    closeSearchBox();

    // 検索対象識別コード
    // 検索ボックスはカレンダー表示のみで使用
    switch( no ) {
    case 1: // カレンダー表示
        
        var boxOffsetX = 0;
        var boxOffsetY = 0;
        
        // カレンダの上下左右表示位置を取得
        var listFlag = jQuery(obj1).parents("#bodyTableDiv").length;
        var leftFlag = true;
        var topFlag = true;
        var winWidth = $('html').width();
        if ( winWidth < event.clientX + 180 ) {
            // 右表示
            leftFlag = false;
        }
        var winHeight = $(window).height();
        if ( winHeight < event.clientY + 270 ) {
            if ( event.clientY >  230 ) {
                // 下表示
                topFlag = false;
            }
        }

        // 位置の設定
        var adjustX = -35;
        var adjustY = 5;
        if ( !leftFlag ) {
            adjustX = -180;
        }
        if ( !topFlag ) {
            adjustY = -310;
        }
        try {
            var calBoxPointX = (document.documentElement.scrollLeft || document.body.scrollLeft) + event.clientX + adjustX + boxOffsetX;
            var calBoxPointY = (document.documentElement.scrollTop || document.body.scrollTop) + event.clientY + adjustY + boxOffsetY;
        } catch( e ) {
            return;
        }

        getObj("CALENDARBOX").allowTransparency = true;
        getObj("CALENDARBOX").style.left=(calBoxPointX)+"px";
        getObj("CALENDARBOX").style.top=(calBoxPointY)+"px";
        getObj("CALENDARBOX").contentWindow.targetDate = obj1;
        getObj("CALENDARBOX").contentWindow.setToday();
        // 矢印の位置指定
        getObj("CALENDARBOX").contentWindow.getObj("Triangluar").style.textAlign = "left";
        getObj("CALENDARBOX").contentWindow.getObj("Triangluar_bottom").style.textAlign = "left";
        getObj("CALENDARBOX").contentWindow.getObj("triangluar_img_top").style.visibility = "visible";
        getObj("CALENDARBOX").contentWindow.getObj("triangluar_img_bottom").style.visibility = "hidden";
        if ( !leftFlag ) {
            getObj("CALENDARBOX").contentWindow.getObj("Triangluar").style.textAlign = "right";
            getObj("CALENDARBOX").contentWindow.getObj("Triangluar_bottom").style.textAlign = "right";
        }
        if ( !topFlag ) {
            //getObj("CALENDARBOX").style.height = "260px";
            getObj("CALENDARBOX").contentWindow.getObj("triangluar_img_top").style.visibility = "hidden";
            getObj("CALENDARBOX").contentWindow.getObj("triangluar_img_bottom").style.visibility = "visible";
        }

        if( chkDate(obj1.value,false) ) {
            targetDateString = convertYY_MM_DDtoYYMMDD(obj1.value);
            targetYear  = Number(targetDateString.substring(0,4));
            targetMonth = Number(targetDateString.substring(4,6))-1;
            targetDate  = Number(targetDateString.substring(6,8));
            
            var wkDate = new Date(targetYear,targetMonth,targetDate);
            getObj("CALENDARBOX").contentWindow.setSelectedDate(wkDate);

        } else if( obj2 ) {
            getObj("CALENDARBOX").contentWindow.wkDate.setFullYear(obj2);
        }
        
        getObj("CALENDARBOX").contentWindow.openCalendarBox();

        // 一覧テーブルのスクロール連動
        if (listFlag == 1) {
            var defaultLeft = $("#bodyTableDiv").scrollLeft();
            $("#bodyTableDiv").bind('scroll', {defaultLeft : defaultLeft, calBoxPointX : calBoxPointX},  calendarScrollEventX);
            var defaultTop = $("#bodyTableDiv").scrollTop();
            $("#colTableDiv").bind('scroll', {defaultTop : defaultTop, calBoxPointY : calBoxPointY}, calendarScrollEventY);
        }
        break;
    default:
        alert("識別コードエラー！");
        return;
    }

}

// 検索ボックスを閉じる
function closeSearchBox() {
    try {
        getObj("CALENDARBOX").style.display = "none";
        $("#bodyTableDiv").unbind('scroll', calendarScrollEventX);
        $("#colTableDiv").unbind('scroll', calendarScrollEventY);
    } catch(e) {}
}

//カレンダーの横スクロール連動
function calendarScrollEventX(event) {
 getObj("CALENDARBOX").style.left = event.data.defaultLeft + event.data.calBoxPointX - $("#bodyTableDiv").scrollLeft();
}

//カレンダーの縦スクロール連動
function calendarScrollEventY(event) {
 getObj("CALENDARBOX").style.top = event.data.defaultTop + event.data.calBoxPointY - $("#colTableDiv").scrollTop();
}


// 以下、各vm上に残骸があるため削除できない
//************************************************************************************
var nowWarning;
function closeWarningBox(obj1) {}
function reDrowWbx(obj1) {}
//************************************************************************************
