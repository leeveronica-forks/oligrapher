import React, { Component, PropTypes } from 'react';
import BaseComponent from './BaseComponent';
import ds from '../NodeDisplaySettings';

export default class NodeCircle extends BaseComponent {
  render() {
    return (
      <g className="nodeCircle">    
        {this._bgCircle()}
        {this._circle()}
      </g>
    );
  }

  _bgCircle() {
    const { scale, status } = this.props.node.display;
    const r = ds.circleRadius * scale;
    const bgColor = ds.bgColor[status];
    const bgOpacity = ds.bgOpacity[status];
    const bgRadius = r + (ds.bgRadiusDiff * scale);
    return <circle className="node-background" r={bgRadius} fill={bgColor} opacity={bgOpacity}></circle>;
  }

  _circle() {
    const n = this.props.node;
    const { scale, status, image } = n.display;
    const r = ds.circleRadius * scale;
    const clipId = `image-clip-${n.id}`;
    const clipPath = `url(#${clipId})`;
    const imageWidth = r * ds.imageScale;
    const imageOpacity = ds.imageOpacity[status];
    const innerHTML = { __html:
      `<clipPath id="${clipId}">
         <circle r="${r}" opacity="1"></circle>
       </clipPath>
       <image
         class="handle"
         x="${-imageWidth/2}"
         y="${-imageWidth/2}"
         xlink:href="${image}"
         height="${imageWidth}"
         width="${imageWidth}"
         opacity="${imageOpacity}"
         clip-path="${clipPath}">
       </image>`
    };

    return image ? 
        <g dangerouslySetInnerHTML={innerHTML} /> :
        <circle 
          className="handle" 
          r={r}
          fill={ds.circleColor[status]}
          opacity="1">
        </circle>;
  }
}