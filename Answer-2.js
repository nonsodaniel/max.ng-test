function decode(args){
  var code = args.split(' ')
  var value = '';
    for(var i = 0; i < code.length; i++){
        value += MORSE_CODE[code[i]]
      }
      return value;
    }