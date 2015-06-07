library lm.multi_classifier;

import 'dart:math' hide Point;
import 'point.dart';

const double e = 2.71828;

int classify(Point p, List<Weight> w, int classNum) {
  int bestClass;
  double bestScore = 0.0;
  for (int i = 0; i < classNum; i++) {
    double s = _score(p, w[i]);
    if (s > bestScore) {
      bestScore = s;
      bestClass = i;
    }
  }
  return bestClass;
}

double classify_score(Point p, List<Weight> w, int classNum) {
  int bestClass;
  double bestScore = 0.0;
  for (int i = 0; i < classNum; i++) {
    double s = _score(p, w[i]);
    if (s > bestScore) {
      bestScore = s;
      bestClass = i;
    }
  }
  return bestScore;
}

double zeroOneErrorRate(List<Point> data, List<Weight> w, int classNum) {
  int correctNum = 0, len = data.length;
  for (int i =0; i < len; i++) {
    if (_isCorrect(data[i], classify(data[i], w, classNum)))
      correctNum++;
  }
  return (len - correctNum) / len;
}

double _score(Point p, Weight w) {
  double s = 0.0;
  for (int i = 0; i < p.dimension; i++) {
    s += w.x[i] * p.getX(i+1);
  }
  return pow(e, s) / (1 + pow(e, s));
}

bool _isCorrect(Point p, int Prediction)
  => p.y == Prediction? true: false;

