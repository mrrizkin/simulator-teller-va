import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";

export default defineConfig({
  theme: {
    extend: {
      animation: {
        "globe-rotate1":
          "1s linear 0s infinite alternate none running globe-rotate1",
        "globe-rotate2":
          "1s linear 0s infinite alternate none running globe-rotate2",
      },
    },
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        ".glow": {
          filter:
            "drop-shadow(rgba(255, 215, 77, 0.6) -1px -1px 2px) drop-shadow(rgba(124, 127, 255, 0.6) 1px 1px 2px)",
        },
      });
      addUtilities({
        ".dyn-font-size": {
          fontSize: "calc(10px + 2vmin)",
        },
      });
      addUtilities({
        ".btn-hacktober": {
          border: "none",
          "border-radius": "2px",
          "clip-path":
            "polygon(12px 0px, 100% 0px, 100% 72%, calc(100% - 12px) 100%, 0px 100%, 0px 12px)",
          padding: "8px 18px",
        },
      });
    }),
  ],
});
