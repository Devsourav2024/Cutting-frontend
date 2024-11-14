import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "@/app/context/AuthContext";
import Loading from "@/components/common/Loading";

const AuthRedirect = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (auth && pathname === "/login") {
      if (localStorage.getItem("navigateUrl")) {
        router.push(`${localStorage.getItem("navigateUrl")}`);
        localStorage.removeItem("navigateUrl");
      } else {
        router.push("/profile");
      }
      // router.push("/profile"); // Redirect to homepage or any other page
    } else {
      setLoading(false);
    }
  }, [auth, pathname, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthRedirect;
