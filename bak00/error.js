/*****************************************************************************
    ERROR
 *****************************************************************************/

function ThrowSyntaxError( message ) {
  
  message = "Syntax Error in line " + source_line[current_source_line_index].line_number + " at position " + token[current_token].position + ".\n\n" + message + ".\n\nCompilation aborted!";

  // Message in "textarea_output"
  
  emitCodeLine( "\n\n****************************************************************" );
  emitCodeLine( "\n\n" + message ); 
  emitCodeLine( "\n\n****************************************************************" );
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
