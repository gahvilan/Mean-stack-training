'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Comment Schema
 */
var CommentSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    comment: {
        type: String,
        trim: true,
        required: 'Please enter your comment'
    },
    user: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

/**
 * Article Schema
 */
var ArticleSchema = new Schema({
	created: {
		type: Date,
		default: Date.now
	},
	title: {
		type: String,
		default: '',
		trim: true,
		required: 'Title cannot be blank'
	},
	content: {
		type: String,
		default: '',
		trim: true
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
	comments: {
		type: [CommentSchema],
		default: []
	}
});

mongoose.model('Article', ArticleSchema);
mongoose.model('Comment', CommentSchema);
