import { Form, UseFormReturn } from "react-hook-form";

interface FormProviderProps {
  children: React.ReactNode;
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  methods: UseFormReturn<any>;
}

const FormProvider: React.FC<FormProviderProps> = ({
  children,
  onSubmit,
  methods,
}) => {
  return (
    <Form {...methods}>
      <form onSubmit={onSubmit}>{children}</form>
    </Form>
  );
};
