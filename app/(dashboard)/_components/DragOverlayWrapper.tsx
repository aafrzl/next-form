import {
  ElementsType,
  FormElements,
} from '@/app/(dashboard)/_components/FormElements';
import { SidebarBtnElementOverlay } from '@/app/(dashboard)/_components/SidebarBtnElement';
import { useDesginerStore } from '@/store/store';
import { Active, DragOverlay, useDndMonitor } from '@dnd-kit/core';
import { useState } from 'react';

export default function DragOverlayWrapper() {
  const { elements } = useDesginerStore();

  const [draggedItem, setDraggedItem] = useState<Active | null>(null);

  useDndMonitor({
    onDragStart: (event) => {
      setDraggedItem(event.active);
    },
    onDragCancel: () => {
      setDraggedItem(null);
    },
    onDragEnd: () => {
      setDraggedItem(null);
    },
  });

  if (!draggedItem) return null;

  let node = <div>No drag overlay</div>;

  const isSidebarBtnElement = draggedItem.data?.current?.isDesignerBtnElement;

  if (isSidebarBtnElement) {
    const type = draggedItem.data?.current?.type as ElementsType;
    node = <SidebarBtnElementOverlay formElement={FormElements[type]} />;
  }

  const isDesignerElement = draggedItem.data?.current?.isDesignerElement;
  if (isDesignerElement) {
    const elementId = draggedItem.data?.current?.elementId;
    const element = elements.find((el) => el.id === elementId);
    if (!element) node = <div>Element not found!</div>;
    else {
      const DesignerElementComponent =
        FormElements[element.type].designerComponent;

      node = (
        <div className="pointer-events-none flex h-[120px] w-full rounded-md border bg-accent px-4 py-2 opacity-80">
          <DesignerElementComponent elementInstance={element} />
        </div>
      );
    }
  }

  return <DragOverlay>{node}</DragOverlay>;
}
