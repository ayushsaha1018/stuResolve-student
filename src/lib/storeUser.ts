"use server";

import { useUserStore } from "@/store/user";
import { cookies } from "next/headers";

export const storeUserServer = (token: any) => {
  useUserStore.setState({
    token: token,
  });
  cookies().set("token", token);
  console.log(token);
};
