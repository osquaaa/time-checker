const year = document.querySelector('#year')
const days = document.querySelector('#days')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const countdown = document.querySelector('#countdown')
const preloader = document.querySelector('#preloader')
const title = document.querySelector('.title')
const line = document.querySelector('.line') // Находим элемент .line

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
	let diff = nextBirthday - currentTime

	// Если наступил день рождения
	if (diff <= 0 && diff > -3600000) {
		// 1 час после дня рождения
		showBirthdayGreeting()
		return
	}

	// Если час поздравления прошёл
	if (diff <= -3600000) {
		nextBirthday = getNextBirthday()
		year.innerText = nextBirthday.getFullYear()
		diff = nextBirthday - currentTime
		countdown.style.display = 'flex'
		title.innerText = 'до Дня Рождения Стефании осталось:'
		line.style.display = 'block' // Показать линию
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

// Функция для отображения поздравления
function showBirthdayGreeting() {
	countdown.style.display = 'none'
	title.innerText = '🎉 С Днём Рождения, Стефания! 🎂🎁'
	line.style.display = 'none' // Скрыть линию
}

// Инициализация
updateCounter()
setInterval(updateCounter, 1000)

setTimeout(function () {
	preloader.remove()
	countdown.style.display = 'flex'
}, 1000)
