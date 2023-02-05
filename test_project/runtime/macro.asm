
!macro _SHL_ times {
  !if times > 7 {
    !error "Shifting a byte more than 7 times makes no sense."
  }
  !if times > 6 {
    asl
  }
  !if times > 5 {
    asl
  }
  !if times > 4 {
    asl
  }
  !if times > 3 {
    asl
  }
  !if times > 2 {
    asl
  }
  !if times > 1 {
    asl
  }
  asl
}
!macro _SHR_ times {
  !if times > 7 {
    !error "Shifting a byte more than 7 times makes no sense."
  }
  !if times > 6 {
    lsr
  }
  !if times > 5 {
    lsr
  }
  !if times > 4 {
    lsr
  }
  !if times > 3 {
    lsr
  }
  !if times > 2 {
    lsr
  }
  !if times > 1 {
    lsr
  }

  lsr
}

; Integer Math (8-Bit)

!macro _CALL_PROC_IMUL888_ multiplier {

  ; Multiplicand: In <A> must be already the multiplicand preloaded
  ; clobbers _NUM1_ as .multiplicand  
  ; clobbers _NUM2_ as .multiplier  
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
  
  ; https://codebase64.org/doku.php?id=base:8bit_multiplication_8bit_product (copied on Jan 2, 2022)
   
  .multiplicand = _NUM1_
  .multiplier = _NUM2_
  
  sta .multiplicand
  lda multiplier
  sta .multiplier
  jsr _PROC_IMUL888_
  
  _INCLUDE_RUNTIME_PROC_IMUL888_=1
  
}
!macro _IMUL888I_ immediate_multiplier {
  
  ; Multiplicand: In <A> must be already the multiplicand preloaded
  ; clobbers _NUM1_ as .multiplicand  
  ; Multiplier: immediate
  ; returns result in <A>
  
  .multiplicand = _NUM1_
  
  !if immediate_multiplier=1 {
    ; do nothing
  } else if immediate_multiplier=2 {
    asl
  } else if immediate_multiplier=4 {
    asl
    asl    
  } else if immediate_multiplier=8 {
    asl
    asl
    asl
  } else if immediate_multiplier=16 {
    asl
    asl
    asl
    asl
  } else if immediate_multiplier=32 {
    asl
    asl
    asl
    asl
    asl
  } else if immediate_multiplier=64 {
    asl
    asl
    asl
    asl
    asl
    asl
  } else if immediate_multiplier=128 {
    asl
    asl
    asl
    asl
    asl
    asl
    asl
  
  } else {
    
  ; if no power of 2 
  
    .first_one_done = 0

    sta .multiplicand    
    
    ; !if initial_clc = 1 {
      ; clc
    ; }
    
    !if ( immediate_multiplier & 128 )>0 {
      !if .first_one_done = 1 {
        asl
        adc .multiplicand
      }
      .first_one_done = 1
    } else { ; ( immediate_multiplier & 128 )<=0
      !if .first_one_done = 1 {
        asl
      }
    }
    !if ( immediate_multiplier & 64 )>0 {
      !if .first_one_done = 1 {
        asl
        adc .multiplicand
      }
      .first_one_done = 1
    } else { ; ( immediate_multiplier & 64 )<=0
      !if .first_one_done = 1 {
        asl
      }
    }
    !if ( immediate_multiplier & 32 )>0 {
      !if .first_one_done = 1 {
        asl
        adc .multiplicand
      }
      .first_one_done = 1
    } else { ; ( immediate_multiplier & 32 )<=0
      !if .first_one_done = 1 {
        asl
      }
    }
    !if ( immediate_multiplier & 16 )>0 {
      !if .first_one_done = 1 {
        asl
        adc .multiplicand
      }
      .first_one_done = 1
    } else { ; ( immediate_multiplier & 16 )<=0
      !if .first_one_done = 1 {
        asl
      }
    }  
    !if ( immediate_multiplier & 8 )>0 {
      !if .first_one_done = 1 {
        asl
        adc .multiplicand
      }
      .first_one_done = 1
    } else { ; ( immediate_multiplier & 8 )<=0
      !if .first_one_done = 1 {
        asl
      }
    }
    !if ( immediate_multiplier & 4 )>0 {
      !if .first_one_done = 1 {
        asl
        adc .multiplicand
      }
      .first_one_done = 1
    } else { ; ( immediate_multiplier & 4 )<=0
      !if .first_one_done = 1 {
        asl
      }
    }
    !if ( immediate_multiplier & 2 )>0 {
      !if .first_one_done = 1 {
        asl
        adc .multiplicand
      }
      .first_one_done = 1
    } else { ; ( immediate_multiplier & 2 )<=0
      !if .first_one_done = 1 {
        asl
      }
    }  
    !if ( immediate_multiplier & 1 )>0 {
      !if .first_one_done = 1 {
        asl
        adc .multiplicand
      }
      .first_one_done = 1
    } else { ; ( immediate_multiplier & 1 )<=0
      !if .first_one_done = 1 {
        asl
      }
    }
  
  }

  ; In <A> is result
  
}

!macro _CALL_PROC_IDIV888_ divisor {

; 8bit/8bit division
; by White Flame
;
; Input: num, denom in zeropage
; Output: num = quotient, .A = remainder

; https://codebase64.org/doku.php?id=base:8bit_divide_8bit_product (copied on Jan 5, 2023)

  .dividend = _NUM0_
  .divisor = _NUM1_

  sta .dividend
  lda divisor
  sta .divisor
  jsr _PROC_IDIV888_
  
  _INCLUDE_RUNTIME_PROC_IDIV888_=1
  
  ; <A> is the result
  
}
!macro _IDIV888I_ immediate_divisor {

  ; <A> must be preloaded with dividend

  ; Division for immediate immediate_divisors
  ; only for >certain< immediate immediate_divisors
  ; throws an assembler error if not one of those

  ; Unsigned Integer Division Routines (rev 2)
  ; by Omegamatrix
  ;
  ; Rev 1 (June 14, 2014)
  ; Divide by 6,10,12,20,24,26, and 28 have all been replace with new and better routines.
  ;
  ; Rev 2 (June 21, 2014)
  ; Divide by 22 routines has been upgraded to one that saves 3 cycles, same amount of bytes as before.
  ;
  ; To use these routines begin with unsigned value to be divided (0-255) in the accumulator,
  ; and the routine will finish with the integer result in the accumulator.
  ;
  ; - All divisions (2-32) are covered below
  ; - X, Y, and BCD mode are not used by any of these routines
  ; - All these routines are constant cycles
  ; - Most routines require 1 temp register

  ; https://codebase64.org/doku.php?id=base:8bit_divide_by_constant_8bit_result (copied on Jan 2, 2022)
  ; https://forums.nesdev.org/viewtopic.php?t=11336 (copied on Jan 2, 2022)

  .dividend = _NUM0_

  !if immediate_divisor=1 {
    ; do nothing
    
  } else if immediate_divisor=2 {

    ;Divide by 2 (trival)
    ;1 byte, 2 cycles
      lsr

  } else if immediate_divisor=3 {
  
    ;Divide by 3
    ;18 bytes, 30 cycles
      sta .dividend
      lsr
      adc #21
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr

  } else if immediate_divisor=4 {

    ;Divide by 4 (trival)
    ;2 bytes, 4 cycles
      lsr
      lsr

  } else if immediate_divisor=5 {

    ;Divide by 5
    ;18 bytes, 30 cycles
      sta .dividend
      lsr
      adc #13
      adc .dividend
      ror
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr

  } else if immediate_divisor=6 {

    ;Divide by 6
    ;17 bytes, 30 cycles
      lsr
      sta .dividend
      lsr
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr

  } else if immediate_divisor=7 {

    ;Divide by 7 (From December '84 Apple Assembly Line)
    ;15 bytes, 27 cycles
      sta .dividend
      lsr
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr

  } else if immediate_divisor=8 {

    ;Divide by 8 (trival)
    ;3 bytes, 6 cycles
      lsr
      lsr
      lsr

  } else if immediate_divisor=9 {

    ;Divide by 9
    ;17 bytes, 30 cycles
      sta .dividend
      lsr
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr
      lsr

  } else if immediate_divisor=10 {

    ;Divide by 10
    ;17 bytes, 30 cycles
      lsr
      sta .dividend
      lsr
      adc .dividend
      ror
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr

  } else if immediate_divisor=11 {

    ;Divide by 11
    ;20 bytes, 35 cycles
      sta .dividend
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr

  } else if immediate_divisor=12 {

    ;Divide by 12
    ;17 bytes, 30 cycles
      lsr
      lsr
      sta .dividend
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr

  } else if immediate_divisor=13 {

    ; Divide by 13
    ; 21 bytes, 37 cycles
      sta .dividend
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr
      clc
      adc .dividend
      ror
      lsr
      lsr
      lsr

  } else if immediate_divisor=14 {

    ;Divide by 14
    ;1/14 = 1/7 * 1/2
    ;16 bytes, 29 cycles
      sta .dividend
      lsr
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr

  } else if immediate_divisor=15 {

    ;Divide by 15
    ;14 bytes, 24 cycles
      sta .dividend
      lsr
      adc #4
      lsr
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr

  } else if immediate_divisor=16 {

    ;Divide by 16 (trival)
    ;4 bytes, 8 cycles
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=17 {

    ;Divide by 17
    ;18 bytes, 30 cycles
      sta .dividend
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      adc .dividend
      ror
      adc #0
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=18 {

    ;Divide by 18 = 1/9 * 1/2
    ;18 bytes, 32 cycles
      sta .dividend
      lsr
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=19 {

    ;Divide by 19
    ;17 bytes, 30 cycles
      sta .dividend
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=20 {

    ;Divide by 20
    ;18 bytes, 32 cycles
      lsr
      lsr
      sta .dividend
      lsr
      adc .dividend
      ror
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr

  } else if immediate_divisor=21 {

    ;Divide by 21
    ;20 bytes, 36 cycles
      sta .dividend
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=22 {

    ;Divide by 22
    ;21 bytes, 34 cycles
      lsr
      cmp #33
      adc #0
      sta .dividend
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr

  } else if immediate_divisor=23 {

    ;Divide by 23
    ;19 bytes, 34 cycles
      sta .dividend
      lsr
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=24 {

    ;Divide by 24
    ;15 bytes, 27 cycles
      lsr
      lsr
      lsr
      sta .dividend
      lsr
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr

  } else if immediate_divisor=25 {

    ;Divide by 25
    ;16 bytes, 29 cycles
      sta .dividend
      lsr
      lsr
      lsr
      adc .dividend
      ror
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=26 {

    ;Divide by 26
    ;21 bytes, 37 cycles
      lsr
      sta .dividend
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr

  } else if immediate_divisor=27 {

    ;Divide by 27
    ;15 bytes, 27 cycles
      sta .dividend
      lsr
      adc .dividend
      ror
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=28 {

    ;Divide by 28
    ;14 bytes, 24 cycles
      lsr
      lsr
      sta .dividend
      lsr
      adc #2
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr

  } else if immediate_divisor=29 {

    ;Divide by 29
    ;20 bytes, 36 cycles
      sta .dividend
      lsr
      lsr
      adc .dividend
      ror
      adc .dividend
      ror
      lsr
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=30 {

    ;Divide by 30
    ;14 bytes, 26 cycles
      sta .dividend
      lsr
      lsr
      lsr
      lsr
      sec
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=31 {

    ;Divide by 31
    ;14 bytes, 26 cycles
      sta .dividend
      lsr
      lsr
      lsr
      lsr
      lsr
      adc .dividend
      ror
      lsr
      lsr
      lsr
      lsr

  } else if immediate_divisor=32 {

    ;Divide by 32 (trival)
    ;5 bytes, 10 cycles
      lsr
      lsr
      lsr
      lsr
      lsr
      
  } else if immediate_divisor=40 {
  
    ;Divide by 40
    ;20 bytes, 32 cycles
      sta .dividend
      lsr
      adc .dividend
      ror
      lsr
      lsr
      adc .dividend
      ror
      adc #1
      adc .dividend
      and #$C0
      rol
      rol
      rol
      
  } else if immediate_divisor=64 {

    ;Divide by 64 (trival)
    ;6 bytes, 12 cycles
      lsr
      lsr
      lsr
      lsr
      lsr
      lsr
      
  } else if immediate_divisor=128 {

    ;Divide by 64 (trival)
    ;7 bytes, 14 cycles
      lsr
      lsr
      lsr
      lsr
      lsr
      lsr
      lsr
      
  } else {
  
    ; Call general division routine instead
    
    .divisor = _NUM1_

    sta .dividend
    lda #immediate_divisor
    sta .divisor
    jsr _PROC_IDIV888_
  
    _INCLUDE_RUNTIME_PROC_IDIV888_=1
 
  }

}






