import React from "react";
import PropTypes from "prop-types";
import data from "./data/usa-map-dimensions";
import USAState from "./components/USAState";


class USAMap extends React.Component {

  componentDidMount() {

    let triggers = document.getElementsByClassName("state");
    for (let i = 0; i < triggers.length; i++) {
      triggers[i].addEventListener("mousemove", this.showTooltip);
      triggers[i].addEventListener("mouseout", this.hideTooltip);
    }
  }
  showTooltip(evt) {
    let svg = document.getElementById("tooltip-svg");
    let tooltip = document.getElementById("tooltip");
    let CTM = svg.getScreenCTM();
    let mouseX = (evt.clientX - CTM.e) / CTM.a;
    let mouseY = (evt.clientY - CTM.f) / CTM.d;
    tooltip.setAttributeNS(null, "x", mouseX + 6 / CTM.a);
    tooltip.setAttributeNS(null, "y", mouseY + 20 / CTM.d);
    tooltip.setAttributeNS(null, "visibility", "visible");


    let tooltipText = tooltip.getElementsByTagName("tspan");
    console.log(tooltipText)
    //tooltipText.firstChild.data = evt.target.getAttributeNS(null, "data-tooltip-text");
  }
  hideTooltip() {
    let tooltip = document.getElementById("tooltip");
    tooltip.setAttributeNS(null, "visibility", "hidden");
  }

    clickHandler = (stateAbbreviation) => {
      this.props.onClick(stateAbbreviation);
    };

    fillStateColor = (state) => {
      if (this.props.customize && this.props.customize[state] && this.props.customize[state].fill) {
        return this.props.customize[state].fill;
      }

      return this.props.defaultFill;
    };


    stateClickHandler = (state) => {
      if (this.props.customize && this.props.customize[state] && this.props.customize[state].clickHandler) {
        return this.props.customize[state].clickHandler
      }
      return this.clickHandler;
    }

    stateMouseHover = (state) => {

    }

    buildPaths = () => {
      let paths = [];
      for (let stateKey in data) {
        const path = <USAState key={stateKey} dimensions={data[stateKey]["dimensions"]} state={stateKey} fill={this.fillStateColor(stateKey)} onClickState={this.stateClickHandler(stateKey)} onMouseHover={this.stateMouseHover(stateKey)} datatext={stateKey}/>
        /*  const title = <title>{stateKey}</title>
              const g = <g className="tooltip"> {path} {title} </g>*/
        paths.push(path);
      };
      return paths;
    };

    render() {
      let x = this.props.xLegend;
      let y = this.props.yLegend;
      let yrect1 = y + 15;
      let yrect2 = y + 51;
      let tHeader = x + 75;
      let txCol = x + 5;
      let tyCol = y + 5;
      let tCell =  x + 95;



      return (
        <svg id="tooltip-svg" className="us-state-map" xmlns="http://www.w3.org/2000/svg" width={this.props.width} height={this.props.height} viewBox="0 0 959 593">
          <g className="outlines">
            {this.buildPaths()}
            <g id="tooltip" visibility="hidden" >
              <rect x={ x } y={ yrect1 } width='150' height='20' fill='gainsboro'/>
              <rect x={ x } y={ yrect2 } width='150' height='20' fill='gainsboro'/>

              <text x={ txCol } y={ tyCol } fontSize='18px' fontWeight='bold' fill='crimson' textAnchor='middle' role="row">
                <tspan role="columnheader" x={ tHeader }>Sales Report</tspan>
              </text>

              <text x={ txCol } y={ tyCol } fontSize='18px' textAnchor='middle' role="row">
                <tspan role="rowheader" x={ txCol } dy='1.5em' fontWeight='bold' fill='crimson' textAnchor='start'>Home</tspan>
                <tspan role="cell" x={ tCell }>$ 223</tspan>
              </text>

              <text x={ txCol } y={ tyCol } fontSize='18px' textAnchor='middle' role="row">
                <tspan role="rowheader" x={ txCol } dy='2.5em' fontWeight='bold' fill='crimson' textAnchor='start'>Auto</tspan>
                <tspan role="cell" x={ tCell }>$ 183</tspan>
              </text>
              <text x={ txCol } y={ tyCol } fontSize='18px' textAnchor='middle' role="row">
                <tspan role="rowheader" x={ txCol } dy='3.5em' fontWeight='bold' fill='crimson' textAnchor='start'>Total</tspan>
                <tspan role="cell" x={ tCell }>$ 183</tspan>
              </text>
            </g>
            <g className="DC state">
              <path className="DC1" fill={this.fillStateColor("DC1")} d="M801.8,253.8 l-1.1-1.6 -1-0.8 1.1-1.6 2.2,1.5z" />
              <circle className="DC2" onClick={this.clickHandler} data-name={"DC"} fill={this.fillStateColor("DC2")} stroke="#FFFFFF" strokeWidth="1.5" cx="801.3" cy="251.8" r="5" opacity="1" />
            </g>
          </g>
        </svg>
      );
    }
}

USAMap.propTypes = {
  onClick: PropTypes.func.isRequired,
  width: PropTypes.number,
  height: PropTypes.number,
  title: PropTypes.string,
  defaultFill: PropTypes.string,
  customize: PropTypes.object,
  xLegend: PropTypes.number,
  yLegend: PropTypes.number
};

USAMap.defaultProps = {
  onClick: () => {},
  width: 1070,
  height: 593,
  defaultFill: "#D3D3D3",
  title: "Blank US states map",
  customize: {},
  xLegend: 820,
  yLegend:380
};

export default USAMap;
