import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './containers/App';
import Users from './components/Users';
import About from './components/About';
import Courses from './components/Courses';
import Course from './components/Course';
import NotFound from './components/NotFound';

export default (
    <Route>
      <Route path="/" component={App} >
        <IndexRoute components={Users} />
        <Route path="/courses" component={Courses} />
        <Route path="/courses/:id" component={Course} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Route>
    </Route>
 );
