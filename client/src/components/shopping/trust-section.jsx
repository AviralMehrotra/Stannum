import { ShieldCheck, Truck, RotateCcw, Headphones } from "lucide-react";

const trustItems = [
  {
    title: "100% Secure payments",
    description:
      "Your transactions are protected by industry-leading security.",
    icon: ShieldCheck,
  },
  {
    title: "Fast & Free delivery",
    description: "Free shipping on all orders over $500 with express options.",
    icon: Truck,
  },
  {
    title: "Easy returns",
    description:
      "Not satisfied? Return your product within 30 days, no questions asked.",
    icon: RotateCcw,
  },
  {
    title: "Expert support",
    description:
      "Our tech experts are available 24/7 to help you with any query.",
    icon: Headphones,
  },
];

function TrustSection() {
  return (
    <section className="py-20 bg-[#1a4d3e] text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why shop with Stannum?
          </h2>
          <p className="text-green-100/70 max-w-2xl mx-auto">
            We're committed to providing the best tech shopping experience for
            students and professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {trustItems.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-6 group-hover:bg-white group-hover:text-[#1a4d3e] transition-all duration-300 transform group-hover:scale-110 group-hover:rotate-3">
                <item.icon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-green-100/60 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
