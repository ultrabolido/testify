<script setup>
import { onMounted, ref } from 'vue';
import { getCategories } from '../utils/utils.js'

const categories = ref([]);

onMounted( async () => {
  categories.value = await getCategories();
});

</script>

<template>
  
  <div class="quiz_box">
        <header>
            <div class="title"><span style="font-size: 25px">Selecciona un cuerpo</span></div>
        </header>
        <section>
            <div class="que_text"><span style="font-size: 20px">Proceso de estabilización CAIB</span></div>
            <div class="option_list">
              <div class="option" v-for="category in categories"
                  @click="$emit('selectCategory', category)">
                  <span style="font-size: 15px">{{ category.name }}</span>
              </div>
            </div>
        </section>
        <footer>
        </footer>
    </div>
</template>

<style scoped>
footer {
    height: 20px;
}
</style>
