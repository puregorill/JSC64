/*****************************************************************************
    ERROR
 *****************************************************************************/

function ThrowSyntaxError( message ) {
  
  message = "Syntax Error in line " + source_line[current_source_line_index].line_number + " at position " + token[current_token_index].position + ".\n\n" + message + ".\n\nCompilation aborted!";

  // Message in "textarea_output"
  
  emitCodeLine( "\n\n****************************************************************" );
  emitCodeLine( "\n\n" + message ); 
  emitCodeLine( "\n\n****************************************************************" );
  
  no_error = false;

  writeCodeToTextAreaOutput();
  textarea_output.focus();
  
  // Message in alert box
  
  alert( message );
  
  // Terminate script execution
  
  throw new Error();
  
}
function ThrowSyntaxErrorIfEOLInsteadOf( expected ) {
  
  if ( currentTokenType() == 'EOL' ) {
    ThrowSyntaxError( expected + " expected" );
  }
  
}
function ThrowSyntaxErrorIfOperandIsNotImmediate( operand_addressing_mode, operand_value ) {
  
  if ( operand_addressing_mode != 'imm' ) {
    ThrowSyntaxError( 'Immediate addressing mode expected in operand "'+operand_value+'"' );
  }
  
}
