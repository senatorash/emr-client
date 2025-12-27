import Link from "next/link";
import { LuChevronRight } from "react-icons/lu";
const CtaSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-primary to-primary/80">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
          Ready to Transform Your Healthcare Management?
        </h2>
        <p className="text-lg text-primary-foreground/80 mb-8">
          Join hundreds of healthcare facilities already using MediCare EMR to
          improve patient care and streamline operations.
        </p>
        <Link href="/login">
          <button className="inline-flex items-center justify-center whitespace-nowrap  font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground hover:bg-secondary/80 active:scale-[0.98] h-11 rounded-lg px-8 text-base gap-2">
            Get Started Today
            <LuChevronRight className="w-4 h-4" />
          </button>
        </Link>
      </div>
    </section>
  );
};
export default CtaSection;
