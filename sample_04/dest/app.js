var App = React.createClass({displayName: "App",
  getInitialState: function() {
    return { 
      message: "",
      savedMessages: []
    };
  },

  updateMessage: function(e) {
    this.setState({ message: e });
  },

  saveMessage: function(message) {
    var messages = this.state.savedMessages.concat(message);
    this.setState({ savedMessages: messages });
  },

  render: function() {
    return (
      React.createElement("div", null, 
        React.createElement(MessageInput, {onChange: this.updateMessage, onSave: this.saveMessage}), 
        React.createElement(Message, {message: this.state.message, savedMessages: this.state.savedMessages})
      )
    );
  }
});

var MessageInput = React.createClass({displayName: "MessageInput",
  _onChange: function(e) {
    this.props.onChange(e.target.value);
  },

  _onKeyDown: function(e) {
    // 13 == Enter Key Code
    if (e.keyCode === 13) {
      this.props.onSave(e.target.value);
      e.target.value = "";
    }
  },

  render: function() {
    return React.createElement("input", {type: "text", onChange: this._onChange, onKeyDown: this._onKeyDown})
  }
});

var Message = React.createClass({displayName: "Message",
  render: function() {
    var key = 0;
    var messages = this.props.savedMessages.map(
      function(message) {
        return React.createElement("li", {key: key++}, message);
      }
    );

    return (
      React.createElement("div", null, 
        React.createElement("p", null, this.props.message), 
        React.createElement("ul", null, messages)
      )
    );
  }
});

React.render(
  React.createElement(App, null),
  document.getElementById('app-container')
);
