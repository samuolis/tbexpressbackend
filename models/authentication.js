const Authentication = require('../datamodel/authenticationModel');

const getAuthentications = (req ,res) => {
    const pageCursor = req.query.cursor;

    // List users with the Query settings defined on Schema
    Authentication.list({ start: pageCursor })
        .then((entities) => {
            res.json(entities);
        })
        .catch(err => res.status(400).json(err));
};

const getAuthentication = (req, res) => {
    const userId = +req.params.id;
    Authentication.findOne({user_id: userId})
        .then((entity) => {
            res.json(entity.plain());
        })
        .catch(err => res.status(400).json(err));
};

const createAuthentication = (req, res) => {
    const entityData = Authentication.sanitize(req.body);
    console.log('entity Data ' + entityData);
    console.log('req.body ' + req.body);
    const authentication = new Authentication(entityData);
    console.log('authentication ' + authentication);

    authentication.save()
        .then((entity) => {
            res.json(entity.plain());
        })
        .catch((err) => {
            // If there are any validation error on the schema
            // they will be in this error object
            res.status(400).json(err);
        })
};

createAuthenticationFunction = function (req, callback) {
    const entityData = Authentication.sanitize(req);
    console.log('entity Data ' + JSON.stringify(entityData));
    console.log('req.body ' + JSON.stringify(req));
    const authentication = new Authentication(entityData);
    console.log('authentication ' + JSON.stringify(authentication));

    authentication.save()
        .then((entity) => {
            callback(entity);
        })
        .catch((err) => {
            // If there are any validation error on the schema
            // they will be in this error object
            callback(err);
        })
};

const updateAuthentication = (req, res) => {
    const userId = +req.params.id;
    const entityData = Authentication.sanitize(req.body); // { email: 'john@snow.com' }
    const ancestors = ['authentication', 'user_id'];
    /**
     * This will fetch the entity, merge the data and save it back to the Datastore
    */
    Authentication.update(userId, entityData)
        .then((entity) => {
            res.json(entity.plain());
        })
        .catch((err) => {
            // If there are any validation error on the schema
            // they will be in this error object
            res.status(400).json(err);
        });
};

const deleteAuthentication = (req, res) => {
    const userId = +req.params.id;
    Authentication.delete(userId)
        .then((response) => {
            res.json(response);
        })
        .catch(err => res.status(400).json(err));
};

module.exports = {
    getAuthentications,
    getAuthentication,
    createAuthenticationFunction,
    createAuthentication,
    updateAuthentication,
    deleteAuthentication
};
