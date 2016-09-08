import React from 'react';
import $ from 'jquery';

class Users extends React.Component {
  constructor(props) {
    super(props);
    this.state = { users: [] };
  }

  componentWillMount() {
    $.ajax({
      url: 'http://devpoint-ajax-example-server.herokuapp.com/api/v1/users',
      type: 'GET',
    }).done( (users) => {
      this.setState({ users });
    });
  }

  render() {
    let users = this.state.users.map( (user) => {
      return (<li key={user.id} className="collection-item">{`${user.first_name} ${user.last_name}`}</li>);
    });

    return (
        <ul className="collection">
          {users}
        </ul>
      )
    }
}

export default Users;
