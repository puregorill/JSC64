_start_address_=*

; *****************************************************************************
; Temporary Variables for Expression Evalutation (can be used by user)
; *****************************************************************************

; 87-96 -> busy working area according to "Mapping the C64"

_T0_=87 :_TW0_=_T0_
_T1_=88
_T2_=89 :_TW1_=_T2_
_T3_=90
_T4_=91 :_TW2_=_T4_
_T5_=92
_T6_=93 :_TW3_=_T6_
_T7_=94
_T8_=95 :_TW4_=_T8_
_T9_=96

; *****************************************************************************
; Temporary Variables for internal use (not to use by user)
; *****************************************************************************

; 34-42 -> busy working area according to "salzsuppe"

_NUM0_=34 :_NUMW0_=_NUM0_
_NUM1_=35
_NUM2_=36 :_NUMW1_=_NUM2_
_NUM3_=37
_NUM4_=38 :_NUMW2_=_NUM4_
_NUM5_=39
_NUM6_=40 :_NUMW3_=_NUM6_
_NUM7_=41

_NUM8_=42
    
; *****************************************************************************
; Callable ROM Routines
; *****************************************************************************

_CHRGET_  = $73
_CHRGOT_  = $79

_STROUT0_ = $AB1E     ; PRINT 0-terminated String pointed to by [A,Y] 
_CHROUT_  = $F1CA     ; PRINT Character in [A]
_BSOUT_   = _CHROUT_
_INTOUT_  = $BDCD     ; PRINT unsigned word in [X,A]
_CHRIN_   = $FFCF
_GETIN_   = $FFE4
_CLS_     = $E544     ; Clear Screen
_MREADY_  = $A474     ; MREADY: leaves to Basic to READY prompt
_RESTOR_  = $FF8A     ; Init vector table $0314-$0333 (due to NMI Vector)
_SETCUR_  = $E50C     ; Set Cursor to row, column [X,Y]
_READCUR_ = $E513     ; Read current Cursor row, column into [X,Y]


; Floating Point Routines

_STRFAC_  = $B7B5
_STRFLP_  = $BCF3
_FACOUT_  = $AABC
_FLPSTR_  = $BDDD
_FACMEM_  = $BBD7     ;;;; bbd4 round fac1???????????????????
_MEMFAC_  = $BBA2
_ADDMEM_  = $B867
_SUBMEM_  = $B850

; *****************************************************************************
; Memory Addresses
; *****************************************************************************

_VICII_BORDER_COLOR_REGISTER_ = $D020
_VICII_BACKGROUND_COLOR_REGISTER_ = $D021

_C64_DEFAULT_BASIC_RAM_ = $0801
_C64_BASIC_ROM_ = $A000
_C64_UPPER_RAM_ = $C000
_C64_IO_RAM_ = $D000
_C64_CHARGEN_ = $D000
_C64_KERNAL_ROM_ = $E000
_C64_KERNAL_INK_COLOR_ = $0286 ; dez. 646

_NMI_INDIRECT_JUMP_VECTOR_ = $0318
_NMI_VECTOR_ = $FFFA

; Free space in Zeropage

_BASIC_INPUT_BUFFER_AT_512_ = 512       ; 512-600 (89 bytes) - VIC20/C64
_TAPE_BUFFER_AT_828_ = 828              ; 828-1019 (192 Bytes) - VIC20/C64
_C64_FREE_SPACE_AT_679_ = 679           ; 679-767 (89 bytes) - C64 only