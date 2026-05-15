import express from "express";
import cors from "cors";
import morgan from "morgan";
import "./db/sequelize";
import User from "./models/User";
import Post from "./models/Post";

const app = express();

app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());

app.get("/users", async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.get("/posts", async (req, res) => {
    try {
        const posts = await Post.findAll({
            limit: 10,
            order: [["created_at", "DESC"]],
        });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.get("/feed", async (req, res) => {
    try {
        const posts = await Post.findAll({ 
            where: { published: true },
             include: [{ model: User, as: "author"}]
        });

        const mappedPosts = posts.map(post => ({
            ...post.toJSON(),
            author: (post.author as User)?.toJSON(),
        }));
        res.status(200).json(mappedPosts);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.get("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(Number(id));
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.post("/users", async (req, res) => {
    try {
        const { name, email } = req.body;

        const user = await User.create({ name, email });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.post("/posts", async (req, res) => {
    try {
        const { title, content, authorEmail } = req.body;

        const author = await User.findOne({ where: { email: authorEmail } });
        if (!author) {
            return res.status(400).json({ error: "Author not found" });
        }
        
        const post = await Post.create({ title, content, user_id: author.id });
        res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.put("/posts/publish/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(Number(id));
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        await Post.update({ published: true }, { where: { id: Number(id) } });

        const updatedPost = await Post.findByPk(Number(id));

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

app.delete("/posts/:id", async (req, res) => {
    try {
        const { id } = req.params;

        const post = await Post.findByPk(Number(id));
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        const deletedPost = await Post.destroy({ where: { id: Number(id) } });
        res.status(200).json({ message: "Post deleted successfully", deletedPost });
    } catch (error) {
        res.status(500).json({ error: (error as Error).message });
    }
});

export default app;