const displayBtn = document.querySelector('#display')

displayBtn.addEventListener('click', fetchSharks)

function fetchSharks() {
  fetch("http://localhost:5000/sharks/")
  .then(resp => resp.json())
  .then(addShark)
}
 
 
function addShark(data) {
  //targets shark list
  const sharkList = document.querySelector('#sharks') 
  //creates a variable for the argument passed
  const sharks = data
  //sets the ul list content to empty
  sharkList.textContent = ''
  //add fruit to the list
  sharks.forEach(shark => {
    const li = document.createElement('li')
    li.textContent = shark.name
    sharkList.appendChild(li)
  })
}

const form = document.getElementById('sharkForm')

form.addEventListener('submit', createShark)

async function createShark(e) {
  e.preventDefault()
  console.log(e.target.shark.value)

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name: e.target.shark.value
    })
  }

  const response = await fetch("http://localhost:5000/sharks/", options)

  if (response.status == 201) {
    e.target.shark.value = ''
  }
}