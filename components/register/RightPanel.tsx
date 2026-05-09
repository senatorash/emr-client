import { motion } from "framer-motion";

const RightPanel = () => {
  return (
    <div className="gradient-hero relative hidden flex-1 overflow-hidden lg:flex">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0djItSDI0di0yaDEyek0zNiAzMHYySDI0di0yaDEyek0zNiAyNnYySDI0di0yaDEyeiIvPjwvZz48L2c+PC9zdmc+')] opacity-30" />
      <div className="relative z-10 flex flex-col justify-center p-12 text-primary-foreground">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="font-display mb-4 text-4xl font-bold dark:text-secondary-foreground/90">
            Join 500+ Hospitals
            <br />
            Already on MediCare
          </h2>
          <p className="mb-8 max-w-md text-lg text-primary-foreground/80 dark:text-secondary-foreground/90">
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
                <div className="h-2 w-2 rounded-full bg-primary-foreground dark:bg-secondary-foreground/90" />
                <span className="text-primary-foreground/90 dark:text-secondary-foreground/90">
                  {item}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
      <div className="absolute right-0 bottom-0 h-96 w-96 -translate-x-1/2 translate-y-1/2 rounded-full bg-primary-foreground/5" />
      <div className="absolute top-20 right-20 h-32 w-32 rounded-full bg-primary-foreground/5" />
    </div>
  );
};
export default RightPanel;
