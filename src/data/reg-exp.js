'use strict';

module.exports = {
  REG_EXP: {
    TIME: new RegExp(`^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$`, `i`),
    YES: new RegExp(`^y(es)?$`, `i`),
    END: new RegExp(`^e(nd)?$`, `i`),
    NO: new RegExp(`^n(o)?$`, `i`)
  }
};
