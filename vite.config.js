// import { defineConfig } from "vite";
// import react from "@vitejs/plugin-react";
// import tailwindcss from "@tailwindcss/vite";
// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [tailwindcss(), react()],
// });



import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
export default defineConfig({
  plugins: [tailwindcss(), react()],
  
  // 🟢 This stop (auto reload page) hot model replacement(HMR) this stop page reloading after singup button click
  server: {// Add this 'server' object
    watch: {// Ignore changes to data.json
      ignored: [
        "**/data.json",
        // Common ignore patterns, often default but good to explicitly list for clarity
        "**/.git/**",
        "**/node_modules/**",
      ],
    },
  },
});