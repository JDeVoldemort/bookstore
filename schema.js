const graphql = require('graphql');

const { GraphQLObjectType, GraphQLString, 
       GraphQLID, GraphQLInt, GraphQLSchema } = graphql;

var bookStoreDB = [
{name:"Book 1", pages:452, id:1, author:"Author 1", publishDate:"12/12/12", aquireDate:"12/12/12", publisher:"Publisher 1", edition:"First"},
{name:"Book 2", pages:453, id:2, author:"Author 1", publishDate:"12/12/12", aquireDate:"12/12/12", publisher:"Publisher 1", edition:"First"},
{name:"Book 3", pages:452, id:3, author:"Author 1", publishDate:"12/12/12", aquireDate:"12/12/12", publisher:"Publisher 1", edition:"First"}
]
const BookType = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID  },
        name: { type: GraphQLString },
        pages: { type: GraphQLInt },
        author: { type: GraphQLString }, 
        publishDate: { type: GraphQLString },
        aquireDate: { type: GraphQLString },
        publisher: { type: GraphQLString },
        edition: { type: GraphQLString },

    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            //argument passed by the user while making the query
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //Here we define how to get data from database source

                //this will return the book with id passed in argument by the user
                return bookStoreDB.find((item) => { return item.id == args.id});
            }
        }
    }
});