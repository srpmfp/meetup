// src/__tests__/App.test.js
import { render } from '@testing-library/react';
import React from 'react';
import App from '../App';


describe('<App /> component', () => {
    let AppDom;
    beforeEach(() => {
        AppDom = render(<App />).container.firstChild;

    })

    test('renders list of events', () => {
        expect(AppDom.querySelector('#event-list')).toBeInTheDocument();
    });

    test('render city search', () => {
        expect(AppDom.querySelector('#city-search')).toBeInTheDocument();
    })

    test('render number of events', () => {
        expect(AppDom.querySelector('#eventCount')).toBeInTheDocument();
    })
});