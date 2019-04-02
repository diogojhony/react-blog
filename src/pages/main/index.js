import React, { Component } from 'react';
import api from '../../services/api';
import { Link } from 'react-router-dom';

import './styles.css';

export default class Main extends Component {
    state = {
        posts: []
    }

    componentDidMount() {
        this.loadPosts();
    }

    loadPosts = async () => {
        const response = await api.get('/posts');

        this.setState({ posts: response.data });
    }

    render() {
        const { posts } = this.state;

        return (
            <div className="post-list container">
                {posts.map(post => (
                    <div class="post">
                        <Link to={`/posts/${post.id}`}>
                            <div class="post-content">
                                <h2 class="post-title">{post.title}</h2>
                                <p class="post-body">{post.body}</p>
                                <p class="read-more">— Leia mais</p>
                            </div>
                        </Link>
                    </div>
                ))}
            </div>
        )
    }
}
