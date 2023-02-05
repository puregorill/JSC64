*=$0801
!basic
!source "runtime\def64.asm"
!source "runtime\macro.asm"


; let a = b / d [Line 3]
  lda b
  +_CALL_PROC_IDIV888_ d
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

!source "runtime\runtime.asm"
!source "runtime\messages.asm"
