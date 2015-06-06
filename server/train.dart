library lm.train;

import 'dart:convert' show JSON, UTF8, ASCII;
import 'dart:io';
import 'package:lovementor/point.dart';
import 'package:lovementor/logistic_regression.dart';

void main() {
  String jsonStr = '';
  List samples = JSON.decode(jsonStr);
  //get feature
  List<Point21> trainData = new List(samples.length);
  for (int i = 0; i < samples.length; i++) {
    List x_tmp = new List(21);
    x_tmp[i] = 0;
    for (int j = 0; j < 21; j++) {
      x_tmp[i] += ((samples[i]['context'])[j]) - '0'; 
    }
    trainData[i] = new Point21(x_tmp, samples[i]['label']);
  }
  //train
  Weight weight = trainSGD(trainData, 0.001, 2000);
  var myFile = new File('file.txt');
  myFile.writeAsStringSync(weight.toString());
}