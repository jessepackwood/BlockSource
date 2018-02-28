import React from 'react';
import { shallow } from 'enzyme';
import ProjectForm from './ProjectForm';

describe('Projects tests', () => {
  let projectForm;
  let mockStore;

  beforeEach( () => {
    projectForm = shallow(<ProjectForm store={mockStore}/>);
  });

  it.skip('should match snapshot', () => {
    expect(projectForm).toMatchSnapshot();
  });
});