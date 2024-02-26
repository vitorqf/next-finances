import useAuth from "@/hooks/useAuth";
import api from "@/lib/api";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import toast from "react-hot-toast";
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

export function useEntrar() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { setUser } = useAuth();

  const initialValues: FormStructure = {
    email: "",
    password: "",
  };

  const handleSubmitLogin = useCallback(
    async (values: FormStructure) => {
      try {
        setLoading(true);
        const user = await api.auth.login(values);
        if (user) {
          setUser(user);
          router.push("/");
        }
      } catch (error) {
        toast.error("Usuário ou senha incorretos.");
      } finally {
        setLoading(false);
      }
    },
    [setUser, router],
  );

  return {
    initialValues,
    FormSchema,
    handleSubmitLogin,
    loginLoading: loading,
  };
}
