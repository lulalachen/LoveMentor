library lm.logistic_r_train;

import 'dart:math' hide Point;
import 'point.dart';

Weight trainLogisticRegression(List<Point> data, double scale, int turns) {
  List<double> zeros = new List.filled(21, 0.0);
  Weight w = new Weight(zeros);
  
  for (int t = 0; t < turns; t++) {
      for (int j = 0; j < w.x.length; j++) {
        w.x[j] = w.x[j] - scale * gradient(data, w, j);
      }
  }
  
  return w;
}

Weight trainSGD(List<Point> data, double scale, int turns) {
  List<double> zeros = new List.filled(21, 0.0);
  Weight w = new Weight(zeros);
  
  Weight bw;
  double br = 1.0;
  
  int t = 0;
  while (t < 2000) {
    for(int i = 0, len  = data.length; i < len; i++) {
      for (int j = 0; j < w.x.length; j++) {
        w.x[j] = w.x[j] + scale * theta(_score(data[i], w) * data[i].y *(-1)) * (data[i].y * data[i].getX(j+1));
      }
      t++;
    }
  }
  
  return bw;
}

double getEin(List<Point> data, Weight w) {
  double r = 0.0;
  int len = data.length;
  for (int i =0; i < len; i++) {
      r += log(1+exp((-1)*data[i].y*_score(data[i], w)));
  }
  return r / len;
}

double zeroOneErrorRate(List<Point> data, Weight w) {
  int correctNum = 0, len = data.length;
  for (int i =0; i < len; i++) {
    if (theta(_score(data[i], w)) > 0.5 && data[i].y == 1)
      correctNum++;
    else if (theta(_score(data[i], w)) <= 0.5 && data[i].y == -1)
      correctNum++;
  }
  return (len - correctNum) / len;
}

double gradient(List<Point> data, Weight w, int d) {
  int len = data.length;
  double err = 0.0;
  for (int i = 0; i < len; i++) {
    err += theta((-1) * data[i].y * _score(data[i], w)) * (-1) * data[i].y * data[i].getX(d+1);
  }
  return err/len;
}

double _score(Point p, Weight w) {
  double s = 0.0;
  for (int i = 0; i < p.dimension; i++) {
    s += w.x[i] * p.getX(i+1);
  }
  return s;
}

double theta(double s)
  => exp(s) / (1 + exp(s));

double sumYX(Point p) {
  double sum = 0.0;
  for (int i = 1; i < p.dimension + 1; i++) {
    sum += p.y * p.getX(i);
  }
  return sum;
}

