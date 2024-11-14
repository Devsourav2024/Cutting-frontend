import LoginPage from "@/components/login/index";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Login = () => {
  return (
    <>
      <GoogleOAuthProvider clientId="738781932683-cl9vho54g06qlffv7qpn1f64ronbbpol.apps.googleusercontent.com">
        <LoginPage />
      </GoogleOAuthProvider>
    </>
  );
};

export default Login;
