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
      <section className="px-4 pt-32 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
            >
              <span className="mb-6 inline-block rounded-full bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
                Modern Healthcare Management
              </span>
              <h1 className="mb-6 text-4xl leading-tight font-bold text-foreground md:text-5xl lg:text-6xl">
                Streamline Your{" "}
                <span className="text-primary">Medical Records</span> Management
              </h1>
              <p className="mb-8 max-w-lg text-lg text-muted-foreground">
                A comprehensive Electronic Medical Record system designed for
                hospitals to efficiently manage patient data, staff
                coordination, and medical records with role-based access
                control.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/login">
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary px-8 text-sm font-medium whitespace-nowrap text-primary-foreground shadow-sm ring-offset-background transition-all duration-200 hover:bg-primary/90 hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    Start Free Trial
                    <LuChevronRight className="h-4 w-4" />
                  </button>
                </Link>
                <Link href="/features">
                  <button className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-input bg-background px-8 text-sm font-medium whitespace-nowrap ring-offset-background transition-all duration-200 hover:bg-secondary hover:text-secondary-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0">
                    Learn More
                  </button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, y: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: false }}
              className="relative"
            >
              <div className="relative rounded-3xl bg-linear-to-br from-primary/20 to-accent/20 p-8 lg:p-12">
                <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-primary/5 to-transparent" />
                <div className="relative grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                    <LuStethoscope className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-1 font-semibold text-foreground">
                      Doctor Portal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage patients & records
                    </p>
                  </div>
                  <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-lg">
                    <LuClipboardList className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-1 font-semibold text-foreground">
                      Nurse Portal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Update patient vitals
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border bg-card p-6 shadow-lg">
                    <LuShield className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-1 font-semibold text-foreground">
                      Admin Portal
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Manage staff & access
                    </p>
                  </div>
                  <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-lg">
                    <LuActivity className="mb-4 h-10 w-10 text-primary" />
                    <h3 className="mb-1 font-semibold text-foreground">
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
