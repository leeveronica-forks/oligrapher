const BaseComponent = require('./BaseComponent');
const Draggable = require('react-draggable');
const Marty = require('marty');

class Edge extends BaseComponent {
  constructor(){
    super();
    this.displayName = "Edge";
    this.bindAll('_handleStart', '_handleDrag');
  }

  render() {
    let e = this.props.edge;
    let sp = this._getSvgParams(e);

    return (
      <Draggable
        handle=".handle"
        axis="none"
        start={{x: this.props.edge.display.x, y: this.props.edge.display.y}}
        moveOnStartChange={false}
        zIndex={100}
        onStart={this._handleStart}
        onDrag={this._handleDrag} >

        <g id={sp.groupId}>
          <path className="handle edge-background" d={sp.curve} stroke="white" strokeOpacity="0" strokeWidth="5" fill="none"></path>
          <path id={sp.pathId} className="edge-line" d={sp.curve} stroke="black" strokeDasharray={sp.dash} strokeWidth={e.display.scale} fill="none" markerStart={sp.markerStart} markerEnd={sp.markerEnd}></path>
          <text dy={sp.dy} fill="#999" textAnchor="middle" dangerouslySetInnerHTML={sp.textPath}></text>
        </g>

      </Draggable>
    );
  }

  _handleStart(event, ui) {
    // subtract existing control point position from start position so that dragging adds to existing curve instead of replacing it
    let e = this.props.edge;
    this.startDrag = ui.position;
    this.startPosition = { left: e.display.x, top: e.display.y };
    this.startDrag.left = this.startDrag.left - e.display.cx;
    this.startDrag.top = this.startDrag.top - e.display.cy;
  }

  _handleDrag(event, ui) {
    let cx = ui.position.left - this.startDrag.left;
    let cy = ui.position.top - this.startDrag.top;
    let x = this.startPosition.left;
    let y = this.startPosition.top;
    this.app.graphActions.moveEdge(this.props.edge.id, x, y, cx, cy);
  }

  _getSvgParams(edge) {
    let e = edge;

    return {
      curve: `M ${e.display.xa}, ${e.display.ya} Q ${e.display.cx}, ${e.display.cy}, ${e.display.xb}, ${e.display.yb}`,
      groupId: `edge-${e.id}`,
      pathId: `path-${e.id}`,
      dash: e.display.dash ? "5, 2" : "",
      fontSize: 10 * Math.sqrt(e.display.scale),
      dy: -6 * Math.sqrt(e.display.scale),
      textPath: { __html: `<textPath class="labelpath" startOffset="50%" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#${this.pathId}" font-size="${this.fontSize}">${e.display.label}</textPath>` },
      markerStart: (e.display.is_directional && e.display.is_reverse) ? "url(#marker2)" : "",
      markerEnd: (e.display.is_directional && !e.display.is_reverse) ? "url(#marker1)" : ""
    };
  }
}

module.exports = Marty.createContainer(Edge);
