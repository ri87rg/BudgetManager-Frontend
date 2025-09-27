import { useEffect, useState } from "react";
import { listNotesHistory, NoteHistory, Paged } from "@/services/api";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { History } from "lucide-react";
import NoteHistoryCard from "../cards/NoteHistoryCard";

type Props = {
  budget_id: string;
  updateTrigger: boolean;
};

type SortOption = "timestamp" | "value";
type OrderOption = "asc" | "desc";

export default function NotesHistoryDialog({ budget_id, updateTrigger }: Props) {
  const [history, setHistory] = useState<NoteHistory[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [sortBy, setSortBy] = useState<SortOption>("timestamp");
  const [order, setOrder] = useState<OrderOption>("desc");
  const [loading, setLoading] = useState(false);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const res: Paged<NoteHistory> = await listNotesHistory(
        budget_id,
        page,
        limit,
        sortBy,
        order
      );
      setHistory(res.data);
      setTotalPages(res.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch history:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!budget_id) return;
    fetchHistory();
  }, [budget_id, page, sortBy, order,  updateTrigger]);

  const handleSortChange = (value: string) => {
    const [field, ord] = value.split("_");
    setSortBy(field as SortOption);
    setOrder(ord as OrderOption);
    setPage(1);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <History />
          Notes History
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl rounded-2xl">
        <DialogHeader className="">
          <DialogTitle className="">Notes History</DialogTitle>
          <DialogDescription className="">
            View all actions performed on your notes with timestamps
          </DialogDescription>
        </DialogHeader>

        <div className="flex gap-4 my-4">
          <Select
            value={`${sortBy}_${order}`}
            onValueChange={handleSortChange}
          >
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent className="">
              <SelectItem className="" value="timestamp_desc">Newest first</SelectItem>
              <SelectItem className="" value="timestamp_asc">Oldest first</SelectItem>
              <SelectItem className="" value="value_desc">Highest value</SelectItem>
              <SelectItem className="" value="value_asc">Lowest value</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <ScrollArea className="h-[250px] md:h-[450px] w-full rounded-md border p-4">
          {loading ? (
            <p className="text-muted-foreground text-center">Loading...</p>
          ) : history.length > 0 ? (
            history.map((note) => (
              <NoteHistoryCard key={note.id} note={note} />
            ))
          ) : (
            <p className="text-muted-foreground text-center py-4">
              No history available.
            </p>
          )}
        </ScrollArea>

        <div className="mt-4 flex justify-center items-center gap-2">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => setPage((p) => Math.max(p - 1, 1))}
                  className={`select-none ${page === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                />
              </PaginationItem>

              <span className="px-4 py-2 text-sm">
                Page {page} of {totalPages}
              </span>

              <PaginationItem>
                <PaginationNext
                  onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
                  className={`select-none ${page === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </DialogContent>
    </Dialog>
  );
}
