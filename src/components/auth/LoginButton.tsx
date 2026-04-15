import { useAuth } from './AuthProvider';
import { LogIn, LogOut, User as UserIcon } from 'lucide-react';

export function LoginButton() {
  const { user, loading, signIn, logout } = useAuth();

  if (loading) {
    return (
      <div className="h-10 w-32 bg-gray-100 animate-pulse rounded-lg"></div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gray-200">
          {user.photoURL ? (
            <img 
              src={user.photoURL} 
              alt={user.displayName || 'User'} 
              className="w-6 h-6 rounded-full"
              referrerPolicy="no-referrer"
            />
          ) : (
            <UserIcon size={16} className="text-gray-500" />
          )}
          <span className="text-sm font-medium text-gray-700 hidden sm:inline">
            {user.displayName?.split(' ')[0]}
          </span>
        </div>
        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 hover:text-red-600 transition-colors"
        >
          <LogOut size={18} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={signIn}
      className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700 transition-all shadow-sm active:scale-[0.98]"
    >
      <LogIn size={18} />
      Login with Google
    </button>
  );
}
