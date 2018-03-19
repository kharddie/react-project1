

import React from 'react';
import ReactDOM from 'react-dom';
import Logo from './components/Logo';
import Excel from './components/Excel';
import Button from './components/Button';
import Suggest from './components/Suggest'

import "./css/main.css";
import "purecss";

var headers = localStorage.getItem('headers');
var data = localStorage.getItem('data');

if (!headers) {
    headers = ['Title', 'Year', 'Rating', 'Comments'];
    data = [['Test', '2015', '3', 'meh']];
}

ReactDOM.render(
    <div>
        <h1>
            <Logo /> Welcome to Whinepad!
    </h1>
        <h2>Buttons</h2>
        <div>Button with onClick: <Button onClick={() => alert('ouch')}>Click me</Button></div>
        <div>A link: <Button href="http://reactjs.com">Follow me</Button></div>
        <div>Custom class name: <Button className="custosssssm">I do nothing</Button></div>

        <h2>Suggest</h2>
        <div><Suggest optionz={['eenie', 'meenie', 'miney', 'mo']} /></div>

        <Excel headers={headers} initialData={data} />
    </div>,
    document.getElementById('root')
);
