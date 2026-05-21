import Link from "next/link";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Calendar,
  Stethoscope,
  Heart,
  Thermometer,
  Weight,
  Activity,
  Wind,
  Users,
  Paperclip,
} from "lucide-react";
import {
  type Records,
  typeLabels,
  attachmentCategoryLabels,
} from "@/types/record.interface";

const statusColors = {
  complete: "bg-success/10 text-success border-success/20",
  pending: "bg-warning/10 text-warning border-warning/20",
  reviewed: "bg-primary/10 text-primary border-primary/20",
};

interface ViewRecordDialogProps {
  record: Records | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewRecordDialog({
  record,
  open,
  onOpenChange,
}: ViewRecordDialogProps) {
  if (!record) return null;

  const vitals = record.vitals;
  const hasVitals =
    vitals && Object.values(vitals).some((v) => v !== undefined && v !== "");

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[85vh] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">
              {typeLabels[record.recordType]}
            </DialogTitle>
            <Badge variant="outline" className={statusColors[record.status]}>
              {record.status}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4">
          {/* Patient & Person Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <User className="h-4 w-4" />
              <span>
                Patient:{" "}
                <span className="font-medium text-foreground">
                  {record.personId.firstName} {record.personId.lastName}
                </span>
              </span>
            </div>
            {record.personId._id !== record.patientId && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>
                  For:{" "}
                  <span className="font-medium text-foreground">
                    {record.personId.firstName} {record.personId.lastName}
                  </span>
                </span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Stethoscope className="h-4 w-4" />
              <span>
                Created by: {record.createdBy.firstName} -{" "}
                {record.createdBy.lastName}
              </span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(record.createdAt).toLocaleDateString()}</span>
            </div>
          </div>

          <Separator />

          {/* Complaints */}
          <div>
            <h4 className="mb-1 text-sm font-semibold">Complaints</h4>
            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
              {record.complaints}
            </p>
          </div>

          {/* Diagnosis */}
          <div>
            <h4 className="mb-1 text-sm font-semibold">Diagnosis</h4>
            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
              {record.diagnosis}
            </p>
          </div>

          {/* Treatment */}
          <div>
            <h4 className="mb-1 text-sm font-semibold">Treatment</h4>
            <p className="text-sm whitespace-pre-wrap text-muted-foreground">
              {record.treatments}
            </p>
          </div>

          {/* Vitals */}
          {hasVitals && (
            <>
              <Separator />
              <div>
                <h4 className="mb-3 text-sm font-semibold">Vital Signs</h4>
                <div className="grid grid-cols-2 gap-3">
                  {vitals.bloodPressure && (
                    <VitalItem
                      icon={Heart}
                      label="Blood Pressure"
                      value={`${vitals.bloodPressure} mmHg`}
                    />
                  )}
                  {vitals.pulse && (
                    <VitalItem
                      icon={Activity}
                      label="Heart Rate"
                      value={`${vitals.pulse} bpm`}
                    />
                  )}
                  {vitals.temperature && (
                    <VitalItem
                      icon={Thermometer}
                      label="Temperature"
                      value={`${vitals.temperature} °C`}
                    />
                  )}
                  {vitals.weight && (
                    <VitalItem
                      icon={Weight}
                      label="Weight"
                      value={`${vitals.weight} kg`}
                    />
                  )}
                  {vitals.height && (
                    <VitalItem
                      icon={Weight}
                      label="Height"
                      value={`${vitals.height} cm`}
                    />
                  )}
                  {vitals.oxygen && (
                    <VitalItem
                      icon={Wind}
                      label="SpO₂"
                      value={`${vitals.oxygen}%`}
                    />
                  )}
                </div>
              </div>
            </>
          )}

          {/* Attachments */}
          {record.attachments && record.attachments.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="mb-2 text-sm font-semibold">Attachments</h4>
                <div className="space-y-2">
                  {record.attachments.map((att) => (
                    <div className="flex items-center justify-center gap-2 rounded-lg bg-muted/50 p-2.5">
                      {" "}
                      <div
                        key={att._id}
                        className="flex items-start gap-2 text-sm"
                      >
                        <Paperclip className="mt-0.5 h-4 w-4 shrink-0 text-muted-foreground" />
                        <div className="min-w-0 flex-1">
                          <p className="truncate font-medium">{att.fileName}</p>
                          <p className="text-xs text-muted-foreground">
                            {attachmentCategoryLabels[att.category]} · Uploaded
                            by {att.uploadedBy} ·{" "}
                            {new Date(att.uploadedAt).toLocaleDateString()}
                          </p>
                          {att.notes && (
                            <p className="mt-1 text-xs text-muted-foreground italic">
                              {att.notes}
                            </p>
                          )}
                        </div>
                      </div>
                      <Link
                        href={att.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 ml-6 inline-flex items-center gap-1 text-xs text-red-500"
                      >
                        view
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function VitalItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-muted/50 p-2">
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
