import { Form, Formik } from "formik";
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

export function ModalCard() {
  return (
    <div className="flex flex-col gap-4 rounded-lg bg-gray-900 p-8">
      <div>
        <h2 className="text-2xl font-bold">Adicionar novo cartão</h2>
        <p className="text-slate-400">
          Preencha os campos abaixo para adicionar um novo cartão
        </p>
      </div>

      <Formik
        initialValues={{
          title: "",
          digits: "",
          flag: "",
          type: "",
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
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
              placeholder="Número do cartão"
              name="digits"
              type="number"
              value={values.digits}
              onChange={handleChange}
            />
            <Input
              placeholder="Tipo"
              name="type"
              value={values.type}
              onChange={handleChange}
            />
            <Select items={FLAGS} name="flag" />
            <Button title="Adicionar cartão" type="submit" />
          </Form>
        )}
      </Formik>
    </div>
  );
}
