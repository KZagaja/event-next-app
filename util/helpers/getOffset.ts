import { off } from "process";

export const getOffset = (page: string | string[] | undefined) => {
  let offset: number = 0;

  if (typeof page === "string") {
    try {
      offset = parseInt(page) * 10;
    } catch {
      return (offset = 0);
    }
  }

  return offset;
};
