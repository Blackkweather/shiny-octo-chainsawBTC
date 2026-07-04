export default function manifest() {
  return {
    name: "Blackkweather Agency OS",
    short_name: "Agency OS",
    description: "Revenue command center",
    start_url: "/",
    display: "standalone",
    background_color: "#0B0E13",
    theme_color: "#0B0E13",
    icons: [
      {
        src: "/icon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
    ],
  };
}
