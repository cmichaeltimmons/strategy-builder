#include <nan.h>
#include <boost/program_options.hpp>
#include <pokerstove/penum/ShowdownEnumerator.h>
#include <pokerstove/peval/CardSet.h>
#include <vector>
#include <string>
using namespace std;
using namespace pokerstove;
using namespace Nan;
using namespace v8;

void GameSimulator(const Nan::FunctionCallbackInfo<v8::Value> &args)
{
    v8::Local<v8::Context> context = args.GetIsolate()->GetCurrentContext();
    v8::Isolate *isolate = args.GetIsolate();

    //convert args to std
    v8::String::Utf8Value heroRange(isolate, args[0]);
    std::string stdHeroRange(*heroRange);
    v8::String::Utf8Value villianRange(isolate, args[1]);
    std::string stdVillianRange(*villianRange);

    //create a holdem evaluator
    const string game = string("h");
    boost::shared_ptr<PokerHandEvaluator> evaluator =
        PokerHandEvaluator::alloc(game);

    //add hands to CardDistribution object: handDists
    vector<pokerstove::CardDistribution>
        handDists;
    handDists.emplace_back();
    handDists.back().parse(stdHeroRange);
    handDists.emplace_back();
    handDists.back().parse(stdVillianRange);

    //run montecarlo simulations
    ShowdownEnumerator showdown;
    vector<pokerstove::EquityResult> results =
        showdown.calculateEquity(handDists, CardSet(""), evaluator);

    //covert simulation results to json Object
    v8::Local<v8::Object> jsonObject = Nan::New<v8::Object>();
    v8::Local<v8::String> heroProp = Nan::New("heroWins").ToLocalChecked();
    v8::Local<v8::String> villianProp = Nan::New("villianWins").ToLocalChecked();
    v8::Local<v8::String> tiesProp = Nan::New("ties").ToLocalChecked();
    v8::Local<v8::Value> heroValue = Nan::New(results[0].winShares);
    v8::Local<v8::Value> villianValue = Nan::New(results[1].winShares);
    v8::Local<v8::Value> tiesValue = Nan::New(results[0].tieShares);
    Nan::Set(jsonObject, heroProp, heroValue);
    Nan::Set(jsonObject, villianProp, villianValue);
    Nan::Set(jsonObject, tiesProp, tiesValue);

    args.GetReturnValue().Set(jsonObject);
}

void Init(v8::Local<v8::Object> exports)
{
    v8::Local<v8::Context> context = exports->CreationContext();
    exports->Set(context,
                 Nan::New("runGameSimulations").ToLocalChecked(),
                 Nan::New<v8::FunctionTemplate>(GameSimulator)
                     ->GetFunction(context)
                     .ToLocalChecked());
}

NODE_MODULE(addon, Init)