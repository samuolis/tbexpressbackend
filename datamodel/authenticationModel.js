const gstore = require('gstore-node')();

const { Schema } = gstore;

/**
 * Create the schema for the User Model
*/
const authenticationSchema = new Schema({
    id: { type: String, required: true },
    access_token: { type: String, required: true  },
    token_refresh_interval_sec: { optional: true },
    created_on: { type: String, default: gstore.defaultValues.NOW, write: false, read: true },
});

/**
 * List entities query shortcut
 */
const listSettings = {
    limit: 15,
    order: { property: 'lastname' }
};
authenticationSchema.queries('list', listSettings);

/**
 * Export the User Model
 * It will generate "User" entity kind in the Datastore
*/
module.exports = gstore.model('authentication', authenticationSchema);
