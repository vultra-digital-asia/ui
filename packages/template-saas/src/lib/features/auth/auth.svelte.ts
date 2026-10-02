export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string;
}

export function createAuthFeature() {
  let user = $state<User | null>({
    id: 'usr_101',
    name: 'Ant Joshua',
    email: 'antoniusjoshua47@gmail.com',
    role: 'Owner',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop'
  });
  let isLoading = $state(false);

  function login(email: string) {
    isLoading = true;
    setTimeout(() => {
      user = {
        id: 'usr_101',
        name: 'Ant Joshua',
        email,
        role: 'Owner'
      };
      isLoading = false;
    }, 400);
  }

  function logout() {
    user = null;
  }

  return {
    get user() { return user; },
    get isAuthenticated() { return user !== null; },
    get isLoading() { return isLoading; },
    login,
    logout
  };
}
