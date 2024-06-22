
import React, { createContext, ReactNode, useContext, useState } from 'react';
import { ListClasses } from '@/lib/types';

interface listClassesContextType {
  listClasses: ListClasses[];
  setListClasses: React.Dispatch<React.SetStateAction<ListClasses[]>>;
}

export const ListClassesContext = createContext<listClassesContextType>({
  listClasses: [],
  setListClasses: () => { },
});

export const classesListProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [listClasses, setListClasses] = useState<ListClasses[]>([]);
  const contextValue: listClassesContextType = {
    listClasses,
    setListClasses,
  };

  return (
    <ListClassesContext.Provider value={contextValue}>
      {children}
    </ListClassesContext.Provider>
  );
};

export const useListClasses = () => {
  const context = useContext(ListClassesContext);
  if (!context) {
    throw new Error('useListClasses deve ser usado dentro de um ListClassesProvider');
  }
  return context;
};
