const getData = async (event) => {
  event.preventDefault();
  const username = event.target.username.value;
  
  const data = await fetch(`http://localhost:3000/profile/${username}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }})
  const response = await data.json();
  
  return fillProfile(response.user);
  
}

const fillProfile = (user) => {
  const username = document.getElementById("username");
  const bio = document.getElementById("bio");
  const avatar = document.getElementById("avatar");
  username.innerText = user.username;
  bio.innerText = user.bio;
  if(!user.userImage) {
    avatar.innerHTML = `<img src="" alt="Avatar" class="avatar">`;
  }else{
    avatar.innerHTML = `<img src="../backend/uploads/${user.userImage}" alt="Avatar" class="avatar">`;

  }
  return
}
