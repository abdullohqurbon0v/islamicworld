class UserDto {
  constructor(payload) {
    this.id = payload._id || payload.id;
    this.fullName = payload.fullName;
    this.email = payload.email;
    this.phone = payload.phone;
    this.createdAt = payload.createdAt;
  }
}

module.exports = UserDto;
