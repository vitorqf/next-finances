"use client";

import { Button } from "@/components/Button";
import { FacebookButton } from "@/components/FacebookButton";
import { GoogleButton } from "@/components/GoogleButton";
import { Input } from "@/components/Input";
import { OrSplitter } from "@/components/OrSplitter";
import { Form, Formik } from "formik";
import Link from "next/link";
import { HiOutlineLockClosed, HiOutlineMail } from "react-icons/hi";
import { useEntrar } from "./useEntrar";

export default function Entrar() {
  const { initialValues, FormSchema, handleSubmitLogin, loginLoading } =
    useEntrar();
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
        onSubmit={handleSubmitLogin}
      >
        {({ values, handleChange, errors, touched }) => (
          <Form className="flex w-[340px] flex-col gap-4" method="POST">
            <Input
              name="email"
              icon={<HiOutlineMail size={20} />}
              placeholder="E-mail"
              type="email"
              value={values.email}
              onChange={handleChange}
              errors={touched.email && errors.email}
            />
            <Input
              name="password"
              icon={<HiOutlineLockClosed size={20} />}
              placeholder="Senha"
              type="password"
              value={values.password}
              onChange={handleChange}
              errors={touched.password && errors.password}
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
              disabled={loginLoading}
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
