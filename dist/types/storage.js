"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TurbineReadings = exports.WindFarm = exports.WindFarmVariation = exports.WindTurbine = void 0;
const t = __importStar(require("io-ts"));
exports.WindTurbine = t.type({
    pk: t.string,
    sk: t.string,
    manufacturer: t.string,
    model: t.string,
    location: t.string,
    type: t.string,
    gsi1pk1: t.string,
    gsi1sk1: t.string,
    windfarm: t.string
});
var WindFarmVariation;
(function (WindFarmVariation) {
    WindFarmVariation["Land"] = "land";
    WindFarmVariation["OffShore"] = "offshore";
})(WindFarmVariation = exports.WindFarmVariation || (exports.WindFarmVariation = {}));
const WindFarmTypeV = t.keyof({
    [WindFarmVariation.Land]: null,
    [WindFarmVariation.OffShore]: null
});
exports.WindFarm = t.type({
    pk: t.string,
    sk: t.string,
    kWOut: t.number,
    manufacturer: t.string,
    type: WindFarmTypeV,
    gsi1pk1: t.string,
    gsi1sk1: t.string,
    windfarm: t.string
});
exports.TurbineReadings = t.type({
    pk: t.string,
    sk: t.string,
    date: t.string,
    kWOut: t.number,
    wind: t.number
});
