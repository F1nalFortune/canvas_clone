import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router';

class Course extends React.Component {
  constructor(props) {
    super(props);
    this.addAssignment = this.addAssignment.bind(this);
    this.state = { course: {}, assignments: [] };
  }

  componentWillMount() {
    $.ajax({
      url: `/api/courses/${this.props.params.id}`,
      type: 'GET'
    }).done( (course) => {
      this.setState({ course });
    });

    $.ajax({
      url: `/api/courses/${this.props.params.id}/assignments`,
      type: 'GET'
    }).done( assignments => {
      this.setState({ assignments })
    })
  }

  addAssignment(e) {
    e.preventDefault();
    $.ajax({
      url: `/api/courses/${this.props.params.id}/assignments`,
      type: 'POST',
      data: {
        name: this.refs.name.value,
        directions: this.refs.directions.value,
      }
    }).done( (assignment) => {
      this.refs.form.reset();
      this.setState({ assignments: [ { ...assignment }, ...this.state.assignments ]});
    });
  }

  deleteAssignment(id) {
    this.setState({
      assignments: this.state.assignments.filter( c => c._id !== id)
    });

    $.ajax({
      url: `/api/courses/assignments/${id}`,
      type: 'DELETE'
    }).fail( () => {
      alert('Course failed to delete');
      this.getCourses();
    });
  }

  render() {
    let { title, teacher, date } = this.state.course;
    let assignments = this.state.assignments.map( assignment => {
      return (
        <div className="row">
          <Link to={`/assignments/${assignment._id}`} key={assignment._id} className="collection-item">
            {assignment.name}
          </Link>
          <button className="btn red" onClick={() => this.deleteAssignment(assignment._id)}>
            Delete
          </button>
        </div>
        /* <li className="collection-item" key={assignment._id}>{assignment.name}</li> */
      )
    })
    return (
        <div className="container">
          <h4>{title}</h4>
          <h5>{teacher}</h5>
          <h5>{date}</h5>
          <hr />
          <div className="row">
            <div className="col m6">
              <h3>Add Assignment</h3>
            </div>
            <div className="col m6">
              <form ref="form" onSubmit={this.addAssignment}>
                <input ref="name" placeholder="name" />
                <textarea ref="directions" placeholder="directions"></textarea>
                <button className="btn" type="submit">Add Assignment</button>
              </form>
            </div>
          </div>
          <div className="row">
            <div className="col m12">
              <ul className="collection">
                {assignments}
              </ul>
            </div>
          </div>
        </div>
      );
    }
}


export default Course;

