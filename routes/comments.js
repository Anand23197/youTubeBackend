import express from "express"
import { addComments, deleteComment, getComments } from "../controllers/comment.js";
import {verifyToken} from "../verifyToken.js"

const router = express.Router();

router.post("/", verifyToken, addComments)
router.delete("/:id", verifyToken, deleteComment)
router.get("/:videoId", getComments)

export default router;

