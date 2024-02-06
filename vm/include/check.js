/******************************************************************************/
/*     調達PKG        Input Value Check javascript   Last Modified 2004/03/24 */
/*     対象ブラウザ： Internet Exproler 5.01+                                 */
/*                    NetScape Navigator 4.7X+                                */
/*     notice      :  WindowsOS Only!!                                        */
/******************************************************************************/
/*----------------------------------------------------------------------------*/
/*   機　能：確認メッセージの表示                                             */
/*   引　数：更新情報名、アクション                                           */
/*   返り値：confirmの返り値(true or false)                                   */
/*   備　考：                                                                 */
/*----------------------------------------------------------------------------*/
function showConfirm(infName,action){
  return window.confirm("W001\n\n"+infName+"を"+action+"します。\n\nよろしいですか？");
}
/*----------------------------------------------------------------------------*/
/*   機　能：オブジェクトの存在チェック                                       */
/*   引　数：オブジェクト　　                                                 */
/*   返り値：False=定義あり、True=未定義                                      */
/*----------------------------------------------------------------------------*/
function isEmpty(obj) {
  if( typeof obj == "undefined" ){
    return true;
  }
    if( obj==null ) {
        return true;
    }
  return false;
}
/*----------------------------------------------------------------------------*/
/*   機　能：入力長チェック                                                   */
/*   引　数：入力長検査項目、                                                 */
/*           最小長、                                                         */
/*           最大長、                                                         */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function lenCheck(theValue,minLen,maxLen,msgOut,itemName){
  if ((theValue==null) || (theValue.length<minLen || theValue.length>maxLen)){
    if (msgOut==true){
      if ((minLen != 0)&&(maxLen != 0)){
        window.alert("E010\n\n"+itemName+"の入力文字数に誤りがあります。\n"+itemName+"は"+minLen+"文字以上、"+maxLen+"文字以下で入力して下さい。");
        return false;
      }
      if (minLen==0){
        window.alert("E011\n\n"+itemName+"の入力文字数に誤りがあります。\n"+itemName+"は"+maxLen+"文字以下で入力して下さい。");
        return false;
      }
      if (maxLen==0){
        window.alert("E012\n\n"+itemName+"の入力文字数に誤りがあります。\n"+itemName+"は"+minLen+"文字以上で入力して下さい。");
        return false;
      }
    }
    return false;
  }
  return true;
}
/*----------------------------------------------------------------------------*/
/*   機　能：バイト数チェック                                                 */
/*   引　数：バイト数検査項目                                                 */
/*           最小バイト、                                                     */
/*           最大バイト、                                                     */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function byteCheck(theValue,minByte,maxByte,msgOut,itemName){
var chkChar;
var totalByte = 0;
var caption = "（全角は２文字、半角は１文字として数えます。）";
  for (var i = 0; i < theValue.length; i++) {
    chkChar = theValue.charCodeAt(i);
    // Shift_JIS: 0x0 ～ 0x80, 0xa0  , 0xa1   ～ 0xdf  , 0xfd   ～ 0xff
    // Unicode  : 0x0 ～ 0x80, 0xf8f0, 0xff61 ～ 0xff9f, 0xf8f1 ～ 0xf8f3
    if ( (chkChar >= 0x0 && chkChar < 0x81) || (chkChar == 0xf8f0) || (chkChar >= 0xff61 && chkChar < 0xffa0) || (chkChar >= 0xf8f1 && chkChar < 0xf8f4)) {
        totalByte += 1;
    } else {
        totalByte += 2;
    }
  }
  if (totalByte < minByte || totalByte > maxByte){
    if (msgOut==true){
      if ((minByte != 0)&&(maxByte != 0)){
        window.alert("E010\n\n"+itemName+"の入力文字数に誤りがあります。\n"+itemName+"は"+minByte+"文字以上、"+maxByte+"文字以下で入力して下さい。\n"+caption);
        return false;
      }
      if (minByte==0){
        window.alert("E011\n\n"+itemName+"の入力文字数に誤りがあります。\n"+itemName+"は"+maxByte+"文字以下で入力して下さい。\n"+caption);
        return false;
      }
      if (maxByte==0){
        window.alert("E012\n\n"+itemName+"の入力文字数に誤りがあります。\n"+itemName+"は"+minByte+"文字以上で入力して下さい。\n"+caption);
        return false;
      }
    }
    return false;
  }
  return true;
}
/*----------------------------------------------------------------------------*/
/*   機　能：半角チェック（全角と半角カナ文字はエラー）                       */
/*   引　数：チェック文字列、                                                 */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function chkHalf(str,msgOut,itemName){
var i;
  for ( i=0; i< str.length; i += "あ".length ) {
    if( escape(str.charAt(i)).length >= 4 ){
      if (msgOut==true){
        window.alert("E006\n\n"+itemName+"の入力内容に誤りがあります。\n"+itemName+"は半角のみ入力可能です。");
      }
      return false ;
    }
  }
  return true ;
}
/*----------------------------------------------------------------------------*/
/*   機　能：半角英数大文字チェック                                           */
/*   引　数：チェック文字列、                                                 */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function isChara(theValue,msgOut,itemName) {
var strArrowChara = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
var i;
  for (i = 0; i < theValue.length; i++) {
    chkchar = theValue.charAt(i);
    chkFlg = strArrowChara.indexOf(chkchar,0);
    if (chkFlg == -1) {
      if (msgOut==true){
        window.alert("E008\n\n"+itemName+"の入力内容に誤りがあります。\n"+itemName+"に使用出来ない文字が含まれています。");
      }
      return false;
    }
  }
  return true;
}
/*----------------------------------------------------------------------------*/
/*   機　能：半角英数字チェック（英小文字、半角カナを許す）                   */
/*   引　数：チェック文字列、                                                 */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名、                               */
/*           改行を許可するか否か(true:許可する、false:許可しない）           */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function isChara2(theValue,msgOut,itemName,allowCr) {
  // 使用禁止
  return true;
}
/*----------------------------------------------------------------------------*/
/*   機　能：半角チェック（半角文字以外はエラー）                             */
/*   引　数：チェック文字列、                                                 */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function isHalf(theValue,msgOut,itemName) {
  if ((theValue.length > 0) && (theValue.match(/^[ -~｡-ﾟ]+$/) == null)){
    if (msgOut==true){
      window.alert("E005\n\n"+itemName+"の入力内容に誤りがあります。\n"+itemName+"には全角文字は入力出来ません。");
    }
    return false;
  }
  return true;
 }
/*----------------------------------------------------------------------------*/
/*   機　能：全角チェック（全角以外はエラー）                                 */
/*   引　数：チェック文字列、                                                 */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名、                               */
/*           改行を許可するか否か(true:許可する、false:許可しない）           */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function isCharaC(theValue,msgOut,itemName,allowCr) {
var i;
  if (theValue.match(/[ -~｡-ﾟ]/) != null) {
    if  (msgOut == true){
      window.alert("E004\n\n"+itemName+"の入力内容に誤りがあります。\n"+itemName+"は全角のみ入力可能です。");
    }
    return false;
  }
  if (allowCr == false){
    for(i = 0; i < theValue.length; i++){
      if ((theValue.charCodeAt(i) == 10)||(theValue.charCodeAt(i) == 13)){
        if (msgOut == true){
          window.alert("E018\n\n"+itemName+"の入力内容に誤りがあります。\n"+itemName+"には改行は入力出来ません。");
        }
        return false;
      }
    }
  }
  return true;
 }
/*----------------------------------------------------------------------------*/
/*   機　能：有効文字列チェック（全角、英小文字、半角カナを許す）             */
/*   引　数：チェック文字列、                                                 */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名、                               */
/*           改行を許可するか否か(true:許可する、false:許可しない）           */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function isValidString(theValue,msgOut,itemName,allowCr) {
  //使用禁止
  return true;
}
/*----------------------------------------------------------------------------*/
/*   機　能：数値チェック（半角数字のみ許可）                                 */
/*   引　数：チェック文字列                                                   */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*   返り値：False=エラー、True=正常                                          */
/*----------------------------------------------------------------------------*/
function chkNum(num,msgOut,itemName){
var chkStr ;
var i;
  for( i = 0; i < num.length; i++ ){
    chkStr = num.substring( i, i + 1 ) ;
    if( chkStr < "0" || chkStr > "9" ){
      if (msgOut==true){
        window.alert("E003\n\n"+itemName+"の入力内容に誤りがあります。\n"+itemName+"は数字のみ入力可能です。");
      }
      return false ;
    }
  }
  return true ;
}
/*----------------------------------------------------------------------------*/
/*   機　能：数値チェック（0～9,マイナス符号、小数点）                        */
/*   引　数：チェック文字列、                                                 */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*           小数点を認めるか否か(true:認める、false:認めない）               */
/*   返り値：-3（小数点不正）                                                 */
/*         ：-2（マイナス符号不正）                                           */
/*         ：-1（上記以外のエラー）                                           */
/*         ：0 （正常）                                                       */
/*----------------------------------------------------------------------------*/
function chkNum2(num,msgOut,itemName,allowPeriod){
var cntMinus = 0;
var cntPeriod = 0;
var chkStr ;
var periodPos ;
var i;
//  "." 位置取得
  periodPos = num.indexOf( ".", 0 ) ;
  if ( periodPos < 0 ){
    periodPos = num.length ;
  }
//  数値ハイフンピリオドチェック
  for( i = 0; i < num.length; i++ ){
    chkStr = num.substring( i, i + 1 ) ;
    if( chkStr < "0" || chkStr > "9" ){
      switch (chkStr){
        case "-":                           //  <<  "-" チェック    >>
          cntMinus ++ ;
          if( i != 0 ||                     //      先頭以外
            num.length == 1 ){              //      "-" のみ
            if (msgOut==true){
              window.alert("E014\n\n"+itemName+"の入力内容に誤りがあります。\nマイナス符号は先頭に付けて下さい。");
            }
            return -2 ;
          }
          break;
        case ".":                           //  <<  "." チェック    >>
          if (allowPeriod == false){
            if (msgOut==true){
              window.alert("E033\n\n"+itemName+"には小数点の入力は出来ません。\n整数のみ入力可能です。");
            }
            return -3 ;
          }
          cntPeriod ++ ;
          if( i == 0 ||                     //      先頭
            ( cntMinus > 0 && i == 1 )  ||  //      "-" ありで２文字目"."
            i == ( num.length - 1 )     ||  //      最後
            cntPeriod > 1 ){                //      "." 複数
            if (msgOut==true){
              window.alert("E015\n\n"+itemName+"の入力内容に誤りがあります。\n小数点の数または位置が不正です。");
            }
            return -3 ;
          }
          break;
        default:
          if (msgOut==true){
            window.alert("E016\n\n"+itemName+"の入力内容に誤りがあります。\n数字、マイナス符号、ピリオド（小数点）以外の文字は入力出来ません。");
          }
          return -1 ;
          break;
      }
    }
  }
  return 0 ;
}
/*----------------------------------------------------------------------------*/
/*   機　能：数値桁数チェック                                                 */
/*   引　数：チェック文字列、                                                 */
/*           エラーメッセージを出力するか否か(true:する、false:しない)、      */
/*           エラーメッセージに出力する項目名                                 */
/*           整数部桁数                                                       */
/*           小数部桁数                                                       */
/*   返り値：-1（エラー）                                                     */
/*         ：0 （正常）                                                       */
/*----------------------------------------------------------------------------*/
function chkBeams(num,msgOut,itemName,intBeams,decBeams){
var intStr = "0";
var decStr = "0";
var periodPos;
  if (decBeams > 0){
    if (chkNum2(num,msgOut,itemName,true) < 0){
      return -1;
    }
  }else{
    if (chkNum2(num,msgOut,itemName,false) < 0){
      return -1;
    }
  }
//  "." 位置取得～整数部、小数部の取り出し
  periodPos = num.indexOf( ".", 0 ) ;
  if ( periodPos < 0 ){
    periodPos = num.length ;
  }
  intStr = num.substring( 0, periodPos ) ;
  decStr = num.substring( periodPos + 1,num.length ) ;
//  チェック
  for (i=0 ; i<intStr.length ; i++){
    if (intStr.substring(i-1,1) == "0"){
      intStr = intStr.substring(i,intStr.length+1);
    }else{
      break;
    }
  }
  if (intStr.length > intBeams){
    if (msgOut==true){
      window.alert("E017\n\n"+itemName+"入力内容に誤りがあります。\n整数部または小数部の桁数がオーバーしています。");
    }
    return -1;
  }
  for (i=decStr.length ; i>0 ; i--){
    if (decStr.substring(i-1,i) == "0"){
      decStr = decStr.substring(0,i-1);
    }else{
      break;
    }
  }
  if (decStr.length > decBeams){
    if (msgOut==true){
      window.alert("E017\n\n"+itemName+"入力内容に誤りがあります。\n整数部または小数部の桁数がオーバーしています。");
    }
    return -1;
  }
  return 0;
}
/*----------------------------------------------------------------------------*/
/*   機　能：数値の四捨五入・切上げ・切捨てを行う                             */
/*   引　数：四捨五入・切上げ・切捨てを行う数値、                             */
/*           四捨五入、切上げ、切捨てを行う小数点位置(最小値は1）、           */
/*           （ex.3＝小数点第3位を四捨五入・切上げ・切捨て）、                */
/*           演算区分（"R":四捨五入、"C":切上げ、"F":切捨て）                 */
/*   返り値：演算結果数値（小数点以下桁数は引数の小数点位置－１）             */
/*   備　考：第一引数、第二引数が数値として認識できない場合、または           */
/*           演算区分が"R","F","C"以外の場合は、返り値に第一引数を返す        */
/*           小数点位置が1より小さい場合は1とみなし演算する                   */
/*----------------------------------------------------------------------------*/
function roundCmp(numValue,comPos,mode){
var retValue;
var weight = 1;
  if ((isNaN(numValue))||(isNaN(comPos))){
    return numValue;
  }
  if ((mode != "R") && (mode != "F") && (mode != "C")){
    return numValue;
  }
  if (comPos < 1 ){
    comPos = 0;
  }else{
    comPos = comPos - 1;
  }
  for( i=0 ; i < comPos ; i++){
    weight = weight * 10;
  }
  switch (mode){
    case "R":
      returnValue = Math.floor(Math.round(numValue * weight));
      break;
    case "F":
      returnValue = Math.floor(Math.floor(numValue * weight));
      break;
    case "C":
      returnValue = Math.floor(Math.ceil(numValue * weight));
      break;
  }
  returnValue /= weight;
  return returnValue;
}

/*----------------------------------------------------------------------------*/
/*   機　能：テキストボックスに入力された数量を、　　　　                     */
/*           上下キーによって日付を加算・減算する　　　　　                   */
/*   引　数：テキストオブジェクト　                                           */
/*           増分　　　　　　　　　                                           */
/*   返り値：なし                                                             */
/*   備　考：                                                                 */
/*----------------------------------------------------------------------------*/
function adjustVal(obj,cnt){
    if( event.keyCode == 38 ) {
        // ↑キー
        if( isNaN(obj.value.replace(/,/g,"")) ) {
            return;
        }
        var w = new Number(obj.value.replace(/,/g,""));
        obj.value = w + cnt;
    } else if( event.keyCode == 40 ) {
        // ↓キー
        if( isNaN(obj.value.replace(/,/g,"")) ) {
            return;
        }
        var w = new Number(obj.value.replace(/,/g,""));
        obj.value = w - cnt;
        if( obj.value < 0 ) {
            obj.value = 0;
        }
    }
//  editVal(obj);

}
function adjustVal2(obj,cnt){
    if( isNaN(obj.value.replace(/,/g,"")) ) {
        return;
    }
    
    var w = new Number(obj.value.replace(/,/g,""));
    w += cnt;
    if( w < 0 ) {
        w.value = 0;
    } else {
        obj.value = w;
    }
//  editVal(obj);
}

/*----------------------------------------------------------------------------*/
/*   機　能：数値カンマ編集                                                   */
/*----------------------------------------------------------------------------*/
function editVal(obj) {
    if( trim(obj.value)=="" ) {
        return;
    }
    deleteComma2(obj);
    var trimVal = trim(obj.value);
    if( chkNum2(trimVal,false,"") ) {
        return;
    }

    obj.value = editVal2(trimVal);

}

//先頭の０を除去する処理
function removeZero(val){
    zeroSstart = val.indexOf("0");
    if(zeroSstart == 0 && val.length > 1){
        val = val.substring(1,val.lenght);
        return removeZero(val);
    }else{
        return val;
    }
}

function editVal2(val) {
    var i,minus=false;

    try {
    if(chkNum2(val, false, '', true) != 0) {
        return val;
    }
        if( val < 0 ) {
            minus = true;
            val = val.substring(1,val.length);
        }

        before = String(val);
    
        start = before.indexOf(".");
        var ret = "";
        if( start==-1 ) {
            // 先頭の０を除去する処理
            before = removeZero(before);
            start = before.length;
        } else {
            // 小数部保持
            ret = before.substring(start,before.lenght);
            // 先頭の０を除去する処理
            before = removeZero(before.substring(0,start)) + ret;
            start = before.indexOf(".");
        }
    
        start--;
        var w = 0;
        for(i=start; i>=0; i--) {
            ret = before.substring(i,i+1) + ret;
            if( ++w>=3 && i>0 ) {
                ret = "," + ret;
                w = 0;
            }
        }
        if( minus ) {
            ret = "-"+ret;
        }

    } catch( e ) {
        return val;
    }

    return ret;
}

function editVal3(obj) {
    var kc = event.keyCode;
    if( !(kc>=96 && kc<=105 || kc==110 || kc==188) ) {
        return;
    }
    var wflg = false;
    if( obj.value.substring(obj.value.length-1,obj.value.length)=="." ) {
        wflg = true;
        obj.value = obj.value.substring(0,obj.value.length-1);
    }
    deleteComma2(obj);
    if( chkNum2(obj.value,false,"") ) {
        return;
    }

    obj.value = editVal2(obj.value);

    if( wflg ) {
        obj.value = obj.value + ".";
    }
}

/*----------------------------------------------------------------------------*/
/*   機　能：数値カンマ編集                                                   */
/*----------------------------------------------------------------------------*/

function deleteComma(obj) {

    deleteComma2(obj);
    obj.select();
}

function deleteComma2(obj) {
    obj.value = deleteComma3(obj.value);
}

function deleteComma3(val) {
    w = "";

    if(val.length != 0){
        w = val.replace(/,/g,"");
    }

    return w;
}

