"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@ktm/components/ui/button";
import { socket } from "@ktm/action/socket";
import { type ZodType, z } from "zod";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@ktm/components/ui/form";
import { Input } from "@ktm/components/ui/input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { api } from "@ktm/trpc/react";
import { redirect } from "next/navigation";

type ChatMessage = {
  username: string;
  message: string;
};

type MessageType = {
  sender: string;
  message: string;
};

export default function Page() {
  const user = api.auth.me.useQuery();
  if (user.isSuccess && !user.data) {
  }

  const { data, isSuccess } = api.kaumTongHarm.getAll.useQuery();
  const randomWord = api.kaumTongHarm.getRamdom.useQuery({ take: 5 });

  return (
    <>
      <h1>Create an account</h1>
      {/* <form action={signup}> */}
      {/*   <label htmlFor="username">Username</label> */}
      {/*   <input name="username" id="username" /> */}
      {/*   <br /> */}
      {/*   <label htmlFor="password">Password</label> */}
      {/*   <input type="password" name="password" id="password" /> */}
      {/*   <br /> */}
      {/*   <button>Continue</button> */}
      {/* </form> */}
    </>
  );
}
