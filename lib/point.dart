library lm.point;

import 'dart:convert' show JSON;

class Point {
  
  List<double> _x;
  int y;
  
  double getX(int dimension) => _x[dimension -1];
  int get dimension => _x.length;
  Point(List<double> x, this.y) {
    _x = new List();
    _x.add(1.0);
    _x.addAll(x);
  }
  
  String toString() => 'point: ($_x, $y)';
  
}

class Point21 extends Point {
  
  Point21(List<double> inputX, int inputY)
    :super(inputX, inputY);
}

class Weight {
  List<double> x;
  
  Weight(this.x);
  
  add(List<double> addition) {
    for (int i = 0, len = x.length; i < len; i++)
      x[i] + addition[i];
  }
  
  String toString() => JSON.encode(x);
}