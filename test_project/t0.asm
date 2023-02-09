*=$0801
!basic
!source "runtime\def64.asm"
!source "runtime\macro.asm"


; print "hello world",0 [Line 2]
  lda #<_A0_
  ldy #>_A0_
  jsr _STROUT0_

  rts

_A0_: !pet "hello world",0

!source "runtime\runtime.asm"
!source "runtime\messages.asm"
