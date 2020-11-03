{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "/home/michael/training-app/pokerstove/src/lib"
      ],
      "libraries":[
        "/home/michael/training-app/pokerstove/build/src/lib/pokerstove/penum/libpenum.a",
        "/home/michael/training-app/pokerstove/build/src/lib/pokerstove/peval/libpeval.a",
      ],
      'cflags_cc': [ '-fexceptions' ]
    }
  ]
}