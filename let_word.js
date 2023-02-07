/*****************************************************************************
    LET WORD
 *****************************************************************************/

function _wordAddition( tac ) {
  
  // let word a = byte b + c

/*   if ( tac.left_data_type == "byte" && tac.right_data_type != "byte" ) {
         
        

        return;
  }

  // let word a = b + byte c

  if ( tac.left_data_type != "byte" && tac.right_data_type != "byte" ) {
         
        

        return;
  } */

  // LO Bytes

  emitLDA( getLoOperand( tac.left_value, tac.left_addressing_mode ) );
  emitCLC();  
  emitADC( getLoOperand( tac.right_value, tac.right_addressing_mode ) );
  emitSTA( getLoOperand( tac.dest_value, tac.dest_addressing_mode ) );
  
  // HI Bytes

  if ( tac.left_data_type == "byte" )
    emitLDA( "#0" );
  else
    emitLDA( getHiOperand( tac.left_value, tac.left_addressing_mode ) );

  emitCLC();

  if ( tac.right_data_type == "byte" )
    emitADC( "#0" );
  else
    emitADC( getHiOperand( tac.right_value, tac.right_addressing_mode ) );

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

    }

    opcode_nr++;

  }

}
