const JavaScriptObfuscator = require('javascript-obfuscator');
const fs = require('fs');

let originalCode = fs.readFileSync('content.js', 'utf-8');

let obfuscatedCode = JavaScriptObfuscator.obfuscate(originalCode, {
    compact: true,
    controlFlowFlattening: true,
    controlFlowFlatteningThreshold: 0.75,
    deadCodeInjection: true,
    deadCodeInjectionThreshold: 0.4,
    debugProtection: true,
    debugProtectionInterval: 4000, // Set this to a non-negative number
    disableConsoleOutput: true,
    // Additional options here
}).getObfuscatedCode();
fs.writeFileSync('min.js', obfuscatedCode);
