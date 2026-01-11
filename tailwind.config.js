export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#FCF6DF", // light background
        secondary: "#f43f5e", // pink/red
        appcolor: "#FFDE59", // yellow
        dark: "#171717", // dark mode background
        footer: "#FFFCEE", // light footer background
        inputBorder: "#FFDE59",
        lightYellow: "#FFF5CC",
      },
      fontFamily: {
        sans: ["Manrope", "sans-serif"], // ✅ default for all pages
        poppins: ["Poppins", "sans-serif"], // ✅ use selectively
        noto: ['"Noto Sans"', "sans-serif"],
      },
      backgroundImage: {
        hero: "url('/assets/landing/heroBg.png')", // ✅ custom bg
        loginbg: "url('/assets/loginbg.png')", // ✅ custom bg
        createProfilebg: "url('/assets/CreateProfilebg.png')", // ✅ custom bg
        google: "url('/assets/googleLogo.png')", // ✅ custom bg
        facebook: "url('/assets/facebookLogo.png')", // ✅ custom bg
        CardPhoneBg: "url('/assets/landingpage/CardPhoneBg.png')",
        homecategoryBg1:
          "url('/assets/landingpage/Images/homecategory/Card (3).png')",
        homecategoryBg2:
          "url('/assets/landingpage/Images/homecategory/Card (3).png')",
        bluebg: "url('/assets/background/cards/bluebg.png')",
        greenbg: "url('/assets/background/cards/greenbg.png')",
        orangebg: "url('/assets/background/cards/orangebg.png')",
        purplebg: "url('/assets/background/cards/purplebg.png')",
        skybluebg: "url('/assets/background/cards/skybluebg.png')",
        homeBg123: "url('/assets/landingpage/Phones/AboutJoinUs.png')",
      },
    },
  },
  plugins: [],
};
