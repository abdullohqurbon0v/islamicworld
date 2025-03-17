class UserDto {
  fullName;
  email;
  phone;
  id;
  createdAt;

  constructor(payload) {
    this.fullName = payload.fullName;
    this.email = payload.email;
    this.phone = payload.phone;
    this.createdAt = payload.createdAt;
    this.id = payload._id;
  }
}

module.exports = UserDto;
