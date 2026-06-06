function makeFriendsList(friends) {
  const friendsElementUl = document.createElement("ul");

  for (const friend of friends) {
    const friendsElementLi = document.createElement("li");
    friendsElementLi.textContent = `${friend.firstName} ${friend.lastName}`;
    friendsElementUl.appendChild(friendsElementLi);
  }

  return friendsElementUl;
}
