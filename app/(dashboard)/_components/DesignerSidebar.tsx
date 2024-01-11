import { useDesginerStore } from '@/store/store';
import FormElementsSidebar from './FormElementsSidebar';
import PropertiesFormSidebar from './PropertiesFormSidebar';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function DesignerSidebar() {
  const { selectedElement } = useDesginerStore();

  return (
    <aside className="flex h-full w-[400px] max-w-[400px] grow flex-col gap-2 overflow-y-auto border-l-2 border-border bg-background p-4">
      <ScrollArea>
        {!selectedElement && <FormElementsSidebar />}
        {selectedElement && <PropertiesFormSidebar />}
      </ScrollArea>
    </aside>
  );
}
