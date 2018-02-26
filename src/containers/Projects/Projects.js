import React, { Component } from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import './Projects.css';
import FlatButton from 'material-ui/FlatButton';

class Projects extends Component {

  componentDidMount() {
    //fetch projects
    //map over projects and return cards

  }

  mapProjects() {
    console.log('mapping')
    const projects =
      [{
        title: 'Project One',
        description: 'The first project',
        goalAmount: '5000',
        fundAmount: '1000'
      }]

      return projects.map( (project, index) => {
        console.log(project)
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

export default Projects;