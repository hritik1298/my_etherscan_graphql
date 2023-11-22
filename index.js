const { ApolloServer } = require("apollo-server");   // Import ApolloServer and graphql-import
const { importSchema } = require("graphql-import");  // Load schema from schema.graphql file
const EtherDataSource = require("./datasource/ethDatasource"); // Import EtherDataSource data source
const typeDefs = importSchema("./schema.graphql");  // Load schema into typeDefs constant

// Load environment variables from .env file
require("dotenv").config();

const resolvers = {
  Query: {
    etherBalanceByAddress: (root, _args, { dataSources }) => // Get ether balance for an address
      dataSources.ethDataSource.etherBalanceByAddress(),

    totalSupplyOfEther: (root, _args, { dataSources }) => // Get total ether supply
      dataSources.ethDataSource.totalSupplyOfEther(),

    latestEthereumPrice: (root, _args, { dataSources }) => // Get latest ETH price
      dataSources.ethDataSource.getLatestEthereumPrice(),

    blockConfirmationTime: (root, _args, { dataSources }) => // Get block confirmation time
      dataSources.ethDataSource.getBlockConfirmationTime(),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({
    // DataSource for Ethereum data
    ethDataSource: new EtherDataSource(),
    // Insert code comments
  }),
});


// Set no timeout limit
server.timeout = 0;
server.listen("9000").then(({ url }) => {
  // Log message when server starts
  console.log(`🚀 Server ready at ${url}`)
});

