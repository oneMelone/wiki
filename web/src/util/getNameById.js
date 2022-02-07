function getNameById(categories, id) {
  // 在数组categories中找到id为id的对象，返回其name属性
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