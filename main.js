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

/*****************************************************************************
    GLOBAL VARIABLES 
 *****************************************************************************/

var file_name = document.getElementById("file_name");
var textarea_source = document.getElementById("textarea_source");
var textarea_output = document.getElementById("textarea_output");

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
    
// Holds all emitted code lines

var code = [];
    // str line     <-- code line
    
// TODO partly broken: optimization_level
// TODO partly broken: optimization_level   
// TODO partly broken: optimization_level   
// TODO partly broken: optimization_level   
    
var optimization_level = 1; // 0: no optimization at all, 1: optimization

    
