import { useState } from "react";
import { LuPlus, LuPaperclip, LuX } from "react-icons/lu";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../ui/select";
import {
  Attachment,
  attachmentCategoryLabels,
  AttachmentCategory,
} from "@/types/record.interface";
import { FieldErrors } from "react-hook-form";
import {
  RecordForm,
  SingleAttachmentSchema,
} from "@/lib/schemas/record.schema";
import { fileTypeOptions } from "@/data/fileOptions";
import { SingleAttachment } from "@/lib/schemas/record.schema";

interface AttachmentFieldsProps {
  attachments: Attachment[];
  onChange: (attachments: Attachment[]) => void;
  errors: FieldErrors<RecordForm>;
}

interface AttachmentDraft {
  fileName: string;
  fileType: string;
  category: AttachmentCategory;
  notes: string;
  file: File | null;
}

const AttachmentFields = ({
  attachments,
  onChange,
  errors,
}: AttachmentFieldsProps) => {
  const [isAdding, setIsAdding] = useState(false);
  const [draft, setDraft] = useState<AttachmentDraft>({
    fileName: "",
    fileType: "application/pdf",
    category: "other" as AttachmentCategory,
    notes: "",
    file: null,
  });

  const [draftErrors, setDraftErrors] = useState<
    Partial<Record<keyof SingleAttachment, string>>
  >({});

  // function to add attachment from draft to attachments list
  const addAttachment = () => {
    // Validate the draft using Zod schema
    const result = SingleAttachmentSchema.safeParse(draft);

    if (!result.success) {
      // Convert Zod errors to a flat object
      const fieldErrors: Partial<Record<keyof SingleAttachment, string>> = {};
      result.error.issues.forEach((err) => {
        const field = err.path[0] as keyof SingleAttachment;
        fieldErrors[field] = err.message;
      });
      setDraftErrors(fieldErrors);
      return;
    }

    setDraftErrors({});

    if (!draft.fileName.trim()) return;

    const newAttachment: Attachment = {
      id: crypto.randomUUID(),
      fileName: draft.fileName.trim(),
      fileType: draft.fileType,
      category: draft.category,
      notes: draft.notes.trim(),
      file: draft.file!,
    };
    onChange([...attachments, newAttachment]);
    setDraft({
      fileName: "",
      fileType: "application/pdf",
      category: "other",
      notes: "",
      file: null,
    });
    setIsAdding(false);
  };

  // function to remove attachment by id
  const removeAttachment = (id: string) => {
    onChange(attachments.filter((a) => a.id !== id));
  };

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

      {/* Attachment list  */}
      {attachments.length > 0 && (
        <div className="space-y-2">
          {attachments.map((att) => {
            return (
              <div
                key={att.id}
                className="flex items-center gap-2 rounded-lg bg-muted/50 p-2 text-sm"
              >
                <LuPaperclip className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{att.fileName}</p>
                  <p className="text-xs text-muted-foreground">
                    {
                      attachmentCategoryLabels[
                        att.category as AttachmentCategory
                      ]
                    }{" "}
                    ·{" "}
                    {fileTypeOptions.find((f) => f.value === att.fileType)
                      ?.label ?? att.fileType}
                  </p>
                </div>
                <button
                  type="button"
                  className="inline-flex h-6 w-6 shrink-0 items-center justify-center gap-2 rounded-lg text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
                  onClick={() => removeAttachment(att.id)}
                >
                  <LuX className="h-3.5 w-3.5" />
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Attachment Form */}
      {isAdding && (
        <div className="space-y-2 rounded-lg border border-border bg-muted/30 p-2">
          <div className="flex items-center gap-3 p-2">
            {/* File Upload Label */}
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
                  if (file) {
                    setDraft((prev) => ({
                      ...prev,
                      fileName: file.name,
                      fileType: file.type,
                      file: file,
                    }));
                  }
                }}
              />
            </label>

            <span className="truncate text-sm text-gray-500">
              {draft.fileName}
            </span>
          </div>

          <div className="mt-2 grid grid-cols-2 gap-3">
            {/* Category Select */}
            <div>
              <Select
                value={draft.category}
                onValueChange={(v) =>
                  setDraft((d) => ({ ...d, category: v as AttachmentCategory }))
                }
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(attachmentCategoryLabels).map(
                    ([val, label]) => (
                      <SelectItem key={val} value={val}>
                        {label}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* File Type Select */}
            <div>
              <Select
                value={draft.fileType}
                onValueChange={(v) => {
                  setDraft((d) => ({ ...d, fileType: v }));
                }}
              >
                <SelectTrigger className="text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {fileTypeOptions.map((f) => (
                    <SelectItem key={f.value} value={f.value}>
                      {f.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {draftErrors.fileType && (
                <p className="text-xs font-[10px] text-red-600">
                  {draftErrors.fileType}
                </p>
              )}
            </div>
          </div>

          {/* notes input */}
          <input
            value={draft.notes}
            placeholder="Notes (optional)"
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            onChange={(e) => setDraft((d) => ({ ...d, notes: e.target.value }))}
          />

          {/* attachments buttons */}
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
              onClick={addAttachment}
              disabled={!draft.fileName.trim()}
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
