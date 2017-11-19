import Login from '../login.component.jsx';
import LoginFieldContainer from '../../../containers/login/loginField.container.jsx';

import React from 'react';
import { mount, shallow } from 'enzyme';
import { loginAction }  from '../../../actions/users.actions';


describe('<Login>', function () {

  it('should have two inputs', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find(LoginFieldContainer)).to.have.length(2);
  });

  it('should have a button', function () {
    const wrapper = shallow(<Login/>);
    expect(wrapper.find('button')).to.have.length(1);
  });

});