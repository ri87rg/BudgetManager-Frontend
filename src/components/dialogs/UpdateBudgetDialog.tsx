import { useState } from "react";
import { updateBudget } from "../../services/api";
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
  name: string;
  refreshBudgetsTrigger: () => void;
}

interface FormValues {
  name: string;
}

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Budget name is required"),
});

export default function UpdateBudgetDialog({
  budget_id,
  name,
  refreshBudgetsTrigger,
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
          <DialogTitle className="">Update Budget</DialogTitle>
          <DialogDescription className="">
            You can update the name of this budget.
          </DialogDescription>
        </DialogHeader>

        <Formik<FormValues>
          initialValues={{ name: name || "" }}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            try {
              await updateBudget(budget_id, { name: values.name });
              refreshBudgetsTrigger?.();
              setOpen(false);
            } catch (err) {
              console.error("Failed to update budget", err);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label className="" htmlFor="name">Budget Name</Label>
                <Field as={Input} type="text" name="name" id="name" />
                <ErrorMessage
                  name="name"
                  component="p"
                  className="text-sm text-red-500"
                />
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <DialogClose asChild>
                  <Button type="button" variant="outline">
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
