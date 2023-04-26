const grpc = require("@grpc/grpc-js");
const PROTO_PATH = 'grpc/news.proto';
const protoLoader = require('@grpc/proto-loader');
const options = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  };
const packageDefinition = protoLoader.loadSync(PROTO_PATH, options);
const newsProto = grpc.loadPackageDefinition(packageDefinition);
const myService = newsProto.NewsService;


  function makeGrpcCall(city, summary) {
    console.log("sending data for analysis");
    const client = new myService('localhost:50051', grpc.credentials.createInsecure());
    console.log(city);
    console.log(summary);
    client.GetAnalysis({ city, summary }, (error, response) => {
      if (error) {
        console.log("Inside error");
          console.error(error);
      } else {
          console.log(response);
      }
  })
  }

  module.exports ={makeGrpcCall};