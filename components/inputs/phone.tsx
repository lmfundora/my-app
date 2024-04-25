import { useRef, useState } from "react";
import { Input, Label } from "../ui";

export default function Phone() {
  var phone = useRef<HTMLInputElement>(null);
  var [error, setError] = useState<string>();
  function validatePhone(value: string) {
    var regex = /^\+?\d{1,3}[-\s\.]?\(?\d{1,4}\)?[-\s\.]?\d{1,4}[-\s\.]?\d{1,4}[-\s\.]?\d{1,4}$/;
    if (!regex.test(value)) {
      setError("Phone invalid");
    } else {
      setError(undefined);
    }
  }
  return (
    <>
      <Label htmlFor="email" className="ms-1 mb-1">
        Phone number
      </Label>
      <Input
        id="email"
        name="phone"
        type="text"
        ref={phone}
        placeholder="55555555"
        className={`${
          error != null ? "border-red-500" : "border-purple-500"
        } outlined border-2 focus:ring-4 ring-0 ring-purple-300`}
        onBlur={() => {
          phone.current?.value ? validatePhone(phone.current.value) : null;
          console.log(phone.current?.value);
        }}
      />
      {error != null ? (
        <p className="text-sm mt-1 ms-1 text-red-500">{error}</p>
      ) : null}
    </>
  );
}
