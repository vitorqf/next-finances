import useAuth from "@/hooks/useAuth";
import { Category } from "@/models/Category";
import { Form, Formik } from "formik";
import moment from "moment";
import * as Yup from "yup";
import { Button } from "./Button";
import { Input } from "./Input";
import { Select } from "./Select";

interface FormStructure {
  description: string;
  value: number;
  category: Category;
  date: Date;
}

const FormSchema = Yup.object().shape({
  description: Yup.string().required("A descrição é obrigatória"),
  value: Yup.number().required("O valor é obrigatório"),
  category: Yup.object().required("A categoria é obrigatória"),
  date: Yup.date().required("A data é obrigatória"),
});

export function ModalTransaction({ categories }: { categories: Category[] }) {
  const { user } = useAuth();

  const initialValues: FormStructure = {
    description: "",
    value: 0,
    category: {} as Category,
    date: new Date(),
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
        onSubmit={(values) => console.log(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              placeholder="Descrição"
              name="description"
              value={values.description}
              onChange={handleChange}
            />
            <Input
              placeholder="Valor"
              name="value"
              type="number"
              value={values.value}
              onChange={handleChange}
            />
            <Select
              items={categories.map((category) => category.title)}
              name="category"
              placeholder="Selecione a categoria"
            />
            <Input
              placeholder="Data"
              name="date"
              type="date"
              value={moment(values.date).format("yyyy-mm-DD")}
              onChange={handleChange}
            />
            <Button title="Adicionar cartão" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
