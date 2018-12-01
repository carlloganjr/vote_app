var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var votes = [];

/*
 * Generic button component
 * @param class   accepts a class for styling
 * @param handler accepts an event handler
 * @param value   accepts text for the inner HTML
 */
function GenericButton(props) {
  return React.createElement(
    'button',
    { 'class': props.class, onClick: props.handler },
    props.value
  );
}

function TextInput(props) {
  return React.createElement(
    'div',
    null,
    React.createElement('input', { onChange: props.inputHandler }),
    React.createElement(GenericButton, { value: 'Submit', handler: props.handler })
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
    React.createElement(GenericButton, { value: 'x', 'class': 'button', handler: props.removeItem }),
    React.createElement(
      'p',
      { 'class': 'textSection' },
      props.text
    ),
    React.createElement(GenericButton, { value: '+', 'class': 'button', handler: props.plus }),
    React.createElement(
      'p',
      { 'class': 'numberSection' },
      props.number
    ),
    React.createElement(GenericButton, { value: '-', 'class': 'button', handler: props.minus })
  );
}

function MainSection(props) {
  return React.createElement(
    'ul',
    { id: 'myUL' },
    props.listItem.map(function (item, i) {
      return React.createElement(VoteSection, { key: i,
        text: item.text,
        number: item.number,
        handler: props.handler,
        plus: function plus() {
          return props.plus(i);
        },
        minus: function minus() {
          return props.minus(i);
        },
        removeItem: function removeItem() {
          return props.removeItem(i);
        } });
    })
  );
}

var VoteOnIt = function (_React$Component) {
  _inherits(VoteOnIt, _React$Component);

  function VoteOnIt(props) {
    _classCallCheck(this, VoteOnIt);

    var _this = _possibleConstructorReturn(this, (VoteOnIt.__proto__ || Object.getPrototypeOf(VoteOnIt)).call(this, props));

    _this.state = { list: [],
      text: '' };
    _this.submitHandler = _this.submitHandler.bind(_this);
    _this.inputHandler = _this.inputHandler.bind(_this);
    _this.removeItem = _this.removeItem.bind(_this);
    _this.plus = _this.plus.bind(_this);
    return _this;
  }

  _createClass(VoteOnIt, [{
    key: 'plus',
    value: function plus(i) {
      votes[i].number += 1;
      votes.sort(function (a, b) {
        return b.number - a.number;
      });
      this.setState({ list: votes });
    }
  }, {
    key: 'minus',
    value: function minus(i) {
      votes[i].number -= 1;
      votes.sort(function (a, b) {
        return b.number - a.number;
      });
      this.setState({ list: votes });
    }
  }, {
    key: 'removeItem',
    value: function removeItem(i) {
      votes.splice(i, 1);
      this.setState({ list: votes });
    }
  }, {
    key: 'inputHandler',
    value: function inputHandler(e) {
      this.setState({ text: e.target.value });
    }
  }, {
    key: 'submitHandler',
    value: function submitHandler() {
      votes.push({ text: this.state.text, number: 0 });
      votes.sort(function (a, b) {
        return b.number - a.number;
      });
      this.setState({ list: votes });
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        'div',
        null,
        React.createElement(TextInput, { handler: this.submitHandler,
          inputHandler: this.inputHandler }),
        React.createElement(MainSection, { listItem: this.state.list,
          removeItem: this.removeItem,
          plus: this.plus,
          minus: this.minus.bind(this) })
      );
    }
  }]);

  return VoteOnIt;
}(React.Component);

ReactDOM.render(React.createElement(VoteOnIt, null), document.getElementById('root'));