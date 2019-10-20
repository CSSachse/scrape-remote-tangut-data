"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Mojikyo to Unicode Mapping Table for additional characters
exports.MojikyoPlus = new Array(78);
exports.MojikyoPlus[0] = [0x4E4E, 0x1854D];
exports.MojikyoPlus[1] = [0x4EF6, 0x18160];
exports.MojikyoPlus[2] = [0x500B, 0x186D1];
exports.MojikyoPlus[3] = [0x5026, 0x18136];
exports.MojikyoPlus[4] = [0x5039, 0x171F6];
exports.MojikyoPlus[5] = [0x5065, 0x17C15];
exports.MojikyoPlus[6] = [0x5091, 0x175B9];
exports.MojikyoPlus[7] = [0x5143, 0x17DD3];
exports.MojikyoPlus[8] = [0x517C, 0x17D96];
exports.MojikyoPlus[9] = [0x5238, 0x18176];
exports.MojikyoPlus[10] = [0x5263, 0x175CB];
exports.MojikyoPlus[11] = [0x5287, 0x17103];
exports.MojikyoPlus[12] = [0x539F, 0x17DCA];
exports.MojikyoPlus[13] = [0x53B3, 0x1748F];
exports.MojikyoPlus[14] = [0x53E4, 0x1844E];
exports.MojikyoPlus[15] = [0x547C, 0x17BE3];
exports.MojikyoPlus[16] = [0x55A7, 0x17302];
exports.MojikyoPlus[17] = [0x56FA, 0x1844B];
exports.MojikyoPlus[18] = [0x570F, 0x17311];
exports.MojikyoPlus[19] = [0x5805, 0x172F6];
exports.MojikyoPlus[20] = [0x59D1, 0x1831D];
exports.MojikyoPlus[21] = [0x5ACC, 0x17AB6];
exports.MojikyoPlus[22] = [0x5B64, 0x17BD9];
exports.MojikyoPlus[23] = [0x5DF1, 0x180A7];
exports.MojikyoPlus[24] = [0x5E7B, 0x1835C];
exports.MojikyoPlus[25] = [0x5EAB, 0x187ED];
exports.MojikyoPlus[26] = [0x5EFA, 0x18722];
exports.MojikyoPlus[27] = [0x5F26, 0x185D1];
exports.MojikyoPlus[28] = [0x5F27, 0x187EE];
exports.MojikyoPlus[29] = [0x61B2, 0x18725];
exports.MojikyoPlus[30] = [0x61F8, 0x186BC];
exports.MojikyoPlus[31] = [0x621F, 0x17106];
exports.MojikyoPlus[32] = [0x6238, 0x187EF];
exports.MojikyoPlus[33] = [0x62F3, 0x172A4];
exports.MojikyoPlus[34] = [0x6372, 0x17FBC];
exports.MojikyoPlus[35] = [0x6483, 0x17105];
exports.MojikyoPlus[36] = [0x6708, 0x18154];
exports.MojikyoPlus[37] = [0x6841, 0x18171];
exports.MojikyoPlus[38] = [0x691C, 0x17EE5];
exports.MojikyoPlus[39] = [0x6A29, 0x18723];
exports.MojikyoPlus[40] = [0x6B20, 0x17246];
exports.MojikyoPlus[41] = [0x6C7A, 0x1815B];
exports.MojikyoPlus[42] = [0x6E1B, 0x18355];
exports.MojikyoPlus[43] = [0x6E90, 0x180D8];
exports.MojikyoPlus[44] = [0x6F54, 0x17CD9];
exports.MojikyoPlus[45] = [0x6FC0, 0x17117];
exports.MojikyoPlus[46] = [0x727D, 0x17F81];
exports.MojikyoPlus[47] = [0x72AC, 0x172B3];
exports.MojikyoPlus[48] = [0x732E, 0x17F27];
exports.MojikyoPlus[49] = [0x7384, 0x18345];
exports.MojikyoPlus[50] = [0x73FE, 0x1804C];
exports.MojikyoPlus[51] = [0x770C, 0x17AF0];
exports.MojikyoPlus[52] = [0x7814, 0x1732B];
exports.MojikyoPlus[53] = [0x786F, 0x17310];
exports.MojikyoPlus[54] = [0x7A74, 0x17D91];
exports.MojikyoPlus[55] = [0x7D43, 0x18371];
exports.MojikyoPlus[56] = [0x7D50, 0x17607];
exports.MojikyoPlus[57] = [0x7D79, 0x17EF9];
exports.MojikyoPlus[58] = [0x80A9, 0x18720];
exports.MojikyoPlus[59] = [0x8237, 0x1841C];
exports.MojikyoPlus[60] = [0x8840, 0x17E46];
exports.MojikyoPlus[61] = [0x898B, 0x1731F];
exports.MojikyoPlus[62] = [0x8A00, 0x18774];
exports.MojikyoPlus[63] = [0x8A23, 0x1817C];
exports.MojikyoPlus[64] = [0x8AFA, 0x1842E];
exports.MojikyoPlus[65] = [0x8B19, 0x17A11];
exports.MojikyoPlus[66] = [0x8CE2, 0x17A3D];
exports.MojikyoPlus[67] = [0x8ED2, 0x17EC3];
exports.MojikyoPlus[68] = [0x9063, 0x17395];
exports.MojikyoPlus[69] = [0x9375, 0x177D5];
exports.MojikyoPlus[70] = [0x9650, 0x1835B];
exports.MojikyoPlus[71] = [0x967A, 0x17774];
exports.MojikyoPlus[72] = [0x9699, 0x1711A];
exports.MojikyoPlus[73] = [0x9855, 0x17797];
exports.MojikyoPlus[74] = [0x9A13, 0x18795];
exports.MojikyoPlus[75] = [0x9BE8, 0x1710D];
exports.MojikyoPlus[76] = [0x9E78, 0x17DD7];
exports.MojikyoPlus[77] = [0xFFFF, 0xFFFF];
// Mojikyo to Unicode remappings
exports.MojikyoRemapped = new Array(7);
exports.MojikyoRemapped[0] = [0x82B8, 0x17D2F];
exports.MojikyoRemapped[1] = [0x8B66, 0x1710C];
exports.MojikyoRemapped[2] = [0x8EFD, 0x17118];
exports.MojikyoRemapped[3] = [0x8FCE, 0x17102];
exports.MojikyoRemapped[4] = [0x981A, 0x1710F];
exports.MojikyoRemapped[5] = [0x9D8F, 0x17119];
exports.MojikyoRemapped[6] = [0xFFFF, 0xFFFF];
//# sourceMappingURL=MojikyoMappingsExtra.js.map