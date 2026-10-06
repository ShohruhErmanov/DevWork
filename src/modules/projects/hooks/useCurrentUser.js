import { useState } from 'react';

/**
 * ============================================================================
 * TEMPORARY MOCK HOOK: useCurrentUser
 * ============================================================================
 * This mock simulates the current authenticated user's tier.
 * It will be replaced by the Auth/User team member's actual auth context/hook.
 *
 * Available levels: 'intern' | 'junior' | 'middle' | 'senior'
 */
export function useCurrentUser() {
  // Current user's simulation tier (default: 'intern' to showcase locked states)
  const [user, setUser] = useState({
    id: 'user-001',
    name: 'Talaba Intern',
    level: 'intern', // Change to 'junior', 'middle', or 'senior' to test unlocks
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=128&auto=format&fit=crop&q=80',
    xp: 150,
  });

  return {
    user,
    userLevel: user.level,
    setUser,
  };
}
