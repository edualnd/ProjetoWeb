import bcrypt from 'bcrypt';
const hashPass = async (password) => {
  return bcrypt.hashSync(password, 10);
};

const compare = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { hashPass, compare };
