/*****************************************************************************
    LET BYTE
 *****************************************************************************/

//============================================================================
//  Output code for byte expression
//============================================================================

function output6502CodeForByteExpression() {
      
  let opcode_nr = 0;
  
  for( var i=0; i<tac.length; i++) {
      
    if ( tac[i].load_left != false ) {
      emitLDA( tac[i].left_value );
    }
      
    switch ( tac[i].operator ) {
        
      case "+":
        if ( opcode_nr == 0 || target_operand.data_type == "byte" ) {
          emitCLC();
        }
        emitADC( tac[i].right_value );
        break;
          
      case "-":
        emitSEC();
        emitSBC( tac[i].right_value );
        break; 

      case "*":
        if ( tac[i].right_addressing_mode == "imm" ) {
          emitMacro( "+_IMUL888I_ " + tac[i].right_value.substring(1) );
        } else {
          emitMacro( "+_CALL_PROC_IMUL888_ " + tac[i].right_value );
        }
        break;
      
      case "/":
        if ( tac[i].right_addressing_mode == "imm" ) {
          emitMacro( "+_IDIV888I_ " + tac[i].right_value.substring(1) );
        } else {
          emitMacro( "+_CALL_PROC_IDIV888_ " + tac[i].right_value );
        }
        break;

      case "&":
        emitAND( tac[i].right_value );
        break;

      case "|":
        emitORA( tac[i].right_value );
        break;

      case "^":
        emitEOR( tac[i].right_value );
        break;

      case "<<":
        ThrowSyntaxErrorIfOperandIsNotImmediate( tac[i].right_addressing_mode, tac[i].right_value );
        emitMacro( "+_SHL_ " + tac[i].right_value.substring(1) );
        break;
  
      case ">>":
        ThrowSyntaxErrorIfOperandIsNotImmediate( tac[i].right_addressing_mode, tac[i].right_value );
        emitMacro( "+_SHR_ " + tac[i].right_value.substring(1) );        
        break;

    }
      
    if ( tac[i].store_dest != false ) {
      emitSTA( tac[i].dest_value );
    }
      
    opcode_nr++;
      
  }
    
}
  