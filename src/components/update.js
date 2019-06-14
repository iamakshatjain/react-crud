import React from 'react';

import firebase from '../Firebase';

class Update extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			title : '',
			author : '',
			status : '',
			key:''
		}
	}
	

	onFormSubmit = (event) =>{
		event.preventDefault();
		console.log(this.state);
		const {title, author, status} = this.state;
		const ref = firebase.firestore().collection('cards').doc(this.props.match.params.id);
		ref.set({
			title,
			author,
			status
		})
		.then((upadatedPost) => {
			this.setState({
			title : '',
			author  : '',
			status : ''
			});
			this.props.history.push("/");
		})	
		.catch(err => {
			console.log("There is some error in updating post!")
		
		});
	}

	onInputChange = (event) => {
		const state = this.state;
		state[event.target.name] = event.target.value;
		this.setState(state);
		// console.log(state);
	}

	componentDidMount = () =>{
		const ref = firebase.firestore().collection('cards').doc(this.props.match.params.id);
		// console.log(this.props);
		ref.get().then((doc) => {
			if(doc.exists){
				this.setState({
					title : doc.data().title,
					author : doc.data().author,
					status : doc.data().status,
					key : doc.id,
					isLoading : false
				});
			}else{
				console.log("No such document found");
			}
		})
		.catch(err => console.log("there was some error finding the document")); 
	}



	render(){
		return(
				<div className="container">
					<h1>Update document</h1>
					<form onSubmit = {this.onFormSubmit}>
						<div className="form-group">
						    <label forhtml="Title">Title</label>
						    <input onChange={this.onInputChange} type="text" className="form-control" id="Title" placeholder="Title" name="title" value={this.state.title}/>
						</div>

						<div className="form-group">
						    <label forhtml="Author">Author</label>
						    <input onChange={this.onInputChange} type="text" className="form-control" id="Author" placeholder="Author" name="author" value={this.state.author}/>
						</div>

						<div className="form-group">
						    <label forhtml="Status">Status</label>
						    <input onChange={this.onInputChange} type="text" className="form-control" id="Status" placeholder="What's on your mind?" name="status" value={this.state.status}/>
						</div>
						<button type="submit" className="btn btn-primary">Submit</button>
					</form>
				</div>
			);
	}

}

export default Update;

