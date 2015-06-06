library main;

import 'dart:async';
import "dart:io" show Platform;

import "package:stream/stream.dart";
import "package:stream/plugin.dart" show Router, DefaultRouter;
import "package:lovementor/query_love.dart";

void main(List<String> arguments) {
  new StreamServer.router(_getRouter(), homeDir: "client").start();
}

DefaultRouter _getRouter() => new DefaultRouter(
  uriMapping: <String, RequestHandler> {
    //"/": connect.,
    "/q": queryLove,
  },
  protectRSP: false);

///Loads the static resources
Future _static(HttpConnect connect)
  => connect.server.resourceLoader.load(connect, connect.request.uri.path.substring(2));