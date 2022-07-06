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

export const postsForm = (async (axiosMethod, route) => {
  let formData = new FormData()
  formData.append('text_content', postContent.text_content)
  formData.append('image', postContent.image)
  await axiosMethod(`${route}`,
    formData
    , { headers: { "Content-Type": "multipart/form-data", "Authorization": "Bearer " + user.token } })
    .then(() => {
      postContent.text_content = null
      postContent.image = null
    })
})

export const needRefresh = reactive({status: false})