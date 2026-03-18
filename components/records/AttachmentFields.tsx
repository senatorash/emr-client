import { useState } from "react";
import { LuPlus, LuX } from "react-icons/lu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";

interface AttachmentFieldsProps {
  fileName: string;
  setFileName: React.Dispatch<React.SetStateAction<string>>;
}

const AttachmentFields = ({ fileName, setFileName }: AttachmentFieldsProps) => {
  const [isAdding, setIsAdding] = useState(false);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label
          className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          htmlFor="bloodType"
        >
          Attachments
        </label>
        {!isAdding && (
          <button
            type="button"
            className="inline-flex h-9 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
            onClick={() => setIsAdding(true)}
          >
            <LuPlus className="mr-1 h-3.5 w-3.5" /> Add
          </button>
        )}
      </div>
      {isAdding && (
        <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-2">
          <div className="flex items-center gap-3 p-2">
            <label
              className="block cursor-pointer rounded-md bg-primary px-4 py-2 text-sm leading-none font-medium text-accent-foreground peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              htmlFor="fileUpload"
            >
              Choose File
              <input
                className="hidden"
                id="fileUpload"
                type="file"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  setFileName(file ? file.name : "No file chosen");
                }}
              />
            </label>

            <span className="text-sm text-gray-500">{fileName}</span>
          </div>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <Select>
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "Lab Result",
                  "Imaging",
                  "Prescription",
                  "Clinical Document",
                  "Administrative Document",
                  "Other",
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select>
              <SelectTrigger className="text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {[
                  "PDF",
                  "PNG IMAGE",
                  "JPEG IMAGE",
                  "DICOM",
                  "Text File",
                  "Word Document",
                  "Other",
                ].map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <input
            placeholder="Notes (optional)"
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background p-2 px-4 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              onClick={() => setIsAdding(false)}
            >
              Cancel
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary p-2 px-4 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm ring-offset-background transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
              disabled
            >
              Add Attachment
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AttachmentFields;
