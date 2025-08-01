import React from "react";
import { ShieldCheck, BadgeCheck, Sparkles } from "lucide-react";

const TrustHighlights = () => {
  return (
    <div className="bg-gradient-to-br from-blue-100 to-indigo-100 px-6 md:px-20 py-14">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Block 1 */}
        <div className="flex items-start space-x-4">
          <ShieldCheck className="text-indigo-600 w-7 h-7 mt-1" />
          <div>
            <h4 className="font-semibold text-lg text-gray-900">
              Safe Handling Guaranteed
            </h4>
            <p className="text-gray-700 mt-1 text-sm leading-relaxed">
              From pickup to delivery, your garments are protected with secure packaging and trusted care protocols.
            </p>
          </div>
        </div>

        {/* Block 2 */}
        <div className="flex items-start space-x-4">
          <BadgeCheck className="text-emerald-600 w-7 h-7 mt-1" />
          <div>
            <h4 className="font-semibold text-lg text-gray-900">
              Trusted by 10,000+ Users
            </h4>
            <p className="text-gray-700 mt-1 text-sm leading-relaxed">
              A strong community of returning customers relies on our consistent quality and timely service.
            </p>
          </div>
        </div>

        {/* Block 3 */}
        <div className="flex items-start space-x-4">
          <Sparkles className="text-pink-600 w-7 h-7 mt-1" />
          <div>
            <h4 className="font-semibold text-lg text-gray-900">
              Always Spotless Results
            </h4>
            <p className="text-gray-700 mt-1 text-sm leading-relaxed">
              Advanced eco-friendly cleaning solutions ensure your clothes come back fresh, clean, and vibrant every time.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustHighlights;
