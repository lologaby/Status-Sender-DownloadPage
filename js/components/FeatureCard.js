import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";

const html = htm.bind(React.createElement);

export const FeatureCard = ({ title, description, icon }) => {
  return html`
    <div className="glass-card rounded-2xl p-8 h-full transition-all duration-300 hover:bg-white/10 hover:scale-[1.02]">
      <div className="w-14 h-14 rounded-2xl bg-white/5 backdrop-blur-sm flex items-center justify-center mb-6" dangerouslySetInnerHTML=${{ __html: icon.replace('class="w-5 h-5"', 'class="w-6 h-6 text-white/80"') }}></div>
      <h3 className="text-xl font-semibold mb-3 text-white tracking-tight">${title}</h3>
      <p className="text-base text-white/60 leading-relaxed">${description}</p>
    </div>
  `;
};
