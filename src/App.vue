<script setup>
import { ref } from 'vue';
import SelectCategory from './components/SelectCategory.vue'
import SelectTest from './components/SelectTest.vue'
import PlayTest from './components/PlayTest.vue'
import PlayTestSkeleton from './components/PlayTestSkeleton.vue'
import ShowResult from './components/ShowResult.vue'

const STATE = {
  SELECT_CATEGORY : 0,
  SELECT_TEST : 1,
  PLAY_TEST : 2,
  SHOW_RESULT: 3
};

const appState = ref(STATE.SELECT_CATEGORY);
const category = ref({});
const test = ref({});
const score = ref(0);
const total = ref(0);

function categorySelected(cat) {
  appState.value = STATE.SELECT_TEST;
  category.value = cat;
}

function testSelected(t) {
  appState.value = STATE.PLAY_TEST;
  test.value = t;
}

function quit() {
  appState.value = STATE.SELECT_CATEGORY;
  category.value = {};
  test.value = {};
}

function endTest(sco, tot) {
  score.value = sco;
  total.value = tot;
  appState.value = STATE.SHOW_RESULT;
}

function replay() {
  appState.value = STATE.PLAY_TEST;
}

</script>

<template>
  
  <SelectCategory 
      v-if="appState == STATE.SELECT_CATEGORY" 
      @selectCategory="categorySelected" />

  <SelectTest 
      v-if="appState == STATE.SELECT_TEST"
      :category="category"
      @loadTest="testSelected" />

  <Suspense v-if="appState == STATE.PLAY_TEST">

    <PlayTest
        :category="category"
        :test="test"
        @closeTest="quit"
        @endTest="endTest" />

    <template #fallback>
      <PlayTestSkeleton/>
    </template>
  
  </Suspense>

  <ShowResult
      v-if="appState == STATE.SHOW_RESULT"
      :score="score"
      :total="total"
      @replay="replay"
      @quit="quit" />

</template>

<style scoped>

</style>
