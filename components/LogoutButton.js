'use client';

import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { Store } from '@/contexts/AddToCart';

export default function LogoutButton() {
  const router = useRouter();
  const { dispatch } = useContext(Store);

  const handleLogout = async () => {
    try {
      const response = await fetch('/api/logout', {
        method: 'POST',
        credentials: 'include' // Required for cookie clearing
      });

      if (response.ok) {
        // Clear client-side state
        dispatch({ type: 'CLEAR_CART' });
        localStorage.removeItem('userState');
        
        // Redirect
        router.push('/login');
        router.refresh(); // Force Next.js cache invalidation
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button 
      onClick={handleLogout}
      className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-md"
    >
      Log Out
    </button>
  );
}