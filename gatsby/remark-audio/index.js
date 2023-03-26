"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_extra_1 = require("fs-extra");
var path_1 = require("path");
var unist_util_visit_1 = require("unist-util-visit");
var processed = new Map();
var todo = [];
function getPath(file) {
    var dest = processed.get(file);
    if (dest)
        return dest;
    dest = "static/".concat(file.internal.contentDigest, "/").concat(file.base);
    processed.set(file, dest);
    todo.push([file.absolutePath, path_1.default.join(process.cwd(), 'public', dest)]);
    return dest;
}
exports.default = (function (_a) {
    var markdownAST = _a.markdownAST, markdownNode = _a.markdownNode, files = _a.files, getNode = _a.getNode;
    todo = [];
    (0, unist_util_visit_1.default)(markdownAST, 'inlineCode', function (node) {
        var value = node.value;
        if (value.startsWith('audio: ')) {
            var text = value.slice(7);
            var split = text.indexOf(' ');
            var name_1 = text.slice(0, split);
            var data = text.slice(split + 1);
            var uri_1 = path_1.default.join(getNode(markdownNode.parent).dir, name_1);
            var resource = files.find(function (f) { return f.absolutePath === uri_1; });
            if (!resource)
                return;
            var newPath = getPath(resource);
            node.type = 'html';
            node.value = "<audio src=\"/".concat(newPath, "\" controls class=\"audio-player").concat(data === 'plain' ? '' : ' complex-player', "\" data-player=").concat(data, "></audio>");
        }
    });
    return Promise.all(todo.map(function (_a) {
        var oldPath = _a[0], newPath = _a[1];
        return __awaiter(void 0, void 0, void 0, function () {
            var err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!fs_extra_1.default.existsSync(newPath)) return [3 /*break*/, 5];
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, fs_extra_1.default.ensureDir(path_1.default.dirname(newPath))];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, fs_extra_1.default.copy(oldPath, newPath)];
                    case 3:
                        _b.sent();
                        return [3 /*break*/, 5];
                    case 4:
                        err_1 = _b.sent();
                        console.error('error copying file', err_1);
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }));
});
