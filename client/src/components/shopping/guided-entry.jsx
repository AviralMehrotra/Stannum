import {
  Laptop,
  Smartphone,
  Headphones,
  Watch,
  Gamepad2,
  ArrowRight,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const entryPoints = [
  {
    title: "Find the best for studies",
    description: "Laptops and tablets for your academic success.",
    icon: Laptop,
    color: "bg-green-50",
    iconColor: "text-green-700",
  },
  {
    title: "Upgrade your phone",
    description: "The latest smartphones with the best deals.",
    icon: Smartphone,
    color: "bg-orange-50",
    iconColor: "text-orange-700",
  },
  {
    title: "Best for music & calls",
    description: "Noise-cancelling headphones and earbuds.",
    icon: Headphones,
    color: "bg-blue-50",
    iconColor: "text-blue-700",
  },
  {
    title: "Stay active & connected",
    description: "Smartwatches to track your health and goals.",
    icon: Watch,
    color: "bg-teal-50",
    iconColor: "text-teal-700",
  },
  {
    title: "Work from home setup",
    description: "Monitors, keyboards, and ergonomic gear.",
    icon: Laptop,
    color: "bg-purple-50",
    iconColor: "text-purple-700",
  },
  {
    title: "Gaming & Entertainment",
    description: "Consoles, controllers, and gaming accessories.",
    icon: Gamepad2,
    color: "bg-pink-50",
    iconColor: "text-pink-700",
  },
];

function GuidedEntry() {
  const navigate = useNavigate();

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Start here
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Not sure what you need? Choose your goal and we'll show you the best
            options.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {entryPoints.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate("/shop/listing")}
              className="group p-6 rounded-2xl border border-slate-100 hover:border-green-200 hover:shadow-xl hover:shadow-green-500/5 transition-all duration-300 cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`p-3 rounded-xl ${item.color} ${item.iconColor} transition-transform group-hover:scale-110`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-green-800 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-4">
                    {item.description}
                  </p>
                  <div className="flex items-center text-green-700 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore now
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-green-600 transition-colors" />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={() => navigate("/shop/listing")}
            className="text-slate-500 hover:text-green-800 font-medium transition-colors border-b border-slate-200 hover:border-green-800 pb-1"
          >
            View all recommendations
          </button>
        </div>
      </div>
    </section>
  );
}

export default GuidedEntry;
