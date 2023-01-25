import * as ReactSocialIcons from "../src/react-social-icons.js";

declare global { interface Window { ReactSocialIcons: typeof ReactSocialIcons }}

// is required so unit tests of package functions work in page context
window.ReactSocialIcons = ReactSocialIcons;
