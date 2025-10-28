import { useState } from "react";
import { SortType } from "../enums/SortType.enum";

export const useSort = () => {
  const [sorts, setSorts] = useState({
    date: true,
    lexical: true,
  });

  const sortData = <T extends Record<string, any>>(
    data: T[],
    key: SortType,
    fieldName: keyof T
  ) => {
    const direction = sorts[key];

    data.sort((first, second) => {
      const a = first[fieldName];
      const b = second[fieldName];

      if (key === SortType.Lexical) {
        return direction
          ? String(a).localeCompare(String(b))
          : String(b).localeCompare(String(a));
      } else {
        return direction
          ? new Date(a).getTime() - new Date(b).getTime()
          : new Date(b).getTime() - new Date(a).getTime();
      }
    });

    setSorts((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return { sorts, sortData };
};
