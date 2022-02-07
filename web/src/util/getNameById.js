function getNameById(categories, id) {
  if (id == 0) return "无";
  for (let i in categories) {
    let element = categories[i];
    if (Number(element.id) == Number(id)) {
      return element.name;
    }
  }
  return "wrong id";
}

export default getNameById;