const year = document.querySelector('#year')
const days = document.querySelector('#days')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const countdown = document.querySelector('#countdown')
const preloader = document.querySelector('#preloader')

// Дата дня рождения (7 января)
function getNextBirthday() {
	const currentDate = new Date()
	let birthday = new Date(`${currentDate.getFullYear()}-01-07T00:00:00`)

	// Если день рождения уже прошёл в этом году, устанавливаем на следующий год
	if (currentDate > birthday) {
		birthday = new Date(`${currentDate.getFullYear() + 1}-01-07T00:00:00`)
	}

	return birthday
}

let nextBirthday = getNextBirthday()
year.innerText = nextBirthday.getFullYear()

function updateCounter() {
	const currentTime = new Date()
	const diff = nextBirthday - currentTime

	// Если день рождения наступил, обновляем на следующий год
	if (diff <= 0) {
		nextBirthday = getNextBirthday()
		year.innerText = nextBirthday.getFullYear()
	}

	const daysLeft = Math.floor(diff / 1000 / 60 / 60 / 24)
	const hoursLeft = Math.floor(diff / 1000 / 60 / 60) % 24
	const minutesLeft = Math.floor(diff / 1000 / 60) % 60
	const secondsLeft = Math.floor(diff / 1000) % 60

	days.innerText = daysLeft < 10 ? '0' + daysLeft : daysLeft
	hours.innerText = hoursLeft < 10 ? '0' + hoursLeft : hoursLeft
	minutes.innerText = minutesLeft < 10 ? '0' + minutesLeft : minutesLeft
	seconds.innerText = secondsLeft < 10 ? '0' + secondsLeft : secondsLeft
}

updateCounter()
setInterval(updateCounter, 1000)

setTimeout(function () {
	preloader.remove()
	countdown.style.display = 'flex'
}, 1000)
