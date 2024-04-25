import { useRef, useState } from "react";
import { Input, Label } from "../ui";
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

interface params {
  passwordError: boolean;
  passwordMessage: string;
}

export default function ConfirmPassword(params:params) {
  var password = useRef<HTMLInputElement>(null);
  var [error, setError] = useState<string>();

  function validatePassword(value: string) {
    var regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!regex.test(value)) {
      setError(
        "Password debe contener 8 caracteres, una mayuscula, una minuscula, un número y un caracter especial"
      );
    } else {
      setError(undefined);
    }
  }

  let [inputType, setInputType] = useState("password");

  function togglePasswordVisivility() {
    setInputType(inputType === "text" ? "password" : "text");
  }

  return (
    <>
      <div className="flex justify-between">
        <Label htmlFor="email" className="ms-1 mt-1">
          Password
        </Label>
        <button type="button" className="me-2" onClick={togglePasswordVisivility}>
          {inputType == "password" ?(<FaRegEye />) : (<FaRegEyeSlash />) }
        </button>
      </div>
      <Input
        id="confirmPassword"
        type={inputType}
        ref={password}
        name="confirmPassword"
        className={`${
          error != null || params.passwordError ? "border-red-500" : "border-purple-500"
        } outlined border-2 focus:ring-4 ring-0 ring-purple-300`}
        onBlur={() => {
          password.current?.value
            ? validatePassword(password.current.value)
            : null;
        }}
      />
      {error != null || params.passwordError ? (
        <p className="text-sm mt-1 ms-1 text-red-500">{error || params.passwordMessage}</p>
      ) : null}
    </>
  );
}
