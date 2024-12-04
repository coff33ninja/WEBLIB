import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Icons } from '@/components/icons';
import { toast } from '@/components/ui/use-toast';

interface CategoryManagerProps {
  categories: any[];
  selectedCategory: number | null;
  onCategorySelect: (categoryId: number | null) => void;
}

export const CategoryManager = ({ 
  categories, 
  selectedCategory, 
  onCategorySelect 
}: CategoryManagerProps) => {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  const addCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      const { data: maxIdData } = await supabase
        .from('categories')
        .select('id')
        .order('id', { ascending: false })
        .limit(1);
      
      const nextId = maxIdData && maxIdData.length > 0 ? maxIdData[0].id + 1 : 1;
      
      const { error } = await supabase
        .from('categories')
        .insert([{ id: nextId, name: newCategoryName.trim() }]);
      
      if (error) throw error;
      
      toast({
        title: 'Category Added',
        description: `${newCategoryName} has been added successfully.`
      });
      
      setNewCategoryName('');
      setIsAddingCategory(false);
    } catch (error) {
      toast({
        title: 'Error Adding Category',
        description: 'Failed to add category. Please try again.',
        variant: 'destructive'
      });
    }
  };

  return (
    <div className="flex flex-wrap gap-2 items-center">
      <Button
        variant="outline"
        onClick={() => onCategorySelect(null)}
        className={!selectedCategory ? 'bg-primary/20' : ''}
      >
        All Categories
      </Button>
      {categories.map((category) => (
        <Button
          key={category.id}
          variant="outline"
          onClick={() => onCategorySelect(category.id)}
          className={selectedCategory === category.id ? 'bg-primary/20' : ''}
        >
          {category.name}
        </Button>
      ))}
      {!isAddingCategory ? (
        <Button
          variant="outline"
          onClick={() => setIsAddingCategory(true)}
          className="gap-2"
        >
          <Icons.plus className="h-4 w-4" /> Add Category
        </Button>
      ) : (
        <div className="flex items-center gap-2">
          <Input
            value={newCategoryName}
            onChange={(e) => setNewCategoryName(e.target.value)}
            placeholder="Category name"
            className="w-48"
          />
          <Button onClick={addCategory} size="sm">
            Add
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setIsAddingCategory(false);
              setNewCategoryName('');
            }}
          >
            <Icons.close className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
};