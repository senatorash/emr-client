import { motion } from "framer-motion";
const RightPanel = () => {
  return (
    <div className="hidden lg:flex flex-1 gradient-hero relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />

      <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="dark:text-secondary-foreground/90 font-display text-4xl font-bold mb-4">
            Streamline Your
            <br />
            Healthcare Management
          </h2>
          <p className="text-lg text-primary-foreground/80 dark:text-secondary-foreground/80 mb-8 max-w-md">
            Access patient records, manage staff, and track medical history all
            in one secure platform.
          </p>

          <div className="space-y-4">
            {[
              "Comprehensive patient records management",
              "Role-based access control",
              "Real-time staff coordination",
              "Secure & HIPAA compliant",
            ].map((feature, index) => (
              <motion.div
                key={feature}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                className="flex items-center gap-3"
              >
                <div className="h-2 w-2 rounded-full bg-primary-foreground dark:bg-secondary-foreground/90" />
                <span className="text-primary-foreground/90 dark:text-secondary-foreground/90">
                  {feature}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary-foreground/5 rounded-full -translate-x-1/2 translate-y-1/2" />
        <div className="absolute top-20 right-20 w-32 h-32 bg-primary-foreground/5 rounded-full" />
      </div>
    </div>
  );
};
export default RightPanel;
