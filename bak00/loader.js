/*****************************************************************************
    LOADER - FILE READER 
 *****************************************************************************/

function createSourceLinesFromSourceText() {
  
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

// I haven't understood what this file reader really does, but it works
// Code taken from somewhere in the internet

file_name.addEventListener("change", function () {
  
  if (this.files && this.files[0]) {
    
    var file_name = this.files[0];
    var reader = new FileReader();
    
    reader.addEventListener('load', function (e) {
      
      textarea_source.textContent = e.target.result;
      
      // ==== MAIN CALL TO COMPILE AFTER LOADING ==============================
      
      compile();
      
      // ==== MAIN CALL TO COMPILE AFTER LOADING ==============================
      
    });
    
    reader.readAsBinaryString(file_name);
    
  }
  
});