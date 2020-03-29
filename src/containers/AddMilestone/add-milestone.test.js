import React from 'react';
import { render, cleanup, queryByAttribute, fireEvent, getByTestId, act } from 'react-testing-library';
import { BrowserRouter as Router } from 'react-router-dom';
import { AddMilestone } from './add-milestone.component';
import { MilestoneMap } from './MilestoneMap/milestone-map.component';

describe('Add Milestone', () => {
  afterAll(cleanup);

  const getById = queryByAttribute.bind(null, 'id');
  const { container } = render(
    <Router>
      <AddMilestone />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });


  test('Inputs render properly', async () => {
    
    const routeToAdd = getById(container, 'routeToAddId');
    const radio1 = getById(container, 'radio1Id');
    const radio2 = getById(container, 'radio2Id');
    const name = getById(container, 'nameId');
    const description = getById(container, 'descriptionId');
    const latitude = getById(container, 'latitudeId');
    const longitude = getById(container, 'longitudeId');
    const altitude = getById(container, 'altitudeId');

    expect(routeToAdd).not.toBe(null);
    expect(radio1).not.toBe(null);
    expect(radio2).not.toBe(null);
    expect(name).not.toBe(null);
    expect(description).not.toBe(null);
    expect(latitude).not.toBe(null);
    expect(longitude).not.toBe(null);
    expect(altitude).not.toBe(null);

  });

  
  it("Submission test wrong coordinates", () => {

    const { container, rerender } = render(<AddMilestone />);
    const inputName = getByTestId(container, "nameId");
    const inputDescription = getByTestId(container, "descriptionId");
    const latitude = getByTestId(container, "latitudeId");
    const longitude = getByTestId(container, "longitudeId");
    const altitude = getByTestId(container, "altitudeId");
    const submitButton = getByTestId(container, "submitId");

    fireEvent.change(inputName, { target: { value: "" } });
    fireEvent.change(inputDescription, { target: { value: "" } });
    fireEvent.change(latitude, { target: { value: "..." } }); 
    fireEvent.change(longitude, { target: { value: "..." } }); 
    fireEvent.change(altitude, { target: { value: "..." } }); 

    
    act(() => {
      fireEvent.click(submitButton);

      expect(inputName.value).toEqual("");
      expect(inputDescription.value).toEqual("");
      expect(latitude.value).toEqual("");
      expect(longitude.value).toEqual("");
      expect(altitude.value).toEqual("");

      rerender(<AddMilestone />);
    });
  });

    
  it("Submission test correct inputs", () => {

    const { container, rerender } = render(<AddMilestone />);
    const inputName = getByTestId(container, "nameId");
    const inputDescription = getByTestId(container, "descriptionId");
    const latitude = getByTestId(container, "latitudeId");
    const longitude = getByTestId(container, "longitudeId");
    const altitude = getByTestId(container, "altitudeId");
    const submitButton = getByTestId(container, "submitId");

    fireEvent.change(inputName, { target: { value: "My Milestone" } });
    fireEvent.change(inputDescription, { target: { value: "Breath-taking views" } });
    fireEvent.change(latitude, { target: { value: 120 } }); 
    fireEvent.change(longitude, { target: { value: 111 } }); 
    fireEvent.change(altitude, { target: { value: 3 } }); 

    
    act(() => {
      fireEvent.click(submitButton);

      expect(inputName.value).toEqual("My Milestone");
      expect(inputDescription.value).toEqual("Breath-taking views");
      expect(latitude.value).toEqual("120");
      expect(longitude.value).toEqual("111");
      expect(altitude.value).toEqual("3");

      rerender(<AddMilestone />);
    });
  });
      
  it("Submission test blank inputs", () => {

    const { container, rerender } = render(<AddMilestone />);
    const inputName = getByTestId(container, "nameId");
    const inputDescription = getByTestId(container, "descriptionId");
    const latitude = getByTestId(container, "latitudeId");
    const longitude = getByTestId(container, "longitudeId");
    const altitude = getByTestId(container, "altitudeId");
    const submitButton = getByTestId(container, "submitId");

    fireEvent.change(inputName, { target: { value: "" } });
    fireEvent.change(inputDescription, { target: { value: "" } });
    fireEvent.change(latitude, { target: { value: "" } }); 
    fireEvent.change(longitude, { target: { value: "" } }); 
    fireEvent.change(altitude, { target: { value: "" } }); 

    
    act(() => {
      fireEvent.click(submitButton);

      expect(inputName.value).toEqual("");
      expect(inputDescription.value).toEqual("");
      expect(latitude.value).toEqual("");
      expect(longitude.value).toEqual("");
      expect(altitude.value).toEqual("");

      rerender(<AddMilestone />);
    });
  });

  it("Radio buttons test", () => {

    const { container, rerender } = render(<AddMilestone />);
    const firstRadioButton = getByTestId(container, "radio1Id");
    const secondRadioButton = getByTestId(container, "radio2Id");

    fireEvent.change(firstRadioButton, { target: { checked: true } });
    fireEvent.change(secondRadioButton, { target: { checked: false } });

    act(() => {
      expect(firstRadioButton.checked).toEqual(true);
      expect(secondRadioButton.checked).toEqual(false);
      rerender(<AddMilestone />);
    });
  });  

  
  it("Radio buttons click test", () => {

    const { container, rerender } = render(<AddMilestone />);
    const firstRadioButton = getByTestId(container, "radio1Id");
    const secondRadioButton = getByTestId(container, "radio2Id");

    fireEvent.click(firstRadioButton);

    act(() => {
      expect(firstRadioButton.checked).toEqual(true);
      expect(secondRadioButton.checked).toEqual(false);
      rerender(<AddMilestone />);
    });
  });  

  it("Accordion test", () => {

    const accordion = getById(container, 'accordionId');

    expect(accordion).not.toEqual(null);
  });

});

describe('Add Milestone Map', () => {
  afterAll(cleanup);

  const { container } = render(
    <Router>
      <MilestoneMap />
    </Router>
  );

  test('App renders without crashing', () => {
    expect(container).toBeTruthy();
  });


});