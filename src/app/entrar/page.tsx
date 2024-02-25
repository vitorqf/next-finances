"use client";

import { Button } from "@/components/Button";
import { FacebookButton } from "@/components/FacebookButton";
import { GoogleButton } from "@/components/GoogleButton";
import { Input } from "@/components/Input";
import { OrSplitter } from "@/components/OrSplitter";
import { Form, Formik } from "formik";
import Link from "next/link";
import { useCallback } from "react";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import * as Yup from "yup";

interface FormStructure {
  email: string;
  password: string;
}

const FormSchema = Yup.object().shape({
  email: Yup.string()
    .email("E-mail inválido")
    .required("É necessário que informe um e-mail válido."),
  password: Yup.string().required("É necessário que informe uma senha válida."),
});

export default function Entrar() {
  const initialValues: FormStructure = {
    email: "",
    password: "",
  };

  const handleSubmit = useCallback((values: FormStructure) => {
    console.log(values);
  }, []);

  return (
    <main className="flex max-h-screen min-h-screen min-w-full flex-col items-center justify-center gap-8 bg-gray-900">
      <div className="flex flex-col gap-4 text-center">
        <h1 className="text-3xl font-bold text-slate-100">
          Faça login na sua conta
        </h1>
        <p className="text-slate-400">
          Ainda não tem uma conta?{" "}
          <Link
            className="font-medium text-indigo-400 transition-colors duration-200 ease-in-out hover:text-indigo-300"
            href="/cadastrar"
          >
            Cadastre-se
          </Link>
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={handleSubmit}
      >
        {({ handleSubmit, values, handleChange, errors }) => (
          <Form className="flex w-[340px] flex-col gap-4">
            <Input
              name="email"
              icon={<HiOutlineMail size={20} />}
              placeholder="E-mail"
              type="email"
              value={values.email}
              onChange={handleChange}
              errors={errors.email}
              autoComplete="email"
            />
            <Input
              name="password"
              icon={<HiOutlineLockClosed size={20} />}
              placeholder="Senha"
              type="password"
              value={values.password}
              onChange={handleChange}
              errors={errors.password}
              autoComplete="current-password"
            />
            <Link
              href="/esqueci-senha"
              className="text-center font-medium text-indigo-400 transition-colors duration-200 ease-in-out hover:text-indigo-300"
            >
              Esqueceu sua senha?
            </Link>
            <Button
              className="text-center"
              title="Entrar"
              type="submit"
              onClick={() => handleSubmit()}
            />
            <OrSplitter />
            <GoogleButton />
            <FacebookButton />
          </Form>
        )}
      </Formik>
    </main>
  );
}
