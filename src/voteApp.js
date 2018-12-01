let votes = []

/*
 * Generic button component
 * @param class   accepts a class for styling
 * @param handler accepts an event handler
 * @param value   accepts text for the inner HTML
 */
function GenericButton(props) {
  return <button class = {props.class} onClick = {props.handler}>
  {props.value}</button>
}

function TextInput(props) {
  return (
    <div>
      <input onChange = {props.inputHandler}/>
      <GenericButton value = "Submit" handler = {props.handler}/>
    </div>
  )
}

function VoteSection(props) {
  style = {
    display: 'flex',
    flexDirection: 'row',
    height: '25px',
    alignItems: 'center'
  }
  return (
    <div style = {style}>
      <GenericButton value = 'x' class = 'button' handler = {props.removeItem}/>
      <p class = 'textSection'>{props.text}</p>
      <GenericButton value = '+' class = 'button' handler = {props.plus}/>
      <p class = 'numberSection'>{props.number}</p>
      <GenericButton value = '-' class = 'button' handler = {props.minus}/>
    </div>
  )
}

function MainSection(props) {
  return (
    <ul id='myUL'>
      {
        props.listItem.map((item, i) =>
          <VoteSection key = {i}
                       text = {item.text}
                       number = {item.number}
                       handler = {props.handler}
                       plus = {() => props.plus(i)}
                       minus = {() => props.minus(i)}
                       removeItem = {() => props.removeItem(i)}/>
        )
      }
    </ul>
  )
}

class VoteOnIt extends React.Component {
  constructor(props) {
    super(props)
    this.state = {list: [],
                  text: ''}
    this.submitHandler = this.submitHandler.bind(this)
    this.inputHandler = this.inputHandler.bind(this)
    this.removeItem = this.removeItem.bind(this)
    this.plus = this.plus.bind(this)
  }

  plus(i) {
    votes[i].number += 1
    votes.sort((a,b) => {
      return b.number - a.number
    })
    this.setState({list: votes})
  }

  minus(i) {
    votes[i].number -= 1
    votes.sort((a,b) => {
      return b.number - a.number
    })
    this.setState({list: votes})
  }

  removeItem(i) {
    votes.splice(i, 1)
    this.setState({list: votes})
  }

  inputHandler(e) {
    this.setState({text: e.target.value})
  }

  submitHandler() {
    votes.push({text: this.state.text, number: 0})
    votes.sort((a,b) => {
      return b.number - a.number
    })
    this.setState({list: votes})

  }

  render() {
    return (
      <div>
        <TextInput  handler = {this.submitHandler}
        inputHandler = {this.inputHandler}/>
        <MainSection listItem = {this.state.list}
                     removeItem = {this.removeItem}
                     plus = {this.plus}
                     minus = {this.minus.bind(this)}/>
      </div>
    )
  }
}

ReactDOM.render(
  <VoteOnIt/>,
  document.getElementById('root')
)
