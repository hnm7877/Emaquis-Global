const {userQueries} = require("../requests/UserQueries");

exports.getExpiredDate = (date) => {
    return new Date(date) > new Date();

};

exports.getUserDetails = async (session) => {
    if(session.forEvent){

        const user = await userQueries.getUserById(session.id);
        return {
            ...session,
            ...user.result._doc,
            id: user.result._id
        };
    }
    return session

}