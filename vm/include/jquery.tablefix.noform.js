/*
 * jQuery TableFix plugin ver 1.0.0
 * Copyright (c) 2010 Otchy
 * This source file is subject to the MIT license.
 * http://www.otchy.net
 */
(function($){
    $.fn.tablefix = function(options) {
        return this.each(function(index){
            //  スクロールバーの幅
            var scrollWidth = 17;
            var scrollAdjustWidth = 0;

            //  ユーザーエージェントの取得
            var userAgent = window.navigator.userAgent.toLowerCase();
            //  Edgeの場合のみ、スクロールバーの幅を16pxとする
            if (userAgent.indexOf('edge') != -1) {
                scrollWidth = 16;
            }

            scrollAdjustWidth = scrollWidth + 2;

            var bodyWidth = 0;
            var bodyHeight = 0;
            var colHeight = 0;
            var rowWidth = 0;

            // 処理継続の判定
            var baseTable = $(this);
            var baseTableWidth = baseTable.width();
            var optionsWidth = options.width;
            var optionsHeight = options.height;
            var withWidth = (optionsWidth > 0);
            var withHeight = (optionsHeight > 0);
            var resultWidth = options.width;
            var resultHeight = options.height;

            if (withWidth) {
                withWidth = (resultWidth < baseTable.width());
            } else {
                resultWidth = baseTable.width();
            }

            if (withHeight) {
                withHeight = (resultHeight < baseTable.height());
            } else {
                resultHeight = baseTable.height();
            }

            //  Tableが表示エリアより大きい場合、スクロールバーの幅を縮めて再度サイズ確認を行う
            if (withWidth) {
                withHeight = ((options.height - scrollWidth) < baseTable.height());
            }

            if (withHeight) {
                withWidth = ((options.width - scrollWidth) < baseTable.width());
            } else {
                resultHeight = baseTable.height();
            }
            if (withWidth || withHeight) {
                //  テーブルの横幅が表示領域の横幅より大きい場合
                if (withWidth) {
                    if (!withHeight) {
                        //  テーブルの縦幅が表示領域の縦幅より小さい場合、body部の縦をスクロールバーの縦分広める
                        resultHeight += scrollAdjustWidth;
                    }
                } 
                //  テーブルの縦幅が表示領域の縦幅より大きい場合
                if (withHeight) {
                    if (!withWidth) {
                        //  テーブルの横幅が表示領域の横幅より小さい場合、body部の幅をスクロールバーの幅分広める
                        resultWidth += scrollAdjustWidth;
                    }
                }
            } else {
                return;
            }

            // 外部 div の設定
            baseTable.wrap('<div id="baseTableDiv"></div>');
            var div = baseTable.parent();
            div.css({position: "relative"});
            // スクロール部オフセットの取得
            var fixRows = (options.fixRows > 0) ? options.fixRows : 0;
            var fixCols = (options.fixCols > 0) ? options.fixCols : 0;
            
            if (resultWidth > baseTableWidth) {
                fixCols = 0;
            }
            
            var offsetX = 0;
            var offsetY = 0;

            var rowCount = baseTable.find("tbody > tr").length;
            var headCount = baseTable.find("thead > tr").length;
            for (var i = 0; i < rowCount + headCount; i++) {
                if (i <= headCount - 1) {
                    baseTable.find("thead > tr:eq(" + i + ") > th").each(function(indexX) {
                        if (i == fixRows && indexX == fixCols) {
                            var cell = $(this);
                            offsetX = cell.position().left;
                            offsetY = cell.parent('tr').position().top;
                            return false;
                        }
                    });
                } else {
                    baseTable.find("tbody > tr:eq(" + (i - headCount) + ") > td").each(function(indexX) {
                        if (i == fixRows && indexX == fixCols) {
                            var cell = $(this);
                            offsetX = cell.position().left;
                            offsetY = cell.parent('tr').position().top;
                            return false;
                        }
                    });
                }
                
                if (i == fixRows) {
                    break;
                }
            }

            //  小数点以下の誤差を無くす
            offsetX = Math.floor(offsetX);
            offsetY = Math.floor(offsetY);

            //  固定幅が1px以上の場合は罫線分の幅を加算する
            if (offsetX > 1){
                offsetX += 1;
            }
            
            // テーブルの分割と初期化
            var crossTable = baseTable.wrap('<div id="crossTableDiv"></div>');
            var rowTable = baseTable.clone().wrap('<div id="rowTableDiv"></div>');
            var colTable = baseTable.clone().wrap('<div id="colTableDiv"></div>');
            var bodyTable = baseTable.clone().wrap('<div id="bodyTableDiv"></div>');
            
            var crossDiv = crossTable.parent().css({position: "absolute", overflow: "hidden"});
            var rowDiv = rowTable.parent().css({position: "absolute", overflow: "hidden"});
            var colDiv = colTable.parent().css({position: "absolute", overflow: "hidden"});
            var bodyDiv = bodyTable.parent().css({position: "absolute", overflow: "auto"});
            
            div.append(rowDiv).append(colDiv).append(bodyDiv);

            // 外部 div の設定
            div
                .width(optionsWidth)
                .height(optionsHeight);

            // クリップ領域の設定
            bodyWidth = resultWidth - offsetX;
            bodyHeight = resultHeight - offsetY;

            crossDiv.width(offsetX).height(offsetY);

            colHeight = bodyHeight;
            rowWidth = bodyWidth;

            //  領域設定
            rowDiv
                .width(rowWidth - (withHeight ? scrollWidth: 0))
                .height(offsetY)
                .css({left: offsetX + 'px'});

            colDiv
                .width(offsetX)
                .height(colHeight - (withWidth ? scrollWidth: 0))
                .css({top: offsetY + 'px'});

            bodyDiv
                .width(bodyWidth)
                .height(bodyHeight)
                .css({left: offsetX + 'px', top: offsetY + 'px'});

            rowTable.css({
                marginLeft: -offsetX + 'px',
            });

            colTable.css({
                marginTop: -offsetY + 'px'
            });

            bodyTable.css({
                marginLeft: -offsetX + 'px',
                marginTop: -offsetY + 'px',
            });

            // スクロール連動
            bodyDiv.scroll(function() {
                rowDiv.scrollLeft(bodyDiv.scrollLeft());
                colDiv.scrollTop(bodyDiv.scrollTop());
            });
            
            if(parent.registReSizeEvent != undefined) {
                parent.registReSizeEvent();
            } else {
                registReSizeEvent();
            }
        });
    };

    $.fn.tablefixByChange = function(options) {
        return this.each(function(index){
            //  スクロールバーの幅
            var scrollWidth = 17;
            var scrollAdjustWidth = 0;

            //  ユーザーエージェントの取得
            var userAgent = window.navigator.userAgent.toLowerCase();
            //  Edgeの場合のみ、スクロールバーの幅を16pxとする
            if (userAgent.indexOf('edge') != -1) {
                scrollWidth = 16;
            }

            scrollAdjustWidth = scrollWidth + 2;

            var bodyWidth = 0;
            var bodyHeight = 0;
            var colHeight = 0;
            var rowWidth = 0;            
            
            // 処理継続の判定
            var baseTable = $("#crossTableDiv").find("table").eq(0);
            var baseTableWidth = baseTable.width();
            var optionsWidth = options.width;
            var optionsHeight = options.height;
            var withWidth = (optionsWidth > 0);
            var withHeight = (optionsHeight > 0);
            var resultWidth = options.width;
            var resultHeight = options.height;
            
            if (withWidth) {
                withWidth = (resultWidth < baseTable.width());
            } else {
                resultWidth = baseTable.width();
            }

            if (withHeight) {
                withHeight = (resultHeight < baseTable.height());
            } else {
                resultHeight = baseTable.height();
            }
            
            //  Tableが表示エリアより大きい場合、スクロールバーの幅を縮めて再度サイズ確認を行う
            if (withWidth) {
                withHeight = ((options.height - scrollWidth) < baseTable.height());
            }
            
            if (withHeight) {
                withWidth = ((options.width - scrollWidth) < baseTable.width());
            } else {
                resultHeight = baseTable.height();
            }

            if (withWidth || withHeight) {
                //  テーブルの横幅が表示領域の横幅より大きい場合
                if (withWidth) {
                    if (!withHeight) {
                        //  テーブルの縦幅が表示領域の縦幅より小さい場合、body部の縦をスクロールバーの縦分広める
                        resultHeight += scrollAdjustWidth;
                    }
                } 
                //  テーブルの縦幅が表示領域の縦幅より大きい場合
                if (withHeight) {
                    if (!withWidth) {
                        //  テーブルの横幅が表示領域の横幅より小さい場合、body部の幅をスクロールバーの幅分広める
                        resultWidth += scrollAdjustWidth;
                    }
                }
            } else {
                $("#crossTableDiv").remove();
                $("#rowTableDiv").remove();
                $("#bodyTableDiv").remove();

                var colTable = $("#colTableDiv").find("table").eq(0);
                $("> thead > tr:eq(0) > th", colTable).removeAttr("disabled");
                $("> tbody > tr > td", colTable).removeAttr("disabled");

                colTable.css({
                    marginTop: '0px'
                });
                colTable.unwrap().unwrap();
                return;
            }
            
            // 外部 div の設定
            var div = $("#baseTableDiv");
            div.css({position: "relative"});
            // スクロール部オフセットの取得
            var fixRows = (options.fixRows > 0) ? options.fixRows : 0;
            var fixCols = (options.fixCols > 0) ? options.fixCols : 0;
            
            if (resultWidth > baseTableWidth) {
                fixCols = 0;
            }

            var offsetX = 0;
            var offsetY = 0;

            var rowCount = baseTable.find("tbody > tr").length;
            var headCount = baseTable.find("thead > tr").length;
            for (var i = 0; i < rowCount + headCount; i++) {
                if (i <= headCount - 1) {
                    baseTable.find("thead > tr:eq(" + i + ") > th").each(function(indexX) {
                        if (i == fixRows && indexX == fixCols) {
                            var cell = $(this);
                            offsetX = cell.position().left;
                            offsetY = cell.parent('tr').position().top;
                            return false;
                        }
                    });
                } else {
                    baseTable.find("tbody > tr:eq(" + (i - headCount) + ") > td").each(function(indexX) {
                        if (i == fixRows && indexX == fixCols) {
                            var cell = $(this);
                            offsetX = cell.position().left;
                            offsetY = cell.parent('tr').position().top;
                            return false;
                        }
                    });
                }
                
                if (i == fixRows) {
                    break;
                }
            }
            
            //  小数点以下の誤差を無くす
            offsetX = Math.floor(offsetX);
            offsetY = Math.floor(offsetY);

            //  固定幅が1px以上の場合は罫線分の幅を加算する
            if (offsetX > 1){
                offsetX += 1;
            }

            // テーブルの分割と初期化
            var crossDiv = $("#crossTableDiv");
            var rowDiv = $("#rowTableDiv");
            var colDiv = $("#colTableDiv");
            var bodyDiv = $("#bodyTableDiv");
            
            var crossTable = crossDiv.find("table").eq(0);
            var rowTable = rowDiv.find("table").eq(0);
            var colTable = colDiv.find("table").eq(0);
            var bodyTable = bodyDiv.find("table").eq(0);

            // クリップ領域の設定
            bodyWidth = resultWidth - offsetX;
            bodyHeight = resultHeight - offsetY;

            crossDiv.width(offsetX).height(offsetY);

            colHeight = bodyHeight;
            rowWidth = bodyWidth;

            //  領域設定
            rowDiv
                .width(rowWidth - (withHeight ? scrollWidth: 0))
                .height(offsetY)
                .css({left: offsetX + 'px'});

            colDiv
                .width(offsetX)
                .height(colHeight - (withWidth ? scrollWidth: 0))
                .css({top: offsetY + 'px'});

            bodyDiv
                .width(bodyWidth)
                .height(bodyHeight)
                .css({left: offsetX + 'px', top: offsetY + 'px'});

            rowTable.css({
                marginLeft: -offsetX + 'px',
            });            
            
            colTable.css({
                marginTop: -offsetY + 'px'
            });

            bodyTable.css({
                marginLeft: -offsetX + 'px',
                marginTop: -offsetY + 'px',
            });
        });
    }
})(jQuery);
