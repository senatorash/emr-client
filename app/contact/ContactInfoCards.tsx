import { motion } from "framer-motion";
import { contactInfo } from "./contactData";
import { LuClock, LuMessageSquare, LuSend } from "react-icons/lu";
const ContactInfoCards = () => {
  return (
    <section className="pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={info.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: false }}
              className="bg-card rounded-2xl p-6 border border-border text-center"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <info.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                {info.title}
              </h3>
              <p className="text-primary font-medium mb-1">{info.value}</p>
              <p className="text-sm text-muted-foreground">
                {info.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                <LuMessageSquare className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-foreground">
                  Send us a message
                </h2>
                <p className="text-muted-foreground">
                  Fill out the form and we'll be in touch
                </p>
              </div>
            </div>

            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="block space-y-2 ">
                  <label
                    className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="name"
                  >
                    Full Name
                  </label>
                  <input
                    placeholder="John Doe"
                    required
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 hover:border-muted-foreground/50 md:text-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label
                    className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="john@hospital.com"
                    className="flex h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 hover:border-muted-foreground/50 md:text-sm"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="organization"
                >
                  Organization
                </label>
                <input
                  placeholder="Hospital / Clinic Name"
                  className=" h-11 w-full rounded-lg border border-input bg-background px-4 py-2 text-base ring-offset-background transition-all duration-200 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50 hover:border-muted-foreground/50 md:text-sm"
                />
              </div>

              <div className="space-y-2">
                <label
                  className="flex text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  htmlFor="message"
                >
                  Message
                </label>
                <textarea
                  placeholder="Tell us about your needs..."
                  rows={5}
                  className="flex min-h-20 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                />
              </div>

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm hover:shadow-md active:scale-[0.98] h-11 px-8 w-full"
              >
                Send Message
                <LuSend className="w-4 h-4" />
              </button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: false }}
            className="bg-linear-to-br from-primary/10 to-accent/10 rounded-3xl p-8"
          >
            <h3 className="text-xl font-bold text-foreground mb-6">
              Frequently Asked Questions
            </h3>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  How long does implementation take?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Most facilities are up and running within 2-4 weeks, depending
                  on size and complexity. Our team provides full support
                  throughout the process.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Is my data secure?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Absolutely. We're fully HIPAA compliant with end-to-end
                  encryption, regular security audits, and 99.9% uptime
                  guarantee.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Do you offer training?
                </h4>
                <p className="text-muted-foreground text-sm">
                  Yes! We provide comprehensive training for all staff members,
                  including ongoing support and documentation.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">
                  Can I migrate existing data?
                </h4>
                <p className="text-muted-foreground text-sm">
                  We support data migration from most major EMR systems. Our
                  team will help ensure a smooth transition.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-card rounded-xl border border-border">
              <div className="flex items-center gap-3">
                <LuClock className="w-5 h-5 text-primary" />
                <div>
                  <p className="font-medium text-foreground">Response Time</p>
                  <p className="text-sm text-muted-foreground">
                    We typically respond within 24 hours
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
export default ContactInfoCards;
