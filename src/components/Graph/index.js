import Element from '../Element';
import "jointjs/dist/joint.css";
require('jquery');
require('lodash');
require('backbone');
window.joint = require('jointjs');
var joint = window.joint;

joint.V.matrixToTransformString = function (matrix) {
    // eslint-disable-next-line
    matrix || (matrix = true);
    return 'matrix(' + [
        matrix.a || 1,
        matrix.b || 0,
        matrix.c || 0,
        matrix.d || 1,
        matrix.e || 0,
        matrix.f || 0
    ] + ')';
};

joint.V.prototype.transform = function (matrix, opt) {
    var node = this.node;
    if (joint.V.isUndefined(matrix)) {
        return node.parentNode ?
            this.getTransformToElement(node.parentNode) :
            node.getScreenCTM();
    }
    if (opt && opt.absolute) {
        return this.attr('transform', joint.V.matrixToTransformString(matrix));
    }
    var svgTransform = joint.V.createSVGTransform(matrix);
    node.transform.baseVal.appendItem(svgTransform);
    return this;
};

/**
 * @name Graph
 * @classdesc Represents a graph.
 * @mixes IFocusable
 */
class Graph extends Element {
    /**
     * Creates a new Graph.
     *
     * @param {object} args - The arguments. Extends the pcui.Element constructor arguments. All settable properties can also be set through the constructor.
     * @param {boolean} [args.unsafe] - If true then the innerHTML property will be used to set the text. Otherwise textContent will be used instead.
     */
    constructor(args) {
        if (!args) args = {};

        super(document.createElement('div'), args);
        var graph = new joint.dia.Graph();

        var rect = new joint.shapes.standard.Rectangle();
        rect.position(100, 30);
        rect.resize(100, 40);
        rect.attr({
            body: {
                fill: 'blue'
            },
            label: {
                text: 'Hello',
                fill: 'white'
            }
        });
        rect.addTo(graph);

        var rect2 = new joint.shapes.standard.Rectangle();
        rect2.position(400, 30);
        rect2.resize(100, 40);
        rect2.attr({
            body: {
                fill: '#2C3E50',
                rx: 5,
                ry: 5,
                strokeWidth: 2
            },
            label: {
                text: 'World!',
                fill: '#3498DB',
                fontSize: 18,
                fontWeight: 'bold',
                fontVariant: 'small-caps'
            }
        });
        rect2.addTo(graph);

        var link = new joint.shapes.standard.Link();
        link.source(rect);
        link.target(rect2);
        link.attr({
            line: {
                stroke: 'blue',
                strokeWidth: 1,
                sourceMarker: {
                    'type': 'path',
                    'stroke': 'black',
                    'fill': 'red',
                    'd': 'M 10 -5 0 0 10 5 Z'
                },
                targetMarker: {
                    'type': 'path',
                    'stroke': 'black',
                    'fill': 'yellow',
                    'd': 'M 10 -5 0 0 10 5 Z'
                }
            }
        });
        link.labels([{
            attrs: {
                text: {
                    text: 'Hello, World!'
                }
            }
        }]);
        link.addTo(graph);

        var rect3 = new joint.shapes.standard.Rectangle();
        rect3.position(100, 130);
        rect3.resize(100, 40);
        rect3.attr({
            body: {
                fill: '#E74C3C',
                rx: 20,
                ry: 20,
                strokeWidth: 0
            },
            label: {
                text: 'Hello',
                fill: '#ECF0F1',
                fontSize: 11,
                fontVariant: 'small-caps'
            }
        });
        rect3.addTo(graph);

        var rect4 = new joint.shapes.standard.Rectangle();
        rect4.position(400, 130);
        rect4.resize(100, 40);
        rect4.attr({
            body: {
                fill: '#8E44AD',
                strokeWidth: 0
            },
            label: {
                text: 'World!',
                fill: 'white',
                fontSize: 13
            }
        });
        rect4.addTo(graph);

        var link2 = new joint.shapes.standard.Link();
        link2.source(rect3);
        link2.target(rect4);
        link2.vertices([
            new joint.g.Point(250, 100),
            new joint.g.Point(300, 150),
            new joint.g.Point(350, 200)
        ]);
        link2.router('orthogonal');
        link2.connector('rounded');
        link2.attr({
            line: {
                stroke: 'gray',
                strokeWidth: 4,
                strokeDasharray: '4 2',
                sourceMarker: {
                    'type': 'image',
                    'xlink:href': 'http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png',
                    'width': 24,
                    'height': 24,
                    'y': -12
                },
                targetMarker: {
                    'type': 'image',
                    'xlink:href': 'http://cdn3.iconfinder.com/data/icons/49handdrawing/24x24/left.png',
                    'width': 24,
                    'height': 24,
                    'y': -12
                }
            }
        });
        link2.addTo(graph);

        var link3 = new joint.shapes.standard.Link();
        link3.source(rect3);
        link3.target(rect4);
        link3.connector('jumpover', { size: 10 });
        link3.addTo(graph);

        var rect5 = new joint.shapes.standard.Rectangle();
        rect5.position(100, 230);
        rect5.resize(100, 40);
        rect5.attr({
            body: {
                fill: '#2ECC71',
                strokeDasharray: '10,2'
            },
            label: {
                text: 'Hello',
                fill: 'black',
                fontSize: 13
            }
        });
        rect5.addTo(graph);

        var rect6 = new joint.shapes.standard.Rectangle();
        rect6.position(400, 230);
        rect6.resize(100, 40);
        rect6.attr({
            body: {
                fill: '#F39C12',
                rx: 20,
                ry: 20,
                strokeDasharray: '1,1'
            },
            label: {
                text: 'World!',
                fill: 'gray',
                fontSize: 18,
                fontWeight: 'bold',
                fontVariant: 'small-caps',
                textShadow: '1px 1px 1px black'
            }
        });
        rect6.addTo(graph);

        var link4 = new joint.shapes.standard.Link();
        link4.source(rect5);
        link4.target(rect6);
        link4.attr({
            line: {
                stroke: '#3498DB',
                strokeWidth: 3,
                strokeDasharray: '5 5',
                strokeDashoffset: 7.5,
                sourceMarker: {
                    'type': 'path',
                    'stroke': 'none',
                    'fill': '#3498DB',
                    'd': 'M 20 -10 0 0 20 10 Z ' +
                         'M 40 -10 20 0 40 10 Z'
                },
                targetMarker: {
                    'type': 'path',
                    'stroke': 'none',
                    'fill': '#3498DB',
                    'd': 'M 7.5 -10 2.5 -10 2.5 10 7.5 10 Z ' +
                         'M 17.5 -10 12.5 -10 12.5 10 17.5 10 Z ' +
                         'M 40 -10 20 0 40 10 Z'
                }
            }
        });
        link4.addTo(graph);
    }
}

export default Graph;
