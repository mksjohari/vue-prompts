<template>
  <div
    ref="prompter"
    class="vue-prompts-containter"
    @click="handleTapOut"
    :class="{ visible: prompts.length }"
  >
    <TransitionGroup name="fade" appear>
      <div v-for="p in prompts" :key="p.id" class="prompts">
        <div class="prompt">
          <i v-if="p.icon" :class="p.icon"></i>
          <div class="heading">{{ p.heading }}</div>
          <div v-if="showBody" class="body">{{ p.body }}</div>
          <div v-if="p.type === 'yesNo'" class="buttons yesNo">
            <button class="no" @click="handle(p, false)">{{ p.noText }}</button>
            <button class="yes" @click="handle(p, true)">
              {{ p.yesText }}
            </button>
          </div>
          <div v-if="p.type === 'alert'" class="buttons alert">
            <button @click="handle(p)">
              {{ p.btnText }}
            </button>
          </div>
          <div v-if="p.type === 'actions'" class="flex flex-col gap-3">
            <div v-for="(a, i) in p.actions" :key="a.id">
              <button
                @click="handle(p, i)"
                class="w-full"
                :class="{ [a.type]: true }"
              >
                {{ a.text }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script>
export default {
  created() {
    document.addEventListener("add-prompt", this.addPrompt);
  },
  data: () => ({
    prompts: []
  }),
  props: {
    colors: {
      type: Object,
      default: () => ({
        icon: "#946000",
        promptBg: "#FFF8E9",
        heading: "#946000",
        message: "#4E4B66",
        noBg: "transparent",
        noBorder: "#946000",
        noText: "#946000",
        yesBg: "#EAAC30",
        yesBorder: "#EAAC30",
        yesText: "#fff",
        btnBg: "#EAAC30",
        btnBorder: "#EAAC30",
        btnText: "#fff"
      })
    }
  },
  methods: {
    addPrompt(e) {
      this.prompts.push(e.detail);
      console.log(this.prompts);
    },
    handleTapOut() {
      if (!this.prompts.find((p) => p.type === "yesNo")) {
        this.prompts.forEach((p) => this.handle(p, false));
      }
    },
    showBody(p) {
      return ["yesNo", "alert"].includes(p.type);
    },
    close(p) {
      this.prompts.splice(this.prompts.indexOf(p), 1);
    },
    handle(p, res) {
      p.cb(res);
      this.close(p);
    }
  }
};
</script>
<style scoped lang="sass">
.fade-enter-active,
.fade-leave-active
  transition: all 0.2s ease

.fade-enter-to,
.fade-leave-from
  margin-top: 0

.fade-enter-from,
.fade-leave-to
  opacity: 0
  margin-top: 2rem

.vue-prompts-containter
  position: fixed
  top: 0
  left: 0
  width: 100%
  height: 100%
  pointer-events: none
  z-index: 99999999
  backdrop-filter: blur(0px)
  transition: all 0.3s ease
  &.visible
    pointer-events: all
    backdrop-filter: blur(1px)

.prompts
  display: flex
  align-items: center
  justify-content: center
  height: 100%
  position: relative
  padding: 1rem
  .heading
    color: v-bind('colors.heading')
    font-size: 15px
    line-height: 24px
    letter-spacing: 0.75px
    font-weight: 500
    padding-bottom: 1rem
  .prompt
    position: relative
    text-align: center
    z-index: 1
    padding: 1rem
    border-radius: 0.5rem
    background: v-bind('colors.promptBg')
    min-width: 70%
    max-width: 300px
    .body
      color: v-bind('colors.message')
      font-size: 15px
      line-height: 24px
      letter-spacing: 0.75px
    i
      color: v-bind('colors.icon')
      font-size: 24px
      line-height: 24px
      letter-spacing: 0.75px
      font-weight: 500
    .buttons
      display: flex
      justify-content: center
      gap: 0.5rem
      padding-top: 0.625rem
      &.yesNo
        width: 50%
        .yes
          background: v-bind('colors.yesBg')
          border: 1px solid v-bind('colors.yesBorder')
          color: v-bind('colors.yesText')
        .no
          background: v-bind('colors.noBg')
          border: 1px solid v-bind('colors.noBorder')
          color: v-bind('colors.noText')
      &.alert
        button
          background: v-bind('colors.btnBg')
          border: 1px solid v-bind('colors.btnBorder')
          color: v-bind('colors.btnText')
    button
      padding: 0.5rem 1rem
      border-radius: 0.5rem
      cursor: pointer
      &.danger
        background: #FF4D4D
        border: 1px solid #FF4D4D
        color: #fff
      &.none
        background: transparent
        border-color: black
        color: #946000
</style>
