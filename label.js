/*****************************************************************************
    LABEL
 *****************************************************************************/

var label_nr;
var auto_code_label_no;
    
function getNextLabel() {
  label_nr++;
  return "_L"+label_nr+"_";
}
function getNextAutoCodeLabel() {
  auto_code_label_no++;
  return "_A"+auto_code_label_no+"_";
}
