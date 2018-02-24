import React from 'react';
import { shallow } from 'enzyme';
import { Search, mapStateToProps, mapDispatchToProps } from './Search';

describe('Search tests', () => {
  let mockSearchInput;
  let inputChange;
  let mockProjects;
  let search;

  beforeEach( () => {
    mockSearchInput = 'hoverboard';
    inputChange = jest.fn();
    mockProjects = [{title: 'hoverboard'}, {title: 'flying cars'}]

    search = shallow(<Search 
                        searchInput={mockSearchInput}
                        projects={mockProjects}
                        inputChange={inputChange}
                      />)
  })

  it('should match the snapshot', () => {
    expect(search).toMatchSnapshot()
  })

  describe('mapStateToProps tests', () => {
    it.skip('should pull projects from the store', () => {
      const mockSearchInput = {value: 'bit'}
      const mockStore = {
        projects: mockProjects,
        searchInput: mockSearchInput.value
      };
      const result = mapStateToProps(mockStore);

      expect(result.projects).toEqual(mockStore.projects);
    });
  });

  describe('mapDispatchToProps tests', () => {
    it('Should call dispatch when inputChange is called', () => {
      const mockDispatch = jest.fn();
      const result = mapDispatchToProps(mockDispatch);

      result.inputChange('hoverboard');
      expect(mockDispatch).toHaveBeenCalled();
    })
  })
})