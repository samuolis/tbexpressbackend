const gstore = require('gstore-node')();

const { Schema } = gstore;

/**
 * Create the schema for the User Model
*/
const userSchema = new Schema({
    user_id: { type: String, required: true  },
    full_name: { optional: true },
    email: { optional: true, validate: 'isEmail'},
    phone_number: { optional: true },
    created_on: { type: String, default: gstore.defaultValues.NOW, write: false, read: true },
});

/**
 * List entities query shortcut
 */
const listSettings = {
    limit: 15,
    order: { property: 'full_name' }
};
userSchema.queries('list', listSettings);

/**
 * Export the User Model
 * It will generate "User" entity kind in the Datastore
*/
module.exports = gstore.model('user', userSchema);
