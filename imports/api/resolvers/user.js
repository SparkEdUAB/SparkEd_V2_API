import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { AuthenticationError } from 'apollo-server-express'
import pick from 'lodash/pick'
import User from '../accounts/account'
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';


const userResolver = {
  
  Query: {

    getUserById(root, args, {user}){
      return Meteor.users.find({'_id': args._id })
    },
 
  },
  Mutation: {
  
    async register(root, { email, password, name, gender, grade, phone }) {

      const profile = {
        gender,
        grade,
        phone,
        name,
        status: 0,
        stats: 1,
      };
    const userDetails = { email, password, profile };  
    const user =  Accounts.findUserByEmail(email);
    if (user) {
      return 'Sorry email already registered.';
    }else{
      Meteor.call('user.insert', userDetails);  
      return 'Sucessfully registered';
  }
    
  
     
    },





   

  },
}

export default userResolver
