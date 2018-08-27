'use strict';
/*
За посещение +1 монета студенту.
За 5 посещений без пропуска +5 кристаллов "из ниоткуда" студенту.
На одно заняте преподавателю выделяется 5 кристаллов для поощрения.
За один день неограниченное количество занятий.
*/
/**
 * Количество кристаллов на одно занятие.
 */
const CNT_CRYSTAL_PER_LECTURE = 5;
/**
 * Количество бонусных кристаллов
 */
const CNT_BONUS_CRYSTAL = 5;
/**
 * Количество непрерывных визитов для получения бонуса.
 */
const CNT_BONUS_VISITS = 5;
/**
 * Класс "Учебная группа".
 * @param {Array} students Студенты учебной группы.
 */
function StudyGroup(students) {
	let data = {
		/**
		 * @type {Person}
		 **/
		teacher: undefined,
		/**
		 * Активная лекция, которая идет в данный момент.
		 * @type {Lecture}
		 **/
		activeLecture: undefined,
		/**
		 * @type {Array of Lecture}
		 **/
		lectures: [],
		students: students
	}
	this.getStudents = function() {
		return data.students;
	}
	this.isLectureStarted = function() {
		return data.activeLecture instanceof Lecture;
	}
	this.getActiveLecture = function() {
		if (!this.isLectureStarted()) {
			throw new Error('Занятие не начато.');
		}
		return data.activeLecture;
	}
	this.lectureStart = function(theme, dStart) {
		if (this.isLectureStarted()) {
			throw new Error('Занятие уже начато.');
		}
		let lecture = new Lecture(this, theme, dStart, CNT_CRYSTAL_PER_LECTURE);
		// ...какая-то работа по инициализации лекции на уровне учебной группы...
		data.activeLecture = lecture;
		console.log('Лекция ' + data.activeLecture.getTheme() + ' начата');
	}
	this.lectureStop = function() {
		if (!this.isLectureStarted()) {
			throw new Error('Занятие не начато.');
		}
		// @TODO: Посчитать статистику в накопительных регистрах
		console.log('Лекция ' + data.activeLecture.getTheme() + ' будет остановлена');
		data.lectures.push(data.activeLecture);
		data.activeLecture = undefined;
	}
	this.checkStudentExists = function(studentIndex) {
		if (studentIndex < 0 || studentIndex >= data.students.length) {
			throw new Error('Студент не найден.');
		}
	}
	this.getStatContinuousVisit = function(studentIndex) {
		this.checkStudentExists(studentIndex);
		let result = 0;
		for (let i = data.lectures.length - 1; i >= 0; i--) {
			let statItem = data.lectures[i].getStatItem(studentIndex);
			if (!statItem.isVisited) {
				break;
			}
			++result;
		}
		return result;
	}
}
/**
 * Клас "Лекция".
 * Хранит информацию о конкретной лекции.
 * @param {StudyGroup} studyGroup - группа, в которой проходит/ла лекция
 */
function Lecture(studyGroup, theme, dLecture, cntCrystal) {
	let data = {
		restCrystal: cntCrystal,
		theme: theme,
		date: dLecture,
		stat: []
	}
	studyGroup.getStudents().forEach(function() {
		let statItem = new LectureStatItem();
		data.stat.push(statItem);
	});
	this.getTheme = function() {
		return data.theme;
	}
	this.getStatItem = function(index) {
			if (index < 0 || index >= data.stat.length) {
				throw new Error('Нет статистики по студенту ' + index);
			}
			return data.stat[index];
		}
		// this.isVisited = function(index) {}
	this.addVisit = function(index) {
		let statItem = this.getStatItem(index);
		if (statItem.isVisited) {
			throw new Error('Посещение уже отмечено.');
		}
		statItem.isVisited = true;
		console.log('Студенту ' + index + ' отмечен визит');
		let visits = studyGroup.getStatContinuousVisit(index);
		if (visits >= CNT_BONUS_VISITS) {
			statItem.cntCrystal += CNT_BONUS_CRYSTAL;
			statItem.isBonusAdded = true;
			console.log('Добавлено бонусных кристалов ' + CNT_BONUS_CRYSTAL +
				' за цепочку ' + visits);
		}
	}
	this.addCrystal = function(index, value) {
		let statItem = this.getStatItem(index);
		if (!statItem.isVisited) {
			throw new Error('Не установлена отметка о посещении');
		} else if (data.restCrystal - value < 0) {
			throw new Error('Недостаточно кристаллов. Запрошено ' + value +
				', остаток ' + data.restCrystal);
		}
		statItem.cntCrystal += value;
		data.restCrystal -= value;
		console.log('Студенту ' + index + ' добавлено кристалов ' + value +
			', остаток ' + data.restCrystal);
	}
	this.setVote = function(index, value) {
		let statItem = this.getStatItem(index);
		// Блокирующий контроль
		if (!statItem.isVisited) {
			throw new Error('Не установлена отметка о посещении');
		} else if (!(value > 1 && value <= 12)) {
			throw new Error('Указано неверное количество баллов ' + value);
		}
		// Неблокирующий контроль - предупреждения.
		if (statItem.vote !== undefined) {
			alert('Внимание! Студенту ' + index + ' будет переопределена оценка ' +
				' с ' + statItem.vote + ' на ' + value);
		}
		statItem.vote = value;
		console.log('Студенту ' + index + ' установлена оценка ' + value);
	}
}

function LectureStatItem() {
	this.isVisited = false;
	this.cntCrystal = 0;
	this.cntMoney = 0;
	this.vote = undefined;
	this.isBonusAdded = false;
}

function Person(name, birthday) {
	let data = {
		name: name,
		birthday: birthday,
		phones: [],
		inn: undefined,
		/**
		 * Персона отказалась от получения ИНН.
		 **/
		isInnRefuse: false
	};
	this.getName = function() {
		return data.name;
	}
	this.getBirthday = function() {
		return data.birthday;
	}
	this.getPhones = function() {
		return data.phones;
	}

	function validatePhone(value) {}
	this.addPhone = function(value) {
		validatePhone(value);
		data.phones.push(value);
	}
}
