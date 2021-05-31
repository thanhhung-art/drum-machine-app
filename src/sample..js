import React from "react"
import ReactDOM from "react-dom";
import "./index.scss";

const activeStyle = {
  backgroundColor: 'orange',
  boxShadow: '0 3px orange',
  height: 77,
  marginTop: 13
};

const inactiveStyle = {
  backgroundColor: 'grey',
  marginTop: 10,
  boxShadow: '3px 3px 5px black'
};

class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      padStyle: inactiveStyle
    };
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.activatePad = this.activatePad.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }
  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }
  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }
  activatePad() {
    if (this.props.power) {
      if (this.state.padStyle.backgroundColor === 'orange') {
        this.setState({
          padStyle: inactiveStyle
        });
      } else {
        this.setState({
          padStyle: activeStyle
        });
      }
    } else if (this.state.padStyle.marginTop === 13) {
      this.setState({
        padStyle: inactiveStyle
      });
    } else {
      this.setState({
        padStyle: {
          height: 77,
          marginTop: 13,
          backgroundColor: 'grey',
          boxShadow: '0 3px grey'
        }
      });
    }
  }
  playSound() {
    const sound = document.getElementById(this.props.keyTrigger);
    sound.currentTime = 0;
    sound.play();
    this.activatePad();
    setTimeout(() => this.activatePad(), 100);
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }
  render() {
    return (
      <div
        className='drum-pad'
        id={this.props.clipId}
        onClick={this.playSound}
        style={this.state.padStyle}
        >
        <audio
          className='clip'
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
        {this.props.keyTrigger}
      </div>
    );
  }
}

class PadBank extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    let padBank;
    if (this.props.power) {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clip={padBankArr[i].url}
            clipId={padBankArr[i].id}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={this.props.power}
            updateDisplay={this.props.updateDisplay}
          />
        );
      });
    } else {
      padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
        return (
          <DrumPad
            clip='#'
            clipId={padBankArr[i].id}
            keyCode={padBankArr[i].keyCode}
            keyTrigger={padBankArr[i].keyTrigger}
            power={this.props.power}
            updateDisplay={this.props.updateDisplay}
          />
        );
      });
    }
    return <div className='pad-bank'>{padBank}</div>;
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: true,
      display: String.fromCharCode(160),
      currentPadBank: bankOne,
      currentPadBankId: 'Heater Kit',
      sliderVal: 0.3
    };
    this.displayClipName = this.displayClipName.bind(this);
    this.selectBank = this.selectBank.bind(this);
    this.adjustVolume = this.adjustVolume.bind(this);
    this.powerControl = this.powerControl.bind(this);
    this.clearDisplay = this.clearDisplay.bind(this);
  }
  powerControl() {
    this.setState({
      power: !this.state.power,
      display: String.fromCharCode(160)
    });
  }
  selectBank() {
    if (this.state.power) {
      if (this.state.currentPadBankId === 'Heater Kit') {
        this.setState({
          currentPadBank: bankTwo,
          display: 'Smooth Piano Kit',
          currentPadBankId: 'Smooth Piano Kit'
        });
      } else {
        this.setState({
          currentPadBank: bankOne,
          display: 'Heater Kit',
          currentPadBankId: 'Heater Kit'
        });
      }
    }
  }
  displayClipName(name) {
    if (this.state.power) {
      this.setState({
        display: name
      });
    }
  }
  adjustVolume(e) {
    if (this.state.power) {
      this.setState({
        sliderVal: e.target.value,
        display: 'Volume: ' + Math.round(e.target.value * 100)
      });
      setTimeout(() => this.clearDisplay(), 1000);
    }
  }
  clearDisplay() {
    this.setState({
      display: String.fromCharCode(160)
    });
  }
  render() {
    const powerSlider = this.state.power
      ? {
          float: 'right'
        }
      : {
          float: 'left'
        };
    const bankSlider =
      this.state.currentPadBank === bankOne
        ? {
            float: 'left'
          }
        : {
            float: 'right'
          };
    {
      const clips = [].slice.call(document.getElementsByClassName('clip'));
      clips.forEach(sound => {
        sound.volume = this.state.sliderVal;
      });
    }
    return (
      <div className='inner-container' id='drum-machine'>
        <PadBank
          clipVolume={this.state.sliderVal}
          currentPadBank={this.state.currentPadBank}
          power={this.state.power}
          updateDisplay={this.displayClipName}
        />

        <div className='logo'>
          <div className='inner-logo '>{'FCC' + String.fromCharCode(160)}</div>
          <i className='inner-logo fa fa-free-code-camp' />
        </div>

        <div className='controls-container'>
          <div className='control'>
            <p>Power</p>
            <div className='select' onClick={this.powerControl}>
              <div className='inner' style={powerSlider} />
            </div>
          </div>
          <p id='display'>{this.state.display}</p>
          <div className='volume-slider'>
            <input
              max='1'
              min='0'
              onChange={this.adjustVolume}
              step='0.01'
              type='range'
              value={this.state.sliderVal}
            />
          </div>
          <div className='control'>
            <p>Bank</p>
            <div className='select' onClick={this.selectBank}>
              <div className='inner' style={bankSlider} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
