import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Stethoscope,
  Building2,
  Mail,
  Lock,
  User,
  Phone,
  MapPin,
  Eye,
  EyeOff,
  Loader2,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { de } from "zod/v4/locales";

const steps = ["Hospital Info", "Admin Account", "Review"];

const Register = () => {
  const [searchParams] = useSearchParams();
  const plan = searchParams.get("plan") || "free";
  const navigate = useNavigate();
  const { toast } = useToast();

  const [step, setStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [form, setForm] = useState({
    hospitalName: "",
    hospitalType: "",
    address: "",
    city: "",
    country: "",
    phone: "",
    adminName: "",
    adminEmail: "",
    adminPassword: "",
  });

  const update = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async () => {
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setIsLoading(false);
    toast({
      title: "Registration Successful!",
      description:
        "Your hospital has been registered. Check your email for verification.",
    });
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen">
      {/* Left - Form */}
      <div className="flex flex-1 items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-lg"
        >
          {/* Logo */}
          <div className="mb-8 flex items-center gap-3">
            <div className="gradient-primary flex h-12 w-12 items-center justify-center rounded-xl">
              <Stethoscope className="h-7 w-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-display text-2xl font-bold">MediCare</h1>
              <p className="text-sm text-muted-foreground">
                Register Your Hospital
              </p>
            </div>
          </div>

          {/* Steps indicator */}
          <div className="mb-8 flex items-center gap-2">
            {steps.map((label, i) => (
              <div key={label} className="flex flex-1 items-center gap-2">
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-sm font-medium ${
                    i <= step
                      ? "gradient-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                <span
                  className={`hidden text-sm sm:block ${
                    i <= step
                      ? "font-medium text-foreground"
                      : "text-muted-foreground"
                  }`}
                >
                  {label}
                </span>
                {i < steps.length - 1 && (
                  <div className="mx-1 h-px flex-1 bg-border" />
                )}
              </div>
            ))}
          </div>

          {/* Step 1: Hospital Info */}
          {step === 0 && (
            <motion.div
              key="step-0"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Hospital Name</Label>
                <div className="relative">
                  <Building2 className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="General Hospital"
                    value={form.hospitalName}
                    onChange={(e) => update("hospitalName", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Hospital Type</Label>
                <Select
                  value={form.hospitalType}
                  onValueChange={(v) => update("hospitalType", v)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="general">General Hospital</SelectItem>
                    <SelectItem value="specialty">
                      Specialty Hospital
                    </SelectItem>
                    <SelectItem value="clinic">Clinic</SelectItem>
                    <SelectItem value="teaching">Teaching Hospital</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>City</Label>
                  <div className="relative">
                    <MapPin className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => update("city", e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Country</Label>
                  <Input
                    placeholder="Country"
                    value={form.country}
                    onChange={(e) => update("country", e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Phone</Label>
                <div className="relative">
                  <Phone className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <Button
                className="mt-4 w-full"
                size="lg"
                onClick={() => setStep(1)}
              >
                Continue <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </motion.div>
          )}

          {/* Step 2: Admin Account */}
          {step === 1 && (
            <motion.div
              key="step-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              <div className="space-y-2">
                <Label>Admin Full Name</Label>
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Dr. Jane Smith"
                    value={form.adminName}
                    onChange={(e) => update("adminName", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Admin Email</Label>
                <div className="relative">
                  <Mail className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="admin@hospital.com"
                    value={form.adminEmail}
                    onChange={(e) => update("adminEmail", e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label>Password</Label>
                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type={showPassword ? "text" : "password"}
                    placeholder="Create a strong password"
                    value={form.adminPassword}
                    onChange={(e) => update("adminPassword", e.target.value)}
                    className="pr-10 pl-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="mt-4 flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  size="lg"
                  onClick={() => setStep(0)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button className="flex-1" size="lg" onClick={() => setStep(2)}>
                  Continue <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Review */}
          {step === 2 && (
            <motion.div
              key="step-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-6"
            >
              <div className="space-y-3 rounded-xl border border-border bg-secondary/50 p-5">
                <h3 className="font-semibold text-foreground">
                  Hospital Details
                </h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground">
                    {form.hospitalName || "—"}
                  </span>
                  <span className="text-muted-foreground">Type</span>
                  <span className="text-foreground capitalize">
                    {form.hospitalType || "—"}
                  </span>
                  <span className="text-muted-foreground">Location</span>
                  <span className="text-foreground">
                    {form.city && form.country
                      ? `${form.city}, ${form.country}`
                      : "—"}
                  </span>
                  <span className="text-muted-foreground">Phone</span>
                  <span className="text-foreground">{form.phone || "—"}</span>
                </div>
              </div>

              <div className="space-y-3 rounded-xl border border-border bg-secondary/50 p-5">
                <h3 className="font-semibold text-foreground">Admin Account</h3>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <span className="text-muted-foreground">Name</span>
                  <span className="text-foreground">
                    {form.adminName || "—"}
                  </span>
                  <span className="text-muted-foreground">Email</span>
                  <span className="text-foreground">
                    {form.adminEmail || "—"}
                  </span>
                </div>
              </div>

              <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                <p className="text-sm text-foreground">
                  <strong>Plan:</strong>{" "}
                  {plan === "free"
                    ? "Free Trial (14 days)"
                    : plan === "pro"
                      ? "Pro ($49/mo)"
                      : "Enterprise"}
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  size="lg"
                  onClick={() => setStep(1)}
                >
                  <ChevronLeft className="mr-2 h-4 w-4" /> Back
                </Button>
                <Button
                  className="flex-1"
                  size="lg"
                  onClick={handleSubmit}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Creating...
                    </>
                  ) : (
                    "Register Hospital"
                  )}
                </Button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Right Panel */}
      <div className="gradient-hero relative hidden flex-1 overflow-hidden lg:flex">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
        <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-display mb-4 text-4xl font-bold">
              Join 500+ Hospitals
              <br />
              Already on MediCare
            </h2>
            <p className="mb-8 max-w-md text-lg text-primary-foreground/80">
              Register your hospital in minutes and start managing patient
              records, staff, and appointments with ease.
            </p>
            <div className="space-y-4">
              {[
                "Set up in under 5 minutes",
                "14-day free trial, no credit card",
                "Migrate existing records easily",
                "HIPAA compliant from day one",
              ].map((item, i) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: 0.4 + i * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  <span className="text-primary-foreground/90">{item}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute right-0 bottom-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-foreground/5" />
        <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-primary-foreground/5" />
      </div>
    </div>
  );
};

export default Register;
