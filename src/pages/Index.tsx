import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { SearchBar } from '@/components/SearchBar';
import { CategoryList } from '@/components/CategoryList';
import { LinkGrid } from '@/components/LinkGrid';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { AdminLinkManager } from '@/components/AdminLinkManager';
import { RoleBasedContent } from '@/components/RoleBasedContent';
import { Button } from '@/components/ui/button';
import { Tab } from '@/types';
import { ChevronLeft } from 'lucide-react';

const Index = () => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [isAdminDialogOpen, setIsAdminDialogOpen] = useState(false);
  
  const { data: categories = [], isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categories')
        .select('*');
      
      if (error) throw error;
      return data || [];
    }
  });

  const activeTab = activeCategory ? {
    id: activeCategory.toString(),
    title: categories.find(c => c.id === activeCategory)?.name || ''
  } as Tab : null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-400/20 via-pink-500/20 to-purple-600/20 pt-16">
      <div className="max-w-[2000px] mx-auto space-y-4 md:space-y-8 p-4 md:p-8">
        <div className="flex justify-between items-center">
          <SearchBar />
          <RoleBasedContent allowedRoles={['admin']}>
            <Button 
              onClick={() => setIsAdminDialogOpen(true)}
              className="bg-gradient-to-r from-purple-400 to-pink-500 text-white hover:opacity-90"
            >
              Manage Links
            </Button>
          </RoleBasedContent>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 md:gap-8">
          {/* Mobile Back Button */}
          {activeCategory && (
            <Button
              variant="ghost"
              className="flex items-center gap-2 md:hidden mb-2"
              onClick={() => setActiveCategory(null)}
            >
              <ChevronLeft className="h-4 w-4" />
              Back to Categories
            </Button>
          )}
          
          {/* Categories List - Hidden on mobile when category is selected */}
          <div className={`${activeCategory ? 'hidden md:block' : 'block'}`}>
            <CategoryList 
              categories={categories}
              isLoading={isLoading}
              activeCategory={activeCategory}
              onCategorySelect={setActiveCategory}
            />
          </div>

          {/* Links Grid - Full width on mobile when category is selected */}
          <div className={`flex-1 ${!activeCategory && 'hidden md:block'}`}>
            <LinkGrid activeTab={activeTab} />
          </div>
        </div>

        <Dialog open={isAdminDialogOpen} onOpenChange={setIsAdminDialogOpen}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <AdminLinkManager />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Index;