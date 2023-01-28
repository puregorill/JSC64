*=$0801
!basic
!source "macro.asm"

; let a = b << #4 [Line 2]
  ; Debug: push dbyte b (abs)
  ; Debug: push dbyte #4 (imm)
  ; Debug: <<
  ; Debug: pull dbyte a (abs)
  ; Debug: dbyte a    [t] (abs )  =  dbyte b    [t] (abs )  <<  dbyte #4   (imm )
  lda b
  sta a
  rts
  a:
  !byte 0
  b:
  !byte 20
  c:
  !byte 30
  d:
  !byte 40
!source "runtime.asm"
!message "End of runtime: ",_end_runtime_
