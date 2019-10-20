"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MojikyoMappingsExtra_1 = require("./MojikyoMappingsExtra");
const MojikyoMappings_1 = require("./MojikyoMappings");
const XXZTMappings_1 = require("./XXZTMappings");
// Source : <http://www.babelstone.co.uk/Unicode/tangut.js>
// Unicode Text Styler at <http://www.babelstone.co.uk/Unicode/xxzt.html>
// Title : tangut.js
// Author : Andrew West
// Date Created : 2018-12-04
// UTF-8 Constants
const ReplacementCharacter = 0xFFFD; // U+FFFD REPLACEMENT CHARACTER
const CharactersPerPlane = 65536;
const HighSurrogateFirst = 0xD800; // U+D800
const HighSurrogateLast = 0xDBFF; // U+DBFF
const LowSurrogateFirst = 0xDC00; // U+DC00
const LowSurrogateLast = 0xDFFF; // U+DFFF
const HalfShift = 10;
const HalfBase = 65536; // 0x10000;
const HalfMask = 0x03FF;
function convert(input, mapping, version) {
    let output = '';
    let high = 0;
    for (let i = 0; i < input.length; i++) {
        let char = input.charCodeAt(i);
        if (HighSurrogateFirst <= char && char <= HighSurrogateLast) {
            if (high !== 0) {
                output += String.fromCharCode(ReplacementCharacter);
            }
            high = char;
            continue;
        }
        else if (LowSurrogateFirst <= char && char <= LowSurrogateLast) {
            if (high === 0) {
                char = ReplacementCharacter;
            }
            else {
                char = FromSurrogates(high, char);
                high = 0;
            }
        }
        else {
            if (high !== 0) {
                output += String.fromCharCode(ReplacementCharacter);
                high = 0;
            }
        }
        if (0x4E00 <= char && char <= 0x9FA5) {
            if (mapping === 'XXZT') {
                const charmap = XXZTMappings_1.XXZT.find(m => m[0] === char);
                char = charmap[version];
            }
            if (mapping === 'Mojikyo') {
                const charmap = MojikyoMappings_1.Mojikyo.find(m => m[0] === char);
                const charmapPlus = MojikyoMappingsExtra_1.MojikyoPlus.find(m => m[0] === char);
                const charmapRemapped = MojikyoMappingsExtra_1.MojikyoRemapped.find(m => m[0] === char);
                const chout1 = charmap[1];
                let chout2 = charmap[2];
                if ((chout2 === 0xFFFE) && (version === 1)) {
                    chout2 = 0xFFFF;
                }
                if (chout1 === 0xFFFF) {
                    char = chout2;
                }
                else if (chout2 === 0xFFFF) {
                    char = chout1;
                }
                else {
                    if (version === 2) {
                        if (chout2 === 0xFFFE) {
                            chout2 = charmapPlus[1];
                        }
                        else {
                            chout2 = charmapRemapped[1] || chout2;
                        }
                    }
                    const a = ToSurrogates(chout1);
                    const b = ToSurrogates(chout2);
                    output += '{';
                    output += String.fromCharCode(a[0], a[1]);
                    output += '|';
                    output += String.fromCharCode(b[0], b[1]);
                    output += '}';
                    char = 0xFFFF;
                }
            }
        }
        if (char !== 0xFFFF) {
            if (char < CharactersPerPlane) {
                output += String.fromCharCode(char);
            }
            else {
                const a = ToSurrogates(char);
                const hi = a[0];
                const lo = a[1];
                output += String.fromCharCode(hi, lo);
            }
        }
    }
    return output;
}
exports.convert = convert;
// tslint:disable-next-line: no-any
function ToSurrogates(cp) {
    let hi = cp;
    let lo = 0;
    if (cp > CharactersPerPlane) {
        cp -= CharactersPerPlane;
        hi = (HighSurrogateFirst | ((cp >>> HalfShift) & HalfMask));
        lo = (LowSurrogateFirst | (cp & HalfMask));
    }
    return [hi, lo];
}
function FromSurrogates(hi, lo) {
    let cp = ReplacementCharacter;
    if (((hi >= HighSurrogateFirst) && (hi <= HighSurrogateLast)) && ((lo >= LowSurrogateFirst) && (lo <= LowSurrogateLast))) {
        cp = (((hi - HighSurrogateFirst) << HalfShift) + (lo - LowSurrogateFirst) + HalfBase);
    }
    return cp;
}
//# sourceMappingURL=MojikyoToUnicode.js.map