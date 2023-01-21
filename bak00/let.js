/*****************************************************************************
    LET
 *****************************************************************************/

//============================================================================
//  Global variables
//============================================================================

var math_stack = [];
    // opcode
    // data_type
    // value
    // addressing_mode
    
var tac = [];
  

//============================================================================
//  Stack machine math parser
//============================================================================
  
function ouputStackCode(item) {
  
  let data_type = "";
  let value = "";
  
  if ( typeof item.data_type !== "undefined" ) 
    data_type = item.data_type;
  if ( typeof item.value !== "undefined" ) 
    value = item.value;
  
  DebugCode( item.opcode + " " + data_type + " " + value );
  
}
function parseMathExpressionToMathStack() {
  
  //----------------------------------------------------------------------
  //  Stack code math parser
  //----------------------------------------------------------------------
  
  function factor() {
    
    if ( currentTokenType() == "EOL" ) {
      ThrowSyntaxError( '"Factor" in math expression expected' );
    }
    
    if ( currentTokenValueWithCase() == "(" ) {
      
      nextToken();
      addExpression();
      if ( currentTokenValueWithCase() != ")" )
        ThrowSyntaxError( 'Closing ")" expected' );
      nextToken(); // skip ")"
      
    } else {
      
      let operand = getOperand();
      math_stack.push({
        opcode: "push",
        data_type: operand.data_type,
        value: operand.value,
        addressing_mode: operand.addressing_mode
      });
      nextToken();
      
    }
    
  }
  function mulExpression() {
    
    factor();
    
    while ( currentTokenValueWithCase() == "*" || 
            currentTokenValueWithCase() == "/" ) {
              
      let operator = currentTokenValueWithCase();
      nextToken();
      factor();
      math_stack.push({
        opcode: operator
      });
    
    } /* wend */
    
  }
  function addExpression() {
    
    mulExpression();
    
    while ( currentTokenValueWithCase() == "+" || 
            currentTokenValueWithCase() == "-" ) {
              
      let operator = currentTokenValueWithCase();
      nextToken();
      mulExpression();
      math_stack.push({
        opcode: operator
      });
    
    } /* wend */
    
  }
  
  //----------------------------------------------------------------------
  //  Invoke parsing steps
  //----------------------------------------------------------------------
  
  math_stack = [];
  addExpression();
  
}

//============================================================================
//  Create TAC from stack code
//============================================================================

function ouputTacCode(item) { 
  
  DebugCode( item.dest_value + " = " + item.left_value + " " + item.operator + " " + item.right_value );
  
}
function createTAC() {
  
  let free_temp = [];
  
  function createTempNameArray() {
    
    let max_temp = 10;
    
    for ( t=0; t<max_temp; t++ ) {
      free_temp.push({
        name: "_T"+t+"_",
        used: false        
      });
    }
    
  }  
  function getNextFreeTempName() {
    
    for ( var i=0; i<free_temp.length; i++ ) {
      if ( free_temp[i].used == false ) {
        free_temp[i].used = true;
        return free_temp[i].name;
      }  
    }
    
    // TODO ERROR IF NO FREE TEMP
      
  }
  function setTempToUnused( temp_name ) {
      
    for ( var i=0; i<free_temp.length; i++ ) {
      if ( free_temp[i].name == temp_name ) {
        free_temp[i].used = false;
        return
      }  
    }
    
  }
    
  tac = [];
  createTempNameArray();
  
  for ( var i=0; i<math_stack.length; i++ ) {
    
    if ( math_stack[i].opcode == "+"
      || math_stack[i].opcode == "-"
      || math_stack[i].opcode == "*"
      || math_stack[i].opcode == "/" ) {
        
      // math operator
      
      let operator = math_stack[i].opcode;
      
      // right side of operator
      
      let right_data_type = math_stack[i-1].data_type;
      let right_value = math_stack[i-1].value;
      let right_addressing_mode = math_stack[i-1].addressing_mode;
      setTempToUnused( math_stack[i-1].value );
      
      // left side of operator
      
      let left_data_type = math_stack[i-2].data_type;
      let left_value = math_stack[i-2].value;
      let left_addressing_mode = math_stack[i-2].addressing_mode;
      setTempToUnused( math_stack[i-2].value );

      // destination
      
      let temp_name = getNextFreeTempName();
      
      math_stack.splice(i-2,2);
      math_stack[i-2].opcode = "push";
      math_stack[i-2].value = temp_name;
      math_stack[i-2].data_type = "byte";
      math_stack[i-2].addressing_mode = "abs";
      
      tac.push({
        operator: operator,
        left_data_type: left_data_type,
        left_value: left_value,
        left_addressing_mode: left_addressing_mode,
        right_data_type: right_data_type,
        right_value: right_value,
        right_addressing_mode: right_addressing_mode,
        dest_data_type: math_stack[i-2].data_type,
        dest_value: math_stack[i-2].value,
        dest_addressing_mode: math_stack[i-2].addressing_mode        
      });
      
      i = i - 2;
  
    }
    
  } /* next */ 
  
  if ( tac.length > 0 ) {

    // exchange last _T0_ destination

    let tac_last_element = tac.length-1
    tac[tac_last_element].dest_value = math_stack[i-1].value
    tac[tac_last_element].dest_data_type = math_stack[i-1].data_type
    tac[tac_last_element].dest_addressing_mode = math_stack[i-1].addressing_mode
    
  } else {
    
    // assignment like "let a = b"
    
    tac.push({
      operator: "=",
      left_data_type: math_stack[i-2].data_type,
      left_value: math_stack[i-2].value,
      left_addressing_mode: math_stack[i-2].addressing_mode,
      right_data_type: "",
      right_value: "",
      right_addressing_mode: "",
      dest_data_type: math_stack[i-1].data_type,
      dest_value: math_stack[i-1].value,
      dest_addressing_mode: math_stack[i-1].addressing_mode        
    });
    
  }
  
}

//============================================================================
//  Let handler
//============================================================================

function handleLet() {
  
  // Get target operand
  
  nextToken();
  let target_operand = getOperand();
  
  nextToken();  // skip "="
  nextToken();  // first token of math expression
  
  // Parse math expression to stack code
  
  parseMathExpressionToMathStack();
  math_stack.push({
    opcode: "pull",
    data_type: target_operand.data_type,
    value: target_operand.value,
    addressing_mode: target_operand.addressing_mode
  });
  
  // Debug output of stack code
  
  math_stack.forEach(ouputStackCode);
  
  // Create TAC from stack code
  
  createTAC();
  tac.forEach(ouputTacCode); 
  
}


 