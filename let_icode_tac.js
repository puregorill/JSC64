/*****************************************************************************
    LET TAC
 *****************************************************************************/
  
var tac = [];
    // operator
    // store_dest
    // load_left
    // left_data_type
    // left_value
    // left_addressing_mode
    // right_data_type
    // right_value
    // right_addressing_mode
    // dest_data_type
    // dest_value
    // dest_addressing_mode
     
//============================================================================
//  Debug
//============================================================================   

function debugOuputTacCode(item) { 
  
  DebugCode(   item.dest_data_type.padEnd(5," ") + " " + item.dest_value.padEnd(4," ") + " [" + item.store_dest.toString().substr(0,1) + "] (" + item.dest_addressing_mode.padEnd(4," ")  + ")  =  "
             + item.left_data_type.padEnd(5," ") + " " + item.left_value.padEnd(4," ") + " [" + item.load_left.toString().substr(0,1)  + "] (" + item.left_addressing_mode.padEnd(4," ")  + ")  "
             + item.operator + "  "
             + item.right_data_type.padEnd(5," ") + " " + item.right_value.padEnd(4," ") + " (" + item.right_addressing_mode.padEnd(4," ") + ") "
           );
  
}

//============================================================================
//  Create TAC from stack code
//============================================================================

function createTAC() {
  
  let free_temp = [];
  
  function createTempNameArray() {
    
    let max_temp = 10;
    
    for ( var t=0; t<max_temp; t++ ) {
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
  let previous_dest_value;
  
  for ( var i=0; i<math_stack.length; i++ ) {
    
    if ( math_stack[i].opcode == "+"
      || math_stack[i].opcode == "-"
      || math_stack[i].opcode == "*"
      || math_stack[i].opcode == "/"
      || math_stack[i].opcode == "&"
      || math_stack[i].opcode == "|"
      || math_stack[i].opcode == "^"                  
      || math_stack[i].opcode == "<<"
      || math_stack[i].opcode == ">>" ) {
                
      // get math operator
      
      let operator = math_stack[i].opcode;
      
      // --- get right side of operator -------------------
      
      let right_data_type = math_stack[i-1].data_type;
      let right_value = math_stack[i-1].value;
      let right_addressing_mode = math_stack[i-1].addressing_mode;
      setTempToUnused( math_stack[i-1].value );
      
      // --- get left side of operator --------------------
      
      let left_data_type = math_stack[i-2].data_type;
      let left_value = math_stack[i-2].value;
      let left_addressing_mode = math_stack[i-2].addressing_mode;
      setTempToUnused( math_stack[i-2].value );

      // --- get destination ------------------------------
      
      // erase the 2 operands from stack
      
      math_stack.splice(i-2,2); 
      
      // use stack position of former operator 
      // for new destination operand
      
      let dest_value = getNextFreeTempName();
      
      math_stack[i-2].opcode = "push";
      math_stack[i-2].value = dest_value;
      math_stack[i-2].data_type = target_operand.data_type;
      math_stack[i-2].addressing_mode = "abs";
      
      
      // --- write TAC ------------------------------------
      
      tac.push({
        operator: operator,
        store_dest: true,
        load_left: true,        
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
      
      // --- some tiny optimizations ----------------------
      
      if ( optimization_level > 0 ) {
      
        let current_tac_pos = tac.length-1;
        let tac_operator = tac[current_tac_pos].operator;
   
        if (  ( tac_operator=="*" || tac_operator=="+" || 
                tac_operator=="&" || tac_operator=="|" || tac_operator=="^" ) && 
              ( tac[current_tac_pos].left_addressing_mode == "imm" || 
                previous_dest_value == tac[current_tac_pos].right_value )  ) {
          
          // swap left and right operands
          
          let tmp = tac[current_tac_pos].left_value;
          tac[current_tac_pos].left_value = tac[current_tac_pos].right_value;
          tac[current_tac_pos].right_value = tmp;
          
          tmp = tac[current_tac_pos].left_addressing_mode;
          tac[current_tac_pos].left_addressing_mode = tac[current_tac_pos].right_addressing_mode;
          tac[current_tac_pos].right_addressing_mode = tmp;
          
          tmp = tac[ current_tac_pos].left_data_type;
          tac[current_tac_pos].left_data_type = tac[current_tac_pos].right_data_type;
          tac[current_tac_pos].right_data_type = tmp;
          
        }
        
        // we don't need "sta _Tx_: lda _Tx_", both can be ommited
           
        if ( previous_dest_value == tac[current_tac_pos].left_value ) {
          tac[current_tac_pos-1].store_dest = false;
          tac[current_tac_pos].load_left = false;
        }
      
      }
      
      // --- save current dest_value for compare above ----
      
      previous_dest_value = dest_value;
      
      // --- take the 2 erased operands into account ------
      
      i = i - 2;
  
    } /* endif */
    
  } /* next */ 
  
  if ( tac.length > 0 ) {

    // exchange last dest _T0_  with target operand

    let tac_last_element = tac.length-1
    tac[tac_last_element].dest_value = target_operand.value
    tac[tac_last_element].dest_data_type = target_operand.data_type
    tac[tac_last_element].dest_addressing_mode = target_operand.addressing_mode
    
  } else {
    
    // assignment like "let a = b"
    
    tac.push({
      operator: "=",
      store_dest: true,
      load_left: true,      
      left_data_type: math_stack[i-2].data_type,
      left_value: math_stack[i-2].value,
      left_addressing_mode: math_stack[i-2].addressing_mode,
      right_data_type: "",
      right_value: "",
      right_addressing_mode: "",
      dest_data_type: target_operand.data_type,
      dest_value: target_operand.value,
      dest_addressing_mode: target_operand.addressing_mode
    });
    
  }
  
}
