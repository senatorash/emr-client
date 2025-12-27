import {
  LuShield,
  LuUsers,
  LuFileText,
  LuActivity,
  LuClock,
  LuLock,
  LuChevronRight,
  LuHeart,
  LuStethoscope,
  LuClipboardList,
} from "react-icons/lu";

export const homeFeatures = [
  {
    icon: LuUsers,
    title: "Patient Management",
    description:
      "Efficiently manage patient records, history, and demographics in one centralized system.",
  },
  {
    icon: LuFileText,
    title: "Digital Records",
    description:
      "Paperless medical records with easy search, access, and secure storage capabilities.",
  },
  {
    icon: LuShield,
    title: "Role-Based Access",
    description:
      "Secure access control for super admins, doctors, and nurses with appropriate permissions.",
  },
  {
    icon: LuActivity,
    title: "Real-time Tracking",
    description:
      "Monitor patient vitals, appointments, and medical activities in real-time.",
  },
  {
    icon: LuClock,
    title: "24/7 Availability",
    description:
      "Access patient information anytime, anywhere with our cloud-based system.",
  },
  {
    icon: LuLock,
    title: "Data Security",
    description:
      "HIPAA-compliant security measures to protect sensitive patient information.",
  },
];

export const homeStats = [
  { value: "99.9%", label: "Uptime" },
  { value: "50K+", label: "Records Managed" },
  { value: "500+", label: "Healthcare Staff" },
  { value: "24/7", label: "Support" },
];
