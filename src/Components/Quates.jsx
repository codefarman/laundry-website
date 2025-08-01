import React from 'react';
import TrustHighlights from './TrustHiglight';
import { FaUsers, FaStore, FaBriefcase, FaStar } from 'react-icons/fa';

const Quates = () => {
  return (
    <>
      <div className="bg-white text-slate-900 font-sans py-8 px-2 sm:px-6 lg:px-8 ">
        <div className=" bg-[#cbd8eb] max-w-7xl mx-auto p-4 sm:p-8 md:p-12 rounded-xl">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold leading-tight max-w-3xl mx-auto text-teal-800">
            Let us handle the mess, <br /> 
            You enjoy what matters most.
          </h2>

          <div className="mt-10 flex flex-col md:flex-row md:space-x-6 gap-6">
            {/* Left Cards */}
            <div className="flex flex-col w-full md:w-1/2 space-y-5">
              {/* Card 1 */}
              <div className="bg-teal-50 border-l-4 border-teal-400 rounded-xl p-6 text-teal-900 shadow-sm">
                <div className="flex items-center space-x-3 mb-2">
                  <FaUsers className="text-teal-600 text-xl" />
                  <span className="text-sm uppercase font-semibold tracking-wide">Designed For</span>
                </div>
                <div className="text-lg font-semibold mb-1">Busy Families</div>
                <p className="text-xl font-bold leading-snug mb-4">
                  More hugs, less laundry. Your time is precious—we respect that.
                </p>
                <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2 rounded-md font-medium transition-all duration-200">
                  Schedule Pickup
                </button>
              </div>

              {/* Other Icons List */}
              <div className="bg-slate-100 rounded-xl p-5 flex items-center space-x-4 shadow-sm">
                <FaStore className="text-indigo-500 text-xl" />
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-500">Ideal For</div>
                  <div className="text-lg font-medium text-slate-800">Shops & Stores</div>
                </div>
              </div>
              <div className="bg-slate-100 rounded-xl p-5 flex items-center space-x-4 shadow-sm">
                <FaBriefcase className="text-emerald-500 text-xl" />
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-500">Best For</div>
                  <div className="text-lg font-medium text-slate-800">Professionals</div>
                </div>
              </div>
              <div className="bg-slate-100 rounded-xl p-5 flex items-center space-x-4 shadow-sm">
                <FaStar className="text-yellow-500 text-xl" />
                <div>
                  <div className="text-xs uppercase font-semibold text-slate-500">Tailored For</div>
                  <div className="text-lg font-medium text-slate-800">People Like You</div>
                </div>
              </div>
            </div>

            {/* Right Side Icon Illustration */}
            <div className="w-full md:w-1/2 flex items-center justify-center rounded-xl bg-gradient-to-tr from-teal-100 to-indigo-100 p-10 shadow-md">
              <div className="text-center space-y-4">
                <FaUsers className="text-teal-500 text-7xl mx-auto" />
                <h3 className="text-xl font-semibold text-gray-800">Laundry Made Effortless</h3>
                <p className="text-sm text-gray-600 max-w-sm mx-auto">
                  Whether it’s daily chores or weekly loads, we’re your trusted helping hand.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrustHighlights />
    </>
  );
};

export default Quates;
