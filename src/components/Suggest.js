/* @flow */

/*
import React from 'react';
const Component = React.Component;
const PropTypes = React.PropTypes;
*/
import React, { Component, PropTypes } from 'react';


type Props = {
  id?: string,
  defaultValue?: string,
  options: Array<string>,
};

type State = {
  value: string,
};


export default class Suggest extends Component {

  static props: Props;
  static state: State;

  constructor(props: Props) {
    super(props);
    this.state = { value: props.defaultValue || '' };/*this is a replacement of getInitialState() you use in the pre-ES6 world. */ 
  }

  getValue(): string {
    return this.state.value;
  }

  render() {
    const randomid: string = Math.random().toString(16).substring(2);
    return (
      <div>
        <input
          list={randomid}
          defaultValue={this.props.defaultValue}
          onChange={e => this.setState(
            {
              value: e.target.value
            }
          )}

          id={this.props.id} />

        <datalist id={randomid}>{
          this.props.optionz.map((item: string, idx: number) => <option value={item} key={idx} /> )}
        </datalist>
      </div>
    );
  }
}


