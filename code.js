/*****************************************************************************
    CODE
 *****************************************************************************/
 
var STA="", LDA="";

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
function emitLineToTextAreaOutput( line ) {
  textarea_output.value += line + "\n";
}

//============================================================================
//  Emit code line parameters
//============================================================================

function emitCodeLine( line ) {
  code.push({
    line: "  "+line
  });
}
function emitEmptyCodeLineToCode() {
  code.push({
    line: ""
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
//  Handle optimization
//============================================================================


// TODO variants "#0", "#<(0)", "#>(0)"
// TODO variants "#0", "#<(0)", "#>(0)"
// TODO variants "#0", "#<(0)", "#>(0)"
// TODO variants "#0", "#<(0)", "#>(0)"


//============================================================================
//  Emit 6502 opcodes
//============================================================================

function emitLDA( operand ) {

  if ( operand == STA || operand == LDA )
    return;
      
  emitCodeLine( "lda " + operand );
  LDA = operand;
  STA = "";

}
function emitSTA( operand ) {

  if ( operand == STA || operand == LDA )
    return;
      
  emitCodeLine( "sta " + operand );
  STA = operand;

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
function emitBCC( label ) {
  emitCodeLine( "bcc " + label );
}
function emitINC( operand ) {
  emitCodeLine( "inc " + operand );
}
function emitINY() {
  emitCodeLine( "iny" );
}
function emitLABEL( label ) {
  emitCodeLine( label+":" );
}


//============================================================================
//  Handle Runtime Library
//============================================================================

function handleRuntime() {
  emitCodeLineAtLineStart('\n!source "runtime\\runtime.asm"' );
  place_runtime_automatically = false;
}

//============================================================================
//  Write finally the entire code
//============================================================================

function writeCodeToTextAreaOutput() {
  
    textarea_output.value = "";
    emitLineToTextAreaOutput( "*=$0801" );
    emitLineToTextAreaOutput( "!basic" );
    emitLineToTextAreaOutput( '!source "runtime\\def64.asm"' );    
    emitLineToTextAreaOutput( '!source "runtime\\macro.asm"\n' );

    for (var j = 0; j < code.length; j++) {
      textarea_output.value += code[j].line+"\n";
    }
    
    if ( no_error ) {

      if ( place_runtime_automatically == true ) {
        emitLineToTextAreaOutput( '\n!source "runtime\\runtime.asm"' );
      }

      emitLineToTextAreaOutput( '!source "runtime\\messages.asm"' );
    
    }   

}

 