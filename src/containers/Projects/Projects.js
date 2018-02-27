import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './Projects.css';
import { connect } from 'react-redux';
import { projectsEndpoint } from '../../actions';
import FlatButton from 'material-ui/FlatButton';

export class Projects extends Component {
  componentDidMount() {
    this.props.handleProjectsFetch()
  }


  mapProjects() {
    console.log('mapping')

    //this.prop.projects returning undefined

    console.log(this.props.projects)
    const projects =
      [{
        title: 'Project One',
        description: 'The first project',
        goalAmount: '5000',
        fundAmount: '1000'
      }]

      return this.projects.map( (project, index) => {
        return <Card 
                  key={index}
                >
                  <CardTitle 
                    title={project.title}
                    subtitle={`Goal Amount: ${project.goalAmount} Fund Amount: ${project.fundAmount}`}
                  />
                  <CardHeader
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
        {this.mapProjects()}
        <Card>
          <CardTitle title="Card title" subtitle="Card subtitle" />
          <CardText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
            Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
            Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
          </CardText>
          <CardActions>
            <FlatButton label="Action1" />
            <FlatButton label="Action2" />
          </CardActions>
        </Card>
      </div>
    )
  }
}

const mapStateToProps = store => ({
  projects: store.projects.projectsData
})

const mapDispatchToProps = (dispatch) => {
  return {
    handleProjectsFetch: () => {
      dispatch(projectsEndpoint())
    }
  }
}

export default connect(null, mapDispatchToProps)(Projects);