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
import { useCreateRecordMutation } from "@/lib/features/apis/RecordApi";
import { useForm, Controller } from "react-hook-form";
import { RecordForm, RecordSchema } from "@/lib/schemas/record.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Attachment } from "@/types/record.interface";
import { toast } from "sonner";

const RecordFormFields = ({
  addingRecord,
  setAddingRecord,
}: {
  addingRecord: boolean;
  setAddingRecord: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [vitalsOpen, setVitalsOpen] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RecordForm>({
    resolver: zodResolver(RecordSchema),
    mode: "onChange",
  });

  const [createRecord] = useCreateRecordMutation();

  const handleAddRecord = async (values: RecordForm) => {
    setAddingRecord(false);
    try {
      const formData = new FormData();

      // text fields
      formData.append("patientId", values.patientId);
      formData.append("personId", values.personId);
      formData.append("personModel", values.personModel);
      formData.append("recordType", values.recordType);
      formData.append("complaints", values.complaints);
      formData.append("diagnosis", values.diagnosis);
      formData.append("treatment", values.treatments);

      // vitals (object → stringify)
      formData.append("vitals", JSON.stringify(values.vitals || {}));

      // files
      values.attachments?.forEach((att) => {
        formData.append("attachments", att.file);
      });
      formData.append("metadata", JSON.stringify(values.attachments));

      const result = await createRecord(formData);

      if (result.data?.success) {
        toast.success(result.data.message);
        reset();
      } else {
        const errorMessage =
          (result.error &&
            "data" in result.error &&
            (result.error.data as any)?.message) ||
          "Failed to add patient";
        toast.error(errorMessage);
      }
    } catch (error) {
      toast.error("An unexpected error occurred.");
    }
  };

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
            htmlFor="patientId"
          >
            Patient
          </label>
          <input
            {...register("patientId")}
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="firstName"
            placeholder="John"
          />
          {errors.patientId && (
            <p className="text-xs text-red-600">{errors.patientId.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="recordFor"
          >
            Record For
          </label>
          <input
            {...register("personId")}
            className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-muted-foreground/50 focus-visible:border-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
            id="recordFor"
            placeholder="Smith"
          />
          {errors.personId && (
            <p className="text-xs text-red-600">{errors.personId.message}</p>
          )}
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="personModel"
          >
            Person Model
          </label>
          <Controller
            name="personModel"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select person model" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Patient">Patient</SelectItem>
                  <SelectItem value="FamilyMember">Family Member</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.personModel && (
            <p className="text-xs text-red-600">{errors.personModel.message}</p>
          )}
        </div>

        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="recordType"
          >
            Record Type
          </label>
          <Controller
            name="recordType"
            control={control}
            render={({ field }) => (
              <Select value={field.value} onValueChange={field.onChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select record type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="consultation">Consultation</SelectItem>
                  <SelectItem value="lab_result">Lab Result</SelectItem>
                  <SelectItem value="imaging">Imaging</SelectItem>
                  <SelectItem value="prescription">Prescription</SelectItem>
                  <SelectItem value="notes">Notes</SelectItem>
                  <SelectItem value="procedure">Procedure</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            )}
          />
          {errors.recordType && (
            <p className="text-xs text-red-600">{errors.recordType.message}</p>
          )}
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

          <Textarea
            {...register("complaints")}
            placeholder="Patient's complaints..."
            rows={2}
          />
          {errors.complaints && (
            <p className="text-xs text-red-600">{errors.complaints.message}</p>
          )}
        </div>
        <div className="space-y-3">
          <label
            className="block text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            htmlFor="email"
          >
            Diagnosis
          </label>
          <Textarea
            {...register("diagnosis")}
            placeholder="Clinical diagnosis..."
            rows={2}
          />
          {errors.diagnosis && (
            <p className="text-xs text-red-600">{errors.diagnosis.message}</p>
          )}
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
            {...register("treatments")}
            placeholder="Treatment plan and prescriptions..."
            rows={2}
          />
          {errors.treatments && (
            <p className="text-xs text-red-600">{errors.treatments.message}</p>
          )}
        </div>
        <VitalSigns
          vitalsOpen={vitalsOpen}
          setVitalsOpen={setVitalsOpen}
          register={register}
          errors={errors}
        />
        <Controller
          name="attachments"
          control={control}
          render={({ field }) => (
            <AttachmentFields
              attachments={(field.value as Attachment[]) || []}
              onChange={field.onChange}
              errors={errors}
            />
          )}
        />
      </div>
      <div className="flex justify-end gap-3">
        <button
          className="inline-flex items-center justify-center gap-2 rounded-lg border border-input bg-background p-2 px-4 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
          onClick={() => setAddingRecord(false)}
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit(handleAddRecord)}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary p-2 px-4 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm ring-offset-background transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0"
        >
          Add Record
        </button>
      </div>
    </DialogContent>
  );
};

export default RecordFormFields;
