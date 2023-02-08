/*****************************************************************************
    LET WORD
 *****************************************************************************/

function _wordSubtruction( tac ) {



}

function _wordAddition( tac ) {
  
  // swap left and right if: word b = byte a + x
    
  if ( tac.left_data_type == "byte" && tac.right_data_type != "byte" ) {

    let tmp_left = [ "value", "data_type", "addressing_mode" ];
    
    tmp_left.data_type = tac.left_data_type;
    tmp_left.value = tac.left_value;
    tmp_left.addressing_mode = tac.left_addressing_mode;
    tac.left_data_type = tac.right_data_type;
    tac.left_value = tac.right_value;
    tac.left_addressing_mode = tac.right_addressing_mode;
    tac.right_data_type = tmp_left.data_type;
    tac.right_value = tmp_left.value;
    tac.right_addressing_mode = tmp_left.addressing_mode;
    
  }

  // LO Bytes

  emitLDA( getLoOperand( tac.left_value, tac.left_addressing_mode ) );
  emitCLC();  
  emitADC( getLoOperand( tac.right_value, tac.right_addressing_mode ) );
  emitSTA( getLoOperand( tac.dest_value, tac.dest_addressing_mode ) );
  
  if ( tac.dest_addressing_mode != "xind" 
    && tac.dest_addressing_mode != "indy"
    && tac.right_data_type == "byte"
    && tac.dest_value == tac.left_value ) {

      let label = getNextLabel();
      emitBCC( label );
      emitINC( getHiOperand( tac.dest_value, tac.dest_addressing_mode ) );
      emitLABEL( label );
      return;

  }

  // HI Bytes

  if ( tac.left_addressing_mode == "indy" )
    emitINY();
  emitLDA( getHiOperand( tac.left_value, tac.left_addressing_mode ) );
  emitCLC();

  if ( tac.right_data_type == "byte" ) {
    emitADC( "#0" );
  } else {
    if ( tac.right_addressing_mode == "indy" && tac.left_addressing_mode != "indy" )
      emitINY();
    emitADC( getHiOperand( tac.right_value, tac.right_addressing_mode ) );
  }

  emitSTA( getHiOperand( tac.dest_value, tac.dest_addressing_mode ) );

}
function _wordAssignment( tac ) {

  // LO Bytes

  emitLDA( getLoOperand( tac.left_value, tac.left_addressing_mode ) );
  emitSTA( getLoOperand( tac.dest_value, tac.dest_addressing_mode ) );
    
  // HI Bytes

  if ( tac.left_addressing_mode == "indy" )
    emitINY();
  if ( tac.left_data_type == "byte" ) 
    emitLDA( "#0" );
  else
    emitLDA( getHiOperand( tac.left_value, tac.left_addressing_mode ) );
  
  if ( tac.dest_addressing_mode == "indy" && tac.left_addressing_mode != "indy" )
    emitINY();
  emitSTA( getHiOperand( tac.dest_value, tac.dest_addressing_mode ) );

}
function output6502CodeForWordExpression() {

  let opcode_nr = 0;

  for (var i = 0; i < tac.length; i++) {

    switch ( tac[i].operator ) {

      case "+":
        _wordAddition( tac[i] );        
        break;

      case "-":
        break;

      case "*":
        if (tac[i].right_addressing_mode == "imm") {
          emitCodeLine("+_IMUL888I_ " + tac[i].right_value.substring(1));
        } else {
          emitCodeLine("+_CALL_PROC_IMUL888_ " + tac[i].right_value);
        }
        break;

      case "/":
        if (tac[i].right_addressing_mode == "imm") {
          emitCodeLine("+_IDIV888I_ " + tac[i].right_value.substring(1));
        } else {
          emitCodeLine("+_CALL_PROC_IDIV888_ " + tac[i].right_value);
        }
        break;

      case "<<":
        ThrowSyntaxErrorIfOperandIsNotImmediate(tac[i].right_addressing_mode, tac[i].right_value);
        emitCodeLine("+_SHL_ " + tac[i].right_value.substring(1));
        break;

      case ">>":
        ThrowSyntaxErrorIfOperandIsNotImmediate(tac[i].right_addressing_mode, tac[i].right_value);
        emitCodeLine("+_SHR_ " + tac[i].right_value.substring(1));
        break;

      case "=":
        _wordAssignment( tac[i] );

    }

    opcode_nr++;

  }

}
