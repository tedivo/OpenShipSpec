import { getStafForeAftEnumValue } from "../../models/base/enums/ForeAftEnum";
import { getStafLcgReferenceEnumValue } from "../../models/base/enums/LcgReferenceEnum";
import { getStafPortStarboardValue } from "../../models/base/enums/PortStarboardEnum";
import { getStafPositionFormatEnumValue } from "../../models/base/enums/PositionFormatEnum";
import { getStafLengthUnitsEnumValue } from "../../models/base/enums/UnitsEnum";
import {
  getStafValuesSourceEnumValue,
  getStafValuesSourceStackTierEnumValue,
} from "../../models/base/enums/ValuesSourceEnum";
import IShipData from "../../models/v1/parts/IShipData";
import ISectionMapConfig from "../models/ISectionMapConfig";

/**
 * DEFINITION of main Ship class for the converter
 */
const ShipConfig: ISectionMapConfig<IShipData> = {
  stafSection: "SHIP",
  singleRow: true,
  mapVars: {
    CLASS: { target: "shipName", passValue: true, dashIsEmpty: true },
    UNITS: {
      target: "fileUnits.lengthUnits",
      mapper: getStafLengthUnitsEnumValue,
    },
    LCG_IN_USE: {
      target: "lcgOptions.values",
      mapper: getStafValuesSourceEnumValue,
    },
    LCG_REF_PT: {
      target: "lcgOptions.reference",
      mapper: getStafLcgReferenceEnumValue,
    },
    "LCG_+_DIR": {
      target: "lcgOptions.orientationIncrease",
      mapper: getStafForeAftEnumValue,
    },
    VCG_IN_USE: {
      target: "vcgOptions.values",
      mapper: getStafValuesSourceStackTierEnumValue,
    },
    TCG_IN_USE: {
      target: "tcgOptions.values",
      mapper: getStafValuesSourceEnumValue,
    },
    "TCG_+_DIR": {
      target: "tcgOptions.direction",
      mapper: getStafPortStarboardValue,
    },
    POSITION_FORMAT: {
      target: "positionFormat",
      mapper: getStafPositionFormatEnumValue,
    },
  },
};

export default ShipConfig;
