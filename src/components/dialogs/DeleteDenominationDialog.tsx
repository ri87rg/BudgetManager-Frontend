import { useState } from "react";
import { deleteNote } from "../../services/api";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
  DialogClose,
} from "../ui/dialog";
import { Button } from "../ui/button";
import { Trash } from "lucide-react";

interface Props {
  budget_id: string;
  note_id: string;
  refreshBudget: () => void;
}

export default function DeleteDenominationDialog({
  budget_id,
  note_id,
  refreshBudget,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      await deleteNote(budget_id, note_id);
      refreshBudget?.();
      setOpen(false);
    } catch (err) {
      console.error("Failed to remove note:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          size="default"
          variant="default"
          className="bg-red-100 text-red-700 hover:bg-red-200"
        >
          <Trash />
          Delete
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[420px] rounded-2xl">
        <DialogHeader className="">
          <DialogTitle className="">Are you sure?</DialogTitle>
          <DialogDescription className="">
            This note will be removed permanently and cannot be undone.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex gap-2">
          <DialogClose asChild>
            <Button size="default" variant="outline">
              Cancel
            </Button>
          </DialogClose>

          <Button
            size="default"
            variant="destructive"
            disabled={isLoading}
            onClick={handleDelete}
          >
            {isLoading ? "Removing..." : "Delete Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
