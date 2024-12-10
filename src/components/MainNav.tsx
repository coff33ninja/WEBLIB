import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { User as SupabaseUser } from "@supabase/supabase-js";
import { UserMenu } from "./nav/UserMenu";
import { cn } from "@/lib/utils";
import { Icons } from "./icons";
import { useToast } from "./ui/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MainNav() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Check initial auth state
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      // Only redirect if trying to access protected routes
      if (!session && isProtectedRoute(location.pathname)) {
        navigate('/auth');
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      // Only redirect if trying to access protected routes
      if (!session && isProtectedRoute(location.pathname)) {
        navigate('/auth');
        toast({
          title: "Session expired",
          description: "Please sign in again to continue.",
        });
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate, location.pathname, toast]);

  // Helper function to check if a route requires authentication
  const isProtectedRoute = (path: string): boolean => {
    const protectedRoutes = ['/admin'];
    return protectedRoutes.includes(path);
  };

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/admin", label: "Admin Zone", protected: true },
  ];

  const NavLinks = () => (
    <>
      {navItems.map((item) => (
        (!item.protected || user) && (
          <Button
            key={item.path}
            variant="ghost"
            className={cn(
              "bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold hover:from-purple-500 hover:to-pink-600 transition-all duration-300",
              location.pathname === item.path && "bg-accent/50"
            )}
            onClick={() => {
              navigate(item.path);
              setIsMobileMenuOpen(false);
            }}
          >
            {item.label}
          </Button>
        )
      ))}
    </>
  );

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Icons.menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col space-y-3 mt-4">
                <NavLinks />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Menu */}
        <div className="mr-4 hidden md:flex space-x-2">
          <NavLinks />
        </div>

        {/* Auth Section - Always Visible */}
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          {user ? (
            <UserMenu user={user} />
          ) : (
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate("/auth")}
              className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent font-bold hover:from-purple-500 hover:to-pink-600"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-2 h-4 w-4"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
              Login
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}