import React, { useState } from "react";
import { useClerk } from "@clerk/clerk-react";

const plans = [
  {
    name: "Free",
    description: "Get started with basic features",
    monthly: 0,
    annual: 0,
    features: ["AI Article Writer", "Blog Title Generator"],
    clerkPlanId: "plan_free", // replace with actual Clerk plan ID
  },
  {
    name: "Starter",
    description: "Ideal for beginners",
    monthly: 15,
    annual: 12,
    features: ["Access to AI tools", "Limited AI generations", "Email support"],
    clerkPlanId: "plan_monthly_starter",
  },
  {
    name: "Pro",
    description: "For professionals",
    monthly: 30,
    annual: 25,
    features: ["Unlimited AI tools", "Priority support", "Advanced analytics"],
    clerkPlanId: "plan_monthly_pro",
  },
  {
    name: "Enterprise",
    description: "For teams",
    monthly: 50,
    annual: 40,
    features: ["Team collaboration", "Dedicated support", "Custom integrations"],
    clerkPlanId: "plan_monthly_enterprise",
  },
];

const Plan = () => {
  const [billing, setBilling] = useState("monthly");
  const { openSignUp } = useClerk();

  const handleSubscribe = (planId) => {
    openSignUp({ plan: planId });
  };

  return (
    <div className="px-4 sm:px-20 xl:px-32 py-24 w-full bg-gradient-to-br from-black via-[#0a0014] to-black">
      {/* Section Title */}
      <div className="text-center mb-12">
        <h2
          className="text-[42px] font-semibold text-transparent bg-clip-text 
                     bg-gradient-to-r from-purple-600 via-pink-200 to-purple-600"
          style={{
            textShadow:
              "0 0 8px rgba(255, 0, 255, 0.7), 0 0 16px rgba(255, 105, 180, 0.5)",
          }}
        >
          Choose Your Plan
        </h2>
        <p className="text-gray-400 mt-2 max-w-lg mx-auto">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs
        </p>
      </div>

      {/* Billing Toggle */}
      <div className="flex justify-center gap-4 mb-12">
        <button
          onClick={() => setBilling("monthly")}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            billing === "monthly"
              ? "bg-purple-600 text-white shadow-[0_0_20px_#a855f7]"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Monthly
        </button>
        <button
          onClick={() => setBilling("annual")}
          className={`px-6 py-2 rounded-full font-semibold transition-all ${
            billing === "annual"
              ? "bg-purple-600 text-white shadow-[0_0_20px_#a855f7]"
              : "bg-gray-800 text-gray-400"
          }`}
        >
          Annual
        </button>
      </div>

      {/* Pricing Cards */}
      <div className="flex flex-wrap lg:flex-nowrap justify-center gap-8 relative">
        {plans.map((plan, index) => (
          <div key={index} className="relative group w-full sm:w-80">
            {/* Animated Glow Behind Card */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 via-pink-400 to-purple-600 blur-2xl opacity-40 group-hover:opacity-70 transition-opacity duration-500"></div>

            {/* Card */}
            <div
              className="relative p-8 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/20 shadow-lg
                transition-all duration-500 cursor-pointer
                hover:-translate-y-2 hover:shadow-[0_0_25px_#a855f7,0_0_35px_#ec4899]"
            >
              <h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>
              <p className="text-gray-400 mb-4">{plan.description}</p>
              <div className="text-3xl font-bold text-white mb-4">
                ${billing === "monthly" ? plan.monthly : plan.annual}
                <span className="text-gray-400 text-base font-normal">
                  /{billing}
                </span>
              </div>

              {/* Features */}
              <ul className="text-gray-300 mb-6 space-y-2">
                {plan.features.map((feat, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-purple-400">•</span> {feat}
                  </li>
                ))}
              </ul>

              <button
                onClick={() =>
                  handleSubscribe(
                    billing === "monthly" ? plan.clerkPlanId : plan.clerkPlanId
                  )
                }
                className="w-full py-3 text-white font-semibold rounded-xl bg-gradient-to-r from-purple-600 via-pink-400 to-purple-600
                           hover:shadow-[0_0_25px_#a855f7,0_0_35px_#ec4899] transition-all"
              >
                Subscribe
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Plan;
