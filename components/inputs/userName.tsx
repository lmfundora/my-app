import { useRef, useState } from "react";
import { Input, Label } from "../ui";

export default function UserName() {
  var userName = useRef<HTMLInputElement>(null);
  var [error, setError] = useState<string>();
  function validateUserName(value: string) {
    var regex = /^.{1,20}$/;
    if (!regex.test(value)) {
      setError("User name invalid");
    } else {
      setError(undefined);
    }
  }
  return (
    <>
      <Label htmlFor="email" className="ms-1 mb-1">
        User name
      </Label>
      <Input
        id="email"
        name="userName"
        type="phone"
        ref={userName}
        placeholder="pepe2024"
        className={`${
          error != null ? "border-red-500" : "border-purple-500"
        } outlined border-2 focus:ring-4 ring-0 ring-purple-300`}
        onBlur={() => {
          userName.current?.value ? validateUserName(userName.current.value) : null;
          console.log(userName.current?.value);
        }}
      />
      {error != null ? (
        <p className="text-sm mt-1 ms-1 text-red-500">{error}</p>
      ) : null}
    </>
  );
}
