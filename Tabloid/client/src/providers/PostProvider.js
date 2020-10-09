import React, { useState, createContext, useContext } from "react";
import { UserProfileContext } from "./UserProfileProvider";

export const PostContext = createContext();

export function PostProvider(props) {
    const apiUrl = "/api/post";
    const { getToken } = useContext(UserProfileContext);

    const [posts, setPosts] = useState([]);
    const [categories, setCategories] = useState([]);

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

    const getCategories = () => {
        getToken().then((token) =>
            fetch(`${apiUrl}/category`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }).then((res) => res.json())
                .then(setCategories));
    }

    const saveNewPost = (post) => {
        return getToken().then((token) =>
            fetch(apiUrl, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(post)
            })
        ).then((res) => console.log(res))
    }

    return (
        <PostContext.Provider value={{ posts, categories, setPosts, getAllPosts, getCategories, saveNewPost }}>
            {props.children}
        </PostContext.Provider>
    );

}