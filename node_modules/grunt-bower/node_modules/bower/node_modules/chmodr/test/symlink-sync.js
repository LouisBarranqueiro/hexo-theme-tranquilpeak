var chmodr = require("../")
, test = require("tap").test
, mkdirp = require("mkdirp")
, rimraf = require("rimraf")
, fs = require("fs")
, dirs = []

rimraf("dir", function (er) {
  if (er) throw er
  runTest()
})

function runTest () {
  fs.mkdirSync("dir")
  fs.symlinkSync("/bin/sh", "dir/sh-link")

  test("should complete successfully", function (t) {
    chmodr.sync("dir", 0700)
    t.end()
  })

  test("verify chmodr on dir with symlink to system files", function(t) {
    chmodr.sync("dir", 0644)
    t.end()
  })

  test("cleanup", function (t) {
    rimraf("dir", function (er) {
      t.ifError(er)
      t.end()
    })
  })
}
