import { motion } from "framer-motion";
const HeroSection = () => {
  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            Features
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
            Powerful Features for Modern Healthcare
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to manage your healthcare facility efficiently
            and deliver exceptional patient care.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
