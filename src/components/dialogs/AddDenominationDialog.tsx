import { useState } from "react";
import { createNote } from "../../services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Plus } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { toast } from "sonner";

interface FormValues {
  denomination: number | null;
  quantity: number | string;
  title: string;
  description: string;
}

const denominationOptions = [250, 500, 1000, 5000, 10000, 25000, 50000];

const validationSchema = Yup.object().shape({
  denomination: Yup.number().required("Denomination is required"),
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  title: Yup.string(),
  description: Yup.string(),
});

export default function AddDenominationDialog({ id, refreshBudget, }: { id: string; refreshBudget: () => void;}) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="default"
          variant="default"
          className="w-52 h-12 flex items-center justify-center gap-2"
        >
          <Plus />
          Add Denomination
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader className="">
          <DialogTitle className="">Add Denomination</DialogTitle>
          <DialogDescription className="">
            Fill out the form below to add a new denomination to your budget.
          </DialogDescription>
        </DialogHeader>

        <Formik<FormValues>
          initialValues={{
            denomination: null,
            quantity: "",
            title: "",
            description: "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await createNote(id, {
                title: values.title || undefined,
                description: values.description || undefined,
                denomination: Number(values.denomination),
                quantity: Number(values.quantity),
              });
              refreshBudget?.();
              setOpen(false);
              toast.success("Note Has Been Created Successfully")
            } catch (err) {
              console.error("Failed to create note", err);
              toast.error("Failed To Create Note")
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, setFieldValue, submitForm }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="" htmlFor="denomination">Denomination</Label>
                <Select
                  onValueChange={(val: string) =>
                    setFieldValue("denomination", Number(val))
                  }
                >
                  <SelectTrigger className="">
                    <SelectValue placeholder="Select denomination" />
                  </SelectTrigger>
                  <SelectContent className="">
                    {denominationOptions.map((value) => (
                      <SelectItem className="" key={value} value={value.toString()}>
                        {value.toLocaleString()} IQD
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <ErrorMessage
                  name="denomination"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="" htmlFor="quantity">Quantity</Label>
                <Field
                  as={Input}
                  type="number"
                  name="quantity"
                  placeholder="Enter quantity"
                  className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                />
                <ErrorMessage
                  name="quantity"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="" htmlFor="title">Title (optional)</Label>
                <Field
                  as={Input}
                  type="text"
                  name="title"
                  placeholder="Enter a title"
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="" htmlFor="description">Description (optional)</Label>
                <Field
                  as={Input}
                  type="text"
                  name="description"
                  placeholder="Enter description"
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
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
