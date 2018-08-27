
'use strict';
let tests = {
	'3 + 7': 10,
	'10 - 2': 8,
	'2 * 3': 6,
	'10 / 5': 2,
	'1 / 0': Infinity,
	'1+2': 'Error: Передана строка неверного формата'
};

function Calculator() {
	let methods = {
		'+': function(a, b) {
			return +a + +b;
		},
		'-': function(a, b) {
			return a - b;
		}
	}
	this.addMethod = function(index, fMethod) {
		methods[index] = fMethod;
	}
	this.calculate = function(expression) {
		let values = [];
		try {
			values = expression.split(' ');
		} catch (e) {
			throw new Error('Передана не строка.')
		}
		if (values.length !== 3) {
			throw new Error('Передана строка неверного формата.')
		}
		let [arg1, operator, arg2] = values;
		if (!(operator in methods)) {
			throw new Error('Оператор не поддерживается.')
		}
		let result;
		try {
			result = methods[operator](arg1, arg2);
		} catch (e) {
			throw new Error('Вычисление завершено с ошибкой.')
		}
		return result;
	}
}
var powerCalc = new Calculator;
powerCalc.addMethod("*", function(a, b) {
	return a * b;
});
powerCalc.addMethod("/", function(a, b) {
	return a / b;
});
for (let expr in tests) {
	if (!tests.hasOwnProperty(expr)) {
		continue;
	}
	let result, err;
	try {
		result = powerCalc.calculate(expr);
	} catch (e) {
		err = e;
	} finally {
		console.log({
			testExpr: expr,
			valdResult: tests[expr],
			result: err instanceof Error ? err : result,
			"passed?": result === tests[expr]
		})
	}
}
