import { motion } from "framer-motion";
import { LuCircleCheck } from "react-icons/lu";
import { mainFeatures } from "./featuresData";

const MainSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="space-y-20">
          {mainFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: false }}
              className={`grid lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-6">
                  <feature.icon className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-3xl font-bold text-foreground mb-4">
                  {feature.title}
                </h2>
                <p className="text-lg text-muted-foreground mb-6">
                  {feature.description}
                </p>
                <ul className="space-y-3">
                  {feature.features.map((item) => (
                    <li key={item} className="flex items-center gap-3">
                      <LuCircleCheck className="w-5 h-5 text-primary shrink-0" />
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div
                className={`bg-linear-to-br from-primary/10 to-accent/10 rounded-3xl p-8 ${
                  index % 2 === 1 ? "lg:order-1" : ""
                }`}
              >
                <div className="bg-card rounded-2xl p-6 border border-border shadow-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                    <span className="font-semibold text-foreground">
                      {feature.title}
                    </span>
                  </div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                        <div
                          className="h-3 bg-muted rounded flex-1"
                          style={{ width: `${100 - i * 20}%` }}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MainSection;
