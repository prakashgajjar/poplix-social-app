"use client";

import { useState, ReactNode } from "react";
import React from "react";

type TabsProps = {
  defaultValue: string;
  children: ReactNode;
  onChange?: (value: string) => void;
};

type TabContextType = {
  value: string;
  setValue: (val: string) => void;
};

const TabsContext = React.createContext<TabContextType | null>(null);

export function Tabs({ defaultValue, children, onChange }: TabsProps) {
  const [value, setValue] = useState(defaultValue);

  const handleChange = (val: string) => {
    setValue(val);
    onChange?.(val);
  };

  return (
    <TabsContext.Provider value={{ value, setValue: handleChange }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }: { children: ReactNode }) {
  return <div className="flex gap-4 border-b border-gray-700">{children}</div>;
}

export function TabsTrigger({ value, children }: { value: string; children: ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used inside Tabs");

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.setValue(value)}
      className={`py-2 text-sm font-medium border-b-2 transition-all duration-150 ${
        isActive
          ? "text-white border-white"
          : "text-gray-300 border-transparent hover:text-white"
      }`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }: { value: string; children: ReactNode }) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used inside Tabs");

  return context.value === value ? <div className="mt-4">{children}</div> : null;
}
