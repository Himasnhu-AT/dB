// test/index.spec.js
const parseQuery = require('../src/queryParser');
const executeSELECTQuery = require('../src/index');

test('Parse SQL Query with INNER JOIN', async () => {
    const query = 'SELECT student.name, enrollment.course FROM student INNER JOIN enrollment ON student.id=enrollment.student_id';
    const result = parseQuery(query);
    expect(result).toEqual({
        fields: ["student.name", "enrollment.course"],
        table: "student",
        whereClauses: [],
        joinTable: "enrollment",
        joinCondition: {
            left: "student.id",
            right: "enrollment.student_id"
        }
    });
});

test('Parse SQL Query with INNER JOIN and WHERE Clause', async () => {
    const query = 'SELECT student.name, enrollment.course FROM student INNER JOIN enrollment ON student.id=enrollment.student_id WHERE student.name = John';
    const result = parseQuery(query);
    expect(result).toEqual({
        fields: ["student.name", "enrollment.course"],
        table: "student",
        whereClauses: [{
            field: "student.name",
            operator: "=",
            value: "John"
        }],
        joinTable: "enrollment",
        joinCondition: {
            left: "student.id",
            right: "enrollment.student_id"
        }
    });
});

// test('Execute SQL Query with INNER JOIN', async () => {
//     const query = 'SELECT * FROM enrollement INNER JOIN sample ON enrollement.id = sample.id';
//     const result = await executeSELECTQuery(query);
//     // Add your expectations here based on your CSV data and the expected result of the query
//     // For example, if your executeSELECTQuery function returns an array of joined records:
//     expect(result).toEqual([
//         { id: '1', name: 'John', age: '30' },
//         { id: '2', name: 'Jane', age: '25' },
//         { id: '3', name: 'Bob', age: '22' },
//     ]);
// });

// test('Execute SQL Query with INNER JOIN and a WHERE Clause', async () => {
//     const query = 'SELECT * FROM enrollement INNER JOIN sample ON enrollement.id = sample.id WHERE enrollement.age > 25';
//     const result = await executeSELECTQuery(query);
//     // Add your expectations here based on your CSV data and the expected result of the query
//     // For example, if your executeSELECTQuery function returns an array of joined records:
//     expect(result).toEqual([
//         { id: '1', name: 'John', age: '30' },
//     ]);
// });