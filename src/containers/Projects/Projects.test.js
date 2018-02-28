import React from 'react';
import { Projects, mapStateToProps, mapDispatchToProps } from './Projects';
import { shallow } from 'enzyme';

describe('Projects Container', () => {
  describe('Projects', () => {
    let projects;
    const mockHandleProjectsFetch = jest.fn();
    const mockShowContributors = jest.fn();

    beforeEach( () => {
      projects = shallow(
        <Projects 
          handleProjectsFetch={mockHandleProjectsFetch}
          showContributors={mockShowContributors}
        />);
    });

    it('should exist', () => {
      expect(projects).toBeDefined();
    });

    it('should match the snapshot', () => {
      expect(projects).toMatchSnapshot();
    });

    it('should call loginUser on form submit', () => {
      projects.instance().componentDidMount();
      expect(mockHandleProjectsFetch).toHaveBeenCalled();
    });

  });

  describe('mapStateToProps', () => {
    let mockStore;
    let result;

    beforeAll(() => {
      mockStore = {
        projects: ['project', 'project2']
      }
      result = mapStateToProps(mockStore);
    });

    it('should pull projects from the store', () => {
      expect(result.projects).toEqual(mockStore.projects);
    });

  });

  describe('mapDispatchToProps', () => {
    let mockDispatch;
    let result;

    beforeEach(() => {
      mockDispatch = jest.fn();
      result = mapDispatchToProps(mockDispatch);
    });

    it('should call dispatch when handleProjectsFetch is called', () => {

      result.handleProjectsFetch();
      expect(mockDispatch).toHaveBeenCalled();
    });

    it('should call dispatch when showContributors is called', () => {
      const mockProjectId = 'id';

      result.showContributors(mockProjectId);
      expect(mockDispatch).toHaveBeenCalled();
    });

  });
});