import htm from "https://esm.sh/htm@3.1.1";
import React from "https://esm.sh/react@18.2.0";

const html = htm.bind(React.createElement);

export const FeatureCard = ({ title, description, icon }) => {
  return html`
    <div className="glass-card rounded-2xl p-6 h-full">
      <div className="w-10 h-10 rounded-full bg-boston-blue/20 text-boston-blue flex items-center justify-center" dangerouslySetInnerHTML=${{ __html: icon }}></div>
      <h3 className="text-lg font-semibold mt-4 text-mystic">${title}</h3>
      <p className="text-sm text-mystic/70 mt-2">${description}</p>
    </div>
  `;
};
