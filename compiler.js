/*****************************************************************************
    COMPILER
 *****************************************************************************/
 
//============================================================================
//  Token stream
//============================================================================

function nextToken() {
  current_token++;
}
function currentTokenValue() {
  return token[ current_token ].value.toLowerCase();
}
function currentTokenValueWithCase() {
  return token[ current_token ].value;
}
function currentTokenType() {
  return token[ current_token ].type;
}

//============================================================================
//  Compile, Block
//============================================================================

function compile() {
  
  // Called by EITHER  
  // (1) function "file_name.addEventListener()" right after loading (see loader.js)
  // OR
  // (2) Button "<button type="button" onclick="compile()" >Compile</button>"    
  
  // Split every source line into global var "source_line"
  // Trim input, ignore every emtpy line and comment with "//"
  
  createSourceLinesFromSourceText(); 
 
  // Init block
  
  textarea_output.value = "";
  code = [];
  
  // Block
  
  for ( current_source_line_index = 0; current_source_line_index < source_line.length; current_source_line_index++) {
    
    // Tokenize current source line
    // should return with "current_token = 0"
    // but doesn't matter we use token[0] anyway
    
    tokenizeCurrentSourceLine();
    emitCurrentSourceLineToCode(); // Emit current source line (for debugging)
    // debug_emitTokensToCode(); // Emit output of all tokens (for debugging)
    
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

    
    
  } /* next */
  
  writeCodeToTextAreaOutput();
  
}
 