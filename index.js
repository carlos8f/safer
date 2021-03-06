var cryptic = require('cryptic')
  , prompt = require('cli-prompt')

exports.safe = function (passphrase, obj, p, cb) {
  cryptic(passphrase, JSON.stringify(obj)).encrypt().toFile(p, cb);
};

exports.unsafe = function (passphrase, p, cb) {
  cryptic.fromFile(passphrase, p, function (err, c) {
    if (err) return cb(err);
    try {
      c.decrypt();
    }
    catch (e) {
      return cb(e);
    }
    cb(null, JSON.parse(c.toString()));
  });
};

exports.prompt = function (p, cb) {
  prompt.password('passphrase: ', function (passphrase) {
    exports.unsafe(passphrase, p, cb);
  });
};
