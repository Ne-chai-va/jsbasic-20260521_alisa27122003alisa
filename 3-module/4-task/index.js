function showSalary(users, age) {
  const filteredUsers = users.filter((item) => item.age <= age);
  return filteredUsers
    .map(
      (item, index, array) =>
        `${item.name}, ${item.balance}` +
        (index < array.length - 1 ? "\n" : ""),
    )
    .join("");
}
