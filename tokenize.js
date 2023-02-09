/*****************************************************************************
    TOKENIZE 
 *****************************************************************************/
 
function tokenizeCurrentSourceLine() {
  
  // Clear global token array
    // str type
    // str value
    // num source_line_index
      
  token = [];

  //=========================================================================
  //  Helper functions
  //=========================================================================

  function isName( character ) {
    
    if ( ( character >= 'a' && character <= 'z' ) || ( character >= 'A' && character <= 'Z' ) ) {
      return true
    } else {
      return false
    }
    
  }
  function isNum( character ) {
    
   if ( ( character >= '0' && character <= '9' ) || character == '$' || character == '%' ) {
      return true
    } else {
      return false
    }
    
  }
  function isWhite( character ) {
    
   if ( character == ' ' || character == '\t' ) {
      return true
    } else {
      return false
    }
    
  }
  function isString( character ) {
    
   if ( character == '"' || character == "'" ) {
      return true
    } else {
      return false
    }
    
  }
  function nextTwoCharactersAre( c1, c2 ) {

    if ( source_line[current_source_line_index].line[current_character_position] == c1 && 
         source_line[current_source_line_index].line[current_character_position+1] == c2 ) {
          return true
    } else {
          return false
    }

  }
  
  
  //*********************************************************************************************************
  //  Tokenizer loop
  //*********************************************************************************************************
    
  let current_character_position = 0; // starts with 0, hence "position = current_character_position+1" below
  
  while( current_character_position < source_line[current_source_line_index].line.length ) {    
   
    let character = source_line[current_source_line_index].line[current_character_position];

    //-----------------------------------------------------------------------
    //  Whitespace
    //-----------------------------------------------------------------------
    
    if ( isWhite( character ) ) {
      // token.push({ // for debugging, see whites in token stream
        // type: 'white',
        // value: " ",
        // position: current_character_position+1
      // });
      current_character_position++;
      continue;
    }
    
    //-----------------------------------------------------------------------
    //  Line comment
    //-----------------------------------------------------------------------
    
    if ( character == ';' ) {
      break;
    }    

    //-----------------------------------------------------------------------
    //  Left underscore (not allowed because the compiler uses it)
    //-----------------------------------------------------------------------
    
    if ( character == '_' ) {
      ThrowSyntaxError( "Underscore characters '_' are not allowed as first character of a token.\nIt is used by the compiler" )
    }

    //-----------------------------------------------------------------------
    //  Name
    //-----------------------------------------------------------------------
    
    if ( isName( character ) ) {
      
      let value = '';
      let position = current_character_position+1; // +1 because string pos starts at 0

      while( isName( character ) ) {
        value += character;
        character = source_line[current_source_line_index].line[++current_character_position];
      }
      
      token.push({
        type: 'name',
        value: value,
        position: position
      });
      
      continue;
      
    }
    
    //-----------------------------------------------------------------------
    //  Number
    //-----------------------------------------------------------------------
    
    if ( isNum( character ) ) {
      
      let value = '';
      let position = current_character_position+1;
      
      while( isNum( character ) ) {
        value += character;
        character = source_line[current_source_line_index].line[++current_character_position];
      }
      
      token.push({
        type: 'number',
        value: value,
        position: position
      });
      
      continue;
      
    }
    
    //-----------------------------------------------------------------------
    //  String
    //-----------------------------------------------------------------------
    
    if ( isString( character ) ) {
      
      let value = "";
      let position = current_character_position+1;
      let string_terminator = character; // either " or '
      
      // skip over opening " or '
      
      character = source_line[current_source_line_index].line[++current_character_position];
      
      // collect string 
      
      while( character !== string_terminator ) {
        
        value += character;
        character = source_line[current_source_line_index].line[++current_character_position];
        
        // Take end of line into account
        
        if ( current_character_position > source_line[current_source_line_index].line.length ) {
          ThrowSyntaxError( "Missing closing quote or double quote in string" );
        }
        
      }
      
      // skip over closing " or ' 
      
      current_character_position++;
      
      // Push string to "token"
      
      token.push({
        type: 'string',
        value: '"' +value + '"',  // include " or ' in this compiler
        position: position
      });
      
      continue;
      
    }

    //-----------------------------------------------------------------------
    //  Other token type: << shift left
    //-----------------------------------------------------------------------
    
    if ( nextTwoCharactersAre( "<", "<" ) ) {
      token.push({ // for debugging, see whites in token stream
        type: 'other',
        value: "<<",
        position: current_character_position+1
      });
      current_character_position += 2;
      continue;
    }
    
    //-----------------------------------------------------------------------
    //  Other token type: << shift right
    //-----------------------------------------------------------------------
    
    if ( nextTwoCharactersAre( ">", ">" ) ) {
      token.push({ // for debugging, see whites in token stream
        type: 'other',
        value: ">>",
        position: current_character_position+1
      });
      current_character_position += 2;
      continue;
    }

    //-----------------------------------------------------------------------
    //  Other token type, if it is nothing from above 
    //-----------------------------------------------------------------------
    
    token.push({
      type: 'other',
      value: character,
      position: current_character_position+1
    });
    current_character_position++;
    
  } // wend *************************************************************************************************
    
    
  //=========================================================================
  //  Push End Of Line 'EOL' if lenght of line is reached
  //=========================================================================
  
  token.push({
    type: 'EOL',
    value: "",
    position: current_character_position+1
  });
  
  // After the line is tokenized
  // we start at token 0 as current token
  // global var "current_token_index"
  
  current_token_index = 0;
  
}