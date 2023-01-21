/*****************************************************************************
    DEBUG
 *****************************************************************************/

function debug_postSourceLinesToTextAreaOutput() {
  
  textarea_output.value = "";
    
  for (var j = 0; j < source_line.length; j++) {
    textarea_output.value += getSourceLineAsComment( source_line[j] ) + "\n";
  }
  
}
function debug_getTokenOutputLineByIndex( i ) {
  return "  pos:" + token[i].position.toString().padEnd(2, " ") + "  [" + token[i].type.padEnd(7, " ") + "]  <" + token[i].value + ">\n";
}
function debug_postTokensToTextAreaOutput() {
  
  for (var i = 0; i < token.length; i++) {
    textarea_output.value += debug_getTokenOutputLine( i );
  }
  
}
function debug_currentToken() {
  
  textarea_output.value += debug_getTokenOutputLineByIndex( current_token );
  
  // Terminate script execution
  throw new Error( '"END" BY DEBUG FUNCTION "debug_currentToken()"' );
  
}



