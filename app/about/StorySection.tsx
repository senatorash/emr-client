import { motion } from "framer-motion";
import { LuAward, LuGlobe, LuHeart, LuUsers } from "react-icons/lu";
const StorySection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary/5">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <h2 className="text-3xl font-bold text-foreground mb-6">
              Our Story
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                MediCare EMR was born from a simple observation: healthcare
                professionals were spending too much time on paperwork and not
                enough time with patients.
              </p>
              <p>
                Founded in 2020 by a team of doctors and engineers, we set out
                to create an electronic medical record system that truly
                understands the needs of modern healthcare facilities.
              </p>
              <p>
                Today, we serve hundreds of hospitals and clinics, helping them
                deliver better patient care through streamlined operations and
                secure data management.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 gap-4"
          >
            <div className="bg-card rounded-2xl p-6 border border-border">
              <LuGlobe className="w-10 h-10 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-1">50+</div>
              <div className="text-muted-foreground">Countries Served</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border mt-8">
              <LuUsers className="w-10 h-10 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-1">
                500+
              </div>
              <div className="text-muted-foreground">Healthcare Facilities</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border">
              <LuAward className="w-10 h-10 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-1">15+</div>
              <div className="text-muted-foreground">Industry Awards</div>
            </div>
            <div className="bg-card rounded-2xl p-6 border border-border mt-8">
              <LuHeart className="w-10 h-10 text-primary mb-4" />
              <div className="text-3xl font-bold text-foreground mb-1">1M+</div>
              <div className="text-muted-foreground">Patients Helped</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default StorySection;
