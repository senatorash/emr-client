import { motion } from "framer-motion";
import Link from "next/link";
import {
  LuShield,
  LuActivity,
  LuChevronRight,
  LuStethoscope,
  LuClipboardList,
} from "react-icons/lu";
const HeroSection = () => {
  return (
    <div className="min-h-screen bg-background">
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Modern Healthcare Management
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
                Streamline Your{" "}
                <span className="text-primary">Medical Records</span> Management
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                A comprehensive Electronic Medical Record system designed for
                hospitals to efficiently manage patient data, staff
                coordination, and medical records with role-based access
                control.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md active:scale-[0.98] h-11 px-8 ">
                    Start Free Trial
                    <LuChevronRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link href="/features">
                  <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-secondary hover:text-secondary-foreground active:scale-[0.98] h-11 px-8">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className="relative"
            >
              <div className="relative bg-linear-to-br from-primary/20 to-accent/20 rounded-3xl p-8 lg:p-12">
                <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-transparent rounded-3xl" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                    <LuStethoscope className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">
                      Doctor Portal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage patients & records
                    </p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mt-8">
                    <LuClipboardList className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">
                      Nurse Portal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Update patient vitals
                    </p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                    <LuShield className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">
                      Admin Portal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage staff & access
                    </p>
                  </div>
                  <div className="bg-card rounded-2xl p-6 shadow-lg border border-border mt-8">
                    <LuActivity className="w-10 h-10 text-primary mb-4" />
                    <h3 className="font-semibold text-foreground mb-1">
                      Live Dashboard
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Real-time analytics
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
