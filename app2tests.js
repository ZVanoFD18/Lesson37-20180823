'use strict';
/*============================================================================
 * TESTS
 */
/**
 * @type {Array} Перечень студентов группы
 **/
let students = [
	new Person('Иванов Иван Иванович', '1990-01-31'),
	new Person('Сидоров Сидор Сидорович', '1991-02-28')
];
let studyGroup = new StudyGroup(students);
console.log(studyGroup);
// Лекция 1
studyGroup.lectureStart('CSS1', '20180513'); // Лекция CSS1 начата
studyGroup.getActiveLecture().addVisit(0); // Студенту 0 отмечен визит
// studyGroup.getActiveLecture().addVisit(0); // Uncaught Error: Посещение уже отмечено.
studyGroup.getActiveLecture().setVote(0, 12); // Студенту 0 установлена оценка 12
studyGroup.getActiveLecture().setVote(0, 11); //Внимание! Студенту 0 будет переопределена оценка  с 12 на 11; Студенту 0 установлена оценка 11
studyGroup.getActiveLecture().addCrystal(0, 3); // Студенту 0 добавлено кристалов 3, остаток 2
studyGroup.getActiveLecture().addCrystal(0, 1); // Студенту 0 добавлено кристалов 1, остаток 1
// studyGroup.getActiveLecture().addCrystal(0, 2); // Uncaught Error: Недостаточно кристаллов. Запрошено 2, остаток 1
// studyGroup.getActiveLecture().setVote(1, 11); // Uncaught Error: Не установлена отметка о посещении
studyGroup.getActiveLecture().addVisit(1); // Студенту 1 отмечен визит
studyGroup.getActiveLecture().setVote(1, 7); // Студенту 1 установлена оценка 7
studyGroup.lectureStop(); // Лекция CSS1 будет остановлена
//studyGroup.getActiveLecture().addVisit(1); // Uncaught Error: Занятие не начато.
// Лекция 2
studyGroup.lectureStart('CSS2', '20180513'); // Лекция CSS2 начата
studyGroup.getActiveLecture().addVisit(0); // Студенту 0 отмечен визит
studyGroup.lectureStop(); // Лекция CSS2 будет остановлена
// Лекция 3
studyGroup.lectureStart('CSS3-1', '20180514'); //Лекция CSS3-1 начата
studyGroup.getActiveLecture().addVisit(0); // Студенту 0 отмечен визит
studyGroup.lectureStop(); // Лекция CSS3-1 будет остановлена
// Лекция 4
studyGroup.lectureStart('CSS3-2', '20180514'); // Лекция CSS3-2 начата
studyGroup.getActiveLecture().addVisit(0); // Студенту 0 отмечен визит
studyGroup.lectureStop(); // Лекция CSS3-2 будет остановлена
// Лекция 5
studyGroup.lectureStart('JS. Введение', '20180515'); // Лекция JS. Введение начата
studyGroup.getActiveLecture().addVisit(0); // Студенту 0 отмечен визит
studyGroup.lectureStop(); // Лекция JS. Введение будет остановлена
// Лекция 6
studyGroup.lectureStart('JS. Типы данных', '20180513'); // Лекция JS. Типы данных начата
studyGroup.getActiveLecture().addVisit(0); //Студенту 0 отмечен визит; Добавлено бонусных кристалов 5 за цепочку 5
console.log('Статистика визитов до остановки лекции', studyGroup.getStatContinuousVisit(
	0));
studyGroup.lectureStop(); // Лекция JS. Типы данных будет остановлена
console.log('Статистика визитов после остановки лекции', studyGroup.getStatContinuousVisit(
	0));
alert('Результат смотрите в console.log(...)')
