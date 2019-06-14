import React from 'react';
import ReactDOM from 'react-dom';
import {Link} from 'react-router-dom';

import firebase from '../Firebase';

//some error regarding rendering

class Create extends React.Component{
	constructor(){
		super();
		this.ref = firebase.firestore().collection('cards');
		this.state = {
			title : '',
			author  : '',
			status : ''
		};
	}

	onFormSubmit = (event) =>{
		event.preventDefault();
		// console.log(this.state);
		const {title, author, status} = this.state;
		this.ref.add({
			title,
			author,
			status
		})
		.then((newPost) => {
			this.setState({
			title : '',
			author  : '',
			status : ''
			});
			this.props.history.push("/");
		})	
		.catch(err => {
			console.log("There is some error in adding a new post!")
		
		});
	}

	onInputChange = (event) => {
		const state = this.state;
		state[event.target.name] = event.target.value;
		this.setState(state);
		console.log(state);
	}

	render(){
		return(
			<div className="container">
				<form onSubmit = {this.onFormSubmit}>
					<div className="form-group">
					    <label forhtml="Title">Title</label>
					    <input onChange={this.onInputChange} type="text" className="form-control" id="Title" placeholder="Title" name="title"/>
					</div>

					<div className="form-group">
					    <label forhtml="Author">Author</label>
					    <input onChange={this.onInputChange} type="text" className="form-control" id="Author" placeholder="Author" name="author"/>
					</div>

					<div className="form-group">
					    <label forhtml="Status">Status</label>
					    <input onChange={this.onInputChange} type="text" className="form-control" id="Status" placeholder="What's on your mind?" name="status"/>
					</div>
					<button type="submit" className="btn btn-primary">Submit</button>
				</form>
			</div>
			);
		
	}
}

export default Create;



