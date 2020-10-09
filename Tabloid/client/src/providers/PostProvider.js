import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export function PostProvider(props) {
    const apiUrl = "api/post";
    const { getToken } = useContext(UserProfileContext);

    const [posts, setPosts] = useState([]);

    const getAllPosts = () => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setPosts));
    }

    const saveNewPost = (post) => {
        getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                }
            }).then((res) => res.json()))
    }

    return (
        <PostContext.Provider value={{ posts, setPosts, getAllPosts, saveNewPost }}>
            {props.children}
        </PostContext.Provider>
    );

}