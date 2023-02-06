/*****************************************************************************
    OPERAND
 *****************************************************************************/
 
function getOperand() {
  
  // --- operand object ---------------------------------------------
  
  let operand = [ "data_type", "value", "addressing_mode" ];

  // set operand's "data_type"

  if ( currentTokenValue() == "word" ) {
    operand.data_type = "word";
    nextToken();
  } else if ( currentTokenValue() == "byte" ) {
   operand.data_type = "byte";
   nextToken();
  } else {
   operand.data_type = "dbyte";
  }
    
  // --- set operand's "value" and "addressing_mode" ----------------
  
  if ( currentTokenValueWithCase() == "[" ) {
     
    operand.value = "";
    
    nextToken();
    while ( currentTokenValueWithCase() != "]" ) {
      operand.value += currentTokenValueWithCase();
      nextToken();
      ThrowSyntaxErrorIfEOLInsteadOf( 'Closing "]"' );
    }
    
    let lcase_value = operand.value.toLowerCase()
    
    if ( lcase_value[0] == "#" ) {
      operand.addressing_mode = "imm";
      operand.value = "#(" + operand.value.substring(1) + ")";
    }
    else if ( lcase_value.includes( "),y" ) )
      operand.addressing_mode = "indy";
    else if ( lcase_value.includes( ",y" ) )
      operand.addressing_mode = "absy";
    else if ( lcase_value.includes( ",x)" ) )
      operand.addressing_mode = "xind";
    else if ( lcase_value.includes( ",x" ) )
      operand.addressing_mode = "absx";
    else
      operand.addressing_mode = "abs";
    
  } else if ( currentTokenValueWithCase() == "#" ) {
    
    nextToken();
    operand.value = "#"+currentTokenValueWithCase();
    operand.addressing_mode = "imm";
    
  } else {
    
    operand.value = currentTokenValueWithCase();
    operand.addressing_mode = "abs";
    
  }
  
  // --- return operand object --------------------------------------
  
  return operand;
  
}


 