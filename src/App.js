import React, { Component } from 'react';
import './App.css';
import HeaderCell, {DayCell} from "./components/HeaderCell/HeaderCell";
import Cell from "./components/Cell/Cell";
import {makeWeek} from "./helpers/weekHelper";
import {makeDays} from "./helpers/table";
import {DragDropContext} from "react-dnd";
import HTML5BACKEND from 'react-dnd-html5-backend'

class App extends Component {
  render() {
    const {weekStart, dayStart, dayEnd, delimiter, cells} = this.props;
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
                <DayCell date={day}/>
              </td>
              {cells[index].map((cell, i) => (
                  <td key={i}>
                    <Cell dayStart={dayStart} deleteEvent={this.props.deleteEvent} replaceEvent={this.props.replaceEvent} events={cell.events} address={cell.address}/>
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
