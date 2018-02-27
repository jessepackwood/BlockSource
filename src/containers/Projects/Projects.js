import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import './Projects.css';
import { connect } from 'react-redux';
import { projectsEndpoint } from '../../actions';
import FlatButton from 'material-ui/FlatButton';

export class Projects extends Component {
  componentDidMount() {
    this.props.handleProjectsFetch()
  }


  mapProjects() {
    return this.props.projects.map( (project, index) => {
      return <Card key={index}>
                <CardHeader
                  title={project.title}
                  subtitle={`Goal Amount: ${project.goal_amount} Fund Amount: ${project.fund_amount}`}
                  actAsExpander={true}
                  showExpandableButton={true}
                />
                <CardText expandable={true}>
                  {project.description}
                </CardText>
              </Card>
      })
    }

  render() {

    return (
      <div className='projects-component'>
        {this.props.projects && this.mapProjects()}
      </div>
    )
  }
}

export const mapStateToProps = store => ({
  projects: store.projects
})

export const mapDispatchToProps = (dispatch) => {
  return {
    handleProjectsFetch: () => {
      dispatch(projectsEndpoint())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);