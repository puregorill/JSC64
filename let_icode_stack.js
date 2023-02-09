/*****************************************************************************
    LET STACK
 *****************************************************************************/

var math_stack = [];
    // opcode
    // data_type
    // value
    // addressing_mode

//============================================================================
//  Debug
//============================================================================

function debugOuputStackCode(item) {
  
  let data_type = "";
  let value = "";
  let addressing_mode = "";
  
  if ( typeof item.data_type !== "undefined" ) 
    data_type = item.data_type;
  if ( typeof item.value !== "undefined" ) 
    value = item.value;
  if ( typeof item.addressing_mode !== "undefined" ) 
    addressing_mode = " ("+item.addressing_mode+")";
  
  DebugCode( item.opcode + " " + data_type + " " + value + addressing_mode );
  
}

//============================================================================
//  Optimizer
//============================================================================

function optimizeStackCode() {
  // stub
  // TODO optimizeStackCode()
}

//============================================================================
//  Stack machine math parser
//============================================================================
  
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
      simpleExpression();
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
  function shiftAndLogicalExpression() {
  
    addExpression();
    
    while ( currentTokenValueWithCase() == "&" ||
            currentTokenValueWithCase() == "|" ||
            currentTokenValueWithCase() == "^" ||
            currentTokenValueWithCase() == ">>" ||
            currentTokenValueWithCase() == ">>" )  {
              
      let operator = currentTokenValueWithCase();
      nextToken();
      addExpression();
      math_stack.push({
        opcode: operator
      });
    
    } /* wend */
    
  }
  function simpleExpression() {
    shiftAndLogicalExpression();
  }
  
  //----------------------------------------------------------------------
  //  Invoke parsing steps
  //----------------------------------------------------------------------
  
  math_stack = [];
  simpleExpression();
  math_stack.push({
    opcode: "pull",
    data_type: target_operand.data_type,
    value: target_operand.value,
    addressing_mode: target_operand.addressing_mode
  });
  
}
