/*****************************************************************************
    PRINT SCREEN
 *****************************************************************************/


// TODO will soon be necessary to have output for testing

function handlePrint() {

  var string_label;

  emitCurrentSourceLineAsCommentToCode();
  nextToken();

  if ( currentTokenType() == "string" ) {
    string_label = getNextAutoCodeLabel();
    emitAutoCodeLineAtLineBegin( string_label+": !pet "+getOriginalSourceLineTrimmed(5) );
  }

  emitLDA( "#<"+string_label );
  emitLDY( "#>"+string_label );
  emitJSR( "_STROUT0_" );
  


  emitEmptyCodeLine();  

}