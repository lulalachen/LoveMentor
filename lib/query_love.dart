library lm.query_love;

import "dart:async";
import "dart:io";
import "dart:convert";
import "package:stream/stream.dart";
import 'point.dart';
import 'muti_classifier';

Future queryLove(HttpConnect connect) {
  return readAsString(connect.request)
  .then((_) {
    List sample = JSON.decode(_);
    //get feature
    List x_tmp = new List(21);
    x_tmp = 0;
    for (int j = 0; j < 21; j++) {
      x_tmp[j] += ((sample['context'])[j]) - '0'; 
    }
    Point21 data = new Point21(x_tmp, 0);
    File myFile = new File('file.txt');
    String str = myFile.readAsStringSync();
    List w = JSON.decode(str);
    //get percentag
    double score = classify_score(data, w, 2);
    String jsonBack = JSON.encode(score);
    connect.response.write(jsonBack);
  });
}

/** Reads the entire stream as a string using the given [Encoding].
 */
Future<String> readAsString(Stream<List<int>> stream, 
    {Encoding encoding: UTF8}) {
  final List<int> result = [];
  return stream.listen((data) {
    result.addAll(data);
  }).asFuture().then((_) {
    return encoding.decode(result);
  });
}
/** Reads the entire stream as a JSON string using the given [Encoding],
 * and then convert to an object.
 */
Future<dynamic> readAsJson(Stream<List<int>> stream,
    {Encoding encoding: UTF8})
=> readAsString(stream, encoding: encoding).then((String data) => JSON.decode(data));