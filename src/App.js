import React, { Component } from 'react';
import './App.css';
import HeaderCell, {DayCell} from "./components/HeaderCell/HeaderCell";
import Cell from "./components/Cell/Cell";
import {makeWeek} from "./helpers/weekHelper";
import {makeDays} from "./helpers/table";
import {DragDropContext} from "react-dnd";
import HTML5BACKEND from 'react-dnd-html5-backend'
import EventPreview from "./connectedComponents/EventPreview";

class App extends Component {
  constructor(){
    super();
    const init = new Date();
    this.state={
      currentTime: init,
      minutes: init.getMinutes()
    }
    this.tick =  this.tick.bind(this);
  }
  componentDidMount(){ 
      this.intervalHandle = setInterval(this.tick, 30000);
  }
  componentWillUnmount(){
    clearInterval(this.intervalHandle);
  }
  tick() {
    const current = new Date();
    const min = current.getMinutes();
    if (min !== this.state.minutes) {
      this.setState({
        currentTime: current,
        minutes: current.getMinutes()
      });
    }
  }
  render() {
    const {weekStart, dayStart, dayEnd, cells, delimiter} = this.props;
    const week = makeWeek(weekStart);
    const days = makeDays(dayStart, dayEnd);
    return (
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
        <tr>
          <th width={"8%"}/>
          {week.map((weekDay, index) => (
              <th width={"12.5%"} key={index}>
                <HeaderCell date={weekDay} />
              </th>
          ))}
        </tr>
        {days.map((day, index) => (

            <tr key={index}>
              <td>
                <DayCell date={day} currentTime={this.state.currentTime}/>
                
              </td>

              {cells[index].map((cell, i) => (
                  <td key={i}>
                    <Cell setSubCellHovered={this.props.setSubCellHovered} delimiter={delimiter} miniCells={cell.subCells} dayStart={dayStart} deleteEvent={this.props.deleteEvent} replaceEvent={this.props.replaceEvent} address={cell.address}/>
                  </td>
              ))}

            </tr>
        ))}
        </tbody>
      </table>
    );
  }
}

export default DragDropContext(HTML5BACKEND)(App);
