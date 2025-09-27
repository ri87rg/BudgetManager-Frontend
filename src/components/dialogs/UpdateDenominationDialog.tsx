import { useState } from "react";
import { updateNote } from "../../services/api";
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
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Pencil } from "lucide-react";

interface Props {
  budget_id: string;
  note_id: string;
  denomination: number;
  quantity: number;
  title?: string;
  description?: string;
  refreshBudget: () => void;
}

interface FormValues {
  quantity: number | string;
  title: string;
  description: string;
}

const validationSchema = Yup.object().shape({
  quantity: Yup.number()
    .min(1, "Quantity must be at least 1")
    .required("Quantity is required"),
  title: Yup.string().optional(),
  description: Yup.string().optional(),
});

export default function UpdateDenominationDialog({
  budget_id,
  note_id,
  denomination,
  quantity,
  title,
  description,
  refreshBudget,
}: Props) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="default"
          variant="default"
          className="bg-blue-100 text-blue-700 hover:bg-blue-200 flex items-center gap-2"
        >
          <Pencil size={16} />
          Update
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px] rounded-2xl">
        <DialogHeader className="">
          <DialogTitle className="">Update Denomination</DialogTitle>
          <DialogDescription className="">
            You can update the quantity, title, and description of this note.
          </DialogDescription>
        </DialogHeader>

        <Formik<FormValues>
          initialValues={{
            quantity: quantity || "",
            title: title || "",
            description: description || "",
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateNote(budget_id, note_id, {
                quantity: Number(values.quantity),
                title: values.title || undefined,
                description: values.description || undefined,
              });
              refreshBudget?.();
              setOpen(false);
            } catch (err) {
              console.error("Failed to update note", err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="">Denomination</Label>
                <Input
                  className=""
                  type="text"
                  value={`IQD ${Number(denomination).toLocaleString()}`}
                  disabled
                />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="" htmlFor="quantity">Quantity</Label>
                <Field
                  as={Input}
                  type="number"
                  name="quantity"
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
                <Field as={Input} type="text" name="title" />
              </div>

              <div className="flex flex-col gap-2">
                <Label className="" htmlFor="description">Description (optional)</Label>
                <Field as={Input} type="text" name="description" />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  size="default"
                  variant="default"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Updating..." : "Save Changes"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
