import Bookshelf from "bookshelf";
import bookshelfUUID from "bookshelf-uuid";
import securePassword from "bookshelf-secure-password";
import db from "../config/db";

export default Bookshelf(db).plugin([bookshelfUUID, securePassword]);
