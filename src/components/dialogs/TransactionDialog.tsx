import { useState } from "react";
import { createTransaction } from "../../services/api";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { ArrowUpDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../ui/tabs";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

interface TransactionDialogProps {
  budget_id: string;
  refreshBudget: () => void;
}

interface FormValues {
  amount: number | "";
  title: string;
  description: string;
}

const transactionSchema = Yup.object().shape({
  amount: Yup.number().positive("Must be greater than 0").required("Required"),
  title: Yup.string().optional(),
  description: Yup.string().optional(),
});

export default function TransactionDialog({ budget_id, refreshBudget }: TransactionDialogProps) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleOpenChange = (value: boolean) => setOpen(value);

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button size="default" variant="secondary" className="w-52 h-12 flex items-center gap-2">
          <ArrowUpDown />
          <span className="text-[16px]">Make Transaction</span>
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader className="">
          <DialogTitle className="">New Transaction</DialogTitle>
          <DialogDescription className="">
            Choose whether you want to deposit or withdraw and fill out the form below.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="deposit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger className="" value="deposit">Deposit</TabsTrigger>
            <TabsTrigger className="" value="withdrawal">Withdrawal</TabsTrigger>
          </TabsList>

          {(["deposit", "withdrawal"] as const).map((type) => (
            <TabsContent className="" key={type} value={type}>
              <Formik<FormValues>
                initialValues={{ amount: "", title: "", description: "" }}
                validationSchema={transactionSchema}
                onSubmit={async (values, { setSubmitting, resetForm }) => {
                  try {
                    await createTransaction(budget_id, {
                      amount: Number(values.amount),
                      transaction_type: type,
                      title: values.title || undefined,
                      description: values.description || undefined,
                    });
                    refreshBudget?.();
                    resetForm();
                    setOpen(false);
                    toast.success("Transaction Has Been Made Successfully")
                  } catch (err) {
                    console.error("Transaction failed", err);
                    toast.error("Transaction Has Failed")
                  } finally {
                    setSubmitting(false);
                  }
                }}
              >
                {({ isSubmitting, submitForm }) => (
                  <Form className="flex flex-col gap-4 mt-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="amount" className="block text-sm font-medium">Amount</label>
                      <Field
                        name="amount"
                        type="number"
                        className="w-full border rounded p-2 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                      <ErrorMessage name="amount" component="p" className="text-red-500 text-sm" />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="title" className="block text-sm font-medium">Title (optional)</label>
                      <Field
                        name="title"
                        type="text"
                        className="w-full border rounded p-2"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="description" className="block text-sm font-medium">Description (optional)</label>
                      <Field
                        name="description"
                        as="textarea"
                        className="w-full border rounded p-2"
                      />
                    </div>

                    <Button
                      variant="default"
                      size="default"
                      type="button"
                      onClick={submitForm}
                      disabled={isSubmitting}
                      className="mt-4"
                    >
                      {isSubmitting ? "Processing..." : `Submit ${type}`}
                    </Button>
                  </Form>
                )}
              </Formik>
            </TabsContent>
          ))}
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
