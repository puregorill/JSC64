!macro SHL times {
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
!macro SHR times {
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

!macro test_using {
  _flag_used_=1
  jsr _used_
}


