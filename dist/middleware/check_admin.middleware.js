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
const { ROLE } = require("../constant/role");
const { handleError } = require("../helpers/handleError");
const { getLoggedUser } = require("../helpers/user");
exports.authAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = getLoggedUser(req);
        const user_roles = yield user.getRoles();
        const is_user_admin = user_roles === null || user_roles === void 0 ? void 0 : user_roles.find(role => role.name === ROLE.ADMIN);
        if (is_user_admin) {
            next();
            return;
        }
        return handleError("no access", 403);
    }
    catch (error) {
        next(error);
    }
});
//# sourceMappingURL=check_admin.middleware.js.map