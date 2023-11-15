<script setup>
import { onMounted, ref, computed } from 'vue';
import { getTests } from '../utils/utils.js';

const props = defineProps({
  category: Object
})

const page = ref(0);
const tests = ref([]);

const shownTest = computed(() => {
  const b = page.value * 4;
  const e = b + 4;
  return tests.value.slice(b,e);
});

onMounted( async () => {
  tests.value = await getTests(props.category);
});

</script>

<template>
  <div class="quiz_box">
        <header>
            <div class="title"><span style="font-size: 25px">Selecciona un test</span></div>
        </header>
        <section>
            <div class="que_text"><span style="font-size: 20px">{{ category.name }}</span></div>
            <div class="option_list">
              <div class="option" v-for="test in shownTest"
                  @click="$emit('loadTest', test)">
                  <span style="font-size: 15px">{{ test.nom }}</span>
              </div>
            </div>
        </section>

        <footer>
            <button :style="{visibility: (page == 0 ? 'hidden' : 'visible')}" @click="page--"><i class="fa fa-arrow-left"></i></button>
            <div class="total_que">Página {{  page + 1 }}/{{ Math.ceil(tests.length / 4) }}</div>
            <button :style="{visibility: (page == (tests.length / 4) - 1 ? 'hidden' : 'visible')}" @click="page++"><i class="fa fa-arrow-right"></i></button>
        </footer>
    </div>
</template>

<style scoped>

</style>
