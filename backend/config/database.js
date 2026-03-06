import dotenv from 'dotenv';
dotenv.config();


const databaseConfig ={
    url : process.env.MONGODB_URL ? `${ process.env.MONGODB_URL }-winter_x ` : `mongodb://localhost:27017/development`,
    options : {
        maxPoolSize : 20,
        serverSelectionTimeoutMS :5000,
        socketTimeoutMS : 4500,
      
        retryWrites :true,
        w:'majority',
    },

}


export default databaseConfig;