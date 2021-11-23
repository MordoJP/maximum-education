<template>
  <div class="form-container">
    <h1>Форма подачи заявки в отдел сервиса и качества</h1>
    <div class="form-block">
      <div class="form-city">
        <label for="city">Ваш филиал</label>
        <select
          name="city"
          id="city"
          v-model="formData.selectedCity"
          :disabled="isOnline"
        >
          <option
            value=""
            hidden
            disabled
            selected
          >Выберите город</option>
          <option
            :value="city.id"
            v-for="city in cityList"
            :key="city.id"
          >{{ city.title }}</option>
        </select>
        <input type="checkbox" id="checkbox" v-model="formData.checkOnline">
        <label for="checkbox">Онлайн</label>
      </div>
      <div class="form-theme">
        <template v-for="theme in themes">
          <input
              type="radio"
              :id="theme.id"
              :value="theme.title"
              v-model="formData.selectedTheme"
              :key="theme.id"
              @input="clearInput"
          >
          <label :for="theme.id">{{ theme.title }}</label>
        </template>
        <input
            type="text"
            placeholder="Другое"
            @input="clearRadioButtons"
            v-model="formData.otherTheme"
        >
      </div>
      <div class="form-description">
        <label for="description">Описание проблемы</label>
        <textarea
            id="description"
            class="description-area"
            placeholder="Введите текст"
            v-model="formData.description"
        ></textarea>
      </div>
      <div class="form-file">
        <input
          type="file"
          @change="onFileChange"
        >
      </div>
      <button
          @click="sendForm"
          :disabled="!isValid"
      >Отправить</button>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      themes: [{
        id: 1,
        title: '1'
      },
      {
        id: 2,
        title: '2'
      },
      {
        id: 3,
        title: '3'
      }
      ],
      formData: {
        selectedCity: '',
        checkOnline: false,
        selectedTheme: '',
        otherTheme: '',
        description: '',
        file: ''
      },
      isValid: false
    }
  },
  computed: {
    cityList () {
      return this.$store.state.list
    },
    isOnline () {
      return this.formData.checkOnline
    }
  },
  methods: {
    clearRadioButtons () {
      this.formData.selectedTheme = ''
    },
    clearInput () {
      this.formData.otherTheme = ''
    },
    onFileChange (e) {
      this.formData.file = e.target.files[0]
    },
    sendForm () {
      this.$store.dispatch('sendForm', this.formData)
      .then((response) => {
        if (response.success) {
          this.formData = {
            selectedCity: '',
            checkOnline: false,
            selectedTheme: '',
            otherTheme: '',
            description: '',
            file: ''
          }
          this.$router.push('/successful')
        } else {
          alert('Ошибка отправки заявки')
        }
      })
    }
  },
  watch: {
    formData: {
      deep: true,
        handler() {
          const readyForm = {}
          if (this.formData.selectedCity !== '') {
            readyForm.selectedCity = this.formData.selectedCity
          }
          if (this.formData.checkOnline) {
            readyForm.selectedCity = 'онлайн'
          }
          if (this.formData.selectedTheme !== '') {
            readyForm.selectedTheme = this.formData.selectedTheme
          }
          if (this.formData.otherTheme !== '') {
            readyForm.selectedTheme = this.formData.otherTheme
          }
          readyForm.description = this.formData.description

          if (readyForm.selectedCity !== '' && readyForm.selectedTheme !== '' && readyForm.description !== '') {
            this.isValid = true
          }
        }
    }
  },
  mounted () {
    this.$store.dispatch('getCityList')
  }
}
</script>

<style scoped>
.description-area {
  height: 108px;
  resize: none;
}
</style>
