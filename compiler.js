/*****************************************************************************
    COMPILER
 *****************************************************************************/
 
//============================================================================
//  Token stream
//============================================================================

function nextToken() {
  current_token_index++;
}
function currentTokenValue() {
  return token[ current_token_index ].value.toLowerCase();
}
function currentTokenValueWithCase() {
  return token[ current_token_index ].value;
}
function currentTokenType() {
  return token[ current_token_index ].type;
}

//============================================================================
//  Compile, Block
//============================================================================

function compile() {
  
  /*   
  is called by EITHER  
    (1) function "postSourceToTextareaSource()" right after loading (see loader.js)
  OR
    (2) Button "<button type="button" onclick="compile()" >Compile</button>"    
  */  
  
  // Split every source line into global var "source_line"
  // Ignore every emtpy line & comment starting with "//"
  
  createSourceLinesFromSourceText(); 
 
  // Init compiler
  
  textarea_output.value = "";
  code = [];
  
  // --- Block ------------------------------------------------------------------------------------------------------
  
  for ( current_source_line_index = 0; current_source_line_index < source_line.length; current_source_line_index++) {
    
    tokenizeCurrentSourceLine();   // returns with global "current_token_index = 0"
    //emitCurrentSourceLineAsCommentToCode(); // (for debugging)
    // debug_emitTokensToCode();   // (for debugging)
    
    //-----------------------------------------------------------------------
    //  Keyword handlers
    //-----------------------------------------------------------------------
    
    let lcase_value = currentTokenValue();
    
    // *** Block end keywords ( break out of block ) ***
    
    if ( lcase_value == "endif"
         || lcase_value == "else"
         || lcase_value == "elseif"
         || lcase_value == "until"
         || lcase_value == "while"
         || lcase_value == "forever" )
         
           break;
         
    // *** Conditionals ***
         
    else if ( lcase_value == "let" ) handleLet();
    
    
    // *** if nothing matches, output original line ***
    
    else emitCurrentOriginalSourceLineToCode();
    
  } // next ---------------------------------------------------------------------------------------------------------
  
  writeCodeToTextAreaOutput();
  
}
 