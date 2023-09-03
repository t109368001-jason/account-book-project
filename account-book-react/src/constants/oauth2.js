import { Google as GoogleIcon } from "@mui/icons-material";
import api from "../api";

const OAUTH2_LOGIN_URI = `${api.defaults.baseURL}/oauth2/authorization/`;
const OAUTH2_REDIRECT_URI = `${window.location.origin}/account-book`;

const oauth2s = [
  {
    title: "Google",
    icon: GoogleIcon,
    path: `${OAUTH2_LOGIN_URI}google?redirect_uri=${encodeURI(
      OAUTH2_REDIRECT_URI,
    )}`,
  },
];

export default oauth2s;
