"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const ejs = __importStar(require("ejs"));
const path_1 = __importDefault(require("path"));
function createPagePromise(page, renderPromise) {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            page,
            renderResult: yield renderPromise,
        };
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const filePromises = [];
    const pagePromises = [];
    const currentDir = path_1.default.resolve(__dirname);
    const srcDir = path_1.default.join(currentDir, "src");
    const pagesDir = path_1.default.join(srcDir, "pages");
    const pages = fs_1.default.readdirSync(pagesDir);
    const distDir = path_1.default.join(currentDir, "dist");
    const publicDir = path_1.default.join(currentDir, "public");
    if (fs_1.default.existsSync(distDir)) {
        const distFiles = fs_1.default.readdirSync(distDir);
        for (const distFile of distFiles)
            yield fs_1.default.promises.rm(path_1.default.join(distDir, distFile), { recursive: true });
    }
    else if (!fs_1.default.existsSync(distDir)) {
        yield fs_1.default.promises.mkdir(distDir);
    }
    for (const page of pages) {
        pagePromises.push(createPagePromise(page, ejs.renderFile(path_1.default.join(pagesDir, page))));
    }
    for (const resolvedPage of yield Promise.all(pagePromises)) {
        const { page, renderResult } = resolvedPage;
        const filePath = path_1.default.join(distDir, page.replace("ejs", "html"));
        filePromises.push(fs_1.default.promises.writeFile(filePath, renderResult));
    }
    filePromises.push(fs_1.default.promises.cp(publicDir, distDir, { recursive: true }));
    yield Promise.all(filePromises);
    console.log("Render EJS Files Finished.");
}))();
