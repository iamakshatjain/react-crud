import React from 'react';
import {Link} from 'react-router-dom';
import firebase from '../Firebase';

class App extends React.Component{
	// return(<div>I am at your service,sir ...</div>);
	constructor(props){
		super(props);
		this.ref = firebase.firestore().collection('cards');
		this.unsubscribe = null;
		this.state = {cards : []};
	}

	onCollectionUpdate = (querySnapshot) => {
		const cards = [];
		querySnapshot.forEach((doc) => {
			const {title,author,status} = doc.data();
			cards.push({
				key:doc.id,
				doc,
				title,
				author,
				status
			});
		});
		this.setState({cards});
	}

	componentDidMount = () => {
		this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
	}

	getCards = () => {
		const foundCards = this.state.cards.map((card) => {
			return(

				<div className = "card" style = {{width:'18rem'}}>
					<div className = "card-body">
						<h3 className = "card-title">{card.title}</h3>
						<h6 className = "card-subtitle mb-2 text-muted">-{card.author}</h6>
						<p className = "card-text">{card.status}</p>
						<Link to = {`/read/${card.key}`}><button style = {{margin:'3px'}} className="btn btn-primary">Show</button></Link>
						<Link to = {`/update/${card.key}`}><button style = {{margin:'3px'}} className="btn btn-warning">Edit</button></Link>
						<Link to = {`/delete/${card.key}`}><button style = {{margin:'3px'}} className="btn btn-danger">Delete</button></Link>
					</div>
				</div>
				);
		});			
		return foundCards;
	}

	render = () => {
		return(
			<div className = 'container'>
				<h1>What's on your mind?</h1>
				<Link to="/create"><button style = {{margin:'3px'}} className="btn btn-primary btn-lg btn-block">Create post</button></Link>
				<br/>
				<div className = "row">
					{this.getCards()}
				</div>
			</div>
			);
	}
}

export default App;