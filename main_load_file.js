"use strict";

/*****************************************************************************
    COMPILER MAIN START IS:
 *****************************************************************************/

/*
function compile() (see compiler.js)
  is called by EITHER  
    (1) function "postSourceToTextareaSource()" right after loading (see loader.js)
  OR
    (2) Button "<button type="button" onclick="compile()" >Compile</button>"    
*/

var file_name = document.getElementById("file_name");
var textarea_source = document.getElementById("textarea_source");
var textarea_output = document.getElementById("textarea_output");

file_name.addEventListener( "change", loadSourceFile );

function postSourceToTextareaSource( loaded_source_file ) {
  
  // TODO broken when trying to reload same file 
  
  textarea_source.textContent = loaded_source_file.target.result;
  
  // ==== MAIN CALL TO COMPILE AFTER LOADING ===================
    
  compile();
    
  // ==== MAIN CALL TO COMPILE AFTER LOADING ===================
  
}

function loadSourceFile() {

  if ( this.files && this.files[0] ) {
    
    var file_name = this.files[0];
    var reader = new FileReader();
    
    reader.addEventListener( "load", postSourceToTextareaSource );
    reader.readAsBinaryString(file_name);
    
  }
  
  // TODO broken when trying to reload same file 
  
  // this.value = ""; <--- this was proposed in internet but does not help
  // this.target.value =""; <--- this too, nothing works
  // this.target.result =""; <--- this too, nothing works
  
}

/*****************************************************************************
    GLOBAL VARIABLES 
 *****************************************************************************/

    // Holds all source lines in a structured array

var source_line = [];
    // num line_number
    // str line
    
var current_source_line_index = 0;
    // source_line[ current_source_line_index ]
    
// Holds all tokens in the source line in a structured array

var token = [];
    // str type     <-- token type like "num", "name", "string",...
    // str value    <-- the actual lexeme like "let", "<",...
    // num position <-- first character of token

var current_token_index = 0; 
    // token[ current_token_index ]
    
var code = [];
    // str line     <-- code line
    
var optimization_level = 1; // 0: no optimization at all, 1: optimization
var place_runtime_automatically = true;
var no_error = true;
var start_address = "$0801";