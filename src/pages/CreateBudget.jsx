import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { useFormik } from "formik"
import { createBudget } from "@/services/api.ts"
import { toast } from "sonner"
import { useBudgetStore } from "@/store/budgetStore"

import * as yup from "yup";

export const budgetSchema = yup.object({
  name: yup.string()
    .required("Budget name is required")
});

export default function CreateBudget() {
  const setBudget = useBudgetStore((state) => state.setBudget)
  const navigate = useNavigate()

  const formik = useFormik({
    initialValues: { name: "" },
    validationSchema: budgetSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const budget = await createBudget(values);
        setBudget(budget);
        toast.success("Budget Has Been Created Successfully");
        navigate(`/budget/${budget.id}`);
      } catch (err) {
        console.error("Failed to create budget", err);
        toast.error("Failed To Create Budget", {description: "Try giving it a unique name"});
      } finally {
        setSubmitting(false);
      }
    },
  })

  return (
    <div className="flex justify-center items-center min-h-[calc(100vh-85px)] p-4">
      <Card className="w-full max-w-md shadow-xl rounded-2xl">
        <CardHeader>
          <CardTitle className="text-center text-lg sm:text-xl">
            Create Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <div className="relative w-full">
              <Input
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder=" "
                className="peer h-12 px-3 pt-5 text-base rounded-xl"
              />
              <Label
                htmlFor="name"
                className="absolute left-3 top-1 text-gray-400 text-xs transition-all duration-200
                  peer-placeholder-shown:top-3 peer-placeholder-shown:text-gray-400 peer-placeholder-shown:text-base
                  peer-placeholder-shown:pt-0
                  peer-focus:top-1 peer-focus:text-xs"
              >
                Budget Name
              </Label>
            </div>

            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}

            <div className="flex justify-center">
              <Button type="submit" className="w-40" disabled={formik.isSubmitting}>
                {formik.isSubmitting ? "Creating..." : "Continue"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
