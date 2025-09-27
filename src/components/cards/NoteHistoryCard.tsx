import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { format } from "date-fns"

type NoteHistory = {
  id: string
  denomination: number
  quantity: number
  timestamp: string
  action?: string
}

type Props = {
  note: NoteHistory
}

export default function NoteHistoryCard({ note }: Props) {
  const totalValue = note.denomination * note.quantity

  return (
    <Card className="w-full rounded-2xl shadow-sm mb-4">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <CardTitle className="text-lg font-semibold">
          {note.denomination.toLocaleString()} IQD
        </CardTitle>
        <CardDescription className="">
          {note.action ? note.action : "Update"}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <div>
          <p className="text-sm text-muted-foreground">
            Quantity: <span className="font-medium">{note.quantity}</span>
          </p>
          <p className="text-sm text-muted-foreground">
            Total:{" "}
            <span
              className={`font-semibold ${
                totalValue > 0 ? "text-green-600" : totalValue < 0 ? "text-red-600" : "text-gray-500"
              }`}
            >
              {totalValue.toLocaleString()} IQD
            </span>
          </p>
        </div>

        <p className="text-xs text-muted-foreground">
          {note.timestamp ? format(new Date(note.timestamp), "PPpp") : "No date"}
        </p>
      </CardContent>
    </Card>
  )
}
