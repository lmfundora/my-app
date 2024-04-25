import { useRef, useState } from "react";
import { Button, Input, Label } from "../ui";

export default function Email() {
  var email = useRef<HTMLInputElement>(null);
  var [error, setError] = useState<string>();
  function validateEmail(value: string) {
    var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!regex.test(value)) {
      setError("Email inválido");
    } else {
      setError(undefined);
    }
  }
  return (
    <>
      <Label htmlFor="email" className="ms-1 mb-1">
        Email
      </Label>
      <Input
        id="email"
        type="email"
        name="email"
        ref={email}
        placeholder="usuario@gmail.com"
        className={`${
          error != null ? "border-red-500" : "border-purple-500"
        } outlined border-2 focus:ring-4 ring-0 ring-purple-300`}
        onBlur={() => {
          email.current?.value ? validateEmail(email.current.value) : null;
        }}
      />
      {error != null ? (
        <p className="text-sm mt-1 ms-1 text-red-500">{error}</p>
      ) : null}
    </>
  );
}
