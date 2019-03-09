import Bookshelf from "bookshelf";
import db from "../config/db";
import bookshelfUUID from "bookshelf-uuid";

export default Bookshelf(db).plugin(bookshelfUUID);
