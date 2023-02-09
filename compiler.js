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

function _createSourceLinesFromSourceText() {
  
  // Split every source line into global var "source_line"
  
  var line = textarea_source.value.split('\n');
  
  // Trim input, ignore every emtpy line and comment with "//"
  
  source_line = [];
  
  for (var j = 0; j < line.length; j++) {
    
    let tmp_line = line[j].trimLeft();
    
    if ( tmp_line !== "" && tmp_line.substring(0,2) !== "//" ) {
      
      source_line.push({ 
        line: line[j], 
        line_number: j+1
      });
      
    }
    
  } /* next */
  
}
function _initCompiler() {

  initCode();

  textarea_output.value = "";
  code = [];
  label_nr = -1;
  auto_code_label_no = -1;
  place_runtime_automatically = true;
  no_error = true;
  current_STA_operand=""; 
  current_LDA_operand="";

  start_address = "$0801";

}

function compile() {
  
  /*   
  is called by EITHER  
    (1) function "postSourceToTextareaSource()" right after loading (see loader.js)
  OR
    (2) Button "<button type="button" onclick="compile()" >Compile</button>"    
  */  
  
  // Split every source line into global var "source_line"
  // Ignore every emtpy line & comment starting with "//"
  // and init compiler then compile

  _createSourceLinesFromSourceText(); 
  _initCompiler();
  
  // --- Block ------------------------------------------------------------------------------------------------------
  
  for ( current_source_line_index = 0; current_source_line_index < source_line.length; current_source_line_index++ ) {
    
    tokenizeCurrentSourceLine();   // returns with global "current_token_index = 0"
    //emitCurrentSourceLineAsCommentToCode(); // (for debugging)
    //debug_emitTokensToCode();   // (for debugging)
    
    //-----------------------------------------------------------------------
    //  Keyword handlers
    //-----------------------------------------------------------------------
    
    let lcase_value = currentTokenValue();
    
    // *** Block end keywords ( break out of block ) ******
    
    if ( lcase_value == "endif"
         || lcase_value == "else"
         || lcase_value == "elseif"
         || lcase_value == "until"
         || lcase_value == "while"
         || lcase_value == "forever" )
         
           break;
         
    // *** Math *******************************************
         
    else if ( lcase_value == "let" ) handleLet();
      
    // *** Print to Screen ********************************

    else if ( lcase_value == "print" ) handlePrint();   

    // *** Conditionals ***********************************



    // *** !source "Runtime.asm" **************************

    else if ( lcase_value == "runtime" ) handleRuntime();
          
    // *** if nothing matches, output original line *******
    
    else emitCurrentOriginalSourceLineToCode();
      
    
  } // next ---------------------------------------------------------------------------------------------------------
  
  // copy ASM code to clipboard

  writeCodeToTextAreaOutput();
  textarea_output.select();
  document.execCommand("copy");

  // print a 2nd time to deselect selection

  writeCodeToTextAreaOutput();

}
 

