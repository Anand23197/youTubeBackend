import Video from "../models/Video.js"
import Comment from "../models/Comment.js"
import { createError } from "../error.js";

export const addComments = async( req, res, next) =>{
    const NewComment = new Comment({...req.body, userId : req.user.id}) 
          try{
            const savedComment = await NewComment.save();
            res.status(200).send(savedComment);
          }catch(err){
            next(err);
          }
}

export const deleteComment = async( req, res, next) =>{
          try{
                 const comment = await Comment.findById(res.params.id);                                   
                 const video = await Video.findById(res.params.id);             
                 if(req.user.id === comment.userId || video.userId){
                    await Comment.findByIdAndDelete(req.params.id);
                    res.status(200).json("The comment has been deleted.");
                 }else{
                    return next(createError(403, "you can delete only your comment"));
                 }                      
          }catch(err){
            next(err);
          }
}
export const getComments = async( req, res, next) =>{
          try{            
            const comments = await Comment.find({videoId: req.params.videoId});
            res.status(200).json(comments);
          }catch(err){
            next(err);
          }
}