
var assert = require('assert');
var http = require('http');
var https = require('https');
var net = require('net');
var isTLS = require('./');

describe('isTLS(buf)', function(){
  var server;
  var port;
  var ondata;

  before(function(done){
    // boot
    server = net.createServer();
    server.listen(function(){
      port = server.address().port;
      done();
    });

    // get a packet thunk
    getPacket = function(){
      return function(fn){
        var socket;

        server.once('connection', connection);

        // on connection
        function connection(_){
          socket = _;
          socket.once('data', ondata);
        }

        // on first packet
        function ondata(buf){
          socket.destroy()
          fn(null, buf);
        }
      };
    };
  });

  after(function(done){
    server.close(done);
  });

  it('should be a function', function(){
    assert('function' == typeof isTLS);
  });

  describe('given an HTTP packet', function(){
    it('should return false', function*(){
      http.request({ host: 'localhost', port: port }, noop).end();
      var packet = yield getPacket();
      assert(!isTLS(packet));
    });
  });

  describe('given an HTTPS packet', function(){
    it('should return true', function*(){
      https.request({ host: 'localhost', port: port }, noop).end();
      var packet = yield getPacket();
      assert(isTLS(packet));
    });
  });
});

function noop(){}
