import React from "react";
import SnowFlare from "../Components/SnowFlare";

const About = () => {
  return (
    <div className="overflow-x-hidden">
      <div className="relative m-2 md:py-4 py-2 md:px-10 px-6 min-h-screen">
        <style>{`
          @keyframes fadeUp {
            from { opacity: 0; transform: translateY(24px); }
            to { opacity: 1; transform: translateY(0); }
          }
          @keyframes floatY {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-8px); }
          }
          @keyframes lineGrow {
            from { transform: scaleX(0); opacity: 0.2; }
            to { transform: scaleX(1); opacity: 1; }
          }
          @keyframes drip {
            0% { top: -100%; }
            50% { top: 100%; }
            100% { top: 100%; }
          }
          .fade-up { animation: fadeUp 0.8s ease-out both; }
          .float-y { animation: floatY 4s ease-in-out infinite; }
          .line-grow { transform-origin: center; animation: lineGrow 1s ease-out both; }
          .drip-line::after {
            content: "";
            position: absolute;
            top: -100%;
            left: 0;
            width: 100%;
            height: 100%;
            background: #D9683A;
            animation: drip 2.2s ease-in-out infinite;
          }
        `}</style>

        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative max-w-xl fade-up">
            <p className="flex text-sm text-[#D9683A] tracking-widest">
              EST. IN THE COLD - FROSTCOLLECTION
            </p>

            <div className="flex flex-col items-start justify-start gap-4 mt-10 mb-10">
              <h1 className="md:text-7xl sm:text-6xl text-4xl BBH-Bogle tracking-wider fade-up">
                Made for the
              </h1>
              <h2 className="md:text-6xl sm:text-5xl text-3xl BBH-Bogle tracking-wide fade-up">
                <span className="prata-regular">quiet </span> kind of winter .
              </h2>
            </div>

            <p className="text-gray-500 prata-regular tracking-wider fade-up">
              We design outerwear for the version of winter that isn't loud — early mornings, long walks, the drive before the snowplows. This is the story of why, and how, we make it.
            </p>

            <div className="absolute top-[350px] left-0 flex items-center gap-3 text-[#9FB0C2] text-[11px] tracking-[2px] uppercase opacity-80">
              <div className="drip-line relative w-px h-9 bg-[#9FB0C2] overflow-hidden"></div>
              Scroll
            </div>
          </div>
        </div>

        <div className="mt-24 fade-up">
          <div className="flex items-center gap-4">
            <p className="text-[#D9683A] tracking-widest text-sm">OUR STORY</p>
            <hr className="flex-1 border-gray-300 line-grow" />
          </div>

          <div className="flex flex-row items-center justify-start mt-10">
            <p className="md:text-4xl text-3xl prata-regular">
              Built from a problem worth solving
            </p>
          </div>

          <div className="max-w-[500px] mt-16">
            <p className="text-lg tracking-wide text-gray-600">
              FrostCollection began with a simple complaint: most winter jackets are built to look warm, not to keep you warm through an actual season of use.
            </p>
            <p className="mt-6 tracking-wide text-gray-500">
              We started as two people testing insulation samples in an unheated garage, comparing how synthetic and natural fills held up after the fortieth wear, the tenth wash, the first real blizzard. That stubbornness about getting the basics right hasn't changed as we've grown.
            </p>
            <p className="mt-5 tracking-wide text-gray-600">
              Today every piece we ship still passes through that same garage-tested standard — fewer releases, longer wear, no decoration that doesn't earn its place against the cold.
            </p>
          </div>
        </div>
      </div>

      <div className="shadow-lg bg-[#16273D] w-full m-2 md:py-4 py-2 md:px-10 px-6 min-h-screen overflow-x-hidden mt-16">
        <div className="fade-up">
          <p className="[word-spacing:4px] uppercase tracking-[0.07em] text-sm text-white mt-11">
            What we hold to
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-stretch justify-center mb-20 mt-10 gap-0">
          {[
            {
              title: "Warmth, measured",
              text: "Every insulation batch is cold-chamber tested before it's approved for a single garment. We publish the fill rating, not just the marketing temperature",
              icon: (
                <svg viewBox="0 0 34 34" fill="none" width="34" height="34">
                  <path d="M17 2 L17 32 M5 9 L29 25 M29 9 L5 25" stroke="#D9683A" strokeWidth="1.4" />
                </svg>
              ),
            },
            {
              title: "Made to outlast a season",
              text: "Our outer shells are rated for 200+ wash cycles. If a zipper or seam fails before that, we repair it free — no receipt required.",
              icon: (
                <svg width={34} height={34} viewBox="0 0 34 34" fill="none">
                  <circle cx="17" cy="17" r="13" stroke="#D9683A" strokeWidth="1.4" />
                  <path d="M17 8 L17 17 L23 21" stroke="#D9683A" strokeWidth="1.4" />
                </svg>
              ),
            },
            {
              title: "Honest sourcing",
              text: "Down and wool come from suppliers we visit ourselves, audited annually against RDS and RWS standards — not a one-time certificate on a webpage.",
              icon: (
                <svg width={34} height={34} viewBox="0 0 34 34" fill="none">
                  <path d="M5 26 L13 10 L21 22 L29 6" stroke="#D9683A" strokeWidth="1.4" />
                </svg>
              ),
            },
          ].map((item, idx) => (
            <div
              key={idx}
              className="group flex-1 basis-0 shrink-0 border border-gray-300/50 p-10 min-h-[400px] max-w-none transition-all duration-500 ease-out hover:bg-[#1C3150] hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="transition-transform duration-500 group-hover:scale-110">
                {item.icon}
              </div>
              <h3 className="text-white text-2xl tracking-wider mt-10 prata-regular">
                {item.title}
              </h3>
              <p className="text-white mt-5 tracking-wide">{item.text}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="ml-2 w-full min-h-screen flex flex-col md:flex-row">
        <div className="bg-[#9FB0C2] w-full md:max-w-[600px] max-w-full md:p-20 p-16 md:px-10 px-40 float-y">
          <SnowFlare />
        </div>

        <div className="w-full md:max-w-[500px] max-w-full p-10 md:ml-9 fade-up">
          <p className="text-[#D9683A] tracking-widest uppercase">Materials & Craft</p>
          <p className="text-3xl prata-regular mt-10 mb-4 tracking-wide">
            The fabric does the work others ask the design to do.
          </p>
          <p className="text-gray-500 tracking-wide mt-8">
            We work in four core materials — responsibly-sourced down, merino wool blends, recycled ripstop nylon, and brushed fleece — and resist adding a fifth just for novelty.
          </p>
          <p className="text-gray-500 tracking-wide mt-8 mb-5">
            Each fabric is chosen for one job: trap heat, block wind, wick moisture, or move with you. Nothing in the lineup is there to look good on a shelf.
          </p>
          <div className="flex flex-row gap-2 mt-9">
            <p className="bg-[#DCE8F2] rounded-3xl min-w-10 min-h-10"></p>
            <p className="bg-[#9FB0C2] rounded-3xl min-w-10 min-h-10"></p>
            <p className="bg-[#222831] rounded-3xl min-w-10 min-h-10"></p>
            <p className="bg-[#D9683A] rounded-3xl min-w-10 min-h-10"></p>
          </div>
        </div>
      </div>

      <div className="flex flex-row mt-40 items-center justify-center gap-4 px-6">
        <hr className="border-gray-400 w-32 line-grow" />
        <p className="tracking-wider uppercase text-[#D9683A]">A NOTE</p>
        <hr className="border-gray-400 w-32 line-grow" />
      </div>

      <p className="text-center text-2xl italianno-regular px-40 mt-10 tracking-wider fade-up">
        "We never set out to make winter look exciting. We set out to make it survivable, then comfortable, then — only after that — beautiful. In that order."
      </p>
      <p className="text-center tracking-widest text-[#D9683A] mt-10 mb-20 uppercase fade-up">
        — Co-Founders, FrostCollection
      </p>
    </div>
  );
};

export default About;