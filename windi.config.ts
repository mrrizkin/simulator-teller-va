import { defineConfig } from "windicss/helpers";
import plugin from "windicss/plugin";

export default defineConfig({
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
    }),
  ],
});
