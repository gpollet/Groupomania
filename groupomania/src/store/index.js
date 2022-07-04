import {reactive} from 'vue'

export const user = reactive({
  userId: null,
  token: null,
  role: null,
})

export const postContent = reactive({
  text_content: null,
  image: null,
})

export const data = reactive({ posts : {}})