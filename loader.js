/*****************************************************************************
    LOADER
 *****************************************************************************/
 
file_name.addEventListener( "change", loadSourceFile );

function postSourceToTextareaSource( loaded_source_file ) {
  
  textarea_source.textContent = loaded_source_file.target.result;
  
  // ==== MAIN CALL TO COMPILE AFTER LOADING ==============================
  
  compile();    

}
function loadSourceFile() {

  if ( this.files && this.files[0] ) {
    
    var file_name = this.files[0];
    var reader = new FileReader();
    
    reader.addEventListener( "load", postSourceToTextareaSource );
    reader.readAsBinaryString(file_name);  
    
  } 
  
}

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

