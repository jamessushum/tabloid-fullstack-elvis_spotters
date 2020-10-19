import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { PostContext } from "../../providers/PostProvider";
import Post from "./Post"
import { Container, Row, Button, Table } from "reactstrap";

const MyPosts = (props) => {

    const { posts, getMyPosts } = useContext(PostContext);

    const history = useHistory();
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        getMyPosts();
        const loggedInUser = JSON.parse(sessionStorage.userProfile);
        setCurrentUser(loggedInUser.id);
    }, []);

    return (
        <Container>
            <Row>
                <h2>My Posts</h2>
            </Row>
            <Row>
                <Button onClick={() => history.push("/post/new")}>Create New Post</Button>
            </Row>
            <Table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <Post key={post.id} post={post} currentUser={currentUser} />
                    ))}
                </tbody>
            </Table>
        </Container>
    )
}

export default MyPosts