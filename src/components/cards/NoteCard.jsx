import { denominationImages } from "../../constants/denominationImages";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";

import UpdateDenominationDialog from "../dialogs/UpdateDenominationDialog";
import DeleteDenominationDialog from "../dialogs/DeleteDenominationDialog";

const NoteCard = ({
  note: { budget_id, id, denomination, quantity, title, description }, 
  isEditMode, 
  refreshBudget
}) => {
  return (
    <Card className="w-full max-w-[600px] mx-auto my-4 shadow-md">
      <CardHeader className="flex flex-col sm:flex-row items-center gap-4">
        <div className="w-full sm:w-1/2 h-auto flex items-center justify-center rounded-md">
          <img
            src={denominationImages[denomination]}
            alt={title || `Note ${Number(denomination).toLocaleString()}`}
            className="rounded-md object-cover max-h-[150px] w-auto"
          />
        </div>

        <div className="flex flex-col text-center sm:text-left">
          <CardTitle className="text-base font-bold">
            {title || `IQD ${Number(denomination).toLocaleString()} Note`}
          </CardTitle>
          <CardDescription className="text-sm">
            IQD Currency Note
          </CardDescription>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="font-medium">Denomination Value</span>
          <span className="font-semibold">
            IQD {Number(denomination).toLocaleString()}
          </span>
        </div>
        <Separator />

        <div className="flex justify-between">
          <span className="font-medium">Quantity</span>
          <span className="font-semibold">
            {Number(quantity).toLocaleString()}
          </span>
        </div>
        <Separator />

        <div className="flex justify-between">
          <span className="font-medium">Total</span>
          <span className="font-semibold">
            {`IQD ${Number(denomination * quantity).toLocaleString()}`}
          </span>
        </div>
        <Separator />

        {description && (
          <>
            <p className="text-sm text-muted-foreground">{description}</p>
            <Separator />
          </>
        )}

        {isEditMode && (
          <div className="flex flex-row justify-end gap-2">
            <UpdateDenominationDialog
              budget_id={budget_id}
              note_id={id}
              denomination={denomination}
              quantity={quantity}
              title={title}
              description={description}
              refreshBudget={refreshBudget}
            />
            <DeleteDenominationDialog 
              budget_id={budget_id} 
              note_id={id} 
              refreshBudget={refreshBudget} 
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NoteCard;