const isDescendant = (parent, child) => {
  let node = child.parentNode;
  while (node != null) {
    if (node.tagName === parent) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
};

export default isDescendant;
