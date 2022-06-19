var UserProfile = (function () {
  var name = "";
  var lastName = "";
  var email = "";
  var password = "";
  var weight = "";
  var height = "";

  var getName = function () {
    name = localStorage.getItem("name");
    return name;
  };

  var setName = function (name) {
    name = name;
    localStorage.setItem("name", name);
  };

  var getLastName = function () {
    lastName = localStorage.getItem("lastName");
    return lastName;
  };

  var setLastName = function (lastName) {
    lastName = lastName;
    localStorage.setItem("lastName", lastName);
  };

  var getEmail = function () {
    email = localStorage.getItem("email");
    return email;
  };
  var setEmail = function (email) {
    email = email;
    localStorage.setItem("email", email);
  };
  var getPassword = function () {
    password = localStorage.getItem("password");
    return password;
  };
  var setPassword = function (password) {
    password = password;
    localStorage.setItem("password", password);
  };
  var getWeight = function () {
    weight = localStorage.getItem("weight");
    return weight;
  };
  var setWeight = function (weight) {
    weight = weight;
    localStorage.setItem("weight", weight);
  };
  var getHeight = function () {
    height = localStorage.getItem("height");
    return height;
  };
  var setHeight = function (height) {
    height = height;
    localStorage.setItem("height", height);
  };

  return {
    getName: getName,
    setName: setName,
    getLastName: getLastName,
    setLastName: setLastName,
    getEmail: getEmail,
    setEmail: setEmail,
    getPassword: getPassword,
    setPassword: setPassword,
    getWeight: getWeight,
    setWeight: setWeight,
    getHeight: getHeight,
    setHeight: setHeight,
  };
})();

export default UserProfile;
