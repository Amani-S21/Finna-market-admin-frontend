"use client";
import Link from "next/link";
import React, { useRef } from "react";
import InputBox from "../_components/InputBox";
import { Button } from "../_components/Button";

type FormInputs = {
  phone: string;
  fullName: string;
  password: string;
};

const SignupPage = () => {
  const register = async () => {
    const res = await fetch("http://localhost:3033/v1/auth/signup", {
      method: "POST",
      body: JSON.stringify({
        phone: data.current.phone,
        fullName: data.current.fullName,
        password: data.current.password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (!res.ok) {
      alert(res.statusText);
      return;
    }
    const response = await res.json();
    alert("User Registered!");
  };
  const data = useRef<FormInputs>({
    phone: "",
    fullName: "",
    password: "",
  });
  return (
    <div className="m-2 border rounded overflow-hidden shadow">
      <div className="p-2 bg-gradient-to-b from-white to-slate-200 text-slate-600">
        Sign up
      </div>
      <div className="p-2 flex flex-col gap-6">
        <InputBox
          autoComplete="off"
          name="phone"
          labelText="Phone"
          required
          onChange={(e) => (data.current.phone = e.target.value)}
        />
        <InputBox
          name="fullName"
          labelText="Full name"
          required
          onChange={(e) => (data.current.fullName = e.target.value)}
        />
        <InputBox
          name="password"
          labelText="password"
          type="password"
          required
          onChange={(e) => (data.current.password = e.target.value)}
        />
        <div className="flex justify-center items-center gap-2">
          <Button onClick={register}>Submit</Button>
          <Link className="" href={"/"}>
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
