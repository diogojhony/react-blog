import React, { Component } from 'react';
import api from '../../services/api';

import './styles.css';

export default class Post extends Component {
    state = {
        post: {},
        user: {},
        comments: []
    };

    async componentDidMount() {
        const { post } = this.state;

        this.loadPost();
        this.loadComments(post.id);
    }

    loadPost = async () => {
        const { id } = this.props.match.params;

        const post = (await api.get(`/posts/${id}`)).data;
        const user = (await api.get(`/users/${post.userId}`)).data;

        this.setState({ post, user });
    }

    loadComments = async (postId) => {
        const response = await api.get(`/posts/${postId}/comments`);

        this.setState({ comments: response.data });
    }

    render() {
        const { post, user, comments } = this.state;

        return (
            <div className="container">
                <h1>{post.title}</h1>
                <div className="post-author">
                    <p>Escrito por</p>
                    <p className="author-name">{user.name}</p>
                </div>
                <article className="post-content">
                    <p>{post.body}</p>
                </article>

                <section className="post-comments">
                    <h2 className="comments-title">Comentários</h2>
                    <ul className="comment-list">
                        {comments.map((comment) => (
                            <li key={comment.id} className="comment">
                                <div className="comment-author">
                                    <span>{comment.email}</span>
                                </div>
                                <div className="comment-body">
                                    <p>{comment.name}</p>
                                    <p>{comment.body}</p>
                                </div>
                            </li>
                        ))}
                    </ul>
                </section>
            </div>
        )
    }
}
