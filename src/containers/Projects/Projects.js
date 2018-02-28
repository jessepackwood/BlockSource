import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardTitle, CardText} from 'material-ui/Card';
import './Projects.css';
import { connect } from 'react-redux';
import { projectsEndpoint, contributorsEndpoint } from '../../actions';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';

export class Projects extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  componentDidMount() {
    this.props.handleProjectsFetch();
  }

  checkContributors() {
    if (!this.props.contributors) {
      return <p>Nobody has backed this project</p>
    } else {
    this.props.contributors.map(contributor => <p>{contributor.name}</p>)
    }
  }

  mapProjects() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        label="Submit"
        primary={true}
        keyboardFocused={true}
        onClick={this.handleClose}
      />,
    ];

    return this.props.projects.map( (project, index) => {
      return <Card key={project.id}>
        <CardHeader
          title={project.title}
          subtitle={`Goal Amount: ${project.goal_amount} Fund Amount: ${project.fund_amount}`}
        />
        <CardText>
          {project.description}
        </CardText>
        <CardActions actAsExpander={true}>
          <FlatButton label="Contributors" primary={true} onClick={() => this.props.showContributors(project.id)}/>
        </CardActions>
        <CardText expandable={true}>
        
          {!!this.props.contributors.length ? this.props.contributors.map(contributor => <p>{contributor.name}</p>) : <p>Nobody has backed this project</p>}    
        </CardText>
        <FlatButton label="Add Contribution" onClick={this.handleOpen} />
        <Dialog
          title={`Contribute to ${project.title}`}
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
        </Dialog>
      </Card>;
    });
  }

  render() {

    return (
      <div className='projects-component'>
        {this.props.projects && this.mapProjects()}
      </div>
    );
  }
}

export const mapStateToProps = store => ({
  projects: store.projects,
  contributors: store.projectContributors
});

export const mapDispatchToProps = (dispatch) => {
  return {
    handleProjectsFetch: () => {
      dispatch(projectsEndpoint());
    },
    showContributors: (id) => {
      dispatch(contributorsEndpoint(id));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Projects);