import * as ReactSocialIcons from "../src/react-social-icons";

declare global { interface Window { ReactSocialIcons }}

// is required so unit tests of package functions work in page context
window.ReactSocialIcons = ReactSocialIcons;
