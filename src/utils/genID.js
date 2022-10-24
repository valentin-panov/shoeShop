function genID() {
  return `${Date.now()}${Math.random().toString(36).substring(2)}`;
}

module.exports = genID;
