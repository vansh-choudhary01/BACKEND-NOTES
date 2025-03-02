import mongoose from "mongoose";

interface Post {
    title: string;
    content: string;
}   

const postSchema = new mongoose.Schema<Post>({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
});

const PostModel = mongoose.model<Post>("Post", postSchema);
export default PostModel;