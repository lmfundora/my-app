import axios from "axios";
import { logInData } from "@/interfaces";

export async function logIn(data: logInData) {
  const url = "http://localhost:3005/auth/login/";
  const headers = {
    "Content-Type": "application/json",
  };

    let response = await axios.post(url, data, {
      headers: headers,
    });

    return response.data;
}
