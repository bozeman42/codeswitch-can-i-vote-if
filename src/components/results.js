import React, { Component } from 'react';
import axios from 'axios';

import api from './api';

export default class Results extends Component {
	constructor(props) {
		super(props)
		this.state = {
			data: {},
			canVote: 'Yes',
		};
	}

	componentDidMount(props) {
		console.log(this.props)
		console.log('name: ' + this.props.name);
		this.getStates()
	}

  getStates() {
    axios.get(api() + '/api/states/' + this.props.name)
		.then((resp) => {
			console.log(resp);
			this.setState({data: resp.data[0]})
			console.log(this.state.data)
			if (this.props.age >= 18 && this.props.crimes === 'No' && this.props.citizen === 'Yes') {
				this.setState({ canVote: 'Yes' });
			} else if (this.props.age < 18 || this.props.citizen === 'No' ) {
				this.setState({ canVote: 'No' });
			} else if (this.props.crimes === 'Yes' ) {
				this.setState({ canVote: 'Maybe' });
			}
			
		}).catch(function (error) {
			console.log(error);
		});
  }
	
	render() {
		// if (this.state.canVote === 'Maybe' && )
		const info = this.state.data
		return (
			<div className="row results">
				<div className="col-sm-12">
					<h3 className="stateTitle">Can you vote in {this.props.name}? <span id="answer" className={this.state.canVote}>{this.state.canVote}</span></h3>
				</div>
				<div className="col-lg-2 col-lg-offset-1">
					<label className="eTitle">Citizenship <i className={(this.props.citizen === 'Yes') ? "fa fa-check" : "fa fa-times"} id="citizen" aria-hidden="true"></i></label>
					<p>{info.citizenship}</p>
				</div>
				<div className="col-lg-2">
					<label className="eTitle">Age <i className={(this.props.age >= 18) ? "fa fa-check" : "fa fa-times"} id="age-notice" aria-hidden="true"></i></label>
					<p>
					{info.age}</p>
				</div>
				<div className="col-lg-2">
					<label className="eTitle">Residency <i className="fa fa-check" id="resident" aria-hidden="true"></i></label>
					<p>{info.residency}</p>
				</div>
				<div className="col-lg-2">
					<label className="eTitle">Crimes <i className={(this.props.crimes === 'Yes') ? "fa fa-exclamation" : "fa fa-check"} id="criminal" aria-hidden="true"></i></label>
					<p>{info.criminalHistory}</p>
				</div>
				<div className="col-lg-2">
					<label className="eTitle">Other <i className="fa fa-check" id="other" aria-hidden="true"></i></label>
					<p>{info.other}</p>
				</div>
			</div>
		);
	}
}