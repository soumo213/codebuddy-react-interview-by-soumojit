import { numericRegex } from "./regex";
import { emailRegx, nameRegex, passowrdRegx } from "./regex";

export const Validator = {
  name(data) {
    if (data.length >= 2 && data.length <= 50 && data.trim().match(nameRegex)) {
      return true;
    } else {
      return false;
    }
  },
  address(data) {
    if (data.length >= 10) {
      return true;
    } else {
      return false;
    }
  },
  text(data, l = 0) {
    if (
      data !== null &&
      data !== "" &&
      data !== undefined &&
      data.trim() !== "" &&
      data.length > l
    ) {
      return true;
    }
    return false;
  },
  phoneNumber(data) {
    if (data.length === 10 && data.trim().match(numericRegex)) {
      return true;
    } else {
      return false;
    }
  },
  number(data, min, max) {
    if (!isNaN(data) && typeof data === "number") {
      if ((min === undefined || data >= min) && (max === undefined || data <= max)) {
        return true;
      }
    }
    return false;
  },
  email(data) {
    if (data?.length > 0) {
      if (data.match(emailRegx)) {
        return true;
      }
    }
    return false;
  },
  password(data) {
    if (data.length > 0) {
      if (passowrdRegx.test(data)) {
        return true;
      }
    }
    return false;
  },
};
