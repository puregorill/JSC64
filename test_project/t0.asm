*=$0801
!basic
!source "runtime\def64.asm"
!source "runtime\macro.asm"


; let a = b << #4 [Line 2]
  lda b
  +_SHL_ 4
  sta a

  rts

!source "runtime\runtime.asm"
  nop
  nop
  a:
  !byte 0
  b:
  !byte 20
  c:
  !byte 30
  d:
  !byte 40
!source "runtime\messages.asm"
