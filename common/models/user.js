var properties = {
  profile: {type: String, required: false},
  icon: {type: String, required: false}
};

var options = {
  relations: {
    events: {
      type: "hasMany",
      model: "Event",
      foreignKey: "ownerId"
    },
    tickets: {
      type: "hasMany",
      model: "Ticket",
      foreignKey: "purchaserId"
    }
  }
  //acls: []
};

var User = loopback.Model.extend('User', properties, options);
