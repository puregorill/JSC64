_begin_runtime_:

!macro used_routine {
  nop
  nop
  nop
  nop
  rts
}

_used_:
!ifdef _flag_used_ {
 +used_routine
}

_end_runtime_:

