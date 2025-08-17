'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';
import { User, LogOut } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import clsx from 'clsx';

export default function NavBar() {
  const pathname = usePathname();
  const { user, signIn, signOut, isLoading } = useAuth();

  const linkCls = (href: string) =>
    clsx(
      'px-3 py-2 rounded-md text-sm font-medium',
      pathname === href
        ? 'text-white bg-white/20'
        : 'text-white/80 hover:text-white hover:bg-white/10'
    );



  return (
    <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-black/30 border-b border-white/20">
      <div className="mx-auto max-w-6xl px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-white font-semibold hover:text-white/80 transition-colors">
          SeeWorld AI
        </Link>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link href="/" className={linkCls('/')}>
              Home
            </Link>
            <Link href="/projects" className={linkCls('/projects')}>
              Projects
            </Link>
            <Link href="/credits" className={linkCls('/credits')}>
              Credits
            </Link>
            <Link href="/account" className={linkCls('/account')}>
              Account
            </Link>
          </div>
          
          {/* Google Sign-In */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-10 w-10 rounded-full p-0 hover:bg-white/10">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-200 shadow-lg">
                <div className="flex items-center gap-2 p-2">
                  <img
                    src={user.picture}
                    alt={user.name}
                    className="h-8 w-8 rounded-full"
                  />
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/account" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    Account Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  onClick={signOut}
                  className="flex items-center gap-2 cursor-pointer text-red-600 focus:text-red-600"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={signIn}
              disabled={isLoading}
              className="bg-white text-gray-900 hover:bg-gray-100 font-medium px-4 py-2 text-sm"
            >
              {isLoading ? 'Loading...' : 'Get Started'}
            </Button>
          )}
        </div>
      </div>
    </nav>
  );
}
