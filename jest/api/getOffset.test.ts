import { off } from "process";
import { getOffset } from "../../util/helpers/getOffset";
import { describe, expect, test } from "@jest/globals";

describe("test if offset is selected correctly", () => {
  test("pushing string number into offset", () => {
    const offset = getOffset("1");
    expect(offset).toBe(10);
  });

  test("pushing undefined or array of values", () => {
    const offsetUndefined = getOffset(undefined);
    const offsetArray = getOffset(["1", "2", "3"]);

    expect(offsetUndefined).toBe(0);
    expect(offsetArray).toBe(0);
  });

  test("pushing other type of data/string into offset", () => {
    const offset = getOffset("asdasdsda");
    expect(offset).toBe(0);

    //@ts-ignore
    const offsetNumber = getOffset(2);
    expect(offsetNumber).toBe(0);
  });
});
