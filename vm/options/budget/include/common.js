// 予算番号ポップアップ
var budgetnoPopup = new budgetnoPopup();

//予算番号popup
function budgetnoPopup() {
    // 予算番号
    this.budgetNumberObject = null;
    
    this.setObject = function() {
        this.budgetNumberObject = arguments[0];
    };
    
    this.setObjectValue = function() {
        if(this.budgetNumberObject != null){
            this.budgetNumberObject.value = arguments[0];
        }
    };
}
