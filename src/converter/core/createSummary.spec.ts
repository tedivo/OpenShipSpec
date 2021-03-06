import { IJoinedStackTierPattern } from "../../models/base/types/IPositionPatterns";
import { createMockedSimpleBayLevelData } from "../mocks/bayLevelData";
import { shipData } from "../mocks/shipData";
import createSummary from "./createSummary";

const mockSlotInfoKeysAbove: IJoinedStackTierPattern[] = ["0080", "0082"];
const mockSlotInfoKeysBelow: IJoinedStackTierPattern[] = ["0002", "0004"];

describe("createSummary should", () => {
  it("works correctly", () => {
    const bayLevelData = createMockedSimpleBayLevelData(
      shipData.isoBays,
      mockSlotInfoKeysAbove,
      mockSlotInfoKeysBelow
    );

    const params = {
      shipData,
      bayLevelData,
    };

    const summary = createSummary(params);

    expect(summary.isoBays).toBe(13);
    expect(summary.centerLineStack).toBe(1);
    expect(summary.maxStack).toBe("02");
    expect(summary.maxAboveTier).toBe("86");
    expect(summary.minAboveTier).toBe("80");
    expect(summary.maxBelowTier).toBe("08");
    expect(summary.minBelowTier).toBe("02");
  });

  it("manages inconsistencies in Stack", () => {
    const bayLevelData = createMockedSimpleBayLevelData(
      shipData.isoBays,
      mockSlotInfoKeysAbove,
      mockSlotInfoKeysBelow
    );

    // Add a different slotInfo, to create the stack 04
    bayLevelData[2].perSlotInfo["0480"] = bayLevelData[2].perSlotInfo["0080"];

    const params = {
      shipData,
      bayLevelData,
    };

    const summary = createSummary(params);

    expect(summary.isoBays).toBe(13);
    expect(summary.centerLineStack).toBe(1);
    expect(summary.maxStack).toBe("04");
    expect(summary.maxAboveTier).toBe("86");
    expect(summary.minAboveTier).toBe("80");
    expect(summary.maxBelowTier).toBe("08");
    expect(summary.minBelowTier).toBe("02");
  });

  it("manages inconsistencies in Tiers", () => {
    const bayLevelData = createMockedSimpleBayLevelData(
      shipData.isoBays,
      mockSlotInfoKeysAbove,
      mockSlotInfoKeysBelow
    );

    // Add a different slotInfo, to create the stack 04
    bayLevelData[2].perSlotInfo["0288"] = bayLevelData[2].perSlotInfo["0080"];

    const params = {
      shipData,
      bayLevelData,
    };

    const summary = createSummary(params);

    expect(summary.isoBays).toBe(13);
    expect(summary.centerLineStack).toBe(1);
    expect(summary.maxStack).toBe("02");
    expect(summary.maxAboveTier).toBe("88");
    expect(summary.minAboveTier).toBe("80");
    expect(summary.maxBelowTier).toBe("08");
    expect(summary.minBelowTier).toBe("02");
  });
});
