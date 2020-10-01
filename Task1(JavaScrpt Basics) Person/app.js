/*
* Create a class Person with the following properties (name, age).
* After creating an instance the age of a person should be incremented by 1 every second.
* Create 4 instances of a person and push them to an array.
* Write a function that checks every second the age of each person in the array
* and removes a person from the array whenever age >=40.
* Create another function that pushes to the array every 2-second new instance
* of a person with a random age between 1 and 50 and random name.
* */

class Person {
    constructor(name, age) {
        this.name = name;
        this.age = age;
        setInterval(() => {this.age++ }, 1000);
    }


}
let randomName1 = faker.name.findName();
let randomName2 = faker.name.findName();
let randomName3 = faker.name.findName();
let randomName4 = faker.name.findName();

p1 = new Person(randomName1, Math.floor(Math.random() * 100));
p2 = new Person(randomName2, Math.floor(Math.random() * 100));
p3 = new Person(randomName3, Math.floor(Math.random() * 100));
p4 = new Person(randomName4, Math.floor(Math.random() * 100));

let persons = [p1, p2, p3, p4];

function removePersonWhoseAgeGreaterThan40() {
    setInterval(() => {
        for (let i = 0; i < persons.length; i++) {
            if (persons[i].age >= 40) {
                console.log(persons[i].name, `has been removed from array.`);
                persons.splice(i, 1);
            }
        }
        if (persons.length === 0) return;
        console.log(persons);
    }, 1000);
    addNewPersonEveryTwoSeconds();
}

function addNewPersonEveryTwoSeconds(){
    setInterval(() => {
        persons.push(new Person(faker.name.findName(),Math.floor(Math.random() * 51)));
    }, 2000)

}

removePersonWhoseAgeGreaterThan40();

