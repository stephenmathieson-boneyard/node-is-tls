
# isTLS

  check if a socket's first packet is secure

## Example

```js
server.on('connection', function(socket){
  socket.once('data', function(packet){
    if (isTLS(packet)) {
      doSecureStuff()
    } else {
      doInsecureStuff();
    }
  });
});
```

## License

  MIT
