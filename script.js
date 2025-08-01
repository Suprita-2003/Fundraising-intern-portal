window.onload = function () {
    const list = document.getElementById('leaderboardList');
    firebase.database().ref('users').once('value', snapshot => {
      list.innerHTML = '';
      snapshot.forEach(child => {
        const data = child.val();
        const li = document.createElement('li');
        li.textContent = `${data.name} - ${data.donations} donations`;
        list.appendChild(li);
      });
    });
  };
  