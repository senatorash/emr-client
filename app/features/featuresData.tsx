import {
  LuUsers,
  LuFileText,
  LuShield,
  LuActivity,
  LuClock,
  LuDatabase,
  LuBell,
  LuChartBar,
  LuSmartphone,
  LuCloud,
  LuLock,
} from "react-icons/lu";
export const mainFeatures = [
  {
    icon: LuUsers,
    title: "Patient Management",
    description:
      "Complete patient lifecycle management from registration to discharge.",
    features: [
      "Comprehensive patient profiles",
      "Medical history tracking",
      "Appointment scheduling",
      "Insurance information management",
    ],
  },
  {
    icon: LuFileText,
    title: "Medical Records",
    description: "Digitize and organize all medical documentation securely.",
    features: [
      "Electronic health records",
      "Lab results integration",
      "Prescription management",
      "Document scanning & storage",
    ],
  },
  {
    icon: LuShield,
    title: "Access Control",
    description: "Role-based permissions for secure data management.",
    features: [
      "Super admin controls",
      "Doctor & nurse portals",
      "Audit logging",
      "Permission customization",
    ],
  },
];

export const additionalFeatures = [
  {
    icon: LuActivity,
    title: "Real-time Monitoring",
    description: "Track patient vitals and status",
  },
  {
    icon: LuClock,
    title: "Scheduling",
    description: "Appointment & shift management",
  },
  {
    icon: LuDatabase,
    title: "Data Analytics",
    description: "Insights & reporting tools",
  },
  { icon: LuBell, title: "Notifications", description: "Alerts & reminders" },
  {
    icon: LuChartBar,
    title: "Reports",
    description: "Custom report generation",
  },
  {
    icon: LuSmartphone,
    title: "Mobile Access",
    description: "Access from any device",
  },
  { icon: LuCloud, title: "Cloud Storage", description: "Secure cloud backup" },
  {
    icon: LuLock,
    title: "HIPAA Compliant",
    description: "Full regulatory compliance",
  },
];
