import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';


@Injectable({
  providedIn: 'root'
})
export class FormValidationService {

  constructor() { }

  checkIfValid(formControl:FormControl) {
    return formControl.status == "VALID" || !formControl.touched;
  }

  getInvalidText(formControl:FormControl) {
    let invalidText = "";
    for(let i = 0; i < Object.keys(formControl.errors).length; i++) {
      if(invalidText != "") {
        invalidText = invalidText + " & "
      }
      if(Object.keys(formControl.errors)[i] == "required") {
        invalidText = "Required";
        break;
      }
      console.log(formControl);
      switch(Object.keys(formControl.errors)[i]) {
        case "pattern":
          const actual = formControl.errors[Object.keys(formControl.errors)[i]].actualValue;
          const regString = formControl.errors[Object.keys(formControl.errors)[i]].requiredPattern;
          const regStringMod = regString.substring(1, regString.length-1);
          const pattern = new RegExp(regStringMod, 'g');
          const wrongChars = actual.replace(pattern, "");
          const removeDuplicates = wrongChars.replace(/(.)(?=.*\1)/g, "");
          invalidText = invalidText + "Restricted characters: " + removeDuplicates
          break;
        case "email":
          invalidText = invalidText + "Not an email";
          break;
        case "maxlength":
          invalidText = invalidText + "Above " + formControl.errors[Object.keys(formControl.errors)[i]].requiredLength + " character limit"
      }
    }
    return invalidText;
  }
}
