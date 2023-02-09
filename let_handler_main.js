/*****************************************************************************
    LET MAIN
 *****************************************************************************/

var target_operand;
   // data_type
   // value
   // addressing_mode
  
//============================================================================
//  Let handler
//============================================================================

function handleLet() {
  
  emitCurrentSourceLineAsCommentToCode();
  
  // Get gobal "target_operand"
  
  nextToken();
  target_operand = getOperand();
  
  nextToken();  // skip "="
  nextToken();  // first token of math expression
  
  parseMathExpressionToMathStack();
  //optimizeStackCode();
  //math_stack.forEach( ouputStackCode ); // Debug output of Stack code
  
  createTAC();
  //tac.forEach( ouputTacCode ); // Debug output of TAC code
  
  if ( target_operand.data_type == "word" )
    output6502CodeForWordExpression();
  else // "byte" and "dbyte"
    output6502CodeForByteExpression();

  emitEmptyCodeLineToCode();  
  
}