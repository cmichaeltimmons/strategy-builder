{
  "targets": [
    {
      "target_name": "addon",
      "sources": [ "addon.cc" ],
      "include_dirs": [
        "<!(node -e \"require('nan')\")",
        "/usr/src/app/OMPEval/omp"
      ],
      "libraries":[
        "/usr/src/app/OMPEval/lib/ompeval.a"
      ],
      'cflags_cc': [ '-fexceptions', '-fPIC' ],
    }
  ]
}