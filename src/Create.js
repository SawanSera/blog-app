import { useState } from "react";
import { useHistory } from "react-router-dom";

const Create = () => {

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');
    const [author, setAuthor] = useState('Sawan');
    const [isPending, setIsPending] = useState(false);
    const history = useHistory();

    // dynamically updating the input field
    function updateInput(e) {
        setTitle(e.target.value);
    }

    // handling the form submit 
    function handleSubmit (e) {
        e.preventDefault();
        const blog = {
            title,
            body,
            author
        }

        setIsPending(true);

        fetch('http://localhost:8000/blogs', {
            method:'POST',
            headers:{"content-Type": "application/json"},
            body: JSON.stringify(blog)
        }).then(() => {
            console.log('New blog added');
            setIsPending(false);
            history.push('/')
        })
    }

    return ( 
        <div className="create">
            <h2>Create a blog</h2>
            <form onSubmit={handleSubmit}>
                <label>Blog Title:</label>
                <input 
                    type="text"
                    required
                    value={title}
                    onChange={updateInput}
                 />
                <label>Blog Body:</label>
                <textarea 
                    required
                    value={body}
                    onChange={(e) => setBody(e.target.value) }
                >
                </textarea>
                <label>Blog Author:</label>
                <select
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                >
                    <option value="Sawan">Sawan</option>
                    <option value="Sawani">Sawani</option>
                </select>
                {!isPending && <button>Add Blog</button>}
                {isPending && <button disabled>Add Blog...</button>}
                <p>{title}</p>
                <p>{body}</p>
                <p>{author}</p>
            </form>
        </div>
     );
}
 
export default Create;