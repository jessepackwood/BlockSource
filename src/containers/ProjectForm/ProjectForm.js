import React, { Component } from 'react';
import FlatButton from 'material-ui/FlatButton';
import './ProjectForm.css';
import { connect } from 'react-redux';
import * as actions from '../../actions';

export class ProjectForm extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      description: '',
      goal_amount: '',
      fund_amount: ''
    }
  }

  handleInputChange = (event) => {
    console.log('input change')
    const {name, value} = event.target
    console.log(name, value)
    this.setState({ [name] : value})
  }

  render() {
    return (
      <div className='project-form-container'>
        <div className='project-form'>
          <div className='input-labels'>
            <span className='project-input-label'>Title</span>
            <span className='project-input-label'>Description</span>
            <span className='project-input-label'>Goal</span>
          </div>
          <div className='project-inputs'>
            <input 
              name='title'
              type='text' 
              className='project-input single-input'
              value={this.state.title}
              onChange={this.handleInputChange}
            />
            <textarea
              name='description'
              type='text' 
              className='project-input'
              placeholder='Why should people fund this project?'
              value={this.state.description}
              onChange={this.handleInputChange}
            >
            </textarea>
            <input
              name='goal_amount'
              type='text' 
              className='project-input single-input'
              value={this.state.goal_amount}
              onChange={this.handleInputChange}
            />            
            <input
              name='fund_amount'
              type='text' 
              className='project-input single-input'
              value={this.state.fund_amount}
              onChange={this.handleInputChange}
            />
          </div>
        </div>
        <FlatButton 
          label='submit' 
          onClick={
            ()=> this.props.formChange(
                  this.state.title, 
                  this.state.description, 
                  this.state.goal_amount, 
                  this.state.fund_amount
          )}/>
      </div>
    );
  }
}


export const mapDispatchToProps = dispatch => {
  return {
    formChange: (title, description, goal_amount, fund_amount) => {
      dispatch(actions.postNewProject(title, description, goal_amount, fund_amount))
    }
  }
}

export default connect(null, mapDispatchToProps)(ProjectForm)
