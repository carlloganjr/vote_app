var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function GenericButton(props) {
  return React.createElement(
    'button',
    { 'class': props.class, onClick: props.submitHandler },
    props.value
  );
}

function TextInput(props) {
  return React.createElement(
    'div',
    null,
    React.createElement('input', { submitHandler: props.submitHandler }),
    React.createElement(GenericButton, { value: 'Submit', submitHandler: props.submitHandler })
  );
}

function VoteSection(props) {
  style = {
    display: 'flex',
    flexDirection: 'row',
    height: '25px',
    alignItems: 'center'
  };
  return React.createElement(
    'div',
    { style: style },
    React.createElement(GenericButton, { value: 'x', 'class': 'button' }),
    React.createElement(
      'p',
      { 'class': 'textSection' },
      props.text
    ),
    React.createElement(GenericButton, { value: '+', 'class': 'button' }),
    React.createElement(
      'p',
      { 'class': 'numberSection' },
      props.number
    ),
    React.createElement(GenericButton, { value: '-', 'class': 'button' })
  );
}

function MainSection(props) {
  return React.createElement(
    'ul',
    null,
    props.listItem.map(function (item) {
      return React.createElement(VoteSection, { text: item.text,
        number: item.number });
    })
  );
}

var VoteOnIt = function (_React$Component) {
  _inherits(VoteOnIt, _React$Component);

  function VoteOnIt(props) {
    _classCallCheck(this, VoteOnIt);

    var _this = _possibleConstructorReturn(this, (VoteOnIt.__proto__ || Object.getPrototypeOf(VoteOnIt)).call(this, props));

    _this.state = { text: '',
      number: 0,
      list: [] };
    _this.submitHandler = _this.submitHandler.bind(_this);
    return _this;
  }

  _createClass(VoteOnIt, [{
    key: 'submitHandler',
    value: function submitHandler() {
      this.setState({ list: [] });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(TextInput, { submitHandler: this.submitHandler }),
        React.createElement(MainSection, { listItem: this.state.list })
      );
    }
  }]);

  return VoteOnIt;
}(React.Component);

ReactDOM.render(React.createElement(VoteOnIt, null), document.getElementById('root'));