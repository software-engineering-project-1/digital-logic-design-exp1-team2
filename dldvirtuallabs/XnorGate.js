/*
 * To change this template, choose Tools | Templates
 * and open the template in the editor.
 */


/**
 *
 * @author rajesh, buddy
 *
 * An Xnor Gate is a freely existing processing element that is a child class of Element Class
 * It has 2 inputs and one output and has its own logic of simulation.
 * It inherits protected variables from the Element class and
 * implements the functions in ElementInterface
 *
 */

//XnorGate.prototype = new Element();
function XnorGate() {
  /*
   * Null Constructor creates a null definition of an XnorGate.
   * with width = 120 pixels, height = 80 pixels, type = "Xnor_Gate"
   * This constructor is called while loading a circuit.
   */
  this.constructor1 = function() {
    elementID = 0;
    elementType = "Xnor_Gate";
    elementName = "";
    numInputs = 0;
    numOutputs = 0;
    maxIO = 3;
    width = 120;
    height = 80;
    inputList = [];
    outputList = [];
    location = new Point();
  }

  /*
   * Constructor with arguments - called when a new XnorGate is added to current circuit
   * Creating an XnorGate with elementID(id), elementType(type) at location(coord)
   * Creates an XnorGate with 2 inputs with ids starting with "inpID", incrementally
   * and outputs with ids starting with "outID" incrementally.
   */
  this.constructor2 = function(id, type, inpId, outId, coord) {
    elementID = id;
    elementType = type;
    elementName = type + String.valueOf(id);
    numInputs = 2;
    numOutputs = 1;
    maxIO = 3;
    width = 120;
    height = 80;
    inputList = [];
    outputList = [];
    inputList.add(new Input(inpId, 0, this, new Point(coord.x-3, coord.y-1)));
    inputList.add(new Input(inpId+1, 1, this, new Point(coord.x-3, coord.y+1)));
    outputList.add(new Output(outId, 0, this, new Point(coord.x+3, coord.y)));
    location = new Point(coord);
  }

  /*
   * Overridden function - updates the location of the XnorGate to Point "p"
   * input and output locations are also updated.
   */
  this.updateLocation = function(p) {
    // Update this.location to (p.x, p.y) for the element
    location.x = p.x;
    location.y = p.y;
    // Update the locations of 2 input nodes to the element
    inputList.elementAt(0).setLocation(new Point(p.x-3, p.y-1));
    inputList.elementAt(1).setLocation(new Point(p.x-3, p.y+1));
    // Update the locations of the single output node to the element
    outputList.elementAt(0).setLocation(new Point(p.x+3, p.y));
  }

  /*
   * Overridden function updateMatrix updates the circuit matrices
   * shifting the Xnor Gate from location "prev" to "p"
   */
  this.updateMatrix = function(p, matrixType, matrixID, prev) {
    /*
     * For a new Xnor Gate, prev is null
     * For an existing Xnor Gate, it is moved from "prev" to "p"
     * Update the matrix values at prev to 0 => no Xnor Gate exists there
     */
    if(prev != null) {
      for (var i = -3; i < 4; i++) {                               // update element type and ID
        for (var j = -2; j < 3; j++) {
          matrixType[prev.y - j][prev.x - i] = 0;
          matrixID[prev.y - j][prev.x - i] = 0;
        }
      }
      matrixType[p.y][p.x + 3] = 0;                                 // update output type and ID
      matrixID[p.y][p.x + 3] = 0;
      matrixType[p.y - 1][p.x - 3] = 0;                               // update input type and ID
      matrixType[p.y + 1][p.x - 3] = 0;
      matrixID[p.y - 1][p.x - 3] = 0;
      matrixID[p.y + 1][p.x - 3] = 0;
    }
    /*
     * Update the matrix values at location "p" to elementID and elementType
     */
    for(var i=-3; i<4; i++) {                               // update element type and ID
      for(var j=-2; j<3; j++) {
        matrixType[p.y-j][p.x-i] = 3;
        matrixID[p.y-j][p.x-i] = this.elementID;
      }
    }
    matrixType[p.y][p.x+3] = 2;                                 // update output type and ID
    matrixID[p.y][p.x+3] = this.getOutputAt(0).getOutputID();
    matrixType[p.y-1][p.x-3] = 1;                               // update input type and ID
    matrixType[p.y+1][p.x-3] = 1;
    matrixID[p.y-1][p.x-3] = this.getInputAt(0).getInputID();
    matrixID[p.y+1][p.x-3] = this.getInputAt(1).getInputID();
  }

  /*
   * Overridden function processInputs()
   * processInputs() does an Xnor operation on all its inputs and fills the output nodes
   */
  this.processInputs = function() {
    var value = inputList.elementAt(0).getDataValue();
    for(var i=1; i<inputList.size(); i++) {
      value = value ^ inputList.elementAt(i).getDataValue();
    }
    if(value==0)
      outputList.elementAt(0).setDataValue(1);
    else
      outputList.elementAt(0).setDataValue(0);
  }

  @Override
    function draw(ctx, p) {
        ctx.beginPath();
        ctx.moveTo(p.x-30, p.y-35);
        ctx.quadraticCurveTo(p.x+10, p.y-30, p.x+30, p.y);
        ctx.quadraticCurveTo(p.x+10, p.y+30, p.x-30, p.y+35);
        ctx.quadraticCurveTo(p.x, p.y, p.x-30, p.y-35);
        ctx.closePath();

        ctx.lineWidth=3;
        ctx.fillStyle="#808080";
        ctx.fill();

        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(p.x-37, p.y-35);
        ctx.quadraticCurveTo(p.x-7, p.y, p.x-37, p.y+35);
        ctx.stroke();

        inputList[0].draw(g, new Point(p.x-27, p.y-20));
        inputList[1].draw(g, new Point(p.x-27, p.y+20));
        outputList[0].draw(g, new Point(p.x+30, p.y));
    }
}
