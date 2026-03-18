import { useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../ui/select";
import { DialogContent, DialogDescription, DialogTitle } from "../ui/dialog";
import { Textarea } from "../ui/textarea";

import AttachmentFields from "./AttachmentFields";
import VitalSigns from "./VitalSigns";

const RecordFormFields = ({
  addingRecord,
  setAddingRecord,
}: {
  addingRecord: boolean;
  setAddingRecord: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [vitalsOpen, setVitalsOpen] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");

  return (
    <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
      <div className="flex flex-col space-y-1.5 text-center sm:text-left">
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogDescription>
          Enter the patient's information to create a new record.
        </DialogDescription>
      </div>
      <div className="grid grid-cols-1 gap-4 py-4">
        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="firstName"
          >
            Patient
          </label>
          <input
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="firstName"
            placeholder="John"
          />
        </div>
        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="lastName"
          >
            Record For
          </label>
          <input
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="lastName"
            placeholder="Smith"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="dob"
          >
            Record Type
          </label>
          <input
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="dob"
            type="date"
          />
        </div>
        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="gender"
          >
            Status
          </label>
          {/* <Controller
                name="gender"
                control={control}
                render={({ field }) => ( */}
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="male">Male</SelectItem>
              <SelectItem value="female">Female</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          {/* /> */}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="phone"
          >
            Complaints
          </label>

          <Textarea placeholder="Patient's complaints..." rows={2} />
        </div>
        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="email"
          >
            Diagnosis
          </label>
          <Textarea placeholder="Clinical diagnosis..." rows={2} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div className="space-y-2">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="nin"
          >
            Treatment
          </label>
          <Textarea
            placeholder="Treatment plan and prescriptions..."
            rows={2}
          />
        </div>
        <VitalSigns vitalsOpen={vitalsOpen} setVitalsOpen={setVitalsOpen} />
        <AttachmentFields fileName={fileName} setFileName={setFileName} />
      </div>
      <div className="flex justify-end gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background p-2 px-4 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          onClick={() => setAddingRecord(false)}
        >
          Cancel
        </button>
        <button
          // onClick={handleSubmit(handleAddPatient)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary p-2 px-4 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm ring-offset-background transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          Add Patient
        </button>
      </div>
    </DialogContent>
  );
};

export default RecordFormFields;
