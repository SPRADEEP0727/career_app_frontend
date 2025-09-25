
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { LayoutDashboard, FileText, BarChart3, Target, Users, MessageSquare, CreditCard, Settings, LogOut, GraduationCap, User } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useUserProfile } from '@/hooks/useProfile';

interface DashboardNavProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'my-resumes', label: 'My Resumes', icon: FileText },
  { id: 'jd-matching', label: 'JD Matching', icon: Target },
  { id: 'profile-optimization', label: 'Profile Optimization', icon: Users },
  { id: 'mock-interview', label: 'Mock Interview', icon: MessageSquare },
  { id: 'learning', label: 'Learning', icon: GraduationCap },
  { id: 'credits', label: 'Credits & Payment', icon: CreditCard },
  { id: 'profile', label: 'My Profile', icon: User },
];

export const DashboardNav = ({ activeTab, setActiveTab }: DashboardNavProps) => {
  const { signOut, user } = useAuth();
  const { profile } = useUserProfile();
  
  const handleLogout = async () => {
    try {
      await signOut();
      // The AuthContext will handle redirecting to landing page
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const credits = profile?.credits || 0;
  return (
    <nav className="fixed left-0 top-0 w-64 bg-white border-r border-gray-200 h-screen flex flex-col z-40">
      {/* Header */}
      <div className="p-6 border-b border-gray-200">
        <h1 className="text-xl font-bold text-gray-900">
          Resume<span className="text-blue-600">Genius</span>.ai
        </h1>
      </div>
      
      {/* Navigation Items */}
      <div className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-2">
          {navItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "ghost"}
              onClick={() => setActiveTab(item.id)}
              className="w-full justify-start text-left h-10 px-3"
            >
              <item.icon className="w-4 h-4 mr-3 flex-shrink-0" />
              <span className="text-left truncate">{item.label}</span>
            </Button>
          ))}
        </div>
      </div>
      
      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200 space-y-3">
        <div className="flex items-center justify-center">
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">
            {credits} Credits
          </Badge>
        </div>
        
        <Button variant="ghost" size="sm" className="w-full justify-start text-left">
          <Settings className="w-4 h-4 mr-3 flex-shrink-0" />
          <span className="text-left">Settings</span>
        </Button>
        
        <Button 
          variant="ghost" 
          size="sm" 
          className="w-full justify-start text-left hover:bg-red-50 hover:text-red-600"
          onClick={handleLogout}
        >
          <LogOut className="w-4 h-4 mr-3 flex-shrink-0" />
          <span className="text-left">Logout</span>
        </Button>
      </div>
    </nav>
  );
};
