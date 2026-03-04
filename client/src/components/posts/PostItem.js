import React, { Fragment } from 'react'
import PropTypes from 'prop-types'

import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import { connect } from 'react-redux'
import { addLike, removeLike, deletePost } from '../../actions/post'

const PostItem = ({ auth, post: { _id, text, name, user, likes, comments }, addLike, removeLike, deletePost, showActions }) => (
    <div className="posts">
        <div className="post bg-white p-1 my-1">
            <div>
                <Link to={`/profile/${user}`}> {/* dynamic profile link */}
                    {/* <img
                        className="round-img"
                        src="https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200"
                        alt=""
                    /> */}
                    <h4>{name}</h4>
                </Link>
            </div>
            <div>
                <p className="my-1">{text}</p>
                <p className="post-date">
                    Posted on {dayjs().format('MM/DD/YYYY')}
                </p>
                {showActions && <Fragment>
                    <button
                        onClick={() => addLike(_id)}
                        type="button"
                        className="btn btn-light"
                    >
                        <i className="fas fa-thumbs-up"></i>{' '}
                        <span>
                            {likes.length > 0 && <span>{likes.length}</span>}
                        </span>
                    </button>
                    <button
                        onClick={() => removeLike(_id)}
                        type="button"
                        className="btn btn-light"
                    >
                        <i className="fas fa-thumbs-down"></i>
                    </button>
                    <Link to={`/posts/${_id}`} className="btn btn-primary">
                        Discussion{' '} {comments.length > 0 && (<span className='comment-count'>{comments.length}</span>
                        )}</Link>
                    {!auth.loading && user === auth.user._id && (
                        <button
                            type="button" onClick={() => deletePost(_id)}
                            className="btn btn-danger"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    )}

                </Fragment>}


            </div>
        </div>
    </div>
);


PostItem.defaultProps = {
    showActions: true

}

PostItem.propTypes = {
    post: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    addLike: PropTypes.func.isRequired,
    removeLike: PropTypes.func.isRequired,
    deletePost: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(PostItem)
