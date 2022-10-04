// Import styles, initialize component theme here.
// import '../src/common.css';
import * as ReactSocialIcons from '../src/react-social-icons'

declare global { interface Window { ReactSocialIcons: any }}

// is required so unit tests of package functions work in page context
window.ReactSocialIcons = ReactSocialIcons;
