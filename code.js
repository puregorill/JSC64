/*****************************************************************************
    CODE
 *****************************************************************************/
 
var current_STA_operand, current_LDA_operand;

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
function emitCodeLineAtLinecurrent_STA_operandrt( line ) {
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

//============================================================================
//  Emit 6502 opcodes
//============================================================================

function emitLDA( operand ) {

  // DebugCode( "--- emitLDA ---" );
  // DebugCode( "LDA: "+current_LDA_operand );
  // DebugCode( "STA: "+current_STA_operand );
  // DebugCode( "OP : "+operand );

  // do not load <A> if the same value is already in <A>

  if ( operand == current_STA_operand || operand == current_LDA_operand )
    return;

  emitCodeLine( "lda " + operand );
  current_LDA_operand = operand;
  current_STA_operand = operand;

}
function emitSTA( operand ) {

  // DebugCode( "--- emitSTA ---" );
  // DebugCode( "LDA: "+current_LDA_operand );
  // DebugCode( "STA: "+current_STA_operand );
  // DebugCode( "OP : "+operand );

  // do not store <A> if the same value was already stored

  if ( operand == current_STA_operand )
    return;

  emitCodeLine( "sta " + operand );
  current_STA_operand = operand;

}
function emitCLC() {
  emitCodeLine( "clc" );
}
function emitSEC() {
  emitCodeLine( "sec" );
}
function emitADC( operand ) {  
  emitCodeLine( "adc " + operand );
  current_LDA_operand = "";
  current_STA_operand = "";
}
function emitAND( operand ) {  
  emitCodeLine( "and " + operand );
  current_LDA_operand = "";
  current_STA_operand = "";
}
function emitORA( operand ) {  
  emitCodeLine( "ora " + operand );
  current_LDA_operand = "";
  current_STA_operand = "";
}
function emitEOR( operand ) {  
  emitCodeLine( "eor " + operand );
  current_LDA_operand = "";
  current_STA_operand = "";
}
function emitSBC( operand ) {  
  emitCodeLine( "sbc " + operand );
  current_LDA_operand = "";
  current_STA_operand = "";
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
  current_LDA_operand = "";
  current_STA_operand = "";  
}

function emitMacro( line ) {
  emitCodeLine( line );
  current_LDA_operand = "";
  current_STA_operand = "";
}

//============================================================================
//  Handle Runtime Library
//============================================================================

function handleRuntime() {
  emitCodeLineAtLinecurrent_STA_operandrt('\n!source "runtime\\runtime.asm"' );
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

 