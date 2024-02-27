import * as admin from "firebase-admin";
admin.initializeApp();
import {onUserCreated} from "./events/auth";

export {onUserCreated};

