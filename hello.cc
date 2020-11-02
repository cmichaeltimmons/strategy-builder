#include <nan.h>
#include <boost/program_options.hpp>
#include <pokerstove/penum/ShowdownEnumerator.h>
#include <pokerstove/peval/CardSet.h>
#include <vector>
#include <string>

using namespace std;
void Method(const Nan::FunctionCallbackInfo<v8::Value> &info)
{
  info.GetReturnValue().Set(Nan::New("world").ToLocalChecked());
}

void Init(v8::Local<v8::Object> exports)
{
  v8::Local<v8::Context> context = exports->CreationContext();
  exports->Set(context,
               Nan::New("hello").ToLocalChecked(),
               Nan::New<v8::FunctionTemplate>(Method)
                   ->GetFunction(context)
                   .ToLocalChecked());
  const string game = string("h");
  vector<pokerstove::CardDistribution> handDists;
  handDists.emplace_back();
  handDists.back().parse("AcAs,KcKs");
  printf("The value of a : %zu", handDists.back().size());
}

NODE_MODULE(hello, Init)