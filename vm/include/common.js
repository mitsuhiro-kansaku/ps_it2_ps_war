/******************************************************************************/
/*     PROCURESUITE   Common Javascript              Last Modified 2008/03/21 */
/*     対象ブラウザ： Internet Exproler 6.0/7.0                               */
/*                    NetScape Navigator 7.0                                  */
/*     notice      :  WindowsOS Only!!                                        */
/******************************************************************************/

function notContext ( ) {
    return false;
}
//document.oncontextmenu = notContext ;

/*----------------------------------------------------------------------------*/
/*   変数領域                                                                 */
/*----------------------------------------------------------------------------*/
var subWindow;                         //Window Object (PopUp)

window.onunload = unLoad;

/*----------------------------------------------------------------------------*/
/*   機　能：戻る、進む                                                       */
/*   引　数：戻るまたは進むページ数                                           */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function historyGo(PageCount){
  window.parent.history.go(PageCount);
}
/*----------------------------------------------------------------------------*/
/*   機　能：親画面のURL移動                                                  */
/*   引　数：移動するURL                                                      */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function gotopage(URL){
  window.top.location = URL;
}
/*----------------------------------------------------------------------------*/
/*   機　能：ポップアップウィンドウの作成                                     */
/*         （有効解像度が1000*740以上であれば中央に表示、                     */
/*           それ以下であれば左上を原点として表示）                           */
/*   引　数：表示するURL                                                      */
/*         ：ウィンドウ名                                                     */
/*         ：ウィンドウ幅                                                     */
/*         ：ウィンドウ高さ                                                   */
/*   返り値：ポップアップウィンドウオブジェクト                               */
/*----------------------------------------------------------------------------*/
function poppage(OBJ,winName,Width,Height){
var attr = "toolbar=no,location=no,directories=no,status=yes,menubar=no,scrollbars=yes,resizable=yes,dependent=yes,width=";
var posLeft = 0;
var posTop = 0;
  if (subWindow){
    if (subWindow.closed == false){
      subWindow.close();
    }
  }
  if ((screen.width - Width) > 1){
    posLeft=(screen.width - Width) / 2;
  }
  if ((screen.height - Height) > 1){
    posTop=(screen.height - Height) / 2;
  }
  attr = attr + Width + ",height=";
  attr = attr + Height;
  attr = attr + ",left=" + posLeft;
  attr = attr + ",Top=" + posTop;

  subWindow=window.open(OBJ,winName,attr);

  return subWindow;
}

function popupWithAuthCheck(OBJ,winName,Width,Height){
    var pageId = getPageId(OBJ);
    var urlPrefix = getUrlPrefix(OBJ);
    $.post(
            urlPrefix+"authCheck",
        {
            "pageId":pageId
        },
        function(data){
            if(data==""){
                poppage(OBJ,winName,Width,Height);
            }
            else {
                alert(decodeURI(data));
            }
        }
    )
}

/*----------------------------------------------------------------------------*/
/*   機　能：マスタ検索ポップアップウィンドウの作成                           */
/*         （poppageファンクションの拡張。                                    */
/*           セット対象となるhtmlオブジェクトを可変長で指定する）             */
/*   引　数：表示するURL                                                      */
/*         ：ウィンドウ名                                                     */
/*         ：ウィンドウ幅                                                     */
/*         ：ウィンドウ高さ                                                   */
/*         ：セット対象となるhtmlオブジェクト（可変長）                       */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function masterSearch(OBJ,winName,Width,Height){
  var subWindow = poppage(OBJ,winName,Width,Height);

  var argArray = argumentsToArray(arguments);
//  subWindow.setTargets(argArray.slice(4));
}

/*----------------------------------------------------------------------------*/
/*   機　能：個人設定ポップアップウィンドウの作成                             */
/*         （poppageファンクションの拡張。）                                  */
/*   引　数：表示するURL                                                      */
/*         ：ウィンドウ名                                                     */
/*         ：ウィンドウ幅                                                     */
/*         ：ウィンドウ高さ                                                   */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function personalSettings(OBJ,winName,Width,Height){
  var subWindow = poppage(OBJ,winName,Width,Height);

  var argArray = argumentsToArray(arguments);
  //subWindow.setTargets(argArray.slice(4));
}

/*----------------------------------------------------------------------------*/
/*   機　能：ArgumentsオブジェクトをArray型に変換する                         */
/*         （Argumentsとは、Functionの引数を格納した                          */
/*           JavaScriptのネイティブなオブジェクト）                           */
/*   引　数：Argumentsオブジェクト                                            */
/*   返り値：Arrayオブジェクト                                                */
/*----------------------------------------------------------------------------*/
function argumentsToArray(arguments){
  return Array.prototype.slice.call(arguments);
}

/*----------------------------------------------------------------------------*/
/*   機　能：ページ移動(unload)時の処理                                       */
/*           親画面から呼び出された子ウィンドウを閉じる                       */
/*   引　数：なし                                                            */
/*   返り値：なし                                                             */
/*   備　考：ポップアップ画面を呼び出す画面はonunloadイベントで               */
/*           当関数を呼び出す事                                               */
/*----------------------------------------------------------------------------*/
function unLoad(){
  if (subWindow){
    if (subWindow.closed == false){
      subWindow.close();
    }
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：ウィンドウにフォーカスを与える                                   */
/*   引　数：なし                                                             */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function setFocus(){
    window.focus();
}
/*----------------------------------------------------------------------------*/
/*   機　能：ブラウザがＩＥか？                                               */
/*   引　数：なし                                                             */
/*   返り値：IE4,IE5,IE6,NN4,NN6.0,NN7                                        */
/*----------------------------------------------------------------------------*/
function isIE(){
    if( window.navigator.appName == "Microsoft Internet Explorer" ) {
        return true;
    } else {
        return false;
    }
}
/*----------------------------------------------------------------------------*/
/*   機　能：Cookie値の取得                                                   */
/*   引　数：Cookie名                                                         */
/*   返り値：Cookie値                                                         */
/*----------------------------------------------------------------------------*/
function getCookie(key) {
  if (window.opener){
    allValue = " " + window.opener.document.cookie + ";";
  }else{
    allValue = " " + document.cookie + ";";
  }
  sp = 0;
  ep = 0;
  len = allValue.length;
  while (sp < len) {
    ep = allValue.indexOf(";", sp);
    keyValue = allValue.substring(sp + 1, ep);
    eq = keyValue.indexOf("=");
    if (keyValue.substring(0, eq) == key) {
        return(unescape(keyValue.substring(eq + 1, ep - sp - 1)));
    }
    sp = ep + 1;
  }
  return("");
}
/*----------------------------------------------------------------------------*/
/*   機　能：Cookie値の設定                                                   */
/*   引　数：Cookie名                                                         */
/*         ：Cookie値                                                         */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function setCookie(key,val) {
  tmp = key + "=" + val + ";path=/;expires=Fri, 31-Dec-2999 23:59:59 GMT";
  document.cookie = tmp;
  tmp = key + "=" + val + ";path=/";
  document.cookie = tmp;
}
/*----------------------------------------------------------------------------*/
/*   機　能：ログアウト処理                                                   */
/*   引　数：なし                                                             */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function logOut(){
  if (subWindow){
    if (subWindow.closed == false){
      subWindow.close();
    }
  }
  window.top.location.href = "/hogehoge/servlet/package.servletclass";
}
/*----------------------------------------------------------------------------*/
/*   機　能：波ダッシュ文字表示                                               */
/*   引　数：なし                                                             */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function putWaveDash(){
  if (getBrowser() != "NN4"){
    document.write('\uff5e');
  }else {
    document.write('\u301c');
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：イメージ切替関係                                                 */
/*----------------------------------------------------------------------------*/
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr;
  for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}
function MM_preloadImages() { //v3.0
  var d=document; if(d.images){ if(!d.MM_p) d.MM_p=new Array();
    var i,j=d.MM_p.length,a=MM_preloadImages.arguments; for(i=0; i<a.length; i++)
    if (a[i].indexOf("#")!=0){ d.MM_p[j]=new Image; d.MM_p[j++].src=a[i];}}
}
function MM_findObj(n, d) { //v3.0
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document); return x;
}
function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length);i+=2)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+1];}
}
/*----------------------------------------------------------------------------*/
/*   機　能：処理中レイヤー表示                                               */
/*----------------------------------------------------------------------------*/
function showWaitLayer() {
  if (document.all) {
    document.all.item("wait").style.left = (document.body.scrollLeft + (document.body.clientWidth - 320) / 2);
    document.all.item("wait").style.top  = (document.body.scrollTop + (document.body.clientHeight - 50) / 2);
    document.all.item("wait").style.visibility = "visible";
  }else if (document.layers) {
    document.layers["wait"].left = (window.pageXOffset + (window.innerWidth - 320) / 2);
    document.layers["wait"].top  = (window.pageYOffset + (window.innerHeight - 50) / 2);
    document.layers["wait"].visibility = "show";
  }else if (document.getElementById) {
    document.getElementById("wait").style.left = (window.pageXOffset + (window.innerWidth - 320) / 2);
    document.getElementById("wait").style.top  = (window.pageYOffset + (window.innerHeight - 50) / 2);
    document.getElementById("wait").style.visibility = "visible";
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：処理中レイヤー非表示                                             */
/*----------------------------------------------------------------------------*/
function hiddenWaitLayer() {
  if (document.all) {
    document.all.item("wait").style.visibility = "hidden";
    document.all.item("wait").style.left = (document.body.scrollLeft + (document.body.clientWidth - 320) / 2);
    document.all.item("wait").style.top  = (document.body.scrollTop + (document.body.clientHeight - 50) / 2);
  }else if (document.layers) {
    document.layers["wait"].visibility = "hide";
    document.layers["wait"].left = (window.pageXOffset + (window.innerWidth - 320) / 2);
    document.layers["wait"].top  = (window.pageYOffset + (window.innerHeight - 50) / 2);
  }else if (document.getElementById) {
    document.getElementById("wait").style.visibility = "hidden";
    document.getElementById("wait").style.left = (window.pageXOffset + (window.innerWidth - 320) / 2);
    document.getElementById("wait").style.top  = (window.pageYOffset + (window.innerHeight - 50) / 2);
  }
}
/*----------------------------------------------------------------------------*/
/*   機　能：処理中レイヤーが表示中か否かを返す                               */
/*----------------------------------------------------------------------------*/
function validWaitLayer() {
  if (document.all) {
    if (document.all.item("wait").style.visibility == "visible"){
      return true;
    }
  }else if (document.layers) {
    if (document.layers["wait"].visibility == "show"){
      return true;
    }
  }else if (document.getElementById) {
    if (document.getElementById("wait").style.visibility == "visible"){
      return true;
    }
  }
  return false;
}
/*----------------------------------------------------------------------------*/
/*   機　能：同一セッション対応用                                             */
/*   引　数：表示するURL                                                      */
/*   返り値：なし                                                             */
/*----------------------------------------------------------------------------*/
function formatNumber( classname, strVal, afterpoint,labelID ) {
    if( isEmpty(afterpoint) ) {
        //小数点以下桁数
        afterpoint = 2;
    }

    var pt = getCssProperty(classname,"fontSize");
    if( !pt ) {
        classname = "FontSmall";
        pt = "9";
    }
    var family = getCssProperty(classname,"fontFamily");
    if( !isEmpty(family) ) {
        family = family.replace(/\"/g,"'");
    } else {
        family = "";
    }
    var weight = getCssProperty(classname,"fontWeight");
    if( !weight ) {
        weight="normal";
    }
    if( pt ) {
        pt = pt.substring(0,pt.indexOf("p"));
    } else {
        pt = 10; //　未設定の場合は10ptにする。
    }

    if( pt>9 ) {
        pt2= pt-2;
    } else {
        pt2 = pt-1;
    }

    var val;
    var i = strVal.indexOf('.');
    if (i >= 0) {
        strVal = strVal + "          ";
        strVal = trim(strVal.substring(0,i+afterpoint+1));
        val = '<SPAN STYLE="font-family:' + family + ';font-weight:' + weight + ';">' + '<label style="font-size:' + pt  + 'pt;">' + strVal.substring(0,i) + '</label>' + '<label style="font-size:' + pt2  + 'pt;">' + strVal.substr(i);
        for(j=trim(strVal).length-i;j<afterpoint+1;j++) {
            val = val + '&nbsp;';
        }
        val = val + '</label></SPAN>';
    } else {
        val = '<SPAN STYLE="font-family:' + family + ';font-weight:' + weight + ';">' + '<label style="font-size:' + pt  + 'pt;">' + strVal + '<label style="font-size:' + pt2  + 'pt;">';
        for(j=0;j<afterpoint+1;j++) {
            val = val + '&nbsp;';
        }
        val = val + '</label>' + '</label></SPAN>';
    }
    if ('' != labelID && undefined != labelID) {
        document.getElementById(labelID).innerHTML=val;
    } else {
        document.write(val);
        return;
    }
}
/*
function formatNumber( id, strVal ) {
    var pt = getCssProperty(getObj(id).className,"fontSize");
    if( pt ) {
        pt = pt.substring(0,pt.indexOf("p"));
    } else {
        pt = 10; //　未設定の場合は１０ptにする。
    }

    var val = strVal;
    var i = val.indexOf('.');
    if (i >= 0) {
        val = strVal.substring(0,i) + '<label style="font-size:' + (pt-2)  + 'pt;">' + strVal.substring(i) + '</label>';
    }
    document.write(val);

    return;
}
*/
function getCssProperty(classname,property) {
    var stylesheets;

    var i=0;
    while( !document.styleSheets[i].rules ) {
        i++;
    }
    stylesheets = document.styleSheets[i].rules;

/*  if( document.styleSheets[cssnumber].rules ) {
        stylesheets = document.styleSheets[cssnumber].rules;
    } else {
        stylesheets = document.styleSheets[cssnumber].cssRules
    }
*/
    for( var i = 0; i < stylesheets.length; i++ ) {
    var css = stylesheets[i];
        var wClassname = "."+classname.toLowerCase();
    if( css.selectorText.toLowerCase() == wClassname ) {
            return ( css.style[ property ] );
        }
    }

}

/*
function formatNumber( strVal,size,cl )
{
        var color = "";
        if( cl ) {
            color = "color:" + cl;
        }

    var val = strVal;
    var i = strVal.indexOf('.');
    if (i >= 0) {
        val = strVal.substring(0,i) + '<label style="font-size:' + size  + 'pt;' + color + '">' + strVal.substring(i) + '</label>';
    }
    document.write(val);

    return;
}
*/
function selectOn(obj) {
    obj.select();
}

function selectOff(obj) {
    if( obj.value == "" ) {
        obj.value="0";
    }
}

function getText(id) {
    return getText2(getObj(id));
}

function getText2(obj) {
    try {
    	return obj.innerText;
    } catch( e ) {
        alert("Undefinded Id="+id);
    }
}

function setText(id,innertext) {
    if( !setText2(getObj(id),innertext) ) {
        alert("「"+id+"」に「"+innertext+"」をセットしようとして失敗しました。")
    }
}

function setText2(obj,innertext) {
    try {
        obj.innerText = innertext;
    } catch(e) {
        try {
        obj.innerHTML = innertext;
        } catch(e2) {
            return false;
        }
    }
    return true;
}

function getObj(id) {
    try {
        return document.getElementById(id);
    } catch( e ) {
        return null;
    }
}

function getDisplay(id) {
    if( getObj(id).style.display == "none" ) {
        return false;
    } else {
        return true;
    }
}

function setDisplay(id,flg) {
    try {
        if(flg) {
            switch(getObj(id).tagName){
                case "TABLE":
                case "TR":
                case "TD":
                    getObj(id).style.display = "";
                    break;
                default:
                    getObj(id).style.display = "block";
                    break;
            }                    
        } else {
            getObj(id).style.display = "none";
        }
    } catch( e ) {
        alert("error:"+e+":"+id);
    }
}

function exists(id) {
    var ret = document.getElementById(id);
    if( ret ) {
        return true;
    } else {
        return false;
    }
}

function getEventX() {
    if( isIE() ) {
        return event.x;
    } else {
        return event.pageX;
    }
}

function getEventY() {
    if( isIE() ) {
        return event.y;
    } else {
        return event.pageY;
    }
}

function getScrollX() {
    if( isIE() ) {
        return document.body.scrollLeft;
    } else {
        return window.scrollX;
    }
}

function getScrollY() {
    if( isIE() ) {
        return document.body.scrollTop;
    } else {
        return window.scrollTop;
    }
}

function changeFontSize0() {
    return;
    if( getCookie("FONTSIZE") == "L" ) {
        document.getElementById("CSS_LAYOUT").href = "../../include/FontL.css";
    } else if( getCookie("FONTSIZE") == "M" ) {
        document.getElementById("CSS_LAYOUT").href = "../../include/FontM.css";
    } else {
        document.getElementById("CSS_LAYOUT").href = "../../include/FontS.css";
    }

}

function fGetXY(aTag){
    var oTmp=aTag;
    var pt=new Point(0,0);
    do{
        pt.x+=oTmp.offsetLeft;
        pt.y+=oTmp.offsetTop-oTmp.scrollTop;oTmp=oTmp.offsetParent;
    }while(oTmp.tagName.toUpperCase()!="BODY");
    return pt;
}

function Point(iX,iY){this.x=iX;this.y=iY;}

/*----------------------------------------------------------------------------*/
/*   機　能：文字列の前後の空白（半角、全角、制御文字）を削除する             */
/*   引　数：加工前文字列                                                     */
/*   返り値：加工後文字列                                                     */
/*   備　考：NN4.Xでは右の空白が除去されない為、rTrim関数をcallしている       */
/*----------------------------------------------------------------------------*/
function trim(str){
var wStr;
  wStr = str.replace(/^\s+|\s+$/g,'');
  wStr = wStr.replace(/^ +| +$/g,'');
  wStr = wStr.replace(/^　+|　+$/g,'');
  return  rTrim(wStr);
}
/*----------------------------------------------------------------------------*/
/*   機　能：文字列の後ろの空白（半角、全角、制御文字）を削除する             */
/*   引　数：加工前文字列                                                     */
/*   返り値：加工後文字列                                                     */
/*----------------------------------------------------------------------------*/
function rTrim(str){
var wStr = str;
  wStr = wStr.replace(/\s+$/g,'');
  wStr = wStr.replace(/ +$/g,'');
  return wStr.replace(/　+$/g,'');
}

function countByte(str) {
    var count = 0;
    for(var i = 0; i < str.length; i++) {
       if (escape(str.charAt(i)).length < 4) {
          count++;
       }
       else {
          count += 2;
       }
    }
    return count;
}

// 禁止Backspace
function banBackSpace(e){
    var ev = e || window.event;
    var obj = ev.target || ev.srcElement;
    if (!obj.type || !obj.getAttribute) {
        return false;
    }
    var t = obj.type || obj.getAttribute('type');

    var vReadOnly = obj.readOnly;
    var vDisabled = obj.disabled;

    vReadOnly = (vReadOnly == undefined) ? false : vReadOnly;
    vDisabled = (vDisabled == undefined) ? true : vDisabled;

    var flag1= ev.keyCode == 8 && (t=="password" || t=="text" || t=="textarea")&& (vReadOnly==true || vDisabled==true);

    var flag2= ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" ;

    if(flag2 || flag1)return false;
}
//禁止Backspace Firefox、Opera対策
document.onkeypress=banBackSpace;


//iFrame 高さに合わせる
function iframeHeight(id) {
 var ifm= document.getElementById(id);
 var subWeb = null;
 if(ifm != null){
    subWeb = document.frames ? document.frames[id].document : ifm.contentDocument;
 }
 if(ifm != null && subWeb != null) {
    ifm.height = subWeb.body.scrollHeight-15;
 }
}
//iFrame 高さに合わせる
function parentIframeHeight(id) {
 var ifm= parent.document.getElementById(id);
 var subWeb = parent.document.frames ? parent.document.frames[id].document : ifm.contentDocument;
 if(ifm != null && subWeb != null) {
    ifm.height = subWeb.body.scrollHeight-15;
 }
}


function getPageId(argument){
    var pageId = "";
    var params = argument.split('/');
    var masterIndex = -1;
    for(var i=0;i<params.length;i++){
        if(params[i]=="mst"||params[i]=="src"){
            masterIndex = i;
        }
    }
    if(masterIndex != -1){
        if(params.length <= masterIndex+2){
            return "";
        }
        var event = params[masterIndex+2].split('?')[0];
        pageId = params[masterIndex+1]+event.substring(0,1).toUpperCase()+event.substring(1);
    }else{
        pageId = params[params.length-1].split('?')[0];
    }
    return pageId;
}
function getUrlPrefix(argument){
    var urlPrefix = "";
    var params = argument.split('/');
    for(var i=0;i<params.length;i++){
        if(params[i]==".."){
            urlPrefix=urlPrefix+params[i]+"/";
        }
    }
    return urlPrefix;
}


function iframeChangeWithAuthCheck(){

    var params = arguments;
    var pageId = getPageId(params[0]);
    if(pageId == ""){
        iframeChange(params);
        return;
    }
    var urlPrefix = getUrlPrefix(params[0]);
    $.post(
        urlPrefix+"authCheck",
        {
            "pageId":pageId
        },
        function(data){
            if(data==""){
                iframeChange(argumentsToArray(params));
            }
            else {
                alert(decodeURI(data));
            }
        }
    )
}

//iframeChange get-->post
//param: url,key1,value1,key2,value2...,targetIframe
function iframeChange(){
    var params = arguments;
    if(Object.prototype.toString.apply(arguments[0]) == '[object Array]'){
        params = arguments[0];
    }
    var form = getObj("submitFrom");
    if(form==null){
        //add new from
        form = document.createElement("form");
        form.id="submitFrom";
        form.style.display="none";
        form.method="post";
        document.getElementsByTagName("body")[0].appendChild(form);
    }

    var length=0;
    if(params.length%2==0){
        length=params.length-1;
    }else{
        length=params.length;
    }
    form.innerHTML="";
    //add hidden to from
    for(var i=1;i<length;i+=2){
        var hidden = document.createElement("input");
        hidden.type="hidden";
        hidden.name=params[i];
        if(i+1<params.length){
            hidden.value=params[i+1];
        }
        form.appendChild(hidden);
    }

    if(params.length>0){
        //set from target
        if(params.length%2==0){
            form.target=params[length];
        }else{
            if(getObj("DATAAREA")!=null){
                if(typeof(pinName)!="undefined"){
                    if( getCookie(pinName)!="1" && getObj("SWITCH2").style.display=="" ) {
                        openSearchArea();
                    }
                }
                form.target="DATAAREA";
                getObj("DATAAREA").src = '../../layout/wait.vm';
            }
            if(getObj("BODYAREA")!=null){
                form.target="BODYAREA";
            }

        }
        // form submit
        form.action=params[0];
        setTimeout("formSubmit()",50);
    }
}

function formSubmit(){
  getObj("submitFrom").submit();
}

/*--------------------------------------------------------------------------*/
/*   機　能：テーブルの固定セールを設定する                                    */
/*   引　数：テーブルID                                                     */
/*   引　数：固定行数                                                       */
/*   引　数：固定列数                                                       */
/*   返り値：なし                                                           */
/*--------------------------------------------------------------------------*/
var flag;
function setTablefix(id,fixR,fixC) {
    flag = false;
    var windowHeight = $(window).height();
    if($(".error").height() != null){
        if(id == "#PSRCV022ICHIRANTABLEFIX"){
            windowHeight = windowHeight - $(".error").height() - 87.8;
        }else if(id == "#PSDLV031ICHIRANTABLEFIX"){
            windowHeight = windowHeight - $(".error").height() - 20;
        }else{
            windowHeight = windowHeight - $(".error").height() - 35;
        }
    }

    var parentId = $(id).parent().attr("id");
    
    //  上部に記載されたdivタグのIDにヒットするので、分割用のdivタグを全て条件として判断する
    if(parentId != "colTableDiv" && parentId != "crossTableDiv" && 
            parentId != "rowTableDiv" && parentId != "bodyTableDiv"){
        $(function() {
            $(id).tablefix({width: $(window).width(), height:  windowHeight,  fixRows: fixR, fixCols: fixC});
        });
    }else{
        $(function() {
            $(id).tablefixByChange({width: $(window).width(), height: windowHeight,  fixRows: fixR, fixCols: fixC});
        });
    }
    flag = true;
}

function setTablefixByChange(id,fixR,fixC) {
    if(flag){
        setTablefix(id,fixR,fixC);
    }
}

/*--------------------------------------------------------------------------*/
/*   機　能：POPUP                                                            */
/*--------------------------------------------------------------------------*/

//部門POPUP
function SectionPopup(){
    //output
    //部門コード
    this.sectionCdObject = null;
    //部門名
    this.sectionNameObject = null;
    //会社コード
    this.companyCdObject = null;
    //会社名
    this.companyNameObject = null;
    //事業所コード
    this.sectionPalceCdObject = null;
    //事業所名
    this.sectionPlaceNameObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //会社変更可否区分
    this.companyChangeFlag = null;

    //負担部門フラグ 2013.01.08 ADD DAIKO_MUTO
    this.loadSectionFlag = null;

    //有効期間フラグ
    this.validDateFlg = null;

    //ロードフラグ
    this.onLoadFlag = true;

    this.setObject = function() {
        this.sectionCdObject = arguments[0];
        this.sectionNameObject = arguments[1];
        this.companyCdObject = arguments[2];
        this.companyNameObject = arguments[3];
        this.sectionPalceCdObject = arguments[4];
        this.sectionPlaceNameObject = arguments[5];
    };

    this.setObjectValue = function() {
        if(this.sectionCdObject != null){
            this.sectionCdObject.value  = arguments[0];
        }
        if(this.sectionNameObject != null){
            this.sectionNameObject.value  = arguments[1];
        }
        if(this.companyCdObject != null){
            this.companyCdObject.value = arguments[2];
        }
        if(this.companyNameObject != null){
            this.companyNameObject.value = arguments[3];
        }
        if(this.sectionPalceCdObject != null){
            this.sectionPalceCdObject.value  = arguments[4];
        }
        if(this.sectionPlaceNameObject != null){
            this.sectionPlaceNameObject.value  = arguments[5];
        }
        this.onLoadFlag = true;
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.companyChangeFlag = arguments[2];
        //負担部門フラグ 2013.01.08 ADD DAIKO_MUTO
        this.loadSectionFlag = arguments[3];
        this.validDateFlg = arguments[4];
    };

    this.getParam = function() {
        var param = [
            this.termFlag ,
            this.companyCd,
            this.companyChangeFlag
            //負担部門フラグ 2013.01.08 ADD DAIKO_MUTO
            ,this.loadSectionFlag
            ,this.validDateFlg
        ];
        return param;
    };
}

//価格POPUP
function PricePopup(){
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //希望数量
    this.reqVol = null;
    //ロードフラグ
    this.onLoadFlag = true;

    this.setObject = function() {
        this.termFlag = "0";
        this.companyCd = arguments[0];
        this.reqVol = arguments[1];
    };

    this.setObjectValue = function() {
        if(this.termFlag != null){
            this.termFlag.value  = "0";
        }
        if(this.companyCd != null){
            this.companyCd.value  = arguments[0];
        }
        if(this.reqVol != null){
            this.reqVol.value  = arguments[1];
        }
        this.onLoadFlag = true;
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.reqVol = arguments[2];
    };

    this.getParam = function() {
        var param = [
            this.termFlag,
            this.companyCd,
            this.reqVol
        ];
        return param;
    };
}

//取引先POPUP
function SupplierPopup(){
  //output
  //取引先コード
  this.supplierCdObject = null;
  //取引先名
  this.supplierNameObject = null;
  //取引先名（略称）
  this.supplierAbbrNameObject = null;
  //通貨コード
  this.currencyCdObject = null;
  //通貨コード(表示)
  this.currencyCdDispObject = null;
  //通貨記号1
  this.currencyMark1Object = null;
  //通貨記号2
  this.currencyMark2Object = null;
  //下請法適用業者区分
  this.subconIndObject = null;
  //EDIデータ送受信方法
  this.ediIndObject = null;
  //銀行コード
  this.bankCdObject = null;
  //銀行名
  this.bankNameObject = null;
  //支店コード
  this.branchCdObject = null;
  //支店名
  this.branchNameObject = null;
  //口座種別
  this.accountTypeObject = null;
  //口座番号
  this.accountNoObject = null;
  //口座名義
  this.accountNameObject = null;
  //郵便番号
  this.postalCodeObject = null;
  //住所１
  this.address1Object = null;
  //住所２
  this.address2Object = null;
  //電話番号
  this.telNoObject = null;
  //ＦＡＸ番号
  this.faxNoObject = null;
  //取引先名
  this.supplierNameDspObject = null;
  //取引先名（略称）
  this.supplierAbbrNameDspObject = null;
  //下請法適用業者区分
  this.subconIndDspObject = null;
  //郵便番号
  this.postalCodeDspObject = null;
  //住所１
  this.address1DspObject = null;
  //住所２
  this.address2DspObject = null;
  //電話番号
  this.telNoDspObject = null;
  //ＦＡＸ番号
  this.faxNoDspObject = null;
  //統一取引先
  this.vendorCdObject = null;
  //担当者
  this.supPersonNameObject = null;
  //支払条件コード
  this.payConditionCd = null;

  //input
  //廃止フラグ
  this.termFlag = null;
  //会社コード
  this.companyCd = null;

  //ロードフラグ
  this.onLoadFlag = true;

  //callback
  this.callback = function(){}

  this.setObject = function() {
      this.supplierCdObject = arguments[0];
      this.supplierNameObject = arguments[1];
      this.supplierAbbrNameObject = arguments[2];
      this.currencyCdObject = arguments[3];
      this.subconIndObject = arguments[4];
      this.ediIndObject = arguments[5];
      this.bankCdObject = arguments[6];
      this.bankNameObject = arguments[7];
      this.branchCdObject = arguments[8];
      this.branchNameObject = arguments[9];
      this.accountTypeObject = arguments[10];
      this.accountNoObject = arguments[11];
      this.accountNameObject = arguments[12];
      this.postalCodeObject = arguments[13];
      this.address1Object = arguments[14];
      this.address2Object = arguments[15];
      this.telNoObject = arguments[16];
      this.faxNoObject = arguments[17];
      this.supplierNameDspObject = arguments[18];
      this.supplierAbbrNameDspObject = arguments[19];
      this.subconIndDspObject = arguments[20];
      this.postalCodeDspObject = arguments[21];
      this.address1DspObject = arguments[22];
      this.address2DspObject = arguments[23];
      this.telNoDspObject = arguments[24];
      this.faxNoDspObject = arguments[25];
      this.vendorCdObject = arguments[26];
      this.supPersonNameObject = arguments[27];
      this.currencyMark1Object = arguments[28];
      this.currencyMark2Object = arguments[29];
      this.currencyCdDispObject = arguments[30];
      this.payConditionCd = arguments[31];
      if(arguments.length > 32 && arguments[32]){
    	  this.callback = arguments[32]
      }
  };

  this.setObjectValue = function() {
      if(this.supplierCdObject != null){
          this.supplierCdObject.value = arguments[0];
      }
      if(this.supplierNameObject != null){
          this.supplierNameObject.value = arguments[1];
      }
      if(this.supplierNameDspObject != null){
          this.supplierNameDspObject.innerText = arguments[1];
      }
      if(this.supplierAbbrNameObject != null){
          this.supplierAbbrNameObject.value = arguments[2];
      }
      if(this.supplierAbbrNameDspObject != null){
          this.supplierAbbrNameDspObject.innerText = arguments[2];
      }
      if(this.currencyCdObject != null){
          this.currencyCdObject.value = arguments[3];
      }
      if(this.subconIndObject != null){
          this.subconIndObject.value = arguments[4];
      }
      if(this.subconIndDspObject != null){
          this.subconIndDspObject.innerText = arguments[18];
      }
      if(this.ediIndObject != null){
          this.ediIndObject.value = arguments[5];
      }
      if(this.bankCdObject != null){
          this.bankCdObject.value = arguments[6];
      }
      if(this.bankNameObject != null){
          this.bankNameObject.value = arguments[7];
      }
      if(this.branchCdObject != null){
          this.branchCdObject.value = arguments[8];
      }
      if(this.branchNameObject != null){
          this.branchNameObject.value = arguments[9];
      }
      if(this.accountTypeObject != null){
          this.accountTypeObject.value = arguments[10];
      }
      if(this.accountNoObject != null){
          this.accountNoObject.value = arguments[11];
      }
      if(this.accountNameObject != null){
          this.accountNameObject.value = arguments[12];
      }
      if(this.postalCodeObject != null){
          this.postalCodeObject.value = arguments[13];
      }
      if(this.postalCodeDspObject != null){
          this.postalCodeDspObject.innerText = arguments[13];
      }
      if(this.address1Object != null){
          this.address1Object.value = arguments[14];
      }
      if(this.address1DspObject != null){
          this.address1DspObject.innerText = arguments[14];
      }
      if(this.address2Object != null){
          this.address2Object.value = arguments[15];
      }
      if(this.address2DspObject != null){
          this.address2DspObject.innerText = arguments[15];
      }
      if(this.telNoObject != null){
          this.telNoObject.value = arguments[16];
      }
      if(this.telNoDspObject != null){
          this.telNoDspObject.innerText = arguments[16];
      }
      if(this.faxNoObject != null){
          this.faxNoObject.value = arguments[17];
      }
      if(this.faxNoDspObject != null){
          this.faxNoDspObject.innerText = arguments[17];
      }
      if(this.vendorCdObject != null){
          this.vendorCdObject.value = arguments[19];
      }
      if(this.supPersonNameObject != null){
          this.supPersonNameObject.value = arguments[20];
      }
      if(this.currencyMark1Object != null){
          this.currencyMark1Object.innerText = arguments[21];
      }
      if(this.currencyMark2Object != null){
          this.currencyMark2Object.innerText = arguments[21];
      }
      if(this.currencyCdDispObject != null){
          this.currencyCdDispObject.innerText = arguments[3];
      }
      if(this.payConditionCd != null){
          this.payConditionCd.value = arguments[22];
      }
      this.callback(arguments)
      this.onLoadFlag = true;
  };

  this.setParam = function() {
      this.termFlag = arguments[0];
      this.companyCd = arguments[1];
  };

  this.getParam = function() {
      var param = [
          this.termFlag ,
          this.companyCd
      ];
      return param;
  };
}

//ユーザーPOPUP
function UserPopup(){
    //output
    //ユーザーコード
    this.userCdObject = null;
    //ユーザー名
    this.userNameObject = null;
    //事業所コード
    this.sectionPlaceCdObject = null;
    //事業所名
    this.sectionPlaceNameObject = null;
    //部門コード
    this.sectionCdObject = null;
    //部門名
    this.sectionNameObject = null;
    //内線番号
    this.extensionNoObject = null;
    //外線番号
    this.externalNoObject = null;
    //ファクス番号
    this.faxNoObject = null;
    //メールアドレス
    this.mailAddrObject = null;
    //役職
    this.officialNameObject = null;
    // IT2-01433-000 2013/03/21 ADD SBO_SOKOU START
    //部門役職名（表示用）
    this.sectionAndOfficialNameDispObject = null;
    // IT2-01433-000 2013/03/21 ADD SBO_SOKOU END

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //事業所コード
    this.sectionPlaceCd = null;
    //部門コード
    this.sectionCd = null;
    //参照範囲区分
    this.referenceRangeFlg = null;
    //ユーザー権限区分
    this.userPermissionFlg = null;
    //ユーザー権限区分2
    this.userPermissionFlg2 = null;
    //有効期間フラグ
    this.validDateFlg = null;

    //ロードフラグ
    this.onLoadFlag = true;


    this.setObject = function() {
        this.userCdObject = arguments[0];
        this.userNameObject = arguments[1];
        this.sectionCdObject = arguments[2];
        this.sectionNameObject = arguments[3];
        this.officialNameObject = arguments[4];
        this.sectionPlaceCdObject = arguments[5];
        this.sectionPlaceNameObject = arguments[6];
        this.mailAddrObject = arguments[7];
        this.extensionNoObject = arguments[8];
        this.externalNoObject = arguments[9];
        this.faxNoObject = arguments[10];
        // IT2-01433-000 2013/03/21 ADD SBO_SOKOU START
        this.sectionAndOfficialNameDispObject = arguments[11];
        // IT2-01433-000 2013/03/21 ADD SBO_SOKOU END
    };

    this.setObjectValue = function() {
        if(this.userCdObject != null){
            this.userCdObject.value = arguments[0];
        }
        if(this.userNameObject != null){
            this.userNameObject.value = arguments[1];
        }
        if(this.sectionCdObject != null){
            this.sectionCdObject.value = arguments[2];
        }
        if(this.sectionNameObject != null){
            this.sectionNameObject.value = arguments[3];
        }
        if(this.officialNameObject != null){
            this.officialNameObject.value = arguments[4];
        }
        if(this.sectionPlaceCdObject != null){
            this.sectionPlaceCdObject.value = arguments[5];
        }
        if(this.sectionPlaceNameObject != null){
            this.sectionPlaceNameObject.value = arguments[6];
        }
        if(this.mailAddrObject != null){
            this.mailAddrObject.value = arguments[7];
        }
        if(this.extensionNoObject != null){
            this.extensionNoObject.value = arguments[8];
        }
        if(this.externalNoObject != null){
            this.externalNoObject.value = arguments[9];
        }
        if(this.faxNoObject != null){
            this.faxNoObject.value = arguments[10];
        }
        // IT2-01433-000 2013/03/21 ADD SBO_SOKOU START
        if(this.sectionAndOfficialNameDispObject != null){
            this.sectionAndOfficialNameDispObject.innerText = arguments[3] + " " + arguments[4];
        }
        // IT2-01433-000 2013/03/21 ADD SBO_SOKOU END
        this.onLoadFlag = true;
    };
    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.sectionPlaceCd = arguments[2];
        this.sectionCd = arguments[3];
        this.referenceRangeFlg = arguments[4];
        this.userPermissionFlg = arguments[5];
        this.userPermissionFlg2 = arguments[6];
        this.validDateFlg = arguments[7];
    };

    this.getParam = function() {
        var param = [
            this.termFlag,
            this.companyCd,
            this.sectionPlaceCd,
            this.sectionCd,
            this.referenceRangeFlg,
            this.userPermissionFlg,
            this.userPermissionFlg2,
            this.validDateFlg
        ];
        return param;
    };
}

//納入先POPUP
function DeliveryPlacePopup(){
    //output
    //納入先コード
    this.deliveryPlaceCdObject = null;
    //納入先名
    this.deliveryPlaceNameObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;

    //ロードフラグ
    this.onLoadFlag = true;

    this.setObject = function() {
        this.deliveryPlaceCdObject = arguments[0];
        this.deliveryPlaceNameObject = arguments[1];
    };

    this.setObjectValue = function() {
        if(this.deliveryPlaceCdObject != null){
            this.deliveryPlaceCdObject.value = arguments[0];
        }
        if(this.deliveryPlaceNameObject != null){
            this.deliveryPlaceNameObject.value = arguments[1];
        }
        this.onLoadFlag = true;
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
    };

    this.getParam = function() {
        var param = [
            this.termFlag,
            this.companyCd
        ];
        return param;
    };
}

//メーカーPOPUP
function ManufactPopup(){
    //output
    //メーカーコード
    this.manufactCdObject = null;
    //メーカー名
    this.manufactNameObject = null;
    //input
    //廃止フラグ
    this.termFlag = null;

    //ロードフラグ
    this.onLoadFlag = true;

    this.setObject = function() {
        this.manufactCdObject = arguments[0];
        this.manufactNameObject = arguments[1];
    };

    this.setObjectValue = function() {
        if(this.manufactCdObject != null){
            this.manufactCdObject.value = arguments[0];
        }
        if(this.manufactNameObject != null){
            this.manufactNameObject.value = arguments[1];
        }
        this.onLoadFlag = true;
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
    };

    this.getParam = function() {
        var param = [
            this.termFlag
        ];
        return param;
    };
}

//品名POPUP
function ItemPopup(){
    //output
    //品名コード
    this.itemCdObject = null;
    //品名
    this.itemNameObject = null;
    //大分類コード
    this.itemClassLObject = null;
    //大分類名
    this.itemClassNameLObject = null;
    //中分類コード
    this.itemClassMObject = null;
    //中分類名
    this.itemClassNameMObject = null;
    //小分類コード
    this.itemClassSObject = null;
    //小分類名
    this.itemClassNameSObject = null;
    //メーカーコード
    this.manufactCdObject = null;
    //メーカー名
    this.manufactNameObject = null;
    //型式
    this.katashikiObject = null;
    //単位コード
    this.unitCdObject = null;
    //単位名
    this.unitNameObject = null;
    //取引先コード
    this.supCdObject = null;
    //取引先名
    this.supNameObject = null;
    //取引先名（略称）
    this.supAbbrNameObject = null;
    //通貨コード
    this.currencyCdObject = null;
    //通貨名
    this.currencyNameObject = null;
    //通貨記号
    this.currencyMarkObject = null;
    //単価
    this.priceObject = null;
    //検査区分
    this.inspectIndObject = null;

    //価格フラグ
    this.priceFlgObject = null;

    //自動発注フラグ
    this.autoOrderFlgObject = null;

    //課税区分
    this.taxIndObject = null;

    // 科目コード
    this.subjectCdObject = null;

    // 科目名
    this.subjectNameObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.company = null;
    //希望数量
    this.reqVol = null;
    //システム日付
    this.sysDate = null;
    //希望納期
    this.reqDate = null;
    //希望取引先
    this.supCd = null;

    //ロードフラグ
    this.onLoadFlag = true;

    this.setObject = function() {
        this.itemCdObject = arguments[0];
        this.itemNameObject = arguments[1];
        this.itemClassLObject = arguments[2];
        this.itemClassNameLObject = arguments[3];
        this.itemClassMObject = arguments[4];
        this.itemClassNameMObject = arguments[5];
        this.itemClassSObject = arguments[6];
        this.itemClassNameSObject = arguments[7];
        this.manufactCdObject = arguments[8];
        this.manufactNameObject = arguments[9];
        this.katashikiObject = arguments[10];
        this.unitCdObject = arguments[11];
        this.unitNameObject = arguments[12];
        this.supCdObject = arguments[13];
        this.supNameObject = arguments[14];
        this.supAbbrNameObject = arguments[15];
        this.currencyCdObject = arguments[16];
        this.currencyNameObject = arguments[17];
        this.currencyMarkObject = arguments[18];
        this.priceObject = arguments[19];
        this.inspectIndObject = arguments[20];
        this.priceFlgObject = arguments[21];
        this.autoOrderFlgObject = arguments[22];
        this.taxIndObject = arguments[23];
        this.subjectCdObject = arguments[24];
        this.subjectNameObject = arguments[25];
    };

    this.setObjectValue = function() {
        if(this.itemCdObject != null){
            this.itemCdObject.value = arguments[0];
        }
        if(this.itemNameObject != null){
            this.itemNameObject.value = arguments[1];
        }
        if(this.itemClassLObject != null){
            this.itemClassLObject.value = arguments[2];
        }
        if(this.itemClassNameLObject != null){
            this.itemClassNameLObject.value = arguments[3];
        }
        if(this.itemClassMObject != null){
            this.itemClassMObject.value = arguments[4];
        }
        if(this.itemClassNameMObject != null){
            this.itemClassNameMObject.value = arguments[5];
        }
        if(this.itemClassSObject != null){
            this.itemClassSObject.value = arguments[6];
        }
        if(this.itemClassNameSObject != null){
            this.itemClassNameSObject.value = arguments[7];
        }
        if(this.manufactCdObject != null){
            this.manufactCdObject.value = arguments[8];
        }
        if(this.manufactNameObject != null){
            this.manufactNameObject.value = arguments[9];
        }
        if(this.katashikiObject != null){
            this.katashikiObject.value = arguments[10];
        }
        if(this.unitCdObject != null){
            this.unitCdObject.value = arguments[11];
        }
        if(this.unitNameObject != null){
            this.unitNameObject.value = arguments[12];
        }
        if(this.supCdObject != null){
            this.supCdObject.value = arguments[13];
        }
        if(this.supNameObject != null){
            this.supNameObject.value = arguments[14];
        }
        if(this.supAbbrNameObject != null){
            this.supAbbrNameObject.value = arguments[15];
        }
        if(this.currencyCdObject != null){
            this.currencyCdObject.value = arguments[16];
        }
        if(this.currencyNameObject != null){
            this.currencyNameObject.value = arguments[17];
        }
        if(this.currencyMarkObject != null){
            this.currencyMarkObject.value = arguments[18];
        }
        if(this.priceObject != null){
            this.priceObject.value = arguments[19];
        }
        if(this.inspectIndObject != null){
            this.inspectIndObject.value = arguments[20];
        }
        if(this.priceFlgObject != null){
            this.priceFlgObject.value = arguments[21];
        }
        if(this.autoOrderFlgObject != null){
            this.autoOrderFlgObject.value = arguments[22];
        }
        if(this.taxIndObject != null){
            this.taxIndObject.value = arguments[23];
        }
        if(this.subjectCdObject != null) {
            this.subjectCdObject.value = arguments[24];
        }
        if(this.subjectNameObject != null) {
            this.subjectNameObject.value = arguments[25];
        }
        this.onLoadFlag = true;
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.company = arguments[1];
        if(getObj(arguments[2]) != null){
            this.reqVol = getObj(arguments[2]).value;
        }
        this.sysDate = arguments[3];
        if(getObj(arguments[4]) != null){
            this.reqDate = getObj(arguments[4]).value;
        }
        if(getObj(arguments[5]) != null){
            this.supCd = getObj(arguments[5]).value;
        } else {
            this.supCd = "";
        }

    };

    this.getParam = function() {
        var param = [
            this.termFlag,
            this.company,
            this.reqVol,
            this.sysDate,
            this.reqDate,
            this.supCd
        ];
        return param;
    };
}

//品種POPUP
function ItemKindPopup(){
    //output
    //大分類コード
    this.itemClassLObject = null;
    //大分類名
    this.itemClassLNameObject = null;
    //中分類コード
    this.itemClassMObject = null;
    //中分類名
    this.itemClassMNameObject = null;
    //小分類コード
    this.itemClassSObject = null;
    //小分類名
    this.itemClassSNameObject = null;
    //購買部門コード
    this.sectionCdObject = null;
    //購買部門名
    this.sectionNameObject = null;
    //購買担当者ID
    this.userCdObject = null;
    //購買担当者名
    this.userNameObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //大分類コード
    this.itemClassL = null;
    //中分類コード
    this.itemClassM = null;
    //部門種別コード
    this.sectionTypeCode = null;
    //ロードフラグ
    this.onLoadFlag = true;

    this.setObject = function() {
        this.itemClassLNameObject = arguments[0];
        this.itemClassMNameObject = arguments[1];
        this.itemClassSNameObject = arguments[2];
        this.itemClassLObject = arguments[3];
        this.itemClassMObject = arguments[4];
        this.itemClassSObject = arguments[5];
        this.sectionCdObject = arguments[6];
        this.sectionNameObject = arguments[7];
        this.userCdObject = arguments[8];
        this.userNameObject = arguments[9];
    };

    this.setObjectValue = function() {
        if(this.itemClassLNameObject != null){
            this.itemClassLNameObject.value = arguments[0];
        }
        if(this.itemClassMNameObject != null){
            this.itemClassMNameObject.value = arguments[1];
        }
        if(this.itemClassSNameObject != null){
            this.itemClassSNameObject.value = arguments[2];
        }
        if(this.itemClassLObject != null){
            this.itemClassLObject.value = arguments[3];
        }
        if(this.itemClassMObject != null){
            this.itemClassMObject.value = arguments[4];
        }
        if(this.itemClassSObject != null){
            this.itemClassSObject.value = arguments[5];
        }
        if(this.sectionCdObject != null){
            this.sectionCdObject.value = arguments[6];
        }
        if(this.sectionNameObject != null){
            this.sectionNameObject.value = arguments[7];
        }
        if(this.userCdObject != null){
            this.userCdObject.value = arguments[8];
        }
        if(this.userNameObject != null){
            this.userNameObject.value = arguments[9];
        }
        this.onLoadFlag = true;
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.itemClassL = arguments[2];
        this.itemClassM = arguments[3];
        this.sectionTypeCode = arguments[4];
    };

    this.getParam = function() {
        var param = [
            this.termFlag,
            this.companyCd,
            this.itemClassL,
            this.itemClassM,
            this.sectionTypeCode
        ];
        return param;
    };
}

//科目POPUP
function SubjectPopup(){
    //output
    //科目コード
    this.subjectCdObject = null;
    //科目名
    this.subjectNameObject = null;
    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;

    //ロードフラグ
    this.onLoadFlag = true;

    this.setObject = function() {
        this.subjectCdObject = arguments[0];
        this.subjectNameObject = arguments[1];
    };

    this.setObjectValue = function() {
        if(this.subjectCdObject != null){
            this.subjectCdObject.value = arguments[0];
        }
        if(this.subjectNameObject != null){
            this.subjectNameObject.value = arguments[1];
        }
        this.onLoadFlag = true;
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.onLoadFlag = true;
    };

    this.getParam = function() {
        var param = [
            this.termFlag ,
            this.companyCd
        ];
        return param;
    };
}

//事業所POPUP
function SectionPlacePopup(){
    //output
    //会社コード
    this.companyCdObject = null;
    //会社名
    this.companyNameObject = null;
    //事業所コード
    this.sectionPalceCdObject = null;
    //事業所名
    this.sectionPlaceNameObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //会社変更可否区分
    this.companyChangeFlag = null;
    //有効期間フラグ
    this.validDateFlg = null;

    //ロードフラグ
    this.onLoadFlag = true;

    this.setObject = function() {
        this.sectionPalceCdObject = arguments[0];
        this.sectionPlaceNameObject = arguments[1];
        this.companyCdObject = arguments[2];
        this.companyNameObject = arguments[3];
    };

    this.setObjectValue = function() {
        if(this.sectionPalceCdObject != null){
            this.sectionPalceCdObject.value  = arguments[0];
        }
        if(this.sectionPlaceNameObject != null){
            this.sectionPlaceNameObject.value  = arguments[1];
        }
        if(this.companyCdObject != null){
            this.companyCdObject.value = arguments[2];
        }
        if(this.companyNameObject != null){
            this.companyNameObject.value = arguments[3];
        }
        this.onLoadFlag = true;
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.companyChangeFlag = arguments[2];
        this.validDateFlg = arguments[3];
    };

    this.getParam = function() {
        var param = [
            this.termFlag ,
            this.companyCd,
            this.companyChangeFlag,
            this.validDateFlg
        ];
        return param;
    };
}

//統一取引先POPUP
function VendorPopup(){
  //output
  //会社コード
  this.vendorCdObject = null;
  //会社名
  this.vendorNameObject = null;

  //input
  //廃止フラグ
  this.termFlag = null;

  this.setObject = function() {
      this.vendorCdObject = arguments[0];
      this.vendorNameObject = arguments[1];
  };

  this.setObjectValue = function() {
      if(this.vendorCdObject != null){
          this.vendorCdObject.value = arguments[0];
      }
      if(this.vendorNameObject != null){
          this.vendorNameObject.value = arguments[1];
      }
  };

  this.setParam = function() {
      this.termFlag = arguments[0];
  };

  this.getParam = function() {
      var param = [
          this.termFlag
      ];
      return param;
  };
}


//承認ルート詳細POPUP
function AppRouteDetailPopup(){

  //input
  //会社コード
  this.companyCd = null;
  //部門コード
  this.sectionCd = null;
  //承認伝票種別
  this.appVoucherInd = null;
  //承認ルート番号
  this.appRouteNo = null;

  //ロードフラグ
  this.onLoadFlag = true;

  this.setParam = function() {
      this.companyCd = arguments[0];
      this.sectionCd = arguments[1];
      this.appVoucherInd = arguments[2];
      this.appRouteNo = arguments[3];
  };

  this.getParam = function() {
      var param = [
          this.companyCd ,
          this.sectionCd,
          this.appVoucherInd,
          this.appRouteNo
      ];
      this.onLoadFlag = false;
      return param;
  };
}
var appRouteDetailPopup = new AppRouteDetailPopup();


//項目定義 POPUP
function ElementConfigPopup(){

    this.elementSeqObject = null;
    this.elementNameCdObject = null;
    this.elementNameObject = null;
    this.itemTypeObject = null;
    this.itemTypeNameObject = null;
    this.callback = null;

    this.setObject = function() {
        this.elementSeqObject = arguments[0];
        this.elementNameCdObject = arguments[1];
        this.elementNameObject = arguments[2];
        this.itemTypeObject = arguments[3];
        this.itemTypeNameObject = arguments[4];
        this.callback = arguments[5];
    };

    this.setObjectValue = function() {
        if(this.elementSeqObject != null){
            this.elementSeqObject.value = arguments[0];
        }
        if(this.elementNameCdObject != null){
            this.elementNameCdObject.value = arguments[1];
        }
        if(this.elementNameObject != null){
            this.elementNameObject.value = arguments[2];
        }
        if(this.itemTypeObject != null){
            this.itemTypeObject.value = arguments[3];
        }
        if(this.itemTypeNameObject != null){
            this.itemTypeNameObject.value = arguments[4];
        }
        if(this.callback != null){
            this.callback();
        }
    };

    this.setParam = function() {
        this.itemType = arguments[0];
    };

    this.getParam = function() {
        var param = [
            this.itemType
        ];
        return param;
    };
}

var elementConfigPopup = new ElementConfigPopup();

//名称マスタ POPUP
function ElementNamePopup(){

    this.elementNameCdObject = null;
    this.elementNameObject = null;

    this.setObject = function() {
        this.elementNameCdObject = arguments[0];
        this.elementNameObject = arguments[1];
    };

    this.setObjectValue = function() {
        if(this.elementNameCdObject != null){
            this.elementNameCdObject.value = arguments[0];
        }
        if(this.elementNameObject != null){
            this.elementNameObject.value = arguments[1];
        }
    };
}
var elementNamePopup = new ElementNamePopup();

//予算番号検索 POPUP
function BudgetnoPopup(){
  //output
  //予算番号
  this.budgetNoObject = null;

  //input
  //廃止フラグ
  this.termFlg = null;
  //会社コード
  this.companyCd = null;
  //事業所コード
  this.sectionPalceCd = null;
  // 負担部門コード
  this.sectionCd = null;
  // 負担部門名
  this.sectionName = null;

  //ロードフラグ
  this.onLoadFlag = true;

  this.setObject = function() {
      this.budgetNoObject = arguments[0];
  };

  this.setObjectValue = function() {
      if(this.budgetNoObject != null){
          this.budgetNoObject.value = arguments[0];
      }
      this.onLoadFlag = true;
  };

  this.setParam = function() {
      this.termFlg = arguments[0];
      this.companyCd = arguments[1];
      this.sectionPalceCd = arguments[2];
      this.sectionCd = arguments[3];
      this.sectionName = arguments[4];
  };

  this.getParam = function() {
      var param = [
          this.termFlg ,
          this.companyCd,
          this.sectionPalceCd,
          this.sectionCd,
          this.sectionName
      ];
      return param;
  };
}
var budgetnoPopup = new BudgetnoPopup();

//在庫場所検索 POPUP
function StockPlacePopup(){
  //output
  //事業所コード
  this.sectionPlaceCdObject = null;
  //事業所名
  this.sectionPlaceNameObject = null;
  //在庫場所コード
  this.stockPlaceCdObject = null;
  //在庫場所名
  this.stockPlaceNameObject = null;

  //input
  //廃止フラグ
  this.termFlg = null;
  //会社コード
  this.companyCd = null;
  //事業所コード
  this.sectionPalceCd = null;
  //参照範囲区分
  this.referenceRangeInd = null;

  //ロードフラグ
  this.onLoadFlag = true;

  this.setObject = function() {
      this.sectionPlaceCdObject = arguments[0];
      this.sectionPlaceNameObject = arguments[1];
      this.stockPlaceCdObject = arguments[2];
      this.stockPlaceNameObject = arguments[3];
  };

  this.setObjectValue = function() {
      if(this.sectionPlaceCdObject != null){
          this.sectionPlaceCdObject.value = arguments[0];
      }
      if(this.sectionPlaceNameObject != null){
          this.sectionPlaceNameObject.value = arguments[1];
      }
      if(this.stockPlaceCdObject != null){
          this.stockPlaceCdObject.value = arguments[2];
      }
      if(this.stockPlaceNameObject != null){
          this.stockPlaceNameObject.value = arguments[3];
      }
      this.onLoadFlag = true;
  };

  this.setParam = function() {
      this.termFlg = arguments[0];
      this.companyCd = arguments[1];
      this.sectionPalceCd = arguments[2];
      this.referenceRangeInd = arguments[3];
  };

  this.getParam = function() {
      var param = [
          this.termFlg ,
          this.companyCd,
          this.sectionPalceCd,
          this.referenceRangeInd
      ];
      return param;
  };
}
var stockPlacePopup = new StockPlacePopup();

var sectionPopup = new SectionPopup();
var pricePopup = new PricePopup();
var supplierPopup = new SupplierPopup();
var userPopup = new UserPopup();
var deliveryPlacePopup = new DeliveryPlacePopup();
var manufactPopup = new ManufactPopup();
var itemPopup = new ItemPopup();
var itemKindPopup = new ItemKindPopup();
var subjectPopup = new SubjectPopup();
var sectionPlacePopup = new SectionPlacePopup();
var vendorPopup = new VendorPopup();
var indexOfDetail = -1;
/*--------------------------------------------------------------------------*/
/*   機　能：ONBLUR                                                           */
/*--------------------------------------------------------------------------*/
//部門onblur
var sectionOnblur = new SectionOnblur();
function SectionOnblur(){
    //output
    //部門コード
    this.sectionCdObject = null;
    //部門名
    this.sectionNameObject = null;
    //会社コード
    this.companyCdObject = null;
    //会社名
    this.companyNameObject = null;
    //事業所コード
    this.sectionPalceCdObject = null;
    //事業所名
    this.sectionPlaceNameObject = null;

    //input
    //部門コード
    this.sectionCd = null;
    //会社コード
    this.companyCd = null;
    //廃止フラグ
    this.termFlag = null;

    this.setParam = function() {
        this.sectionCd = arguments[0];
        this.companyCd = arguments[1];
        this.termFlag = arguments[2];
    };

    this.setObject = function() {
        this.sectionCdObject = arguments[0];
        this.sectionNameObject = arguments[1];
        this.companyCdObject = arguments[2];
        this.companyNameObject = arguments[3];
        this.sectionPalceCdObject = arguments[4];
        this.sectionPlaceNameObject = arguments[5];
    };

    this.setObjectValue = function() {
        if(this.sectionCdObject != null){
            this.sectionCdObject.value  = arguments[0];
        }
        if(this.sectionNameObject != null){
            this.sectionNameObject.value  = arguments[1];
        }
        if(this.companyCdObject != null){
            this.companyCdObject.value = arguments[2];
        }
        if(this.companyNameObject != null){
            this.companyNameObject.value = arguments[3];
        }
        if(this.sectionPalceCdObject != null){
            this.sectionPalceCdObject.value  = arguments[4];
        }
        if(this.sectionPlaceNameObject != null){
            this.sectionPlaceNameObject.value  = arguments[5];
        }
    };

   this.doOnblur = function() {
        $.post(
          "../../getSectionInfoOnBlur",
          {
              "sectionCd":cleanXss(this.sectionCd),
              "companyCd":cleanXss(this.companyCd),
              "termFlag":cleanXss(this.termFlag)
          },
          function(data) {
              sectionOnblur.setObjectValue(data.sectionIdentify.sectionCd, data.sectionName, data.sectionIdentify.companyCd, data.companyName, data.sectionPlaceCd, data.sectionPlaceName);
          }
        );
    };
}
//納入先Onblur
var deliveryPlaceOnblur =new DeliveryPlaceOnblur();
function DeliveryPlaceOnblur (){
    //output
    //納入先コード
    this.deliveryPlaceCdObject = null;
    //納入先名
    this.deliveryPlaceNameObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //納入先コード
    this.delivPlaceCd=null;

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.delivPlaceCd = arguments[2];
    };

    this.setObject = function() {
        this.deliveryPlaceCdObject = arguments[0];
        this.deliveryPlaceNameObject = arguments[1];
    };

    this.setObjectValue = function() {
        if(this.deliveryPlaceCdObject != null){
            this.deliveryPlaceCdObject.value = arguments[0];
        }
        if(this.deliveryPlaceNameObject != null){
            this.deliveryPlaceNameObject.value = arguments[1];
        }
    };

    this.doOnblur = function() {
    $.post(
      "../../getDeliveryPlaceOnBlur",
      {
          "termFlag":this.termFlag,
          "companyCd":this.companyCd,
          "delivPlaceCd":this.delivPlaceCd
      },
      function(data) {
          deliveryPlaceOnblur.setObjectValue(data.delivPlaceCd, data.delivPlaceName);
      }
    );
};
}

//メーカーOnblur
var manufactOnblur=new ManufactOnblur();
function ManufactOnblur(){
    //output
    //メーカーコード
    this.manufactCdObject = null;
    //メーカー名
    this.manufactNameObject = null;
    //input
    //廃止フラグ
    this.termFlag = null;
    //メーカーコード
    this.manufactCd=null;

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.manufactCd= arguments[1];
    };
    this.setObject = function() {
        this.manufactCdObject = arguments[0];
        this.manufactNameObject = arguments[1];
    };

    this.setObjectValue = function() {
        if(this.manufactCdObject != null){
            this.manufactCdObject.value = arguments[0];
        }
        if(this.manufactNameObject != null){
            this.manufactNameObject.value = arguments[1];
        }
    };

    this.doOnblur = function() {
        $.post(
          "../../getManufactInfoOnBlur",
          {
              "termFlag":this.termFlag,
              "manufactCd":this.manufactCd
          },
          function(data) {
              manufactOnblur.setObjectValue(data.manufactIdentify.manufactCd, data.manufactName);
          }
        );
    };
}
//科目Onblur
var subjectOnblur=new SubjectOnblur();
function SubjectOnblur(){
    //output
    //科目コード
    this.subjectCdObject = null;
    //科目名
    this.subjectNameObject = null;
    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //科目コード
    this.subjectCd = null;

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd= arguments[1];
        this.subjectCd= arguments[2];
    };
    this.setObject = function() {
        this.subjectCdObject = arguments[0];
        this.subjectNameObject = arguments[1];
    };

    this.setObjectValue = function() {
        if(this.subjectCdObject != null){
            this.subjectCdObject.value = arguments[0];
        }
        if(this.subjectNameObject != null){
            this.subjectNameObject.value = arguments[1];
        }
    };

    this.doOnblur = function() {
        $.post(
          "../../getSubjectOnBlur",
          {
              "termFlag":this.termFlag,
              "companyCd":this.companyCd,
              "subjectCd":this.subjectCd
          },
          function(data) {
              subjectOnblur.setObjectValue(data.subjectIdentify.subjectCd, data.subjectName);
          }
        );
    };
}
//統一取引先Onblur
var vendorOnblur =new VendorOnblur();
function VendorOnblur(){
//output
//統一取引先コード
this.vendorCdObject = null;
//統一取引先名
this.vendorNameObject = null;

//input
//統一取引先コード
this.vendorCd = null;

this.setParam = function() {
  this.vendorCd = arguments[0];
};

this.setObject = function() {
  this.vendorCdObject = arguments[0];
  this.vendorNameObject = arguments[1];
};

this.setObjectValue = function() {
  if(this.vendorCdObject != null){
      this.vendorCdObject.value = arguments[0];
  }
  if(this.vendorNameObject != null){
      this.vendorNameObject.value = arguments[1];
  }
};

this.doOnblur = function() {
  $.post(
    "../../getVendorOnBlur",
    {
        "vendorCd":this.vendorCd
    },
    function(data) {
        vendorOnblur.setObjectValue(data.vendorIdentify.vendorCd, data.vendorName);
    }
  );
};
}
//ユーザーOnblur
var userOnblur=new UserOnblur();
function UserOnblur(){
    //output
    //ユーザーコード
    this.userCdObject = null;
    //ユーザー名
    this.userNameObject = null;
    //事業所コード
    this.sectionPlaceCdObject = null;
    //事業所名
    this.sectionPlaceNameObject = null;
    //部門コード
    this.sectionCdObject = null;
    //部門名
    this.sectionNameObject = null;
    //内線番号
    this.extensionNoObject = null;
    //外線番号
    this.externalNoObject = null;
    //ファクス番号
    this.faxNoObject = null;
    //メールアドレス
    this.mailAddrObject = null;
    //役職
    this.officialNameObject = null;
    // IT2-01433-000 2013/03/21 ADD SBO_SOKOU START
    //部門役職名(表示用)
    this.sectionAndOfficialNameDispObject = null;
    // IT2-01433-000 2013/03/21 ADD SBO_SOKOU END

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //事業所コード
    this.sectionPlaceCd = null;
    //部門コード
    this.sectionCd = null;
    //参照範囲区分
    this.referenceRangeFlg = null;
    //ユーザー権限区分
    this.userPermissionFlg = null;
    //ユーザーId
    this.userId = null;

    this.setObject = function() {
        this.userCdObject = arguments[0];
        this.userNameObject = arguments[1];
        this.sectionCdObject = arguments[2];
        this.sectionNameObject = arguments[3];
        this.officialNameObject = arguments[4];
        this.sectionPlaceCdObject = arguments[5];
        this.sectionPlaceNameObject = arguments[6];
        this.mailAddrObject = arguments[7];
        this.extensionNoObject = arguments[8];
        this.externalNoObject = arguments[9];
        this.faxNoObject = arguments[10];
        // IT2-01433-000 2013/03/21 ADD SBO_SOKOU START
        this.sectionAndOfficialNameDispObject = arguments[11];
        // IT2-01433-000 2013/03/21 ADD SBO_SOKOU END
    };

    this.setObjectValue = function() {
        if(this.userCdObject != null){
            this.userCdObject.value = arguments[0];
        }
        if(this.userNameObject != null){
            this.userNameObject.value = arguments[1];
        }
        if(this.sectionCdObject != null){
            this.sectionCdObject.value = arguments[2];
        }
        if(this.sectionNameObject != null){
            this.sectionNameObject.value = arguments[3];
        }
        if(this.officialNameObject != null){
            this.officialNameObject.value = arguments[4];
        }
        if(this.sectionPlaceCdObject != null){
            this.sectionPlaceCdObject.value = arguments[5];
        }
        if(this.sectionPlaceNameObject != null){
            this.sectionPlaceNameObject.value = arguments[6];
        }
        if(this.mailAddrObject != null){
            this.mailAddrObject.value = arguments[7];
        }
        if(this.extensionNoObject != null){
            this.extensionNoObject.value = arguments[8];
        }
        if(this.externalNoObject != null){
            this.externalNoObject.value = arguments[9];
        }
        if(this.faxNoObject != null){
            this.faxNoObject.value = arguments[10];
        }
        // IT2-01433-000 2013/03/21 ADD SBO_SOKOU START
        if(this.sectionAndOfficialNameDispObject != null){
            this.sectionAndOfficialNameDispObject.innerText = arguments[3] + " " + arguments[4];
        }
        // IT2-01433-000 2013/03/21 ADD SBO_SOKOU END
    };
    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.sectionPlaceCd = arguments[2];
        this.sectionCd = arguments[3];
        this.referenceRangeFlg = arguments[4];
        this.userPermissionFlg = arguments[5];
        this.userId = arguments[6];
    };

    this.doOnblur = function() {
        $.post(
          "../../getUserInfoOnBlur",
          {
              "termFlag":this.termFlag,
              "companyCd":this.companyCd,
              "sectionPlaceCd":this.sectionPlaceCd,
              "sectionCd":this.sectionCd,
              "referenceRangeFlg":this.referenceRangeFlg,
              "userPermissionFlg":this.userPermissionFlg,
              "userId":this.userId
          },
          function(data) {
              userOnblur.setObjectValue(data.userIdentify.userId,data.userName,data.userIdentify.sectionCd,data.sectionName,data.officialName,data.sectionPlaceCd,data.sectionPlaceName,data.mailAddr,data.extensionNo,data.externalNo,data.faxNo);
          }
        );
    };
}
//取引先Onblur
var supplierOnblur=new SupplierOnblur();
function SupplierOnblur(){
  //output
  //取引先コード
  this.supplierCdObject = null;
  //取引先名
  this.supplierNameObject = null;
  //取引先名（略称）
  this.supplierAbbrNameObject = null;
  //通貨コード
  this.currencyCdObject = null;
  //下請法適用業者区分
  this.subconIndObject = null;
  //EDIデータ送受信方法
  this.ediIndObject = null;
  //銀行コード
  this.bankCdObject = null;
  //銀行名
  this.bankNameObject = null;
  //支店コード
  this.branchCdObject = null;
  //支店名
  this.branchNameObject = null;
  //口座種別
  this.accountTypeObject = null;
  //口座番号
  this.accountNoObject = null;
  //口座名義
  this.accountNameObject = null;

  //input
  //廃止フラグ
  this.termFlag = null;
  //会社コード
  this.companyCd = null;
  //取引先コード
  this.supCd = null;

  this.setParam = function() {
      this.termFlag = arguments[0];
      this.companyCd= arguments[1];
      this.supCd= arguments[2];
  };
  this.setObject = function() {
      this.supplierCdObject = arguments[0];
      this.supplierNameObject = arguments[1];
      this.supplierAbbrNameObject = arguments[2];
      this.currencyCdObject = arguments[3];
      this.subconIndObject = arguments[4];
      this.ediIndObject = arguments[5];
      this.bankCdObject = arguments[6];
      this.bankNameObject = arguments[7];
      this.branchCdObject = arguments[8];
      this.branchNameObject = arguments[9];
      this.accountTypeObject = arguments[10];
      this.accountNoObject = arguments[11];
      this.accountNameObject = arguments[12];
  };

  this.setObjectValue = function() {
      if(this.supplierCdObject != null){
          this.supplierCdObject.value = arguments[0];
      }
      if(this.supplierNameObject != null){
          this.supplierNameObject.value = arguments[1];
      }
      if(this.supplierAbbrNameObject != null){
          this.supplierAbbrNameObject.value = arguments[2];
      }
      if(this.currencyCdObject != null){
          this.currencyCdObject.value = arguments[3];
      }
      if(this.subconIndObject != null){
          this.subconIndObject.value = arguments[4];
      }
      if(this.ediIndObject != null){
          this.ediIndObject.value = arguments[5];
      }
      if(this.ediIndObject != null){
          this.bankCdObject.value = arguments[6];
      }
      if(this.bankNameObject != null){
          this.bankNameObject.value = arguments[7];
      }
      if(this.branchCdObject != null){
          this.branchCdObject.value = arguments[8];
      }
      if(this.branchNameObject != null){
          this.branchNameObject.value = arguments[9];
      }
      if(this.accountTypeObject != null){
          this.accountTypeObject.value = arguments[10];
      }
      if(this.accountNoObject != null){
          this.accountNoObject.value = arguments[11];
      }
      if(this.accountNameObject != null){
          this.accountNameObject.value = arguments[12];
      }
  };

  this.doOnblur = function() {
      $.post(
        "../../getSupplierInfoOnBlur",
        {
            "termFlag":this.termFlag,
            "companyCd":this.companyCd,
            "supCd":this.supCd
        },
        function(data) {
            supplierOnblur.setObjectValue( data.supplierIdentify.supCd, data.supName,data.supAbbrName, data.currencyCd, data.subconInd, data.ediInd, data.bankCd, data.bankName, data.branchCd, data.branchName, data.accountType, data.accountNo, data.accountName);
        }
      );
  };
}
//事業所Onblur
var sectionPlaceOnblur=new SectionPlaceOnblur();
function SectionPlaceOnblur(){
    //output
    //会社コード
    this.companyCdObject = null;
    //会社名
    this.companyNameObject = null;
    //事業所コード
    this.sectionPalceCdObject = null;
    //事業所名
    this.sectionPlaceNameObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //事業所コード
    this.sectionPlaceCd = null;

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd= arguments[1];
        this.sectionPlaceCd= arguments[2];
    };
    this.setObject = function() {
        this.sectionPalceCdObject = arguments[0];
        this.sectionPlaceNameObject = arguments[1];
        this.companyCdObject = arguments[2];
        this.companyNameObject = arguments[3];
    };

    this.setObjectValue = function() {
        if(this.sectionPalceCdObject != null){
            this.sectionPalceCdObject.value  = arguments[0];
        }
        if(this.sectionPlaceNameObject != null){
            this.sectionPlaceNameObject.value  = arguments[1];
        }
        if(this.companyCdObject != null){
            this.companyCdObject.value = arguments[2];
        }
        if(this.companyNameObject != null){
            this.companyNameObject.value = arguments[3];
        }
    };


    this.doOnblur = function() {
        $.post(
          "../../getSectionPlaceInfoOnBlur",
          {
              "termFlag":this.termFlag,
              "companyCd":this.companyCd,
              "sectionPlaceCd":this.sectionPlaceCd
          },
          function(data) {
              sectionPlaceOnblur.setObjectValue(data.sectionPlaceCd, data.sectionPlaceName);
          }
        );
    };
}
//品名Onblur
var itemOnblur=new ItemOnblur();
function ItemOnblur(){
    //output
    //品名コード
    this.itemCdObject = null;
    //品名
    this.itemNameObject = null;
    //大分類コード
    this.itemClassLObject = null;
    //大分類名
    this.itemClassNameLObject = null;
    //中分類コード
    this.itemClassMObject = null;
    //中分類名
    this.itemClassNameMObject = null;
    //小分類コード
    this.itemClassSObject = null;
    //小分類名
    this.itemClassNameSObject = null;
    //メーカーコード
    this.manufactCdObject = null;
    //メーカー名
    this.manufactNameObject = null;
    //型式
    this.katashikiObject = null;
    //単位コード
    this.unitCdObject = null;
    //単位名
    this.unitNameObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.companyCd = null;
    //品名コード
    this.itemCd = null;

    this.setObject = function() {
        this.itemCdObject = arguments[0];
        this.itemNameObject = arguments[1];
        this.itemClassLObject = arguments[2];
        this.itemClassNameLObject = arguments[3];
        this.itemClassMObject = arguments[4];
        this.itemClassNameMObject = arguments[5];
        this.itemClassSObject = arguments[6];
        this.itemClassNameSObject = arguments[7];
        this.manufactCdObject = arguments[8];
        this.manufactNameObject = arguments[9];
        this.katashikiObject = arguments[10];
        this.unitCdObject = arguments[11];
        this.unitNameObject = arguments[12];

    };

    this.setObjectValue = function() {
        if(this.itemCdObject != null){
            this.itemCdObject.value = arguments[0];
        }
        if(this.itemNameObject != null){
            this.itemNameObject.value = arguments[1];
        }
        if(this.itemClassLObject != null){
            this.itemClassLObject.value = arguments[2];
        }
        if(this.itemClassNameLObject != null){
            this.itemClassNameLObject.value = arguments[3];
        }
        if(this.itemClassMObject != null){
            this.itemClassMObject.value = arguments[4];
        }
        if(this.itemClassNameMObject != null){
            this.itemClassNameMObject.value = arguments[5];
        }
        if(this.itemClassSObject != null){
            this.itemClassSObject.value = arguments[6];
        }
        if(this.itemClassNameSObject != null){
            this.itemClassNameSObject.value = arguments[7];
        }
        if(this.manufactCdObject != null){
            this.manufactCdObject.value = arguments[8];
        }
        if(this.manufactNameObject != null){
            this.manufactNameObject.value = arguments[9];
        }
        if(this.katashikiObject != null){
            this.katashikiObject.value = arguments[10];
        }
        if(this.unitCdObject != null){
            this.unitCdObject.value = arguments[11];
        }
        if(this.unitNameObject != null){
            this.unitNameObject.value = arguments[12];
        }
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.itemCd = arguments[2];
    };

    this.doOnblur = function() {
        $.post(
          "../../getItemInfoOnBlur",
          {
              "termFlag":this.termFlag,
              "companyCd":this.companyCd,
              "itemCd":this.itemCd
          },
          function(data) {
              itemOnblur.setObjectValue(data.itemIdentify.itemCd,data.itemName,data.itemClassL,data.itemClassNameL,data.itemClassM,data.itemClassNameM,data.itemClassS,data.itemClassNameS,data.manufactCd,data.manufactName,data.katashiki,data.unitCd,data.unitName );
          }
        );
    };
}
//品名検索（価格マスタ・品名マスタ）Onblur
var itemPurPriceOnblur=new ItemPurPriceOnblur();
function ItemPurPriceOnblur(){
    //output
    //品名コード
    this.itemCdObject = null;
    //品名
    this.itemNameObject = null;
    //大分類コード
    this.itemClassLObject = null;
    //大分類名
    this.itemClassNameLObject = null;
    //中分類コード
    this.itemClassMObject = null;
    //中分類名
    this.itemClassNameMObject = null;
    //小分類コード
    this.itemClassSObject = null;
    //小分類名
    this.itemClassNameSObject = null;
    //メーカーコード
    this.manufactCdObject = null;
    //メーカー名
    this.manufactNameObject = null;
    //型式
    this.katashikiObject = null;
    //単位コード
    this.unitCdObject = null;
    //単位名
    this.unitNameObject = null;
    //取引先コード
    this.supCdObject = null;
    //取引先名
    this.supNameObject = null;
    //取引先名（略称）
    this.supAbbrNameObject = null;
    //通貨コード
    this.currencyCdObject = null;
    //自動発注フラグ
    this.autoOrderFlgObject = null;
    //通貨記号
    this.currencyMarkObject = null;
    //単価
    this.priceObject = null;
    //検査区分
    this.inspectIndObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.company = null;
    //品名コード
    this.itemCd = null;
    //希望数量
    this.reqVol = null;

    this.setObject = function() {
        this.itemCdObject = arguments[0];
        this.itemNameObject = arguments[1];
        this.itemClassLObject = arguments[2];
        this.itemClassNameLObject = arguments[3];
        this.itemClassMObject = arguments[4];
        this.itemClassNameMObject = arguments[5];
        this.itemClassSObject = arguments[6];
        this.itemClassNameSObject = arguments[7];
        this.manufactCdObject = arguments[8];
        this.manufactNameObject = arguments[9];
        this.katashikiObject = arguments[10];
        this.unitCdObject = arguments[11];
        this.unitNameObject = arguments[12];
        this.supCdObject = arguments[13];
        this.supNameObject = arguments[14];
        this.supAbbrNameObject = arguments[15];
        this.currencyCdObject = arguments[16];
        this.autoOrderFlgObject = arguments[17];
        this.currencyMarkObject = arguments[18];
        this.priceObject = arguments[19];
        this.inspectIndObject = arguments[20];
    };

    this.setObjectValue = function() {
        if(this.itemCdObject != null){
            this.itemCdObject.value = arguments[0];
        }
        if(this.itemNameObject != null){
            this.itemNameObject.value = arguments[1];
        }
        if(this.itemClassLObject != null){
            this.itemClassLObject.value = arguments[2];
        }
        if(this.itemClassNameLObject != null){
            this.itemClassNameLObject.value = arguments[3];
        }
        if(this.itemClassMObject != null){
            this.itemClassMObject.value = arguments[4];
        }
        if(this.itemClassNameMObject != null){
            this.itemClassNameMObject.value = arguments[5];
        }
        if(this.itemClassSObject != null){
            this.itemClassSObject.value = arguments[6];
        }
        if(this.itemClassNameSObject != null){
            this.itemClassNameSObject.value = arguments[7];
        }
        if(this.manufactCdObject != null){
            this.manufactCdObject.value = arguments[8];
        }
        if(this.manufactNameObject != null){
            this.manufactNameObject.value = arguments[9];
        }
        if(this.katashikiObject != null){
            this.katashikiObject.value = arguments[10];
        }
        if(this.unitCdObject != null){
            this.unitCdObject.value = arguments[11];
        }
        if(this.unitNameObject != null){
            this.unitNameObject.value = arguments[12];
        }
        if(this.supCdObject != null){
            this.supCdObject.value = arguments[13];
        }
        if(this.supNameObject != null){
            this.supNameObject.value = arguments[14];
        }
        if(this.supAbbrNameObject != null){
            this.supAbbrNameObject.value = arguments[15];
        }
        if(this.currencyCdObject != null){
            this.currencyCdObject.value = arguments[16];
        }
        if(this.autoOrderFlgObject != null){
            this.autoOrderFlgObject.value = arguments[17];
        }
        if(this.currencyMarkObject != null){
            this.currencyMarkObject.value = arguments[18];
        }
        if(this.priceObject != null){
            this.priceObject.value = arguments[19];
        }
        if(this.inspectIndObject != null){
            this.inspectIndObject.value = arguments[20];
        }
    };


    this.setParam = function() {
        this.termFlag = arguments[0];
        this.companyCd = arguments[1];
        this.itemCd = arguments[2];
        this.reqVol = arguments[3];
    };

    this.doOnblur = function() {
        $.post(
          "../getItemPurPriceInfoOnBlur",
          {
              "termFlag":this.termFlag,
              "companyCd":this.companyCd,
              "itemCd":this.itemCd,
              "reqVol":this.reqVol
          },
          function(data) {
              itemPurPriceOnblur.setObjectValue(data.itemIdentify.itemCd,data.itemName,data.itemClassL,data.itemClassNameL,data.itemClassM,data.itemClassNameM,data.itemClassS,data.itemClassNameS,data.manufactCd,data.manufactName,data.katashiki,data.unitCd,data.unitName,data.supCd,data.supName,data.supAbbrName,data.currencyCd,"",data.currencyMark,"",data.inspectInd );
          }
        );
    };
}
//品名検索（価格マスタ・品名マスタ）Onblur
var itemPurPriceOnblur=new ItemPurPriceOnblur();
function ItemPurPriceOnblur(){
    //output
    //品名コード
    this.itemCdObject = null;
    //品名
    this.itemNameObject = null;
    //大分類コード
    this.itemClassLObject = null;
    //大分類名
    this.itemClassNameLObject = null;
    //中分類コード
    this.itemClassMObject = null;
    //中分類名
    this.itemClassNameMObject = null;
    //小分類コード
    this.itemClassSObject = null;
    //小分類名
    this.itemClassNameSObject = null;
    //メーカーコード
    this.manufactCdObject = null;
    //メーカー名
    this.manufactNameObject = null;
    //型式
    this.katashikiObject = null;
    //単位コード
    this.unitCdObject = null;
    //単位名
    this.unitNameObject = null;
    //取引先コード
    this.supCdObject = null;
    //取引先名
    this.supNameObject = null;
    //取引先名（略称）
    this.supAbbrNameObject = null;
    //通貨コード
    this.currencyCdObject = null;
    //自動発注フラグ
    this.autoOrderFlgObject = null;
    //通貨記号
    this.currencyMarkObject = null;
    //単価
    this.priceObject = null;
    //検査区分
    this.inspectIndObject = null;
    //課税区分
    this.taxIndObject = null;

    //input
    //廃止フラグ
    this.termFlag = null;
    //会社コード
    this.buyCompanyCd = null;
    //部門コード
    this.buySectionCd = null;
    //品名コード
    this.itemCd = null;
    //希望数量
    this.reqVol = null;
    //取引先コード
    this.supCd = null;

    this.setObject = function() {
        this.itemCdObject = arguments[0];
        this.itemNameObject = arguments[1];
        this.itemClassLObject = arguments[2];
        this.itemClassNameLObject = arguments[3];
        this.itemClassMObject = arguments[4];
        this.itemClassNameMObject = arguments[5];
        this.itemClassSObject = arguments[6];
        this.itemClassNameSObject = arguments[7];
        this.manufactCdObject = arguments[8];
        this.manufactNameObject = arguments[9];
        this.katashikiObject = arguments[10];
        this.unitCdObject = arguments[11];
        this.unitNameObject = arguments[12];
        this.supCdObject = arguments[13];
        this.supNameObject = arguments[14];
        this.supAbbrNameObject = arguments[15];
        this.currencyCdObject = arguments[16];
        this.autoOrderFlgObject = arguments[17];
        this.currencyMarkObject = arguments[18];
        this.priceObject = arguments[19];
        this.inspectIndObject = arguments[20];
        this.taxIndObject = arguments[21];
    };

    this.setObjectValue = function() {
        if(this.itemCdObject != null){
            this.itemCdObject.value = arguments[0];
        }
        if(this.itemNameObject != null){
            this.itemNameObject.value = arguments[1];
        }
        if(this.itemClassLObject != null){
            this.itemClassLObject.value = arguments[2];
        }
        if(this.itemClassNameLObject != null){
            this.itemClassNameLObject.value = arguments[3];
        }
        if(this.itemClassMObject != null){
            this.itemClassMObject.value = arguments[4];
        }
        if(this.itemClassNameMObject != null){
            this.itemClassNameMObject.value = arguments[5];
        }
        if(this.itemClassSObject != null){
            this.itemClassSObject.value = arguments[6];
        }
        if(this.itemClassNameSObject != null){
            this.itemClassNameSObject.value = arguments[7];
        }
        if(this.manufactCdObject != null){
            this.manufactCdObject.value = arguments[8];
        }
        if(this.manufactNameObject != null){
            this.manufactNameObject.value = arguments[9];
        }
        if(this.katashikiObject != null){
            this.katashikiObject.value = arguments[10];
        }
        if(this.unitCdObject != null){
            this.unitCdObject.value = arguments[11];
        }
        if(this.unitNameObject != null){
            this.unitNameObject.value = arguments[12];
        }
        if(this.supCdObject != null){
            this.supCdObject.value = arguments[13];
        }
        if(this.supNameObject != null){
            this.supNameObject.value = arguments[14];
        }
        if(this.supAbbrNameObject != null){
            this.supAbbrNameObject.value = arguments[15];
        }
        if(this.currencyCdObject != null){
            this.currencyCdObject.value = arguments[16];
        }
        if(this.autoOrderFlgObject != null){
            this.autoOrderFlgObject.value = arguments[17];
        }
        if(this.currencyMarkObject != null){
            this.currencyMarkObject.value = arguments[18];
        }
        if(this.priceObject != null){
            this.priceObject.value = arguments[19];
        }
        if(this.inspectIndObject != null){
            this.inspectIndObject.value = arguments[20];
        }
        if(this.taxIndObject != null){
            this.taxIndObject.value = arguments[21];
        }
    };

    this.setParam = function() {
        this.termFlag = arguments[0];
        this.buyCompanyCd = arguments[1];
        this.buySectionCd = arguments[2];
        this.itemCd = arguments[3];
        this.reqVol = arguments[4];
        this.supCd = arguments[5];
    };

    this.doOnblur = function() {
        $.post(
          "../../getItemPurPriceInfoOnBlur",
          {
              "termFlag":this.termFlag,
              "buyCompanyCd":this.buyCompanyCd,
              "buySectionCd":this.buySectionCd,
              "itemCd":this.itemCd,
              "reqVol":this.reqVol,
              "supCd":this.supCd
          },
          function(data) {
              itemPurPriceOnblur.setObjectValue(data.itemIdentify.itemCd,data.itemName,data.itemClassL,data.itemClassNameL,data.itemClassM,data.itemClassNameM,data.itemClassS,data.itemClassNameS,data.manufactCd,data.manufactName,data.katashiki,data.unitCd,data.unitName,data.supCd,data.supName,data.supAbbrName,data.currencyCd,data.autoOrderFlg.autoOrderFlg,data.currencyMark,data.unitPrice.amount.amount,data.inspectInd,data.taxInd.taxInd);
          }
        );
    };
}

//名称onblur
var elementNameOnblur = new ElementNameOnblur();
function ElementNameOnblur(){
    //output
    //名称
    this.elementNameObject = null;

    //input
    //名称コード
    this.elementNameCd = null;

    this.setParam = function() {
        this.elementNameCd = arguments[0];
    };

    this.setObject = function() {
        this.elementNameObject = arguments[0];
    };

    this.setObjectValue = function() {
        if(this.elementNameObject != null){
            this.sectionCdObject.value  = arguments[0];
        }
    };

   this.doOnblur = function() {
        $.post(
          "../../getElementNameOnBlur",
          {
              "elementNameCd":this.elementNameCd
          },
          function(data) {
              elementNameOnblur.setObjectValue(data.elementName);
          }
        );
    };
}

//sendEmail
function sendEmail(userNamem,emailAddr){
    userNamem = encodeURIComponent(userNamem);
    var url = 'mailto:<' + emailAddr + '>';
    window.open(url,"","");
 }


//検索品種セレクト

function initItemClass(url,itemClassL,itemClassM,itemClassS,itemClassLValue,itemClassMValue,itemClassSValue,companyCd,sectionTypeCdValue){

    $("[id='"+itemClassL+"']") .empty();
    $("[id='"+itemClassM+"']").empty();
    $("[id='"+itemClassS+"']").empty();

    $.post(
        url,
        {
            itemClassInd:1,
            itemClassL:itemClassLValue,
            itemClassM:itemClassMValue,
            companyCd:companyCd,
            sectionTypeCode:sectionTypeCdValue
        },
        function(data){
            $.each(data.itemClassL,function(index,element){
                // $("[id='"+itemClassL+"']").append("<option value='"+element.value+"'>"+element.text+"</option>");
                var varItem = new Option(element.text, element.value);
                getObj(itemClassL).options.add(varItem);
              });
            $.each(data.itemClassM,function(index,element){
                // $("[id='"+itemClassM+"']").append("<option value='"+element.value+"'>"+element.text+"</option>");
                var varItem = new Option(element.text, element.value);
                getObj(itemClassM).options.add(varItem);
              });
            $.each(data.itemClassS,function(index,element){
                // $("[id='"+itemClassS+"']").append("<option value='"+element.value+"'>"+element.text+"</option>");
                var varItem = new Option(element.text, element.value);
                getObj(itemClassS).options.add(varItem);
              });
            $("[id='"+itemClassL+"']").val(itemClassLValue);
            $("[id='"+itemClassM+"']").val(itemClassMValue);
            $("[id='"+itemClassS+"']").val(itemClassSValue);
            itemKindLoad(itemClassL,itemClassM,itemClassS);
        }
    );
}

function searchItemClassL(url,itemClassL,itemClassM,itemClassS,itemClassLValue,companyCd, sectionTypeCdValue){

    $("[id='"+itemClassM+"']").empty();
    $("[id='"+itemClassS+"']").empty();
    if("" == itemClassLValue){
        $("[id='"+itemClassM+"']").append("<option value=''></option>");
        $("[id='"+itemClassS+"']").append("<option value=''></option>");
        itemKindLoad(itemClassL,itemClassM,itemClassS);
        return;
    }

    $.post(
        url,
        {
            itemClassInd:2,
            itemClassL:itemClassLValue,
            companyCd:companyCd,
            sectionTypeCode:sectionTypeCdValue
        },
        function(data){

            $.each(data.itemClassM,function(index,element){
                // $("[id='"+itemClassM+"']").append("<option value='"+element.value+"'>"+element.text+"</option>");
                var varItem = new Option(element.text, element.value);
                getObj(itemClassM).options.add(varItem);
              });
            itemKindLoad(itemClassL,itemClassM,itemClassS);
        }
    );
}

function searchItemClassM(url,itemClassL,itemClassM,itemClassS,itemClassLValue,itemClassMValue,companyCd, sectionTypeCdValue){

    $("[id='"+itemClassS+"']").empty();
    if("" == itemClassMValue){
        $("[id='"+itemClassS+"']").append("<option value=''></option>");
        itemKindLoad(itemClassL,itemClassM,itemClassS);
        return;
    }

    $.post(
        url,
        {
            itemClassInd:3,
            itemClassL:itemClassLValue,
            itemClassM:itemClassMValue,
            companyCd:companyCd,
            sectionTypeCode:sectionTypeCdValue
        },
        function(data){

            $.each(data.itemClassS,function(index,element){
                // $("[id='"+itemClassS+"']").append("<option value='"+element.value+"'>"+element.text+"</option>");
                var varItem = new Option(element.text, element.value);
                getObj(itemClassS).options.add(varItem);
              });
            itemKindLoad(itemClassL,itemClassM,itemClassS);
        }
    );
}

function itemKindLoad(itemClassL,itemClassM,itemClassS){
    enableButton(itemClassL,itemClassM,itemClassS);
}

function enableButton(itemClassL,itemClassM,itemClassS){
    var selectL = getObj(itemClassL);
    var selectM = getObj(itemClassM);
    var selectS = getObj(itemClassS);

    var buttonM = getObj("buttonM");
    var buttonS = getObj("buttonS");

    if(selectL.value == ""){
        selectM.disabled = true;
        selectS.disabled = true;
        if(null != buttonM && null != buttonS){
            buttonM.disabled = true;
            buttonS.disabled = true;
        }
    }else{
        selectM.disabled = false;
        if(null != buttonM){
            buttonM.disabled = false;
        }
    }

    if (selectM.value == ""){
        selectS.disabled = true;
        if(null != buttonS){
            buttonS.disabled = true;
        }
    }else{
        selectS.disabled = false;
        if(null != buttonS){
            buttonS.disabled = false;
        }
    }
}

function addTitle(){
    var selects = document.getElementsByTagName("select");
    for(var k = 0 ; k < selects.length ; k++){
        var items = selects[k].options;
        for(var i=0; i<items.length ; i++){
            items[i].title = items[i].text;
        }
    }
}

function setItemDisabled(itemClassM,itemClassS){
    if(null != getObj(itemClassM)){
        getObj(itemClassM).disabled = false;
    }
    if(null != getObj(itemClassS)){
        getObj(itemClassS).disabled = false;
    }
}

function ItemClassSelectID(){

    this.itemClass = null;

    this.setItemClass = function() {
        this.itemClass = arguments;
    };

    this.enable = function() {
        for(var i=0; i<this.itemClass.length;i++){

            getObj(this.itemClass[i]).disabled = false;
        }
    };
}
var itemClassSelectID = new ItemClassSelectID();

/*セッションから品種初期値設定*/
function resetItemClassMBySession(url,itemClassL,itemClassM,itemClassS,itemClassLValue,itemClassMValue,itemClassSValue,companyCd, sectionTypeCdValue){
    $("[id='"+itemClassS+"']").empty();
    if("" == itemClassMValue){
        $("[id='"+itemClassS+"']").append("<option value=''></option>");
        itemKindLoad(itemClassL,itemClassM,itemClassS);
        return;
    }

    $.post(
        url,
        {
            itemClassInd:3,
            itemClassL:itemClassLValue,
            itemClassM:itemClassMValue,
            companyCd:companyCd,
            sectionTypeCode:sectionTypeCdValue
        },
        function(data){
            $.each(data.itemClassS,function(index,element){
                var varItem = new Option(element.text, element.value);
                getObj(itemClassS).options.add(varItem);
              });
            $("[id='"+itemClassS+"']").val(itemClassSValue);
            enableButton(itemClassL,itemClassM,itemClassS);
        }
    );
}

function resetItemClassLBySession(url,itemClassL,itemClassM,itemClassS,itemClassLValue,itemClassMValue,itemClassSValue,companyCd, sectionTypeCdValue){
    $("[id='"+itemClassM+"']").empty();
    $("[id='"+itemClassS+"']").empty();
    if("" == itemClassLValue){
        $("[id='"+itemClassM+"']").append("<option value=''></option>");
        $("[id='"+itemClassS+"']").append("<option value=''></option>");
        itemKindLoad(itemClassL,itemClassM,itemClassS);
        return;
    }

    $.post(
        url,
        {
            itemClassInd:2,
            itemClassL:itemClassLValue,
            companyCd:companyCd,
            sectionTypeCode:sectionTypeCdValue
        },
        function(data){
            $.each(data.itemClassM,function(index,element){
                var varItem = new Option(element.text, element.value);
                getObj(itemClassM).options.add(varItem);
              });
            $("[id='"+itemClassM+"']").val(itemClassMValue);
            enableButton(itemClassL,itemClassM,itemClassS);
            resetItemClassMBySession(url,itemClassL,itemClassM,itemClassS,itemClassLValue,itemClassMValue,itemClassSValue,'', sectionTypeCdValue);
        }
    );
}

function resetItemKindBySession(itemClassL, itemClassM, itemClassS, itemClassLValue, itemClassMValue, itemClassSValue, sectionTypeCdValue){
    $("[id='"+itemClassL+"']").val(itemClassLValue);
    resetItemClassLBySession('..\/..\/listItemKindChange',itemClassL,itemClassM,itemClassS,itemClassLValue,itemClassMValue,itemClassSValue,'', sectionTypeCdValue);
}

function resetProductClassBySession(itemClassL, itemClassM, itemClassS, itemClassLValue, itemClassMValue, itemClassSValue, sectionTypeCdValue){
    $("[id='"+itemClassL+"']").val(itemClassLValue);
    resetItemClassLBySession('..\/..\/listProductClassChange',itemClassL,itemClassM,itemClassS,itemClassLValue,itemClassMValue,itemClassSValue,'', sectionTypeCdValue);
}
// +++++ 強化-00928-000 2013/06/24 DEL SBO_lichao START +++++
/*function clear(obj){
    var inputs = getObj(obj).getElementsByTagName("input");
    var selects = getObj(obj).getElementsByTagName("select");
    for (var i = 0; i < inputs.length; i++) {
       //各テキスト ボックスの空
      if (inputs[i].type == "text") {
           inputs[i].value ="";
       }
   }
    for (var i = 0; i < selects.length; i++) {
           selects[i].selectedIndex = 0;
   }
}*/
// +++++ 強化-00928-000 2013/06/24 DEL SBO_lichao -END- +++++

//+++++ 強化-01693-000 2013/05/30 ADD SBO_pangzhen START +++++
//Iframeロード完了
function iframeLoaded(iframeEl, callback) {
    if(iframeEl.attachEvent) {
        iframeEl.attachEvent("onload", function() {
            if(callback && typeof(callback) == "function") {
                callback();
            }
        });
    }
    else {
        iframeEl.onload = function() {
            if(callback && typeof(callback) == "function") {
                callback();
            }
        }
    }
}
//+++++ 強化-01693-000 2013/05/30 ADD SBO_pangzhen -END- +++++

//禁止右鍵 start
function nocontextmenu()
{
    event.cancelBubble = true;
    event.returnvalue = false;
    return false;
}

document.oncontextmenu = nocontextmenu;
//禁止右鍵 end

var size;
function openSearchArea() {
    var i,cnt;
    if( getDisplay("SWITCH1") ) {
        // 開く
        setDisplay("SWITCH1",false);
        setDisplay("SWITCH2",true);
        setDisplay("SEARCH_AREA2",true);
        size = minSearchHeight;
        for(i=minSearchHeight+1,cnt=0; i<maxSearchHeight; i+=5,cnt) {
            setTimeout("changeSize1()",(++cnt)*10);
        }
    } else {
        // 閉じる
        setDisplay("SWITCH1",true);
        setDisplay("SWITCH2",false);
        setDisplay("SEARCH_AREA2",false);
        size = maxSearchHeight;
        for(i=maxSearchHeight-1,cnt=0; i>minSearchHeight; i-=5,cnt) {
            setTimeout("changeSize2()",(++cnt)*10);
        }
    }

    setTimeout("resetTableFix()", 300);
    // 検索ウィンドウは閉じること
    closeSearchBox();
}
function changeSize1() {
    size+=5;
    document.getElementById("SEARCH_AREA").style.height = size;
    if( size >= maxSearchHeight ) {
        getObj("SEARCH_AREA2").style.display = "";
        // Chrome対策（検索エリアが縮んでしまう）
        getObj("Adjust").style.width = getObj("SEARCH_AREA2").offsetWidth;
    }
}

function changeSize2() {
    size-=5;
    document.getElementById("SEARCH_AREA").style.height = size;
}
function resetTableFix() {
    var iframe = getObj("DATAAREA");
    if (iframe != null) {
        var bodyTableDiv = iframe.contentWindow.document.getElementById("bodyTableDiv");
        // テーブルが固定されていない場合、何もしない
        if (bodyTableDiv != null) {
            var bodyHeight = document.body.clientHeight;
            if($(".error",iframe.contentWindow.document).height() != null){
                if(iframe.contentWindow.document.getElementById("PSDLV031ICHIRANTABLEFIX") != null){
                    bodyHeight = bodyHeight - $(".error",iframe.contentWindow.document).height() - 20;
                }else{
                    bodyHeight = bodyHeight - $(".error",iframe.contentWindow.document).height() - 35;
                }
            }
            var top = bodyTableDiv.offsetTop + iframe.parentElement.offsetTop;

            var colTableDiv = iframe.contentWindow.document.getElementById("colTableDiv");
            var rowTableDiv = iframe.contentWindow.document.getElementById("rowTableDiv");
            var scrollBarWidth = 17;

            if (bodyHeight > top) {
                var divHeight = bodyTableDiv.offsetHeight;
                var bodyTable = bodyTableDiv.getElementsByTagName("table")[0];
                var tableHeight = bodyTable.offsetHeight - bodyTableDiv.offsetTop;
                var tableWidth = bodyTable.offsetWidth;
                var pageHeight = top + divHeight;
                if (divHeight - scrollBarWidth < tableHeight || bodyHeight < pageHeight) {
                    bodyTableDiv.style.height = bodyHeight - top + "px";
                    var tempHeight = bodyHeight - top;
                    if (bodyTableDiv.offsetHeight > bodyTableDiv.clientHeight) {
                        tempHeight -= scrollBarWidth;
                    }
                    if (tempHeight >= 0) {
                        colTableDiv.style.height = tempHeight + "px";
                    }
                }
            }
            var width = document.body.offsetWidth + document.body.scrollLeft - colTableDiv.offsetWidth;
            bodyTableDiv.style.width = width + "px";
            if (bodyTableDiv.offsetWidth > bodyTableDiv.clientWidth) {
                width -= scrollBarWidth;
            }
            rowTableDiv.style.width = width + "px";
        }
    } else {
        resetTableFix2();
    }
}
function selectRow(no) {
    var checkName = "check"+no;
    if(getObj(checkName)!=null){
        if( getObj(checkName).checked ) {
            getObj("Row_"+no).style.backgroundColor = "#ffff99";
        } else {
            if (no % 2 == 0) {
                getObj("Row_"+no).style.backgroundColor = "#dce4ef";
            } else {
                getObj("Row_"+no).style.backgroundColor = "#ffffff";
            }
        }
    }
}
var maxSearchHeight = 120;
var minSearchHeight = 30;
function clear(){
    document.Body.reset();
}
var isTableFixEnabled = true;
function registReSizeEvent() {
    window.onresize = function() {
        if (isTableFixEnabled) {
            isTableFixEnabled = false;
            resetTableFix();
            isTableFixEnabled = true;
        }
    }
    window.onscroll = function() {
        if (isTableFixEnabled) {
            isTableFixEnabled = false;
            resetTableFix();
            isTableFixEnabled = true;
        }
    }
}
function resetTableFix2() {
    var bodyTableDiv = document.getElementById("bodyTableDiv");
    // テーブルが固定されていない場合、何もしない
    if (bodyTableDiv != null) {
        var bodyHeight = document.body.clientHeight;
        if($(".error",iframe.contentWindow.document).height() != null){
            if(iframe.contentWindow.document.getElementById("PSDLV031ICHIRANTABLEFIX") != null){
                bodyHeight = bodyHeight - $(".error",iframe.contentWindow.document).height() - 20;
            }else{
                bodyHeight = bodyHeight - $(".error",iframe.contentWindow.document).height() - 35;
            }

        }
        var top = bodyTableDiv.offsetTop + bodyTableDiv.parentNode.offsetTop;

        var colTableDiv = document.getElementById("colTableDiv");
        var rowTableDiv = document.getElementById("rowTableDiv");
        var scrollBarWidth = 17;

        if (bodyHeight > top) {
            var divHeight = bodyTableDiv.offsetHeight;
            var bodyTable = bodyTableDiv.getElementsByTagName("table")[0];
            var tableHeight = bodyTable.offsetHeight - bodyTableDiv.offsetTop;
            var tableWidth = bodyTable.offsetWidth;
            var pageHeight = top + divHeight;
            if (divHeight - scrollBarWidth < tableHeight || bodyHeight < pageHeight) {
                bodyTableDiv.style.height = bodyHeight - top + "px";
                var tempHeight = bodyHeight - top;
                if (bodyTableDiv.offsetHeight > bodyTableDiv.clientHeight) {
                    tempHeight -= scrollBarWidth;
                }
                if (tempHeight >= 0) {
                    colTableDiv.style.height = tempHeight + "px";
                }
            }
        }
        var width = document.body.offsetWidth + document.body.scrollLeft - colTableDiv.offsetWidth;
        if (0 <= width) {
            bodyTableDiv.style.width = width + "px";
        }

        if (bodyTableDiv.offsetWidth > bodyTableDiv.clientWidth) {
            width -= scrollBarWidth;
        }

        if (0 <= width) {
            rowTableDiv.style.width = width + "px";
        }
    }
}
function buttonUsableForAuth(errorMessage){
    var errordivs = window.parent.document.getElementById("ERRORDIV");
    var messages = "";
    if("" != errorMessage && errorMessage.indexOf("E001")!=-1){
       if (null == parent.frames["DATAAREA"]
            || "undefined" == parent.frames["DATAAREA"]) {
            buttonUsable();
       } else {
          parent.frames["DATAAREA"].window.buttonUsable();
       }
        messages = errorMessage;
        parent.document.getElementById('TR_ERROR').style.display = '';
    }

    if (null != errordivs && "undefined" != errordivs) {
        errordivs.innerHTML = messages;
    } else {
        $("td[class='error']", window.parent.document).html(messages);
    }
}
function buttonUsableForList(alertMessage){
    if(alertMessage.indexOf("E035")!=-1){
       if (null == parent.frames["DATAAREA"]
        || "undefined" == parent.frames["DATAAREA"]) {
            buttonUsable();
        } else {
            parent.frames["DATAAREA"].window.buttonUsable();
            parentButtonEnable();
        }
    }
}
function buttonUsable(){
    var i;
    var buttonArr = $("input[type='button']");
     for(i = 0;i < buttonArr.length; i++){
         buttonArr[i].disabled = false;
     }
     var iconArr = $(".Icon");
     if(null != iconArr){
         for(i = 0;i < iconArr.length; i++){
             var type = iconArr[i].type;
             if (type && type != "checkbox") {
                 iconArr[i].disabled = false;
             }
         }
     }
 }
function parentButtonDisable(){
        var buttonAll=parent.document.getElementsByTagName("input");
        if(buttonAll != null ){
            for(var i = 0;i < buttonAll.length; i++){
                if(buttonAll[i].type == "button"){
                   buttonAll[i].disabled = true;
                    }
                }
        }
    }
function parentButtonEnable(){
        var buttonAll=parent.document.getElementsByTagName("input");
        if(buttonAll != null){
            for(var i = 0; i < buttonAll.length; i++){
                if(buttonAll[i].type == "button"){
                    buttonAll[i].disabled= false;
                }
            }
        }
    }

/*----------------------------------------------------------------------------*/
/*   機　能：XSS攻撃文字列をクリア                                                  */
/*----------------------------------------------------------------------------*/
function cleanXss(s){
    if(typeof(s)!='string'){
        return s;
    }
    return s.replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/'/g,'&apos;');
}

/*----------------------------------------------------------------------------*/
/*   機　能：キーダウン時の処理のキャンセル             （禁止Backspace IE、Chrome 対策）                         */
/*----------------------------------------------------------------------------*/
document.onkeydown = keydownCancel;
function keydownCancel(){
    switch(event.keyCode){
       case  8: // backspace
           if(document.activeElement.type != "text"     &&
              document.activeElement.type != "password" &&
              document.activeElement.type != "textarea"  )
               return false;
           if(document.getElementById(document.activeElement.id).readOnly == true)
               return false;
           break;
       case 13: // Enter
           if(document.activeElement.type !='button'     &&
              document.activeElement.type !='submit'     &&
              document.activeElement.type !='reset'      &&
              document.activeElement.type !='textarea'   &&
              document.activeElement.type !='select-one' )
              return false;
           break;
       default:
           break;
    }
    return true;
}
/*
 * 検索条件クリア時に拡張項目チェックボックスの状態をhidden項目に反映させる
 */
function searchConditionCheckBoxClearForExt(){
    //  チェックボックス型のチェックボックス
    $('input[type="checkbox"][id*="extendChk"]').each(
            function(){
                var hiddenItem = $('input:hidden[id="'+$(this)[0].id.substr(1)+'"]');
                if ($(this)[0].checked){
                    hiddenItem.val($(this)[0].value);
                }else{
                    hiddenItem.val('');
                }
            }
    );
    //  セレクト型のチェックボックス
    $('input[type="checkbox"][id*="extendSel"]').each(
            function(){
                var hiddenItem = $('input:hidden[id="'+$(this)[0].id.substr(1)+'"]');
                if ($(this)[0].checked){
                    hiddenItem.val($(this)[0].value);
                }else{
                    hiddenItem.val('');
                }
            }
    );
}
/*
 * 検索条件クリア時にチェックボックスの状態をhidden項目に反映させる
 */
function searchConditionCheckBoxClear(){
    var length = arguments.length;
    var id = arguments[0];
    var value = '1';
    if (length > 1){
        value = arguments[1];
    }
    
    var hiddenItem = $('input:hidden[id="'+id+'"]');
    var checkItem = $(':checkbox[id="_'+id+'"]')[0];
    if (checkItem.checked){
        hiddenItem.val(value);
    }else{
        hiddenItem.val('');
    }
}
/*
 * 検索条件クリア時に指定したidのチェックボックスの状態をhidden項目に反映させる
 */
function searchConditionCheckBoxesClear(id){
    $('input[type="checkbox"][id*=_"'+id+'"_]').each(
            function(){
                var hiddenItem = $('input:hidden[id="'+$(this)[0].id.substr(1)+'"]');
                if ($(this)[0].checked){
                    hiddenItem.val($(this)[0].value);
                }else{
                    hiddenItem.val('');
                }
            }
    );
}
