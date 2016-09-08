import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Courses extends React.Component {
  constructor(props) {
    super(props);
    this.addCourse = this.addCourse.bind(this);
    this.state = { courses: [] };
  }

  componentWillMount() {
    $.ajax({
      url: '/api/courses/',
      type: 'GET'
    }).done( (courses) => {
      this.setState({ courses });
    });
  }

  addCourse(e) {
    e.preventDefault();
    $.ajax({
      url: '/api/courses',
      type: 'POST',
      data: {
        teacher: this.refs.teacher.value,
        title: this.refs.title.value,
        date: this.refs.date.value
      }
    }).done( (course) => {
      this.refs.form.reset();
      this.setState({ courses: [ { ...course }, ...this.state.courses ]});
    });
  }

  deleteCourse(id) {
    this.setState({
      courses: this.state.courses.filter( c => c._id !== id)
    });

    $.ajax({
      url: `/api/courses/${id}`,
      type: 'DELETE'
    }).fail( () => {
      alert('Course failed to delete');
      this.getCourses();
    });
  }

  render() {
    let courses = this.state.courses.map( (course) => {
      return (
      <div className="row">
        <Link to={`/courses/${course._id}`} key={course._id} className="collection-item">
          {course.title}
        </Link>
        <button className="btn red" onClick={() => this.deleteCourse(course._id)}>
          Delete
        </button>
      </div>
      );
    });

    return (
      <div className="row">
        <form className="col m4" ref="form" onSubmit={this.addCourse}>
          <input ref="teacher" placeholder="teacher" />
          <input ref="title" placeholder="title" />
          <input ref="date" placeholder="date" />
          <button className="btn" type="submit">Add Course</button>
        </form>
        <ul className="col m8 collection">
          {courses}
        </ul>
      </div>
    );
  }
}

export default Courses;
