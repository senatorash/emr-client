import { LuUsers, LuFileText, LuShield } from "react-icons/lu";
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
