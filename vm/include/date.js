/******************************************************************************/
/*     調達PKG        Date   Javascript              Last Modified 2003/10/29 */
/*     対象ブラウザ： Internet Exproler 5.01+                                     */
/*                    NetScape Navigator 4.7X+                                */
/*     notice      :  WindowsOS Only!!                                        */
/******************************************************************************/

/* ****************************************************************************
 *     【修正履歴】
 *    ------------------------------------------------------------------------
 *        修正者: SBO蘇
 *          日付: 2012.11.12
 *          内容: 日付フォーマット共通化の修正
 *                1.グローバル定数の追加(日付)
 *                2.日付表示形式(2012/11/12 → 2012-11-12)
 *                3.dateOnBlurYM()メソッド追加
 *    ------------------------------------------------------------------------
 *        修正者: 
 *          日付: 
 *          内容: 
 *    ------------------------------------------------------------------------
 * ****************************************************************************/

/* ******************************************/
/* * グローバル定数(日付)                     **/
/* ******************************************/
// 月(英語)
var MONTHNAME = new Array("January","February","March","April","May","June","July","August","September","October","November","December");
// 日付分割記号(日付作成用)
var _DATE_SEPARATOR = "/";
// 日付分割記号(表示用)
var _DATE_SEPARATOR_DISP = "-";
// 日付正規表現式
var _DATE_REG = new RegExp(_DATE_SEPARATOR_DISP, "g");

/*----------------------------------------------------------------------------*/
/*   機　能：日付チェック                                                     */
/*   引　数：形式区分(0=yymmdd,1=yyyymmdd,2=yy/mm/dd）、                      */
/*           日付文字列、                                                     */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function chkDate(Date,msgOut,itemName){
var i;
var nonEditDate = "";
var mPos = 2;
var dPos = 4;
var year;
var month;
var day;
var uruu;
var DD;
  //-- ID Check --//
      for ( i = 0; i < Date.length; i++ ) {
        if ( Date.charAt(i) != _DATE_SEPARATOR_DISP ){
            nonEditDate = nonEditDate + Date.charAt(i);
        }
      }
      Date = nonEditDate;
       if( Date.length==6 ) {
        Date = "20" + Date;
    }
      if( Date.length != 8 ){
        if  (msgOut == true){
          dateItemErrorMsgOut(itemName);
        }
        return false;
      }
      mPos = 4;
      dPos = 6;
  //-- Number Check --//
  for( i=0 ; i<Date.length ; i++ ){
    if ((Date.substring( i, i+1 ) < "0") || (Date.substring( i, i+1 ) > "9")){
      if  (msgOut == true){
        dateItemErrorMsgOut(itemName);
      }
      return false;
    }
  }
  year = eval( Date.substring( 0, mPos ) );
  month = eval( Date.substring( mPos, dPos ) );
  day = eval( Date.substring( dPos, Date.length ) );
  //-- year Check --//
  if( year < 1970 ){
    if  (msgOut == true){
      dateItemErrorMsgOut(itemName);
    }
    return false;
  }
  if( year % 4 ){
    uruu = false;
  }else{
    if( year % 100 ){
      uruu = true;
    }else{
      if( year % 400 ){
        uruu = false;
      }else{
        uruu = true;
      }
    }
  }
  //-- month Check --//
  if( month < 1 || month > 12 ){
    if  (msgOut == true){
      dateItemErrorMsgOut(itemName);
    }
    return false;
  }
  if( month == 2 ){
    if( uruu == true ){
      DD = 29;
    }else{
      DD = 28;
    }
  }else if(month == 4 || month == 6 || month == 9 || month == 11 ){
    DD = 30;
  }else{
    DD = 31;
  }
  //-- day Check --//
  if ( day < 1 || day > 31 ){
    if  (msgOut == true){
      dateItemErrorMsgOut(itemName);
    }
    return false;
  }
  if ( day > DD ){
    if  (msgOut == true){
      dateItemErrorMsgOut(itemName);
    }
    return false;
  }
  return true;
}
/*----------------------------------------------------------------------------*/
/*   機　能：日付エラーメッセージ出力                                         */
/*   引　数：エラーメッセージに出力する項目名                                 */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function dateItemErrorMsgOut(itemName){
  //window.alert("E009\n\n"+itemName+"の入力内容に誤りがあります。\n"+itemName+"には実在日を入力して下さい。");
}
/*----------------------------------------------------------------------------*/
/*   機　能：日付項目から"/"を除外する                                        */
/*   引　数：日付項目                                                         */
/*   返り値：なし                                                             */
/*   備　考：日付項目のonfocusイベント等で使用                                */
/*----------------------------------------------------------------------------*/
function dateOnFocus(dateItem){
var i;
var nonEditDate ="";
  for ( i = 0; i < dateItem.value.length; i++ ) {
    if ( dateItem.value.charAt(i) != _DATE_SEPARATOR_DISP ){
      nonEditDate = nonEditDate + dateItem.value.charAt(i);
    }
  }
  dateItem.value = nonEditDate;
  dateItem.select();
}
/*----------------------------------------------------------------------------*/
/*   機　能：日付文字列から"/"を除外する                                      */
/*   引　数：日付文字列                                                       */
/*   返り値：除去後の文字列                                                   */
/*   備　考：　　　　　　　　　　　　　　　　　                               */
/*----------------------------------------------------------------------------*/
function convertYY_MM_DDtoYYMMDD(datestr){
var i;
var ret = "";
  for ( i = 0; i < datestr.length; i++ ) {
    if ( datestr.charAt(i) != _DATE_SEPARATOR_DISP ){
      ret = ret + datestr.charAt(i);
    }
  }
    return ret;
}

/*----------------------------------------------------------------------------*/
/*   機　能：日付項目を"yyyy/mm/dd"の形式で編集する                             */
/*   引　数：日付項目                                                         */
/*   返り値：なし                                                             */
/*   備　考：日付項目のonblurイベントで使用                                   */
/*----------------------------------------------------------------------------*/
function dateOnBlur(dateItem){
var nonEditDate = "";
var i;
var sepCount = 0;
var year,month,day;

    for ( i = 0; i < dateItem.value.length; i++ ) {
        if ( dateItem.value.charAt(i) != _DATE_SEPARATOR_DISP ){
            nonEditDate = nonEditDate + dateItem.value.charAt(i);
        } else {
            sepCount++;
        }
    }
    var ymdArray = dateItem.value.split(_DATE_SEPARATOR_DISP);
    
    if (ymdArray.length == 1 && nonEditDate.length == 8) {
        // "/"の数が0で、"/"を除いた入力長が8の場合
        year = nonEditDate.substring(0, 4);
        month = nonEditDate.substring(4, 6);
        day = nonEditDate.substring(6, 8);
    } 
    else if(ymdArray.length == 1 && nonEditDate.length == 6) {
        // "/"の数が0で、"/"を除いた入力長が6の場合
        year = "20"+nonEditDate.substring(0, 2);
        month = nonEditDate.substring(2, 4);
        day = nonEditDate.substring(4, 6);
    }
    else if (ymdArray.length == 3){
        // "/"の数が2の場合は年月日を0埋めする
        // ただし、桁数が多い場合は変換をしない
        year = ymdArray[0];
        month = ymdArray[1];
        day = ymdArray[2];
        if (year.length > 4 || month.length > 2 || day.length > 2) {
            return;
        }
        if (year.length == 1){
            year = "000"+ year;
        } else if (year.length == 2){
            year = "00"+ year;
        } else if (year.length == 3){
            year = "0"+ year;
        }
        if (month.length == 1){
            month = "0"+ month;
        }
        if (day.length == 1){
            day = "0"+ day;
        }
    } else {
        // それ以外の場合 変換をしない
        return;
    }
    
    // 4桁/2桁/2桁でフォーマットする
    dateItem.value = year + _DATE_SEPARATOR_DISP + month + _DATE_SEPARATOR_DISP + day;
}

/*----------------------------------------------------------------------------*/
/*   機　能：日付項目を"yyyy/mm"の形式で編集する                                */
/*   引　数：日付項目                                                         */
/*   返り値：なし                                                             */
/*   備　考：日付項目のonblurイベントで使用                                   */
/*----------------------------------------------------------------------------*/
function dateOnBlurYYYYMM(dateItem){
var nonEditDate = "";
var i;
var sepCount = 0;
var sepPoint = 0;
var year,month;
  /*  "/"の数をカウント&位置を退避  */
  for ( i = 0; i < dateItem.value.length; i++ ) {
    if ( dateItem.value.charAt(i) == _DATE_SEPARATOR_DISP ){
      sepPoint=i;
      sepCount++;
    }
  }
  /*  "/"の数が2以上の場合は処理を抜ける  */
  if (sepCount > 1){
    return;
  }
  /*  "/"の数がゼロかつ入力長が6以外の場合は処理を抜ける  */
  if ((sepCount == 0)&&(dateItem.value.length != 6)){
    return;
  }
  /*  "0"の補完&"/"編集  */
  if (sepCount == 1){
    year = dateItem.value.substring(0,sepPoint);
    month = dateItem.value.substring(sepPoint+1,dateItem.value.length);
    if (year.length == 1){
      year = "0"+ year;
    }
    if (month.length == 1){
      month = "0"+ month;
    }
    nonEditDate = year + month;
  }else{
    if (sepCount == 1){
      nonEditDate = dateItem.value.substring(0,sepPoint)+dateItem.value.substring(sepPoint+1,dateItem.value.length);
    }else{
      nonEditDate = dateItem.value;
    }
  }
  dateItem.value="";
  for ( i = 0; i < nonEditDate.length; i++ ) {
    if (i == 4){
      dateItem.value = dateItem.value + _DATE_SEPARATOR_DISP + nonEditDate.charAt(i);
    }else{
      dateItem.value = dateItem.value + nonEditDate.charAt(i);
    }
  }
}

/*----------------------------------------------------------------------------*/
/*   機　能：日付項目を"yy/mm"の形式で編集する                                */
/*   引　数：日付項目                                                         */
/*   返り値：なし                                                             */
/*   備　考：日付項目のonblurイベントで使用                                   */
/*----------------------------------------------------------------------------*/
function dateOnBlurYYMM(dateItem){
var nonEditDate = "";
var i;
var sepCount = 0;
var sepPoint = 0;
var year,month;
  /*  "/"の数をカウント&位置を退避  */
  for ( i = 0; i < dateItem.value.length; i++ ) {
    if ( dateItem.value.charAt(i) == _DATE_SEPARATOR_DISP ){
      sepPoint=i;
      sepCount++;
    }
  }
  /*  "/"の数が2以上の場合は処理を抜ける  */
  if (sepCount > 1){
    return;
  }
  /*  "/"の数がゼロかつ入力長が4以外の場合は処理を抜ける  */
  if ((sepCount == 0)&&(dateItem.value.length != 4)){
    return;
  }
  /*  "0"の補完&"/"編集  */
  if (sepCount == 1){
    year = dateItem.value.substring(0,sepPoint);
    month = dateItem.value.substring(sepPoint+1,dateItem.value.length);
    if (year.length == 1){
      year = "0"+ year;
    }
    if (month.length == 1){
      month = "0"+ month;
    }
    nonEditDate = year + month;
  }else{
    if (sepCount == 1){
      nonEditDate = dateItem.value.substring(0,sepPoint)+dateItem.value.substring(sepPoint+1,dateItem.value.length);
    }else{
      nonEditDate = dateItem.value;
    }
  }
  dateItem.value="";
  for ( i = 0; i < nonEditDate.length; i++ ) {
    if (i == 2){
      dateItem.value = dateItem.value + _DATE_SEPARATOR_DISP + nonEditDate.charAt(i);
    }else{
      dateItem.value = dateItem.value + nonEditDate.charAt(i);
    }
  }
}

/*----------------------------------------------------------------------------*/
/*   機　能：日付の大小比較                                                   */
/*   引　数：形式区分(0=yymmdd,1=yyyymmdd,2=yy/mm/dd）、                      */
/*           比較区分(0=日付文字列1,2の大小比較、                             */
/*                    1=日付文字列1と現在日の大小比較）                       */
/*           日付文字列1、                                                    */
/*           日付文字列2、                                                    */
/*   返り値：0=日付文字列1と日付文字列2は等しい                               */
/*           1=日付文字列1が大                                                */
/*           2=日付文字列2が大                                                */
/*          -1=引数エラー                                                     */
/*          -2=その他のエラー                                                 */
/*   備　考：日付文字列1,2は同一形式である事                                  */
/*           日付文字列は日付として妥当である事                               */
/*----------------------------------------------------------------------------*/
function compareDate(fId,cId,Date1,Date2){
var i;
var nonEditDate = "";
  /* 引数チェック */
  if ((cId != 0)&&(cId != 1)){
    return -1;
  }
  switch (fId){
    case 0:
      if (Date1.length != 6 ){
        return -1;
      }
      if (cId==0){
        if (Date2.length != 6){
            return -1;
        }
        Date2 = "20"+Date2;
      }
      Date1 = "20"+Date1;
      break;
    case 1:
      if (Date1.length != 8 ){
        return -1;
      }
      if (cId==0){
        if (Date2.length != 8){
          return -1;
        }
      }
      break;
    case 2:
      for (i = 0; i < Date1.length; i++) {
        if ( Date1.charAt(i) != _DATE_SEPARATOR_DISP ){
          nonEditDate = nonEditDate + Date1.charAt(i);
        }
      }
      Date1 = nonEditDate;
      nonEditDate = "";
      for (i = 0; i < Date2.length; i++) {
        if ( Date2.charAt(i) != _DATE_SEPARATOR_DISP ){
          nonEditDate = nonEditDate + Date2.charAt(i);
        }
      }
      Date2 = nonEditDate;
      if (Date1.length != 6 ){
        return -1;
      }
      if (cId==0){
        if (Date2.length != 6){
          return -1;
        }
        Date2 = "20"+Date2;
      }
      Date1 = "20"+Date1;
      break;
    default:
      return -1;
      break;
  }
  
  var wDate1;
  var wDate2;
  
  if (cId==0){
    wDate1 = Date1.substring(0,4) + Date1.substring(4,6) + Date1.substring(6,8);
    wDate2 = Date2.substring(0,4) + Date2.substring(4,6) + Date2.substring(6,8);
  }else{
    wDate1 = Date1.substring(0,4) + Date1.substring(4,6) + Date1.substring(6,8);
    var cDate = new Date();
    var cYear = String(cDate.getFullYear());
    var cMonth = String(cDate.getMonth() + 1);
    if (cMonth.length < 2){
      cMonth = "0" + cMonth;
    }
    var cDay = String(cDate.getDate());
    if (cDay.length < 2){
    	cDay = "0" + cDay;
    }
    wDate2 = cYear + cMonth + cDay;
  }
  /* 大小比較 */
  if (wDate1 == wDate2){
      return 0;
  }
  if (wDate1 > wDate2){
      return 1;
  }
  if (wDate1 < wDate2){
      return 2;
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：曜日を表す数値から曜日（日本語１文字）を求める                   */
/*   引　数：曜日を表す数値                                                   */
/*   返り値：曜日を表す日本語１文字                                           */
/*   備　考：                                                                 */
/*----------------------------------------------------------------------------*/
function getWeek(week){
  switch (week){
    case 0:
      return "日";
      break;
    case 1:
      return "月";
      break;
    case 2:
      return "火";
      break;
    case 3:
      return "水";
      break;
    case 4:
      return "木";
      break;
    case 5:
      return "金";
      break;
    case 6:
      return "土";
      break;
    default:
      return "";
      break;
  }
}


/*----------------------------------------------------------------------------*/
/*   機　能：テキストボックスに入力された日付を、　　　　                     */
/*           上下キーによって日付を加算・減算する　　　　　                   */
/*   引　数：テキストオブジェクト　                                           */
/*   返り値：なし                                                             */
/*   備　考：                                                                 */
/*----------------------------------------------------------------------------*/
function adjustDate(obj){
    if( event.keyCode == 38 ) {
        // ↑キー
        if( obj.value=="" ) {
            obj.value = getYYYYMMDD();
        }
        if( !chkDate(obj.value,false ) ) {
            return;
        }
        obj.value = obj.value.replace(_DATE_REG,"");
        if( obj.value.length==6 ) {
            obj.value = "20" + obj.value;
        }
        obj.value = addDate(obj.value,-1,"D");
    } else if( event.keyCode == 40 ) {
        // ↓キー
        if( trim(obj.value)=="" ) {
            obj.value = getYYYYMMDD();
        }
        if( !chkDate(obj.value,false ) ) {
            return;
        }
        obj.value = obj.value.replace(_DATE_REG,"");
        if( obj.value.length==6 ) {
            obj.value = "20" + obj.value;
        }
        obj.value = addDate(obj.value,1,"D");
    }
}
function adjustDate2(obj, cnt){
    if( trim(obj.value)=="" ) {
        obj.value = getYYYY_MM_DD2();
        return;
    }
    if( !chkDate(obj.value,false) ) {
        return;
    }
    var w = addDate(obj.value.replace(_DATE_REG,""), cnt, "D");
    obj.value = w.substring(2,4) + _DATE_SEPARATOR_DISP + w.substring(4,6) + _DATE_SEPARATOR_DISP + w.substring(6,8);
}

/*----------------------------------------------------------------------------*/
/*   機　能：日付の日数加算・減算                                */
/*   引　数：YYYYMMDD                                                       */
/*         ：日数(減算の場合は負の値を設定)                                   */
/*         ：D:日　M:月　Y:年    　                                           */
/*   返り値：YYYYMMDD                                                         */
/*   備　考：不正な日付の場合、引数を返す                                     */
/*----------------------------------------------------------------------------*/
function addDate(d,cnt,type) {
    if( !chkDate(d,false ) ) {
        return d;
    }

    var year = d.substring(0,4);
    var month = d.substring(4,6);
    var day = d.substring(6,8);

    var dd = new Date();
    switch( type ) {
    case "D":
        dd = new Date(year+_DATE_SEPARATOR+month+_DATE_SEPARATOR+day);
        dd.setTime(dd.getTime()  + (cnt * (24*60*60*1000)));
        break;
    case "M":
        var y = Number(year);
        var m = Number(month);
        for(var i=0; i<Math.abs(cnt); i++) {
            if( cnt>=0 ) {
                m++;
                if( m>12 ) {
                    m = 1;
                    y++;
                }
            } else {
                m--;
                if( m<1 ) {
                    m=12;
                    y--;
                }
            }
            month = "0"+eval(m);
            month = month.substring(month.length-2,month.length);
            dd = new Date(y+_DATE_SEPARATOR+month+_DATE_SEPARATOR+day);
        }
        break;
    case "Y":
        var y = Number(year);
        y = y+cnt;
        dd = new Date(y+_DATE_SEPARATOR+month+_DATE_SEPARATOR+day);
        break;
    }
    year = dd.getFullYear();
    month = dd.getMonth()+1;
    month = "0"+month;
    month = month.substring(month.length-2,month.length);
    day = dd.getDate();
    day = "0"+day;
    day = day.substring(day.length-2,day.length);
    
    return year+month+day;

}
/*----------------------------------------------------------------------------*/
/*   機　能：現在日付、時刻の表示(YYYYMMDD HHMMSS)                              */
/*   引　数：なし                                                             */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function getNow(){
  myDate = new Date();
  Ye = myDate.getFullYear() + _DATE_SEPARATOR;
  Mo = myDate.getMonth()+1;
  Mo = (Mo < 10) ? "0" + Mo: Mo;
  Mo += _DATE_SEPARATOR;
  Da = myDate.getDate()+"";
  Da = (Da < 10) ? "0" + Da: Da;
  Ho = myDate.getHours();
  Ho = (Ho < 10) ? " " + Ho: Ho;
  Ho += ":";
  Mi = myDate.getMinutes();
  Mi = (Mi < 10) ? "0" + Mi: Mi;
  Mi += ":";
  Se = myDate.getSeconds();
  Se = (Se < 10) ? "0" + Se: Se;
  document.write(Ye + Mo + Da + " " + Ho + Mi + Se);
}
function getYY_MM_DD(){
    var myDate = new Date();
  var Ye = myDate.getFullYear() + _DATE_SEPARATOR;
  var Mo = myDate.getMonth()+1;
  Mo = (Mo < 10) ? "0" + Mo: Mo;
  Mo += _DATE_SEPARATOR;
  var Da = myDate.getDate()+"";
  Da = (Da < 10) ? "0" + Da: Da;
  document.write(Ye.substring(2,6) + Mo + Da);
}
function getYYYY_MM_DD(){
    var myDate = new Date();
  var Ye = myDate.getFullYear() + _DATE_SEPARATOR;
  var Mo = myDate.getMonth()+1;
  Mo = (Mo < 10) ? "0" + Mo: Mo;
  Mo += _DATE_SEPARATOR;
  var Da = myDate.getDate()+"";
  Da = (Da < 10) ? "0" + Da: Da;
  document.write(Ye + Mo + Da);
}
function getYYYY_MM_DD2() {
    return "20" + getYY_MM_DD2();
}
function getYY_MM_DD2(){
  var myDate = new Date();
  var Ye = myDate.getFullYear() + _DATE_SEPARATOR;
  var Mo = myDate.getMonth()+1;
  Mo = (Mo < 10) ? "0" + Mo: Mo;
  Mo += _DATE_SEPARATOR;
  var Da = myDate.getDate()+"";
  Da = (Da < 10) ? "0" + Da: Da;
  return Ye.substring(2,6) + Mo + Da;
}
function getYYMMDD(){
  myDate = new Date();
  Ye = new String(myDate.getYear());
    Ye = Ye.substring(Ye.length-2,Ye.length);
  Mo = myDate.getMonth()+1;
  Mo = (Mo < 10) ? "0" + Mo: Mo;
  Da = myDate.getDate();
  Da = (Da < 10) ? "0" + Da: Da;
  return Ye + Mo + Da;
}
function getYYYYMMDD(){
  myDate = new Date();
  Ye = new String(myDate.getYear());
//    Ye = Ye.substring(Ye.length-2,Ye.length);
  Mo = myDate.getMonth()+1;
  Mo = (Mo < 10) ? "0" + Mo: Mo;
  Da = myDate.getDate();
  Da = (Da < 10) ? "0" + Da: Da;
  return Ye + Mo + Da;
}

function getYYYY__MM__DD(){
  myDate = new Date();
  Ye = new String(myDate.getYear());
  Mo = myDate.getMonth()+1;
  Mo = (Mo < 10) ? "0" + Mo: Mo;
  Da = myDate.getDate();
  Da = (Da < 10) ? "0" + Da: Da;
  return Ye + "年" + Mo + "月" + Da + "日";
}

function getYYYY__MM__DD__W(){
  myDate = new Date();
  Ye = new String(myDate.getYear());
  Mo = myDate.getMonth()+1;
  Mo = (Mo < 10) ? "0" + Mo: Mo;
  Da = myDate.getDate();
  Da = (Da < 10) ? "0" + Da: Da;
  return Ye + "年" + Mo + "月" + Da + "日" + "(" + getWeek(myDate.getDay()) + ")";
}
