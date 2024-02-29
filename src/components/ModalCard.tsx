import api from "@/lib/api";
import { User } from "@/models/User";
import { Form, Formik } from "formik";
import toast from "react-hot-toast";
import * as Yup from "yup";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";

const FLAGS = [
  "Visa",
  "Mastercard",
  "American Express",
  "Elo",
  "Hiper",
  "Hipercard",
  "Diners Club",
  "Discover",
  "UnionPay",
  "Maestro",
  "JCB",
  "Mir",
  "Outro",
];

const TYPES = ["Crédito", "Débito"];

interface FormStructure {
  title: string;
  digits: string;
  flag: string;
  type: string;
}

const FormSchema = Yup.object().shape({
  title: Yup.string().required("O título é obrigatório"),
  digits: Yup.string()
    .matches(/^\d{4}$/, "Os últimos quatro dígitos são obrigatórios")
    .required("Os últimos quatro dígitos são obrigatórios"),
  flag: Yup.string().required("A bandeira é obrigatória"),
  type: Yup.string().required("O tipo é obrigatório"),
});

export function ModalCard({ user }: { user: User }) {
  const initialValues: FormStructure = {
    title: "",
    digits: "",
    flag: "",
    type: "",
  };

  const handleAddCard = async (values: FormStructure) => {
    if (user?.accessToken) {
      const card = await api.cards.post(values, user?.accessToken);
      if (card) {
        toast.success("Cartão adicionado com sucesso");
      } else {
        toast.error("Erro ao adicionar cartão");
      }
    }
  };

  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-900 p-8">
      <div>
        <h2 className="text-2xl font-bold">Adicionar novo cartão</h2>
        <p className="text-slate-400">
          Preencha os campos abaixo para adicionar um novo cartão
        </p>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={FormSchema}
        onSubmit={handleAddCard}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Título"
              name="title"
              value={values.title}
              onChange={handleChange}
            />
            <Input
              placeholder="Últimos quatro digitos"
              name="digits"
              type="text"
              value={values.digits}
              onChange={handleChange}
            />
            <Select items={TYPES} name="type" placeholder="Selecione o tipo" />
            <Select
              items={FLAGS}
              name="flag"
              placeholder="Selecione uma bandeira"
            />
            <Button title="Adicionar cartão" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
