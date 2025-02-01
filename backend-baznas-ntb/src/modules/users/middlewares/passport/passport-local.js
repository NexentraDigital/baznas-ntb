import { Strategy } from 'passport-local';
import { findUniqueByEmail } from '../../helpers/repository/find-one-many.js';

export default function LocalStategy(){
    return new Strategy({usernameField: "email"}, async function(email,password, cb){
        const result = await findUniqueByEmail("admin", email);
    })
}
