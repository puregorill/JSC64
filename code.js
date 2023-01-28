/*****************************************************************************
    CODE
 *****************************************************************************/
 
//============================================================================
//  Code related debugging functions
//============================================================================

function debug_emitTokensToCode() {
  
  for (var i = 0; i < token.length; i++) {
    code.push({
      line: "  pos:" + token[i].position.toString().padEnd(2, " ") + "  [" + token[i].type.padEnd(7, " ") + "]  <" + token[i].value + ">"
    });
  }
  
}
function DebugCode( text ) {
  emitCodeLine( "; Debug: " + text );
}

//============================================================================
//  Emit code line parameters
//============================================================================

function emitCodeLine( line ) {
  code.push({
    line: "  "+line
  });
}
function emitCodeLineAtLineStart( line ) {
  code.push({
    line: line
  });
}

//============================================================================
//  Emit source line and original source line
//============================================================================

function getCurrentSourceLineAsComment() {
  
  var comment_line = "";
  var tmp_line = source_line[current_source_line_index].line.trim();
  
  if ( tmp_line[0] !== ";" )
    comment_line = "; "
  
  comment_line += tmp_line + " [Line " + source_line[current_source_line_index].line_number + "]";
  
  return comment_line
  
}

function emitCurrentSourceLineAsCommentToCode() {
  emitCodeLine( "\n"+getCurrentSourceLineAsComment() );
}
function emitCurrentOriginalSourceLineToCode() {
  emitCodeLine( source_line[current_source_line_index].line.trim() );
}

//============================================================================
//  Emit 6502 opcodes
//============================================================================

function emitLDA( operand ) {
  emitCodeLine( "lda " + operand );
}
function emitSTA( operand ) {
  emitCodeLine( "sta " + operand );
}
function emitCLC() {
  emitCodeLine( "clc" );
}
function emitSEC() {
  emitCodeLine( "sec" );
}
function emitADC( operand ) {
  emitCodeLine( "adc " + operand );
}
function emitSBC( operand ) {
  emitCodeLine( "sbc " + operand );
}

//============================================================================
//  Handle Runtime Library
//============================================================================

function handleRuntime() {  
  emitCodeLineAtLineStart("jmp _end_runtime_");
  emitCodeLineAtLineStart( '!source "runtime.asm"' );
  place_runtime_automatically == false;
}

//============================================================================
//  Write finally the entire code
//============================================================================

function writeCodeToTextAreaOutput() {
  
    textarea_output.value = "";
    textarea_output.value += "*=$0801" + "\n";
    textarea_output.value += "!basic" + "\n";
    textarea_output.value += '!source "macro.asm"' + "\n";


    for (var j = 0; j < code.length; j++) {
      textarea_output.value += code[j].line+"\n";
    }
    
    if ( place_runtime_automatically == true )
      textarea_output.value += '!source "runtime.asm"' + "\n";
    
      textarea_output.value += '!message "End of runtime: ",_end_runtime_' + "\n";   


}

 