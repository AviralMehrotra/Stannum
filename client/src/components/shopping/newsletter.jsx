import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send } from "lucide-react";

function Newsletter() {
  return (
    <section className="py-20 bg-white border-b border-slate-100">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto bg-slate-50 rounded-[3rem] p-8 md:p-16 text-center relative overflow-hidden">
          {/* Decorative elements */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-green-100 rounded-full -translate-x-16 -translate-y-16 opacity-50" />
          <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-100 rounded-full translate-x-16 translate-y-16 opacity-50" />

          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-slate-900 mb-6">
              Stay in the loop
            </h2>
            <p className="text-slate-600 text-lg mb-10 max-w-xl mx-auto">
              Get the latest tech news, exclusive student deals, and product
              launches delivered to your inbox.
            </p>

            <form
              className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-lg mx-auto"
              onSubmit={(e) => e.preventDefault()}
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                className="h-14 px-6 rounded-2xl border-slate-200 bg-white text-lg focus:ring-green-800"
              />
              <Button className="h-14 px-8 rounded-2xl bg-[#1a4d3e] hover:bg-[#143d31] text-white font-bold flex items-center gap-2 transition-all hover:scale-105">
                Subscribe
                <Send className="w-5 h-5" />
              </Button>
            </form>

            <p className="mt-6 text-slate-400 text-sm">
              By subscribing, you agree to our{" "}
              <button className="underline hover:text-green-800">
                Privacy Policy
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Newsletter;
