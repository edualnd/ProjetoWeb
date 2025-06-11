const username = document.getElementById("username");
  const bio = document.getElementById("bio");
  const avatar = document.getElementById("avatar");
const getData = async (event) => {
  event.preventDefault();
  const user = event.target.data.value;
  
  const data = await fetch(`http://localhost:3000/profile/${user}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    }})
  const response = await data.json();
  if(response.sucess){
    return fillProfile(response.user);
  }  
  username.innerText = "Not found";
  bio.innerText = "";
  avatar.innerHTML = ``;
  return
  
  
  
}

const fillProfile = (user) => {
  
  username.innerText = user.username;
  bio.innerText = user.bio;
  if(!user.userImage) {
    avatar.innerHTML = `<img src="" alt="Avatar" class="avatar">`;
  }else{
    avatar.innerHTML = `<img src="http://res.cloudinary.com/dzkegljd1/image/upload/v1749592457/${user.userImage}" alt="Avatar" class="avatar">`;

  }
  return
}
