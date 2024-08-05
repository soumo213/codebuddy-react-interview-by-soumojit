import { nameRegex, numericRegex } from "./regex";

export const handleAlphabets = (e) => {
  if (e.key.length === 1 && !nameRegex.test(e.key)) {
    e.preventDefault();
  }
};

export const handleNumbers = (e) => {
  if (e.key.length === 1 && !numericRegex.test(e.key)) {
    e.preventDefault();
  }
};
