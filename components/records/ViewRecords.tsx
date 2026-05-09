import {
  Dialog, DialogContent, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { User, Calendar, Stethoscope, Heart, Thermometer, Weight, Activity, Wind, Users, Paperclip } from 'lucide-react';
import { type MedicalRecord, typeLabels, attachmentCategoryLabels } from '@/types/records';

const statusColors = {
  complete: 'bg-success/10 text-success border-success/20',
  pending: 'bg-warning/10 text-warning border-warning/20',
  reviewed: 'bg-primary/10 text-primary border-primary/20',
};

interface ViewRecordDialogProps {
  record: MedicalRecord | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewRecordDialog({ record, open, onOpenChange }: ViewRecordDialogProps) {
  if (!record) return null;

  const vitals = record.vitals;
  const hasVitals = vitals && Object.values(vitals).some(v => v !== undefined && v !== '');

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">{typeLabels[record.type]}</DialogTitle>
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
              <span>Patient: <span className="font-medium text-foreground">{record.patientName}</span></span>
            </div>
            {record.personId !== record.patientId && (
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>For: <span className="font-medium text-foreground">{record.personName}</span></span>
              </div>
            )}
            <div className="flex items-center gap-2 text-muted-foreground">
              <Stethoscope className="h-4 w-4" />
              <span>Created by: {record.createdBy}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{new Date(record.date).toLocaleDateString()}</span>
            </div>
          </div>

          <Separator />

          {/* Complaints */}
          <div>
            <h4 className="text-sm font-semibold mb-1">Complaints</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{record.complaints}</p>
          </div>

          {/* Diagnosis */}
          <div>
            <h4 className="text-sm font-semibold mb-1">Diagnosis</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{record.diagnosis}</p>
          </div>

          {/* Treatment */}
          <div>
            <h4 className="text-sm font-semibold mb-1">Treatment</h4>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap">{record.treatment}</p>
          </div>

          {/* Vitals */}
          {hasVitals && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-3">Vital Signs</h4>
                <div className="grid grid-cols-2 gap-3">
                  {vitals.bloodPressure && <VitalItem icon={Heart} label="Blood Pressure" value={`${vitals.bloodPressure} mmHg`} />}
                  {vitals.heartRate && <VitalItem icon={Activity} label="Heart Rate" value={`${vitals.heartRate} bpm`} />}
                  {vitals.temperature && <VitalItem icon={Thermometer} label="Temperature" value={`${vitals.temperature} °C`} />}
                  {vitals.weight && <VitalItem icon={Weight} label="Weight" value={`${vitals.weight} kg`} />}
                  {vitals.height && <VitalItem icon={Weight} label="Height" value={`${vitals.height} cm`} />}
                  {vitals.oxygenSaturation && <VitalItem icon={Wind} label="SpO₂" value={`${vitals.oxygenSaturation}%`} />}
                </div>
              </div>
            </>
          )}

          {/* Attachments */}
          {record.attachments && record.attachments.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className="text-sm font-semibold mb-2">Attachments</h4>
                <div className="space-y-2">
                  {record.attachments.map((att) => (
                    <div key={att.id} className="text-sm flex items-start gap-2 p-2.5 rounded-lg bg-muted/50">
                      <Paperclip className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{att.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {attachmentCategoryLabels[att.category]} · Uploaded by {att.uploadedBy} · {new Date(att.uploadedAt).toLocaleDateString()}
                        </p>
                        {att.notes && <p className="text-xs text-muted-foreground mt-1 italic">{att.notes}</p>}
                      </div>
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

function VitalItem({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50">
      <Icon className="h-4 w-4 text-primary" />
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
}
