import { FormElementInstance } from '@/app/(dashboard)/_components/FormElements';
import { Dispatch, SetStateAction } from 'react';
import { create } from 'zustand';

type DesignerStore = {
  elements: FormElementInstance[];
  addElement: (index: number, element: FormElementInstance) => void;
  removeElement: (index: string) => void;

  setElements: (element: FormElementInstance[]) => void;

  selectedElement: SetStateAction<FormElementInstance | null>;
  setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;
  updateElement: (id: string, element: FormElementInstance) => void;
};

export const useDesginerStore = create<DesignerStore>((set) => ({
  elements: [],
  selectedElement: null,
  addElement: (index, element) =>
    set((state) => ({
      elements: [
        ...state.elements.slice(0, index),
        element,
        ...state.elements.slice(index),
      ],
    }
    )),
  removeElement: (id) =>
    set((state) => ({
      elements: state.elements.filter((element) => element.id !== id),
    })),
  setSelectedElement: (selectedElement) => set({ selectedElement }),
  updateElement: (id, element) =>
    set((state) => ({
      elements: state.elements.map((el) => (el.id === id ? element : el)),
    })),

  setElements: (element) => set(() => ({ elements: element })),
}));
