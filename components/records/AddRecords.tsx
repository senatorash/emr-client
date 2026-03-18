import { Dialog, DialogTrigger } from "../ui/dialog";
import { LuPlus } from "react-icons/lu";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import RecordFormFields from "./RecordFormFields";

const AddRecords = () => {
  const [addingRecord, setAddingRecord] = useState(false);

  return (
    <Dialog open={addingRecord} onOpenChange={setAddingRecord}>
      <DialogTrigger asChild>
        <button className="gradient-primary inline-flex items-center justify-center gap-2 rounded-lg p-2 text-sm font-semibold whitespace-nowrap text-primary-foreground shadow-lg ring-offset-background transition-all duration-200 hover:shadow-xl hover:brightness-110 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
          <LuPlus className="h-4 w-4" />
          Add Record
        </button>
      </DialogTrigger>

      <RecordFormFields
        addingRecord={addingRecord}
        setAddingRecord={setAddingRecord}
      />
    </Dialog>
  );
};

export default AddRecords;
