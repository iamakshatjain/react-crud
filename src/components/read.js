import React from 'react';

import firebase from '../Firebase';

class Read extends React.Component{

	state = {
				title: '',
				author: '',
				status: '',
				key: ''
			}

	componentDidMount = () => {
		const ref = firebase.firestore().collection('cards').doc(this.props.match.params.id);
		ref.get()
		.then(doc =>{
			if(doc.exists){
				this.setState({
							title : doc.data().title,
							author : doc.data().author,
							status : doc.data().status,
							key : doc.id 
						});
			}else{
				console.log("There was error in finding the document");
			}
			
		})
		.catch(err => console.log("There was some error in getting the document."));
	}

	render(){
		return(
				<div className = "container">
					<h1 className="card-title">{this.state.title}</h1>
					<h4 className="card-subtitle mb-2 text-muted">{this.state.author}</h4>
					<p className = "card-text">{this.state.status}</p>
				</div>
			);
	}
}

export default Read;