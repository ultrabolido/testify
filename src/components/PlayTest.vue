<script setup>
import { onMounted, ref } from 'vue';
import { getQuestions, getAllQuestions, shuffle } from '../utils/utils.js'

const props = defineProps({
  category: Object,
  test: Object
})

const emit = defineEmits(['closeTest', 'endTest']);

const currentQuestion = ref(0);
const score = ref(0);
const questions = ref((props.test.id === 'tot') ? await getAllQuestions(props.category) : await getQuestions(props.category, props.test));
const selectedOption = ref({});
const answered = ref(false);

onMounted( async () => {
  //questions.value = (props.test.id === 'tot') ? await getAllQuestions(props.category) : await getQuestions(props.category, props.test);
  randomize();
  if (props.test.format === 'txt') console.log(JSON.stringify(questions.value));
});

function randomize() {
  shuffle(questions.value);
  questions.value.forEach((q) => {
    shuffle(q.options);
  })
}

function nextQuestion() {
  
  selectedOption.value = {};
  answered.value = false;
  currentQuestion.value++;

  if (currentQuestion.value == questions.value.length) {
    emit('endTest', score.value, questions.value.length);
  } 

}

function correctAnswer(option) {
  return option.id == questions.value[currentQuestion.value].answer;
}

function incorrectAnswer(option) {
  return (selectedOption.value.id == option.id) && (selectedOption.value.id != questions.value[currentQuestion.value].answer)
}

function checkOption(option) {
  selectedOption.value = option;
  answered.value = true;
  if (correctAnswer(option)) score.value++;
}

function closeTest() {
  currentQuestion.value = 0;
  score.value = 0;
  answered.value = false;
  selectedOption.value = {};
  emit('closeTest');
}

</script>

<template>
  <div class="quiz_box">
        <header>
            <div class="title">{{ test.nom }}</div>
            <button @click="closeTest()"><i class="fa fa-xmark"></i></button>
        </header>
        <section v-if="questions[currentQuestion]">
            <div class="que_text">
              <span>{{ currentQuestion + 1 }}. {{ questions[currentQuestion].question }}</span>
            </div>
            <div class="option_list">
              <div class="option" v-for="(option,index) in questions[currentQuestion].options" 
                  :class="{correct: answered && correctAnswer(option),
                          incorrect: answered && incorrectAnswer(option),
                          disabled: answered }"
                  @click="checkOption(option)"><span>[{{ String.fromCharCode(65 + index) }}] {{ option.name }}</span>
                  <div v-if="answered && correctAnswer(option)" class="icon tick"><i class="fa-regular fa-circle-check"></i></div>
                  <div v-if="answered && incorrectAnswer(option)" class="icon cross"><i class="fa-regular fa-circle-xmark"></i></div>
              </div>
            </div>
        </section>
        <footer>
            <div class="total_que">
              <span><p>{{ currentQuestion + 1 }}</p> de <p>{{ questions.length }}</p> preguntas</span>
            </div>
            <button :style="{visibility: (answered ? 'visible' : 'hidden')}" @click="nextQuestion()">Continua</button>
        </footer>
    </div>
</template>

<style scoped>

</style>
