/* @flow */

import React from 'react';
import classNames from 'classnames';



type Props = {
  href: ?string,
  className: ?string,
};

const Button = (props: Props) =>
  props.href
    ? <a {...props} className={classNames('Button', props.className)} />
    : <button {...props} className={classNames('Button', props.className)} />



/*
    Button.defaultProps = {
      username: 'Jack',
    };

Because our function is a one-liner (of JSX) 
we can drop the return statement and drop the {} surrounding the body.

Stateless functional component
When a component is this simple (nothing wrong with this!) and it doesn’t need to
maintain state, you can use a function to define it. The body of the function is the
substitute to your render() method. The function takes all the properties as its first
argument—that’s why in the body you use props.href as opposed to the class/object
version this.props.href.


<button class="Button">Click me</button>
<a href="http://reactjs.com" class="Button">Follow me</a>
<button class="Button custom">I do nothing</button>
*/

export default Button
