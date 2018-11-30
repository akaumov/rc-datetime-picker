import React, {Component} from 'react';
import classNames from 'classnames/bind';
import blacklist from 'blacklist';

import Calendar from './panels/Calendar.jsx';
import Time from './panels/Time.jsx';
import Shortcuts from './panels/Shortcuts.jsx';


class Picker extends Component {
  constructor() {
    super();
    this.state = {
      panel: 'calendar',
      calendarPanel: 'day'
    };
  }

  changePanel = (panel) => {
    this.setState({
      panel,
      calendarPanel: 'day'
    });
  }

  changeCalendarPanel = (panel) => {
    this.setState({
      panel,
      calendarPanel: panel
    });
  }

  handleCancel = () => {
    if (this.props.onCancel) {
        this.props.onCancel();
    }
  };

  handleBackToDayPanel = (e) => {
      e.stopPropagation();
      this.setState({
          calendarPanel: 'day'
      })
  };

  handleBackToMonthPanel = (e) => {
      e.stopPropagation();
      this.setState({
          calendarPanel: 'month'
      })
  };

  render() {
    const {
      isOpen = true,
      shortcuts,
      splitPanel,
      showTimePicker = true,
      showCalendarPicker = true,
      showBackButton = false
    } = this.props;
    const {panel, calendarPanel} = this.state;
    const isTimePanel = panel === 'time';
    const isCalendarPanel = panel === 'calendar';
    const className = classNames('datetime-picker', this.props.className, {
      split: splitPanel
    });
    const props = blacklist(this.props, 'className', 'splitPanel', 'isOpen');

    return (
      <div className={className} style={{display: isOpen ? 'block' : 'none'}} onClick={(evt) => evt.stopPropagation()}>
        {shortcuts
          ? <Shortcuts {...props} />
          : undefined
        }

        {splitPanel
          ? <div className="panel-nav">
            <button type="button" onClick={this.changePanel.bind(this, 'calendar')} className={isCalendarPanel ? 'active' : ''}>
              <i className="fa fa-calendar-o"></i>Date
            </button>
            <button type="button" onClick={this.changePanel.bind(this, 'time')} className={isTimePanel ? 'active' : ''}>
              <i className="fa fa-clock-o"></i>Time
            </button>
          </div>
          : undefined
        }

        {showCalendarPicker
          ? <Calendar {...props} isOpen={isOpen} panel={calendarPanel} onChangePanel={this.changeCalendarPanel} style={{display: isCalendarPanel || !splitPanel ? 'block' : 'none'}} />
          : undefined
        }

        {showTimePicker
          ? <Time {...props} style={{display: isTimePanel || !splitPanel ? 'block' : 'none'}} />
          : undefined
        }
        {showBackButton && showCalendarPicker && calendarPanel === 'day' &&
            <div className='back-button' onClick={this.handleCancel}>Cancel</div>
        }
        {showBackButton && showCalendarPicker && calendarPanel === 'month' &&
          <div className='back-button' onClick={this.handleBackToDayPanel}>Back</div>
        }
        {showBackButton && showCalendarPicker && calendarPanel === 'year' &&
          <div className='back-button' onClick={this.handleBackToMonthPanel}>Back</div>
        }
      </div>
    );
  }
}


export default Picker;
