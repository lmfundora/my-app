import axios from "axios";
import { createUserInterface } from "@/interfaces";

export async function createUser(data: createUserInterface) {
  const url = "http://localhost:3005/auth/createUser";
  const headers = {
    "Content-Type": "application/json",
  };

    let response = await axios.post(url, data, {
      headers: headers,
    });

    return response.data;
}

