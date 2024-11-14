// src/utils/AuthGuard.js
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { useEffect, useState } from 'react';
import Loading from '@/components/common/Loading';

const AuthGuard = ({ children }) => {
  const { auth } = useAuth();
  const router = useRouter();
  const pathname = usePathname();  // Get the current path
  const [loading, setLoading] = useState(true);
  // const params = 
  
useEffect(() => {
    // Simulate a check for authentication status
    const checkAuth = async () => {
      // Bypass auth check for homepage and login page
      if (pathname === '/' || pathname === '/login' || pathname === '/privacy-policy'|| pathname === '/contact-us'|| pathname === '/faq' || pathname === "/cnc_cutting.mp4" || pathname === "/cnc_cutting_2.mp4" || pathname.startsWith('/forgot-password')) {
        setLoading(false);
        return;
      }

      // Redirect to login if not authenticated
      if (!auth && !pathname.startsWith('/forgot-password')) {
        router.push('/login');
      } else {
        setLoading(false);
      }
    };

    checkAuth();
  }, [auth, pathname, router]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthGuard;
