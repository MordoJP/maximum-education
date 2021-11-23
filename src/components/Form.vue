<template>
  <div class="form-container">
    <h1>Форма подачи заявки в отдел сервиса и качества</h1>
    <div class="form-block">
      <div class="form-city">
        <label for="city" class="block-label">Ваш филиал</label>
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
        <div class="checkbox-block">
          <input type="checkbox" id="checkbox" v-model="formData.checkOnline">
          <label for="checkbox">Онлайн</label>
        </div>
      </div>
      <div class="form-theme">
        <label for="theme" class="block-label">Тема обращения</label>
        <template id="theme" v-for="theme in themes">
          <div class="theme-block">
            <input
                type="radio"
                :id="theme.id"
                :value="theme.id"
                v-model="formData.selectedTheme"
                :key="theme.id"
                @input="clearInput"
            >
            <label :for="theme.id">{{ theme.title }}</label>
          </div>
        </template>
        <input
            type="text"
            placeholder="Другое"
            @input="clearRadioButtons"
            v-model="formData.otherTheme"
            class="other-theme"
        >
      </div>
      <div class="form-description">
        <label for="description" class="block-label">Описание проблемы</label>
        <textarea
            id="description"
            class="description-area"
            placeholder="Введите текст"
            v-model="formData.description"
        ></textarea>
      </div>
      <div class="form-file">
        <label for="file" class="file-label">Загрузка документов</label>
        <p>Приложите, пожалуйста, полноэкранный скриншот. Это поможет быстрее решить проблему.</p>
        <input
          id="file"
          type="file"
          @change="onFileChange"
        >
      </div>
      <button
          @click="sendForm"
          :disabled="!isValid"
          class="send-button"
      >ОТПРАВИТЬ</button>
    </div>
  </div>
</template>

<script>
import SendForm from "@/views/SendForm";
export default {
  components: {SendForm},
  data () {
    return {
      themes: [{
        id: 1,
        title: 'Недоволен качеством услуг'
      },
      {
        id: 2,
        title: 'Расторжение договора'
      },
      {
        id: 3,
        title: 'Не приходит письмо активации на почту'
      },
      {
        id: 4,
        title: 'Не работает личный кабинет'
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
        console.log(this.formData)
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
          const readyForm = {
            selectedCity: '',
            selectedTheme: '',
            description: ''
          }
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

          if ((readyForm.selectedCity !== '') && (readyForm.selectedTheme !== '') && (readyForm.description !== '')) {
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
.form-container {
  padding: 10px 27px 25px;
}

.form-container h1, .block-label, option, select, input, label, p, .description-area, .description-area::placeholder, input::placeholder {
  font-family: Arial, sans-serif;
}

.form-container h1 {
  font-size: 24px;
  margin: 0 0 23px;
}

.form-block {
  padding: 40px 36px 36px;
}

.form-block, .description-area, .form-city select, .other-theme {
  border: 1px solid rgb(226, 226, 226);
}

.form-city, .form-theme, .form-description, .form-file {
  display: flex;
  flex-direction: column;
}

.form-city, .form-theme, .form-description {
  margin-bottom: 40px;
}

.form-city select, .theme-block input, .theme-block label, .checkbox-block label, .send-button {
  cursor: pointer;
}

.form-file {
  margin-bottom: 36px;
  width: 320px;
}

.form-city {
  width: 238px;
  position: relative;
}

.form-theme {
  width: 283px;
}

.block-label, .file-label {
  font-size: 16px;
  margin-bottom: 8px;
}

.block-label:after {
  content: "*";
  color: rgb(251, 134, 150);
  position: relative;
  left: 3px;
}

.description-area {
  height: 119px;
  resize: none;
}

.checkbox-block, .theme-block {
  display: flex;
  align-items: center;
}

.theme-block {
  margin-bottom: 16px;
}

.checkbox-block label, .theme-block label, .form-file p {
  font-size: 13px;
}

.checkbox-block input, .theme-block input {
  height: 24px;
  width: 24px;
  margin: 0 8px 0 0;
}

.form-city select {
  margin-bottom: 18px;
  height: 35px;
  padding: 0 12px;
  display: block;
  width: 100%;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
}

.form-city select:disabled {
  background-color: rgb(244 244 244);
}

.other-theme {
  height: 32px;
  width: 237px;
}

.description-area, .other-theme {
  padding: 9px 12px;
  box-sizing: border-box;
}

.form-file p {
  margin: 0 0 15px;
}

.send-button {
  width: 110px;
  height: 33px;
  color: white;
  font-size: 12px;
  font-weight: bold;
  border: 0;
  padding: 0;
  background: rgb(255, 151, 103);
  transition: all .2s ease-out;
}

.send-button:hover {
  filter: brightness(115%);
}

.send-button:disabled {
  background: rgb(226, 226, 226);
  cursor: default;
}

/* Checkbox and radiobutton stylisation */
input[type="checkbox"]:checked,
input[type="checkbox"]:not(:checked),
input[type="radio"]:checked,
input[type="radio"]:not(:checked)
{
  position: absolute;
  left: -9999px;
}

input[type="checkbox"]:checked + label,
input[type="checkbox"]:not(:checked) + label,
input[type="radio"]:checked + label,
input[type="radio"]:not(:checked) + label {
  display: inline-block;
  position: relative;
  padding-left: 36px;
  line-height: 24px;
  cursor: pointer;
}

input[type="checkbox"]:checked + label:before,
input[type="checkbox"]:not(:checked) + label:before,
input[type="radio"]:checked + label:before,
input[type="radio"]:not(:checked) + label:before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  height: 24px;
  width: 24px;
  border: 1px solid #000000;
  background-color: #ffffff;
}

input[type="checkbox"]:checked + label:before,
input[type="checkbox"]:not(:checked) + label:before {
  border-radius: 2px;
}

input[type="radio"]:checked + label:before,
input[type="radio"]:not(:checked) + label:before {
  border-radius: 100%;
}

input[type="checkbox"]:checked + label:after,
input[type="checkbox"]:not(:checked) + label:after,
input[type="radio"]:checked + label:after,
input[type="radio"]:not(:checked) + label:after {
  content: "";
  position: absolute;
  -webkit-transition: all 0.1s ease;
  -moz-transition: all 0.1s ease;
  -o-transition: all 0.1s ease;
  transition: all 0.1s ease;
}

input[type="checkbox"]:checked + label:after,
input[type="checkbox"]:not(:checked) + label:after {
  left: 6px;
  top: 7px;
  width: 13px;
  height: 6px;
  border-radius: 1px;
  border-left: 2px solid #000000;
  border-bottom: 2px solid #000000;
  -webkit-transform: rotate(-45deg);
  -moz-transform: rotate(-45deg);
  -o-transform: rotate(-45deg);
  -ms-transform: rotate(-45deg);
  transform: rotate(-45deg);
}

input[type="radio"]:checked + label:after,
input[type="radio"]:not(:checked) + label:after {
  left: 5px;
  top: 5px;
  width: 16px;
  height: 16px;
  border-radius: 100%;
  background-color: #000000;
}

input[type="checkbox"]:not(:checked) + label:after,
input[type="radio"]:not(:checked) + label:after {
  opacity: 0;
}

input[type="checkbox"]:checked + label:after,
input[type="radio"]:checked + label:after {
  opacity: 1;
}

/* Arrow for select */
select {
  letter-spacing: inherit;
  word-spacing: inherit;
}

select:not([multiple]) {
  background-repeat: no-repeat;
  background-position: calc(100% - 0.5em) 0.7em;
  background-size: 15px auto;
  background-image: url("../../src/assets/down-chevron-svgrepo-com.svg");
}
</style>
