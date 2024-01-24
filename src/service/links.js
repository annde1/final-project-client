import { ROUTES } from "../routes/routes";
export const testLinks = [
  { to: ROUTES.MYPROFILE, children: "My Profile" },
  { to: ROUTES.EDITPROFILE, children: "Settings" },
  { to: ROUTES.MYTEMPLATES, children: "My Templates" },
  { to: ROUTES.CREATETEMPLATE, children: "Create Template" },
  { to: ROUTES.MYWORKOUTS, children: "My Workouts" },
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.ABOUT, children: "About" },
];

export const loggedInLinks = [
  { to: ROUTES.FEEDS, children: "Feeds" },
  { to: ROUTES.SOCIAL, children: "Social" },
  { to: ROUTES.EDITPROFILE, children: "Settings" },
  { to: ROUTES.MYTEMPLATES, children: "My Templates" },
  { to: ROUTES.MYWORKOUTS, children: "My Workouts" },
  { to: ROUTES.CREATETEMPLATE, children: "Create Template" },
  { to: ROUTES.ABOUT, children: "About" },
];

export const loggedOutLinks = [
  { to: ROUTES.REGISTER, children: "Register" },
  { to: ROUTES.LOGIN, children: "Login" },
  { to: ROUTES.ABOUT, children: "About" },
];
