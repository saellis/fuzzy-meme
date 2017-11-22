"use strict";


const chai = require('chai');
global.chai = chai;

const sinonChai =require('sinon-chai');
chai.use(sinonChai);

import sinon from 'sinon';

global.expect = chai.expect;
chai.should();
global.sinon = sinon;

var jsdom = require('jsdom');
const { JSDOM } = jsdom;

const { document } = (new JSDOM('')).window;
global.document = document;

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
