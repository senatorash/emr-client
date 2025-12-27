import Link from "next/link";

const CtaSection = () => {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-foreground mb-4">
          Join Us in Transforming Healthcare
        </h2>
        <p className="text-lg text-muted-foreground mb-8">
          Ready to experience the future of medical record management?
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link href="/login">
            {/* <Button size="lg">Get Started</Button> */}
          </Link>
          <Link href="/contact">
            {/* <Button size="lg" variant="outline">
                Contact Us
              </Button> */}
          </Link>
        </div>
      </div>
    </section>
  );
};
export default CtaSection;
