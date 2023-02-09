"use strict";

/*****************************************************************************
    COMPILER MAIN START
 *****************************************************************************/

/*
  -  Copy your source code in clipbard
  -  Click on left text area, then automatically happens:
  -> Source code will be pasted left, compiled, ASM code pasted right 
     copied to clipboard, ready to paste into an assembler
*/

async function paste(input) {
  const text = await navigator.clipboard.readText();
  input.value = text;
  compile();
}

/*****************************************************************************
    GLOBAL VARIABLES 
 *****************************************************************************/

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
    
var code = [];
    // str line     <-- code line
    
var optimization_level = 1; // 0: no optimization at all, 1: optimization
var place_runtime_automatically;
var no_error;
var start_address;
