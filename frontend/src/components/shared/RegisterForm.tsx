"use client";

import { useActionState, useEffect } from "react";
import { registerUser } from "@/services/auth/registerUser";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { toast } from "sonner";
import InputFieldError from "./InputFieldError";

export default function RegisterForm() {
  const [state, formAction, isPending] = useActionState(registerUser, {
    message: null,
    inputs: { name: "", email: "", address: "", password: "" },
    errors: [],
    success: false,
  });
  useEffect(() => {
    if (state && !state.success && state.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FieldGroup className="flex flex-col gap-5">
        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="name"
            className="text-sm font-medium text-gray-700"
          >
            Full Name
          </FieldLabel>
          <Input
            id="name"
            name="name"
            type="text"
            defaultValue={state?.inputs?.name}
            placeholder="John Doe"
            className="w-full px-4 py-2.5 rounded-lg border-gray-200 text-sm focus-visible:outline-none focus-visible:border-[#13322B] focus-visible:ring-1 focus-visible:ring-[#13322B] transition-all"
          />
          <InputFieldError field="name" state={state} />
        </Field>

        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="email"
            className="text-sm font-medium text-gray-700"
          >
            Email
          </FieldLabel>
          <Input
            id="email"
            name="email"
            type="email"
            defaultValue={state?.inputs?.email}
            placeholder="name@example.com"
            className="w-full px-4 py-2.5 rounded-lg border-gray-200 text-sm focus-visible:outline-none focus-visible:border-[#13322B] focus-visible:ring-1 focus-visible:ring-[#13322B] transition-all"
          />
          <InputFieldError field="email" state={state} />
        </Field>

        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Address
          </FieldLabel>
          <Input
            id="address"
            name="address"
            type="text"
            defaultValue={state?.inputs?.address}
            placeholder="e.g. House:23, Road:23, Jamaica, USA"
            className="w-full px-4 py-2.5 rounded-lg border-gray-200 text-sm focus-visible:outline-none focus-visible:border-[#13322B] focus-visible:ring-1 focus-visible:ring-[#13322B] transition-all"
          />
          <InputFieldError field="address" state={state} />
        </Field>

        <Field className="flex flex-col gap-2">
          <FieldLabel
            htmlFor="password"
            className="text-sm font-medium text-gray-700"
          >
            Password
          </FieldLabel>
          <Input
            id="password"
            name="password"
            type="password"
            defaultValue={state?.inputs?.password}
            className="w-full px-4 py-2.5 rounded-lg border-gray-200 text-sm focus-visible:outline-none focus-visible:border-[#13322B] focus-visible:ring-1 focus-visible:ring-[#13322B] transition-all"
          />
        </Field>
        <InputFieldError field="password" state={state} />
      </FieldGroup>

      {state?.message && (
        <p className="text-red-500 text-sm">{state.message}</p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="w-full bg-[#13322B] text-white rounded-lg py-6 text-sm font-medium hover:bg-[#1a453b] transition-colors mt-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isPending ? "Creating Account..." : "Create Account"}
      </Button>
    </form>
  );
}
