_begin_runtime_:


; Integer Math (8-Bit)

_PROC_IMUL888_:
!macro _MPROC_IMUL888_ {

  ; Multiplicand: In <A> must be already the multiplicand preloaded
  ; clobbers _NUM0_ as .multiplicand  
  ; clobbers _NUM1_ as .multiplier  
  ; Multiplier: immediate
  ; returns result in <A>


  ; General 8bit * 8bit = 8bit multiply
  ; by White Flame 20030207

  ; Multiplies "multiplicand" by "multiplier"
  ; returns result in .A
  ; Instead of using a bit counter, this routine early-exits when num2 reaches zero, thus saving iterations.

  ; Input variables:
  ;   multiplicand
  ;   multiplier, should be small for speed
  ;   Signedness should not matter

  ; .X and .Y are preserved
  ; .multiplicand and .multiplier get clobbered
  
  ; https://codebase64.org/doku.php?id=base:8bit_multiplication_8bit_product (copied on Jan 2, 2023)
   
   .multiplicand=_NUM0_
   .multiplier=_NUM1_
   
  lda #$00
  beq .enterLoop

  .doAdd:
  clc
  adc .multiplicand

  .loop:
  asl .multiplicand
  .enterLoop: ; for an accumulating multiply (.A = .A + .multiplicand * multiplier), set up .multiplicand and multiplier, then enter here
  lsr .multiplier
  bcs .doAdd
  bne .loop
  rts
  
  ; 16 bytes

  ; In <A> is result

}
!ifdef _INCLUDE_RUNTIME_PROC_IMUL888_ {
  +_MPROC_IMUL888_
}

_PROC_IDIV888_:
!macro _MPROC_IDIV888_ {

; 8bit/8bit division
; by White Flame
;
; Input: num, denom in zeropage
; Output: num = quotient, .A = remainder

; https://codebase64.org/doku.php?id=base:8bit_divide_8bit_product (copied on Jan 5, 2023)

  .dividend=_NUM0_
  .divisor=_NUM1_

  lda #$00
  ldx #$07
  clc
 
.l1:
  rol .dividend
  rol
  cmp .divisor
  bcc .l2
  sbc .divisor
.l2
  dex
  bpl .l1
  rol .dividend

  lda .dividend
  rts
  
  ; <A> is the result
  
  ; 22 bytes
  ;
  ;  Best case  = 154 cycles
  ;  Worst case = 170 cycles
  ;
  ; With immediate denom:
  ;  Best case  = 146 cycles 
  ;  Worst case = 162 cycles
  ;
  ; Unrolled with variable denom:
  ;  Best case  = 106 cycles
  ;  Worst case = 127 cycles
  ;
  ; Unrolled with immediate denom:
  ;  Best case  =  98 cycles
  ;  Worst case = 111 cycles
  
}
!ifdef _INCLUDE_RUNTIME_PROC_IDIV888_ {
  +_MPROC_IDIV888_
}


_end_runtime_:

