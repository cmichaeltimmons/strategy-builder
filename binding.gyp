{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "/home/michael/training-app/OMPEval/omp"
      ],
      "libraries":[
        "/home/michael/training-app/OMPEval/lib/ompeval.a"
      ],
      'cflags_cc': [ '-fexceptions', '-fPIC' ],
    }
  ]
}