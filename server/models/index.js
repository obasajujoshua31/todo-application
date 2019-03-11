import Bookshelf from "bookshelf";
import bookshelfUUID from "bookshelf-uuid";
import db from "../config/db";

export default Bookshelf(db).plugin([bookshelfUUID]);
