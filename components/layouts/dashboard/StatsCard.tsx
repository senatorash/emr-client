// import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  //   change?: string;
  changeType?: "positive" | "negative" | "neutral";
  //   icon: LucideIcon;
  iconColor?: string;
  delay?: number;
}

const StatsCard = ({
  title,
  value,
  //   change,
  changeType = "neutral",
  //   icon: Icon,
  iconColor = "bg-primary/10 text-primary",
  delay = 0,
}: StatsCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      className="hover:shadow-card-hover rounded-xl border border-border/50 bg-card p-6 shadow-card transition-all duration-300"
    >
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="font-display text-3xl font-bold">{value}</p>
          {/* {change && (
            <p
              className={`${changeType === "positive" ? "text-success" : changeType === "negative" ? "text-destructive" : "text-muted-foreground"} text-sm font-medium`}
            >
              {change}
            </p>
          )} */}
        </div>
        <div className={`rounded-xl p-3 ${iconColor}`}>
          {/* <Icon className="h-6 w-6" /> */}
        </div>
      </div>
    </motion.div>
  );
};

export default StatsCard;
