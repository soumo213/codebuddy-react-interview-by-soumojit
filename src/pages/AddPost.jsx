import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { Validator } from "../utils/validator";
import { handleAlphabets, handleNumbers } from "../utils";

const AddPost = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isValid, setIsValid] = useState(true);

  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "+91",
    phoneNumber: "",
    acceptTermsAndCondition: false,
  });

  const {
    emailId,
    password,
    firstName,
    lastName,
    address,
    countryCode,
    phoneNumber,
    acceptTermsAndCondition,
  } = formData;

  const [errMsg, setErrMsg] = useState({
    emailId: "",
    password: "",
    firstName: "",
    lastName: "",
    address: "",
    countryCode: "",
    phoneNumber: "",
    acceptTermsAndCondition: "",
    submitError: "",
  });

  // Handle
  const handleStepChange = (step) => {
    if (step <= 3) {
      setCurrentStep(step);
    }
  };

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (e.target.type === "checkbox") {
      setFormData({
        ...formData,
        [name]: checked,
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
    setIsValid(true);
    setErrMsg((prev) => ({
      ...prev,
      submitError: "",
    }));

    if (e.target.name === "emailId") {
      if (!Validator.text(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          emailId: "Please enter your E-Mail",
        }));
      } else if (e.target.value && !Validator.email(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          emailId: "Please enter a valid E-Mail",
        }));
      } else {
        setErrMsg((prev) => ({
          ...prev,
          emailId: "",
        }));
      }
    }

    if (e.target.name === "password") {
      if (!Validator.text(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          password: "Please enter your Password",
        }));
      } else if (e.target.value && !Validator.password(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          password:
            "Password must contain minimum 2 capital letters, 2 small letter, 2 numbers and 2 special characters.",
        }));
      } else {
        setErrMsg((prev) => ({
          ...prev,
          password: "",
        }));
      }
    }

    if (e.target.name === "firstName") {
      if (!Validator.text(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          firstName: "Please enter your First Name",
        }));
      } else if (e.target.value && !Validator.name(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          firstName: "Allow only alphabets. Minimum of 2 character and maximum 50.",
        }));
      } else {
        setErrMsg((prev) => ({
          ...prev,
          firstName: "",
        }));
      }
    }

    if (e.target.name === "lastName") {
      if (!Validator.text(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          lastName: "Please enter your Last Lame",
        }));
      } else if (e.target.value && !Validator.name(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          lastName: "Allow only alphabets. Minimum of 2 character and maximum 50.",
        }));
      } else {
        setErrMsg((prev) => ({
          ...prev,
          lastName: "",
        }));
      }
    }

    if (e.target.name === "address") {
      if (!Validator.text(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          address: "Please enter your Address",
        }));
      } else if (e.target.value && !Validator.address(e.target.value)) {
        setErrMsg((prev) => ({
          ...prev,
          address: "Address must contain minimum 10 characters",
        }));
      } else {
        setErrMsg((prev) => ({
          ...prev,
          address: "",
        }));
      }
    }

    if (e.target.name === "phoneNumber") {
      if (!e.target.value) {
        setErrMsg((prev) => ({
          ...prev,
          phoneNumber: "Please enter your Phone Number",
        }));
      } else if (e.target.value && !Validator.phoneNumber(e.target.value, 10, 10)) {
        setErrMsg((prev) => ({
          ...prev,
          phoneNumber: "Phone Number must contain 10 digits",
        }));
      } else {
        setErrMsg((prev) => ({
          ...prev,
          phoneNumber: "",
        }));
      }
    }

    if (e.target.name === "acceptTermsAndCondition") {
      if (!e.target.checked) {
        setErrMsg((prev) => ({
          ...prev,
          acceptTermsAndCondition: "You must accept the terms and conditions",
        }));
      } else {
        setErrMsg((prev) => ({
          ...prev,
          acceptTermsAndCondition: "",
        }));
      }
    }
  };

  // Validation
  const getValidation = () => {
    return new Promise((resolve) => {
      let valid = true;
      const errors = {};

      if (currentStep === 1) {
        if (!Validator.text(emailId)) {
          errors.emailId = "Please enter your E-Mail";
          valid = false;
        } else if (emailId && !Validator.email(emailId)) {
          errors.emailId = "Please enter a valid E-Mail";
          valid = false;
        }

        if (!Validator.text(password)) {
          errors.password = "Please enter your Password";
          valid = false;
        } else if (password && !Validator.password(password)) {
          errors.password =
            "Password must contain minimum 2 capital letters, 2 small letters, 2 numbers, and 2 special characters.";
          valid = false;
        }
      } else if (currentStep === 2) {
        if (!Validator.text(firstName)) {
          errors.firstName = "Please enter your First Name";
          valid = false;
        } else if (firstName && !Validator.name(firstName)) {
          errors.firstName = "Allow only alphabets. Minimum of 2 characters and maximum 50.";
          valid = false;
        }

        if (!Validator.text(lastName)) {
          errors.lastName = "Please enter your Last Name";
          valid = false;
        } else if (lastName && !Validator.name(lastName)) {
          errors.lastName = "Allow only alphabets. Minimum of 2 characters and maximum 50.";
          valid = false;
        }

        if (!Validator.text(address)) {
          errors.address = "Please enter your Address";
          valid = false;
        } else if (address && !Validator.address(address)) {
          errors.address = "Address must contain a minimum of 10 characters";
          valid = false;
        }
      } else if (currentStep === 3) {
        // Validate all fields for Step 3
        if (!Validator.text(emailId)) {
          errors.emailId = "Please enter your E-Mail";
          valid = false;
        } else if (emailId && !Validator.email(emailId)) {
          errors.emailId = "Please enter a valid E-Mail";
          valid = false;
        }

        if (!Validator.text(password)) {
          errors.password = "Please enter your Password";
          valid = false;
        } else if (password && !Validator.password(password)) {
          errors.password =
            "Password must contain minimum 2 capital letters, 2 small letters, 2 numbers, and 2 special characters.";
          valid = false;
        }

        if (!Validator.text(firstName)) {
          errors.firstName = "Please enter your First Name";
          valid = false;
        } else if (firstName && !Validator.name(firstName)) {
          errors.firstName = "Allow only alphabets. Minimum of 2 characters and maximum 50.";
          valid = false;
        }

        if (!Validator.text(lastName)) {
          errors.lastName = "Please enter your Last Name";
          valid = false;
        } else if (lastName && !Validator.name(lastName)) {
          errors.lastName = "Allow only alphabets. Minimum of 2 characters and maximum 50.";
          valid = false;
        }

        if (!Validator.text(address)) {
          errors.address = "Please enter your Address";
          valid = false;
        } else if (address && !Validator.address(address)) {
          errors.address = "Address must contain a minimum of 10 characters";
          valid = false;
        }

        if (!Validator.text(phoneNumber)) {
          errors.phoneNumber = "Please enter your Phone Number";
          valid = false;
        } else if (phoneNumber && !Validator.phoneNumber(phoneNumber)) {
          errors.phoneNumber = "Phone Number must contain 10 digits";
          valid = false;
        }

        if (!acceptTermsAndCondition) {
          errors.acceptTermsAndCondition = "You must accept the terms and conditions";
          valid = false;
        }
      }

      setErrMsg(errors);
      resolve(valid);
    });
  };

  // Subbmit & Reset
  const handleSaveAndNext = async () => {
    const validateStatus = await getValidation();
    if (validateStatus) {
      handleStepChange(currentStep + 1);
    }
  };

  const handleSubmit = async () => {
    if (currentStep === 3) {
      const validateStatus = await getValidation();
      setIsValid(validateStatus);
      if (validateStatus) {
        try {
          const payload = {
            emailId,
            password,
            firstName,
            lastName,
            address,
            countryCode,
            phoneNumber,
          };
          const response = await fetch("https://codebuddy.review/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
          });

          const result = await response.json();

          if (result.message === "Success") {
            navigate("/posts");
          } else {
            setErrMsg((prev) => ({
              ...prev,
              submitError: "An error occurred. Please try again later.",
            }));
          }
        } catch (error) {
          setErrMsg((prev) => ({
            ...prev,
            submitError: "An error occurred. Please try again later.",
          }));
        }
      }
    } else {
      handleStepChange(currentStep + 1);
    }
  };

  return (
    <div className="rounded-lg bg-gray-50 p-7 text-gray-900 shadow-lg">
      <h1 className="mb-7 text-4xl font-bold">Add Post</h1>
      <Link to="/posts" className="mb-4 flex items-center text-blue-600 hover:underline">
        <Icon icon="mdi:arrow-left" className="mr-2" />
        Back to Post
      </Link>

      <div className="mb-6 flex w-full gap-2">
        <button
          onClick={() => handleStepChange(1)}
          className={`w-1/3 rounded px-4 py-2 ${
            currentStep === 1 ? "bg-gradient-to-tr text-gray-700" : "bg-gray-200 text-gray-700"
          }`}
        >
          Step 1
        </button>
        <button
          onClick={() => handleStepChange(2)}
          className={`w-1/3 rounded px-4 py-2 ${
            currentStep === 2 ? "bg-gradient-to-tr text-gray-700" : "bg-gray-200 text-gray-700"
          }`}
        >
          Step 2
        </button>
        <button
          onClick={() => handleStepChange(3)}
          className={`w-1/3 rounded px-4 py-2 ${
            currentStep === 3 ? "bg-gradient-to-tr text-gray-700" : "bg-gray-200 text-gray-700"
          }`}
        >
          Step 3
        </button>
      </div>

      <div className="mx-auto space-y-4 p-6">
        <div className="grid grid-cols-2 gap-4">
          {currentStep === 1 && (
            <>
              <div className="flex flex-col">
                <label htmlFor="emailId" className="mb-1 font-semibold">
                  Email <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="emailId"
                  name="emailId"
                  value={formData.emailId}
                  onChange={handleChange}
                  className="rounded border p-2"
                />
                {errMsg.emailId && <p className="mt-2 text-sm text-red-500">{errMsg.emailId}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 font-semibold">
                  Password <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="rounded border p-2"
                />
                {errMsg.password && <p className="mt-2 text-sm text-red-500">{errMsg.password}</p>}
              </div>
            </>
          )}
          {currentStep === 2 && (
            <>
              <div className="flex flex-col">
                <label htmlFor="firstName" className="mb-1 font-semibold">
                  First Name <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  onKeyDown={handleAlphabets}
                  className="rounded border p-2"
                />
                {errMsg.firstName && (
                  <p className="mt-2 text-sm text-red-500">{errMsg.firstName}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName" className="mb-1 font-semibold">
                  Last Name <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  onKeyDown={handleAlphabets}
                  className="rounded border p-2"
                />
                {errMsg.lastName && <p className="mt-2 text-sm text-red-500">{errMsg.lastName}</p>}
              </div>
              <div className="col-span-2 flex flex-col">
                <label htmlFor="address" className="mb-1 font-semibold">
                  Address <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="rounded border p-2"
                />
                {errMsg.address && <p className="mt-2 text-sm text-red-500">{errMsg.address}</p>}
              </div>
            </>
          )}
          {currentStep === 3 && (
            <>
              <div className="flex flex-col">
                <label htmlFor="countryCode" className="mb-1 font-semibold">
                  Country Code <span className="text-sm text-red-500">*</span>
                </label>
                <select
                  id="countryCode"
                  name="countryCode"
                  value={formData.countryCode}
                  onChange={handleChange}
                  className="rounded border p-2"
                >
                  <option value="+91">India (+91)</option>
                  <option value="+1">America (+1)</option>
                </select>
                {errMsg.countryCode && (
                  <p className="mt-2 text-sm text-red-500">{errMsg.countryCode}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="phoneNumber" className="mb-1 font-semibold">
                  Phone Number <span className="text-sm text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  onKeyDown={handleNumbers}
                  className="rounded border p-2"
                  maxLength={10}
                />
                {errMsg.phoneNumber && (
                  <p className="mt-2 text-sm text-red-500">{errMsg.phoneNumber}</p>
                )}
              </div>
              <div className="flex flex-col">
                <label htmlFor="acceptTermsAndCondition">
                  <input
                    type="checkbox"
                    id="acceptTermsAndCondition"
                    name="acceptTermsAndCondition"
                    checked={formData.acceptTermsAndCondition}
                    onChange={handleChange}
                  />{" "}
                  I accept the terms and conditions
                </label>
                {errMsg.acceptTermsAndCondition && (
                  <p className="text-red-500">{errMsg.acceptTermsAndCondition}</p>
                )}
              </div>
            </>
          )}
        </div>
        <div className="mb-6 flex justify-center space-x-4">
          <button
            className={`w-32 rounded p-2 text-white ${
              currentStep === 1 ? "cursor-not-allowed bg-gray-300" : "bg-gray-500"
            }`}
            onClick={() => handleStepChange(currentStep - 1)}
            disabled={currentStep === 1}
          >
            Back
          </button>
          <button
            className="w-32 rounded bg-blue-500 p-2 text-white"
            onClick={() => handleSubmit()}
          >
            Save
          </button>
          <button
            className={`w-32 rounded p-2 text-white ${
              currentStep === 3 ? "cursor-not-allowed bg-gray-300" : "bg-lime-500"
            }`}
            disabled={currentStep === 3}
            onClick={() => handleSaveAndNext()}
          >
            Save & Next
          </button>
        </div>

        {!isValid && (
          <p className="text-center text-red-500">
            Please ensure all required fields are completed.
          </p>
        )}
        {errMsg.submitError && <p className="text-center text-red-500">{errMsg.submitError}</p>}
      </div>
    </div>
  );
};

export default AddPost;
