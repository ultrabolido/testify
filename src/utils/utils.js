const CACHE = [];

async function getCategories() {

  if (!CACHE['categories']) {
    CACHE['categories'] = fetch("categories.json").then((response) => response.json());
  }
  
  return CACHE['categories'];

}

async function getTests(category) {

  if (!CACHE[`category_${category.id}`]) {
    let response = await fetch(`test/${category.id}.json`);
    CACHE[`category_${category.id}`] = await response.json();
    CACHE[`category_${category.id}`].unshift({id: 'all_tema_11_15', nom: 'Tema 11 al 15'});
    CACHE[`category_${category.id}`].unshift({id: 'all_tema_6_10', nom: 'Tema 6 al 10'});
    CACHE[`category_${category.id}`].unshift({id: 'all_tema_1_5', nom: 'Tema 1 al 5'});
    CACHE[`category_${category.id}`].unshift({id: 'all_tema_1_15', nom: 'Tot el temari'});
  }

  return CACHE[`category_${category.id}`]
}

async function getQuestions(category, test_id) {

    return fetch(`test/${category.id}/${test_id}.json`)
    .then((response) => response.json())
  
}

async function getAllQuestions(category, test) {

  let allTests = [];
  if (test.id.startsWith('all')) {
  
    let temp = test.id.split('_');
    for (var i = Number(temp[2]); i <= Number(temp[3]); i++) {
      allTests.push('tema_' + i);
    }
  
  } else {

    allTests.push(test.id);

  }
  
  return Promise.all( allTests.map( t => getQuestions(category, t))).then(data => 
      Promise.all ( data.flat(1) ));
}

function parse(text) {
  let questions = [];
  let lines = text.split("\n");
  let num = lines.length / 6;
  for (var i=0; i < num; i++) {
    let question = {};
    question.question = lines[i*6].substring(3);
    question.answer = lines[i*6 + 5].trim();
    question.options = new Array(4);
    for (var j=0; j < 4; j++) {
      question.options[j] = {};
      question.options[j].id = String.fromCharCode(97 + j);
      question.options[j].name = lines[i*6 + j + 1].substring(2);
    }
    questions.push(question);
  }
  return questions;
}

function shuffle(array) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

export { getCategories, getTests, getQuestions, getAllQuestions, shuffle };