import { motion } from "framer-motion";
import { additionalFeatures } from "./featuresData";

const AddFeatures = () => {
  return (
    <section className="bg-primary/5 px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground">
            And Much More
          </h2>
          <p className="text-lg text-muted-foreground">
            Additional features to enhance your workflow.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {additionalFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              viewport={{ once: false }}
              className="rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/50"
            >
              <feature.icon className="mb-3 h-8 w-8 text-primary" />
              <h3 className="mb-1 font-semibold text-foreground">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default AddFeatures;
